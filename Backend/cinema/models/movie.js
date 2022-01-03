const Joi = require('joi');
const mongoose = require('mongoose');


const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    
    imageUrl:{
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    }
}));


function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        imageUrl: Joi.string().min(5).max(1024).required()
    });

    return schema.validate(movie);
}

exports.Movie = Movie; 
exports.validateMovie = validateMovie;