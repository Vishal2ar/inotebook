const express =require('express');
const router = express.Router();
const fetchUser = require("../middleWare/fetch")
const { body, validationResult } = require('express-validator');
const Note = require("../models/Notes")

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

module.exports = router