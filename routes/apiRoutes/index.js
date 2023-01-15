const express = require("express");
const router = express.Router();
const { notes } = require("../../db/db.json");
const fs = require("fs");
const path = require("path");

router
  .route("/notes")
  .get((req, res) => {
    res.json(notes);
  })
  .post((req, res) => {
    req.body.id = notes.length.toString();
    const note = req.body;
    notes.push(note);
    fs.writeFileSync(
      path.join(__dirname, "../../db/db.json"),
      JSON.stringify({ notes }, null, 2)
    );
    res.json(note);
  })
  .delete("/:id", (req, res) => {
    const id = req.params.id;
    notes.splice(id, 1);
    notes.forEach((note, index) => {
      note.id = index.toString();
    });
    fs.writeFileSync(
      path.join(__dirname, "../../db/db.json"),
      JSON.stringify({ notes }, null, 2)
    );
    res.json(notes);
  });

module.exports = router;
