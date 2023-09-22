const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// Route 1: for fetch all notes using Get "http://localhost:5000/api/note/fetchnotes"
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Status: "Internal server error" });
  }
});

// Route 2: add notes using POST "http://localhost:5000/api/note/addnotes"
router.post(
  "/addnotes",
  fetchuser,
  body("title", "Enter a valid tile").isLength({ min: 3 }),
  body("description", "Enter a valid description").isLength({ min: 5 }),
  body("tag", "Enter a valid tag").isLength({ min: 3 }),
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ Status: "Internal server error" });
    }
  }
);

// Route 3: update notes using PUT "http://localhost:5000/api/note/updatenotes"

router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Status: "Internal server error" });
  }
});

// Route 4: delete notes using DELETE "http://localhost:5000/api/note/deletenotes"

router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

    note = await Note.findByIdAndDelete(req.params.id);
    res.send("Status : Deleted Succefully");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Status: "Internal server error" });
  }
});

module.exports = router;
