const express =require('express');
const router = express.Router();
const fetchUser = require("../middleWare/fetch")
const { body, validationResult } = require('express-validator');
const Note = require("../models/Notes");
const { findOne } = require('../models/Notes');

// get all notes for a user Route 1 
router.get("/getData",fetchUser,
async (req,res)=> {
    try {
        console.log(req.user);
        const note = await Note.findOne({userid : req.user})
        res.json(note);
    } catch (error) {
        res.status(500).send("error occured");
        console.error(error.message)
    }

})
// Route 2 : Upload user Notes in DB 
router.post("/postData",fetchUser,
[ body('topic').isLength({ min: 5 }),
body('discription').isLength({ min: 5 })]
,async (req,res) => {
    const {topic,discription,tag} = req.body;
    try {
      const note =   await Note.create({topic: topic,discription: discription,tag,userid :req.user });
        res.send(note);
    } catch (error) {
        res.status(500).send("error occured");
        console.error(error.message)
        
    }


})

// Route 3 : Update user Notes in DB 
router.put("/updateData/:id",fetchUser,async (req,res) => {
    const {topic,discription,tag} = req.body;
    try {
        let newNote  = {};
        if(topic){newNote.topic = topic}
        if(discription){newNote.discription = discription}
        if(tag){newNote.tag = tag}

        note  = await Note.findById(req.params.id);
        if(!note ){res.status(404).send("Note not found")}
        if(note.userid.toString() !== req.user)
            {res.status(401).send("Note not found")}
        note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new :true})
        res.send({note});
    
    }
    catch (error) {
        res.status(500).send("error occured");
        console.error(error.message)
    }
    
})

router.delete("/deleteNote/:id",fetchUser,async (req,res) => {
try {
    note = await Note.findById(req.params.id);
    // check if note exist 
    if(!note) {res.status("404").json({error :"Note not found"})}
    //confirm correct person is deleting 
    if(note.userid.toString() !== req.user)
        {res.status(401).send("Note not found")}
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({Message:"Successfully deteled ",Note:note})
} catch (error) {
    res.status(500).send("error occured");
    console.error(error.message) 
        }
})

module.exports = router