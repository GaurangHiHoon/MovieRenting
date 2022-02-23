const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, validate } = require("../models/genre");
const express = require("express");
const router = express.Router();
genreData = require("../seed").genreData;

router.get("/", async (req, res) => {
  const genres = genreData;
  res.send(genres);
});

router.post("/", auth, async (req, res) => {
  //const { error } = validate(req.body);
  //if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ id: data.length + 1, name: req.body.name });
  genreData.push(genre);

  res.send(genre);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  //const { error } = validate(req.body);
  //if (error) return res.status(400).send(error.details[0].message);
  let id = +req.params.id;
  const genre = genreData.find(obj => +obj.id === id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  //chamge value

  res.send(genre);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  //const genre = await Genre.findByIdAndRemove(req.params.id);
  let id = +req.params.id;
  const genre = genreData.find(obj => +obj.id === id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.get("/:id", async (req, res) => {
  //const genre = await Genre.findById(req.params.id).select("-__v");
  let id = +req.params.id;
  const genre = genreData.find(obj => +obj.id === id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

module.exports = router;
