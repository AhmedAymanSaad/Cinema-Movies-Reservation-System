const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require("joi-objectid")(Joi);
const jwt = require('jsonwebtoken');
const config = require('config');

const seatSchema = new mongoose.Schema({
    seat: [{
        type: Number,
        required: true,
        trim: true,
        maxlenght: 2
    }],
    // ScreeningRoom:{
    //     type: Number,
    //     required: true,
    //     trim: true,
    //     maxlenght: 1
    // },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Movie'
    }
});

const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50,
        unique: true,
        dropDups: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 1024
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 255
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        unique: true,
        dropDups: true,
    },
    requestingAuthority:{
        type:Boolean,
        default:false,
        required: true
    },
    isManager:{
        type:Boolean,
        default:false,
        required: true
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required: true
    },

    bookedSeats: [seatSchema]
});
customerSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, isManager: this.isManager,isAdmin:this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
  }
const Customer = mongoose.model('Customer', customerSchema);
// const Movie = mongoose.model('Movie', movieSchema);



function validateLogin(body) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(50).required(),
    });

    return schema.validate(body);

};

function validateSignup (body) {
    const schema = Joi.object({
        firstName: Joi.string().min(1).max(50).required(),
        lastName: Joi.string().min(1).max(50).required(),
        username: Joi.string().min(5).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(50).required(),
        role:Joi.string().min(5).max(10).required()
    });

    return schema.validate(body);
};


function validateBooking (body) {
    const schema = Joi.object({
        username: Joi.string().min(1).max(256).required(),
        seat: Joi.number().integer().min(1).max(200).required(),
        movieId: Joi.objectId().required(),
        password: Joi.string().min(1).max(50).required(),
    });

    return schema.validate(body);
};

exports.Customer = Customer;
exports.validateLogin = validateLogin;
exports.validateBooking = validateBooking;
exports.validateSignup=validateSignup;