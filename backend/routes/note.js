const express = require ('express');
const { addNote } = require('../controllers/note');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, addNote );


module.exports = router;

