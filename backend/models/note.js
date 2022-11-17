const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
	username:{type:String, required:true},
	message: { type: String, required: true },
});

const Note = mongoose.model("notes", noteSchema);

module.exports = { Note};