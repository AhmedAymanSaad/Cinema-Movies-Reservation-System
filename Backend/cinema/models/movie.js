const Joi = require('joi');
const mongoose = require('mongoose');


const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    date: {
        type: Date,
        Default: Date.now(),
        required: true
    },
    startTime: {
        type: Date,
        default: Date.now(),
        required: true
    },
    endTime: {
        type: Date,
        default: Date.now(),
        required: true
    },
    ScreeningRoom: Number,
    imageUrl:{
        type: string,
        required: true
    },
    reservedSeats: [Number],
    customer: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Customer'
            }]
}));


function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(255).required(),
        //   genreId: Joi.objectId().required(),
        ScreeningRoom: Joi.number().min(0).max(10).required()
    };

    return Joi.validate(movie, schema);
}

exports.Movie = Movie; 
exports.validate = validateMovie;