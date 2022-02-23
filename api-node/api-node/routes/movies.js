const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const moment = require("moment");
const express = require("express");
const router = express.Router();
moviesData = require("../seed").moviesData;
genreData = require("../seed").genreData;

router.get("/", async (req, res) => {
  const movies = moviesData;
  //sort on name
  movies.sort(function(a, b) {
    return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
  });
  //console.log("in get");
  res.send(movies);
});

router.post("/", [auth, admin], async (req, res) => {
  //console.log(auth);
  let genreId = +req.body.genreId;
  console.log(genreId);
  const genre = genreData.find(obj => +obj.id === genreId);
  //console.log(genre);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = {
    id: moviesData.length + 1,
    title: req.body.title,
    genre: {
      id: genre.id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    publishDate: moment().toJSON()
  };
  moviesData.push(movie);
  res.send(movie);
});

router.put("/:id", [auth], async (req, res) => {
  //const { error } = validate(req.body);
  //console.log(error);
  //if (error) return res.status(400).send(error.details[0].message);

  let genreId = +req.body.genreId;
  const genre = genreData.find(obj => +obj.id === genreId);
  if (!genre) return res.status(400).send("Invalid genre.");
  const movieId = moviesData.findIndex(obj => obj.id === +req.params.id);
  let movie = moviesData[movieId];

  movie = {
    id: +req.params.id,
    title: req.body.title,
    genre: {
      id: genre.id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  };
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  moviesData[movieId] = movie;

  res.send(movie);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  //const movie = await Movie.findByIdAndRemove(req.params.id);
  const movieId = moviesData.findIndex(obj => +obj.id === +req.params.id);
  console.log(movieId);
  const movie = moviesData[movieId];

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");
  moviesData.splice(movieId, 1);

  res.send(movie);
});

router.get("/:id", (req, res) => {
  //const movie = await Movie.findById(req.params.id).select("-__v");
  const movie = moviesData.find(obj => +obj.id === +req.params.id);
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

module.exports = router;
