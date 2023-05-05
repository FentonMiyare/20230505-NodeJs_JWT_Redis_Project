const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
    name: String,
    file: {
        data: Buffer,
        contentType: String
    }
})

const File = mongoose.model("File", FileSchema)
module.exports = File;
