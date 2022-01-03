const Joi = require('joi');
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    seat: {
        type: Number,
        required: true,
        trim: true,
        maxlenght: 2
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    }
});
const Seat = mongoose.model('Seat', seatSchema);

const Event = mongoose.model('Event', new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        hour: Number,
        minute: Number
    },
    endTime: {
        hour: Number,
        minute: Number
    },
    screeningRoom: {
        type: Number,
        required: true
    },
    reservedSeats: [seatSchema],
    seatsAmount: {
        type: Number,
        required: true,
        default: 20
    }
}));


function validateEvent(event) {
    const schema = Joi.object({
        // title: Joi.string().min(5).max(255).required(),
        movieId: Joi.objectId().required(),
        screeningRoom: Joi.number().min(0).max(10).required()
    });

    return schema.validate(event);
}

function validateScreeningRoom(event) {
    const schema = Joi.object({
        screeningRoom: Joi.number().min(0).max(10).required()
    });
    return schema.validate(event);
}


function validateSeat(seat) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        seat: Joi.number().min(1).max(2).required()
    });

    return schema.validate(seat);
}


// {
//     seat: {
//         type: Number,
//         required: true,
//         trim: true,
//         maxlenght: 2
//     },
//     customerId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: 'Customer'
//     }
// }
exports.Event = Event;
exports.Seat= Seat;
exports.validateScreeningRoom = validateScreeningRoom;
exports.validateEvent = validateEvent;
exports.validateSeat = validateSeat;
