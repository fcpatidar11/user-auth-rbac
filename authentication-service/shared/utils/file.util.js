const appConfig = require("@configs/app.config");
const fs = require("fs");
const path = require("path");
const fsPromises = fs.promises;

module.exports = {
    moveFileWithOverwrite: async (sourceFile, destinationPath, removedPath = "") => {
        try {
            // Ensure destination directory exists
            await fsPromises.mkdir(appConfig.PUBLIC_FOLDER_PATH, { recursive: true });
            const destDir = path.dirname(path.join(appConfig.PUBLIC_FOLDER_PATH, destinationPath));
            await fsPromises.mkdir(destDir, { recursive: true });

            // Remove destination file if it exists (optional: clean move)
            if (removedPath) {
                const destDir = path.dirname(path.join(appConfig.PUBLIC_FOLDER_PATH, removedPath));
                await fsPromises.mkdir(destDir, { recursive: true });
                try {
                    await fsPromises.unlink(path.join(appConfig.PUBLIC_FOLDER_PATH, removedPath));
                } catch (err) {
                    if (err.code !== "ENOENT") throw err; // Ignore if file doesn't exist
                }
            }

            // Move (rename) the file
            await fsPromises.rename(
                path.join(appConfig.PUBLIC_FOLDER_PATH, appConfig.TEMP_FOLDER_PATH, sourceFile),
                path.join(appConfig.PUBLIC_FOLDER_PATH, destinationPath)
            );
            return destinationPath;
        } catch (err) {
            console.error("Error moving file:", err);
            throw err;
        }
    }
}