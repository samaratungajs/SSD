const { Note } = require("../models/note");

const addNote = async (req, res) => {
  try {
    if (!req.body) 
      return res.status(400).json({ message: "Please fill all the fields" });
    
    const note = await Note.create({ ...req.body});

    res.status(200).json({ note, message: "message is successfully sent" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports = {
    addNote,
}