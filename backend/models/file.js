const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
	username:{type:String,trim:true, required:true},
	photo: { type: String, required: true },
});

const File = mongoose.model("photo", fileSchema);

module.exports = { File};