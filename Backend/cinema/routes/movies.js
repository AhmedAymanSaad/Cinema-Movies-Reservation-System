const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const manager = require('../middleware/manager');
const movieController = require('../controller/movies');
const eventController = require('../controller/events');

const router = express.Router();

router.post('/', [auth, manager], movieController.addMovie);

router.get('/', movieController.getMovies);
router.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id);
});
router.post('/events', [auth,manager],eventController.createEvent);
router.put('/events/info/:id',[auth,manager],eventController.editEvent);
router.get('/:id',eventController.getEvent);
router.get('/events/:movieId',eventController.getEvents);
router.get('/events/seats/:eventId',eventController.getSeats);//////////
//router.get('/:title',authentication, peopleController.GetPeopleByUserName_ID_Email);
module.exports = router;