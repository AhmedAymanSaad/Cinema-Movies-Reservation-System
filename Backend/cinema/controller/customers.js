const { Customer, validateLogin, validateBooking, validateSignup } = require('../models/customer')
const bcrypt = require('bcrypt');
const {Event, Seat}=require('../models/event')

module.exports.register = async (req, res, next) => {
    let { error } = validateSignup(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let customer = await Customer.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
    if (customer) return res.status(400).send('User already registered');
    // if(customer) return res.status(400).send(customer);
    customer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(customer.password, salt);
    if(req.body.role ==="Manager")
    {
        customer.requestingAuthority=true;
    }
    try {
        const token = customer.generateAuthToken();
        await customer.save();
        return res.status(201).header('x-auth-token', token).send('success');
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server error" });
    }
}

module.exports.logIn = async (req, res, next) => {
    let { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = await Customer.findOne({ username: req.body.username });
    if (!customer) return res.status(400).send('Invalid email or password.');
    const validPassword = await bcrypt.compare(req.body.password, customer.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = customer.generateAuthToken();
    return res.status(201).header('x-auth-token', token).send('success');
    // return res.status(200).send(token);
}

module.exports.getCustomer= async (req, res, next) => {
    const customer =await Customer.findOne({ _id: req.customer._id }).select('-password -__v');
    res.send(customer);
}

module.exports.reserveSeat = async (req, res, next) => {
    const events=await Event.findById( req.params.eventId).find({'reservedSeats.seat':req.body.seat});
    if(events.length>0)
    return res.status(400).send('seats already reserved, please choose other ones');
    const seat1 =new Seat({seat: req.body.seat ,customerId:req.customer._id });
    let event=await Event.findOne({ _id: req.params.eventId});
    try{
        event.reservedSeats.push(seat1)
        await event.save();
        return res.status(201).send("seat reserved successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server error" });
    }
}

module.exports.authorize= async (req, res, next) => {
    
    try {
        let customers= await Customer.updateMany({ _id: req.body.id, requestingAuthority:true},
            { $set:{'requestingAuthority':'false','isManager':'true'}});
    
        if(!customers) return res.status(500).send({ error: "Internal Server error" });
        if(customers.length ==0) return res.status(404).send('No customers found.');
        return res.status(201).send(customers);;
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server error" });
    }
    
}

module.exports.getRequestingUsers= async (req, res, next) => {
    let customers=await Customer.find({requestingAuthority:true}).select('-password -__v');
    if(!customers) return res.status(500).send({ error: "Internal Server error" });
    if(customers.length ==0) return res.status(404).send('No customers found.');
    res.send(customers);
}
module.exports.getCustomers= async (req, res, next) => {
    let customers=await Customer.find().select('-password -__v');
    res.send(customers);
}

module.exports.deleteCustomer= async (req, res, next) => {
    try{
        const customer = await Customer.findOneAndDelete({_id:req.params.id});
        if(!customer) return res.status(404).send({ error: "customer not found" })
        return res.status(201).send('customer successfully deleted');
    }catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server error" });
    }
}

module.exports.getReservations= async (req, res, next) => {
    const events=await Event.find({'reservedSeats.customerId':req.customer._id}).populate('movieId').select('-reservedSeats -__v -movieId.__v -movieId.events -seatsAmount');
    return res.status(201).send(events);
}

module.exports.cancelReservations=async (req, res, next) => {

    const event= await Event.updateOne({_id:req.params.eventId},{"$pull":{"reservedSeats":{_id:req.params.reservationId}}});
    return res.status(201).send(event);
}