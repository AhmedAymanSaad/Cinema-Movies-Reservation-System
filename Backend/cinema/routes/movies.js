const express=require('express');
const router=express.Router();


router.get('/',(req,res)=>{
    res.send("hello world!!")
});
router.get('/api/courses/:id',(req,res)=>{
    res.send(req.params.id);
});

//router.get('/:title',authentication, peopleController.GetPeopleByUserName_ID_Email);
module.exports= router;