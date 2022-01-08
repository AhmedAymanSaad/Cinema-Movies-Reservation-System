const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');
const admin=require('../middleware/admin');
const manager=require('../middleware/manager');

const customerController=require('../controller/customers')

router.post('/', customerController.register)

router.post('/login', customerController.logIn )

router.get('/me', auth,customerController.getCustomer)

router.put('/authorize', [auth,admin],customerController.authorize)
router.get('/authorize', [auth,admin],customerController.getRequestingUsers)
router.delete('/:id', [auth,admin],customerController.deleteCustomer)
router.get('/', [auth,admin],customerController.getCustomers)
router.post('/events/:eventId',auth,customerController.reserveSeat)
router.get('/reservation',auth,customerController.getReservations)
router.delete('/reservation/:eventId/:seatNumber',auth,customerController.cancelReservations)
module.exports= router;