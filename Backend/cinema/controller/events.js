const {validateMovie,  Movie}=require('../models/movie')
const {validateSeat,validateScreeningRoom,validateEvent,Event}=require('../models/event');
const _=require('lodash');


module.exports.createEvent= async (req, res, next) => {
    let { error } = validateEvent(_.pick(req.body,['movieId','screeningRoom']));
    if (error) return res.status(400).send(error.details[0].message);
    
    const startTime=req.body.startTime;
    const endTime=req.body.endTime;
    // let date1=new Date(req.body.date);
    // const offset=date1.getTimezoneOffset();
    // date1=new Date(date1.getTime()-(offset*60*1000));
    const range = [startTime.hour, startTime.hour+1 ,endTime.hour];
    let events = await Event.find({"screeningRoom":req.body.screeningRoom, 'date':req.body.date,'startTime.hour': range,'endTime.hour': range});
    if (events.length>0) {
        // if((event.startTime.hour<req.body.startTime.hour && event.endTime.hour>req.body.startTime.hour )
        //     || (event.startTime.hour<req.body.endTime.hour && event.endTime.hour>req.body.endTime.hour))
        return res.status(400).send('Event already exists at requested timeslot');
    }
    let seats;
    if(req.body.screeningRoom=='2')
    seats=30;
    else seats=20;
    const event = new Event({
        movieId: req.body.movieId,
        date: req.body.date,
        startTime:req.body.startTime,
        endTime:req.body.endTime,
        screeningRoom:req.body.screeningRoom,
        seatsAmount:seats
    });
    
    try {
        await event.save();
        return res.status(201).send('Event added successfully');
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server error" });
    }
}

module.exports.editEvent= async (req, res, next) => {
    let { error } = validateScreeningRoom(_.pick(req.body,['screeningRoom']));
    if (error) return res.status(400).send(error.details[0].message);
    // let date1=new Date(req.body.date);
    // const offset=date1.getTimezoneOffset();
    // date1=new Date(date1.getTime()-(offset*60*1000));
    let seats;
    if(req.body.screeningRoom=="1")
    {
        seats=20;
    }
    else
    {
        seats=30;
    }
    let event = await Event.findOneAndUpdate({"_id":req.params.id},
    { 'startTime': req.body.startTime,
    'endTime': req.body.endTime,
    'date': req.body.date,
    'screeningRoom': req.body.screeningRoom,
    'seatsAmount':seats
    });
    
    try {
        await event.save();
        return res.status(201).send('Event edited successfully');
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server error" });
    }
}

module.exports.getEvents=async (req, res, next)=>{
    let events=await Event.find({'movieId':req.params.movieId}).select('-__v');
    // console.log(events);
    // for(let i=0; i<events.length; i++)
    // {
    //     let dateold=events[i].date.toISOString().slice(0,10);
    //     delete events[i].date;
    //     events[i]["datee"]=dateold;
    //     console.log(events[i]["datee"]);
    // }
    return res.status(201).send(events);
}


module.exports.getSeats= async (req, res, next) => {
    const seats=await Event.findById(req.params.eventId).select('reservedSeats.seat');
    console.log(seats);
    return res.status(201).send(seats.reservedSeats);
}