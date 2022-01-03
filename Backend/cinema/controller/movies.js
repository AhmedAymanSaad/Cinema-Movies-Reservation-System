const {validateMovie,  Movie}=require('../models/movie')

module.exports.getMovies= async (req, res, next) => {
    const movies=await Movie.find().select('-__v -events');
    res.status(201).send(movies);

}

module.exports.addMovie= async (req, res, next) => {
    let { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let movie = await Movie.findOne({ title: req.body.title  });
    if (movie) return res.status(400).send('Movie already exists');
    movie = new Movie({
        title: req.body.title,
        imageUrl: req.body.imageUrl,
    });
    try {
        await movie.save();
        return res.status(201).send('Movie added successfully');
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server error" });
    }
}