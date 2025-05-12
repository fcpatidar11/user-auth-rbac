const appConfig = require("@configs/app.config");
const appConstant = require("@constants/app.constant");
const responseUtil = require("@formatters/api.response");
const Multer = require("multer");
const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;

const deleteOldFiles = async () => {
    try {
        const files = await fsPromises.readdir(path.join(appConfig.PUBLIC_FOLDER_PATH, appConfig.TEMP_FOLDER_PATH));
        const now = Date.now();

        await Promise.all(
            files.map(async (file) => {
                const filePath = path.join(appConfig.PUBLIC_FOLDER_PATH, appConfig.TEMP_FOLDER_PATH, file);
                const stats = await fsPromises.stat(filePath);

                const ageInHours = (now - stats.mtimeMs) / (1000 * 60 * 60);
                if (ageInHours > appConfig.TEMP_FOLDER_MAX_FILE_AGE_HOURS) {
                    await fsPromises.unlink(filePath);
                }
            })
        );
    } catch (err) {
        console.warn("Failed to delete old temp files:", err.message);
    }
};

// Define Multer storage
const MulterStorage = Multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, path.join(appConfig.PUBLIC_FOLDER_PATH, appConfig.TEMP_FOLDER_PATH));
    },
    filename: function (req, file, cb) {
        return cb(
            null,
            `${req.params.type}_${req.authUser._id}_${Date.now()}${path.extname(file.originalname)}`
        );
    }
});

// File filter: type and extension validation
const MulterFileFilter = (req, file, cb) => {
    const fileConfig = appConstant.FILE_UPLOAD_FORMATS.find(x => x.Type == req.params.type);
    if (
        fileConfig.AcceptExtensions.length &&
        !fileConfig.AcceptExtensions.includes(path.extname(file.originalname).toLowerCase())
    ) {
        return cb("invalidFileExtension", false);
    } else {
        return cb(null, true);
    }
};



module.exports = {
    uploadFiles: async (req, res) => {
        // Ensure destination directory exists
        await fsPromises.mkdir(appConfig.PUBLIC_FOLDER_PATH, { recursive: true });
        await fsPromises.mkdir(path.join(appConfig.PUBLIC_FOLDER_PATH, appConfig.TEMP_FOLDER_PATH), { recursive: true });
        await deleteOldFiles(); // Clean up old files first
        const fileConfig = appConstant.FILE_UPLOAD_FORMATS.find(x => x.Type == req.params.type);

        if (!fileConfig) {
            return responseUtil.unprocessableResponse(res, "invalidFileType");
        }

        const maxFileSize = fileConfig.MaxSizeInMB ? fileConfig.MaxSizeInMB * 1024 * 1024 : null;
        const maxFiles = fileConfig.MaxFiles || null;

        const multerUpload = Multer({
            storage: MulterStorage,
            fileFilter: MulterFileFilter,
            ...((maxFileSize || maxFiles) && {
                limits: {
                    ...(maxFileSize && { fileSize: maxFileSize }),
                    ...(maxFiles && { files: maxFiles })
                }
            })
        }).array("files", maxFiles);

        multerUpload(req, res, function (err) {
            if (err instanceof Multer.MulterError) {
                if (err.code === "LIMIT_FILE_SIZE") {
                    return responseUtil.unprocessableResponse(res, "fileSizeLimitExceeded");
                } else if (err.code === "LIMIT_FILE_COUNT") {
                    return responseUtil.unprocessableResponse(res, "fileCountLimitExceeded");
                }
                return responseUtil.unprocessableResponse(res, "multerError");
            } else if (err) {
                return responseUtil.unprocessableResponse(res, err);
            }
            return responseUtil.successResponse(res, "success", { data: req.files })
        });
    }
};
