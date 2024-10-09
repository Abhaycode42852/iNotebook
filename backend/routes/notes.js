const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/FetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1:Featching all notes using:GET "/api/notes/fectchAllNotes". Login required
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    let notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    // console.error(error.message);
    res.status(500).send("Inetrnal Server Error");
  }
});

//Route 2: adding a note using:POST "api/notes/addNote". Login Required
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Title length should be atleast 3").isLength({ min: 3 }),
    body("description", "Description length should be atleast 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Validating the Note to be Saved
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Adding note in db
    const { title, description, tag } = req.body;
    try {
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNotes = await note.save();
      res.json({ Success: "Note has been Added ", note: note });
    } catch (error) {
      // console.error(error.message);
      res.status(500).send("Inetrnal Server Error");
    }
  }
);

//Route 3: Updating a Note using:PUT "api/notes/updateNote/:id". Login Required
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //New note object to be updated
    const newNote = {};
    //checking for which values to be updated
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // Finding the note and validating existence
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unautherised");
    }

    //Upadting the note
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ Success: "Note has been Updated ", note: note });
  } catch (error) {
    // console.error(error.message);
    res.status(500).send("Inetrnal Server Error");
  }
});

//Route 4: Deleting a note using:DELETE "api/notes/deleteNote/:id". Login Required
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  try {
    //Validating Notes Exixtence
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    //Allow deletion only when user is the owner of the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unautherised");
    }

    //Deleting the Note
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted ", note: note });
  } catch (error) {
    // console.error(error.message);
    res.status(500).send("Inetrnal Server Error");
  }
});

module.exports = router;
