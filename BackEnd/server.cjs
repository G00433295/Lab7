
const express = require('express');

// Create an Express application
const app = express();

// Set the port number for the server
const port = 4000;

// Import cors to allow requests from different origins
const cors = require('cors');
app.use(cors());

// Import body-parser to read data sent in requests
const bodyParser = require('body-parser');

// Allow the server to read URL encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Allow the server to read JSON data
app.use(bodyParser.json());


// Set up headers to allow cross-origin requests
app.use(function(req, res, next) {
  // Allow requests from any origin
  res.header("Access-Control-Allow-Origin", "*");

  // Allow these HTTP request methods
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  // Allow these headers to be included in requests
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Move on to the next function
  next();
});

// Import mongoose to connect to MongoDB
const mongoose = require('mongoose');

// Connect to the MongoDB database called MoviesDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.bzjj0vj.mongodb.net/MoviesDB');

// Create a schema that describes the structure of a movie
const movieSchema = new mongoose.Schema({
    title: String,  // Stores the movie title
    year: String,   // Stores the movie release year
    poster: String  // Stores the movie poster URL
});

// Create a model using the movie schema
// This model is used to interact with the movies collection
const MovieModel = mongoose.model('myMovies', movieSchema);


// POST route to add a new movie to the database
app.post('/api/movies', async (req, res)=>{

 // Get the movie details from the request body
 const { title, year, poster } = req.body;

 // Create a new movie using the details provided
 const newMovie = new MovieModel({ title, year, poster });

 // Save the new movie to MongoDB
 await newMovie.save();

 // Send a success response with the new movie
 res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
});


// GET route to retrieve all movies from the database
app.get('/api/movies', async (req, res) => {

  // Find all movies stored in the database
  const movies = await MovieModel.find({});

  // Send the movies back as a JSON response
  res.json(movies);
});


// GET route to retrieve one movie using its ID
app.get('/api/movie/:id', async (req, res) => {

  // Find a movie using the ID provided in the URL
  const movie = await MovieModel.findById(req.params.id);

  // Send the movie back as a response
  res.send(movie);
});


// Start the server and listen on port 4000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
