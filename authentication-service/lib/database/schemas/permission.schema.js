const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const permissionSchema = new mongoose.Schema({
    code: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    group: { type: mongoose.Types.ObjectId, ref: "permission_groups", required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

permissionSchema.index({ name: 1 }, { unique: true });

permissionSchema.plugin(aggregatePaginate);

permissionSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = permissionSchema;
