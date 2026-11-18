const express = require('express');
const app = express()
const port = 4000
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


  app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.bzjj0vj.mongodb.net/MoviesDB');

const movieSchema = new mongoose.Schema({
    title: String,
    year: String,
    poster: String
  });
 
  const MovieModel = mongoose.model('myMovies', movieSchema);





app.post('/api/movies', async (req, res)=>{

 const { title, year, poster } = req.body;

 const newMovie = new MovieModel({ title, year, poster });
 await newMovie.save();

 res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
 })


app.get('/api/movies', async (req, res) => {
  const movies = await MovieModel.find({});
  res.json(movies);
});

app.get('/api/movie/:id', async (req, res) => {
  const movie = await MovieModel.findById(req.params.id);
  res.send(movie);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})