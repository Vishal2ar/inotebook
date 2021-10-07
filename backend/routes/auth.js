const express =require('express');
const User = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const  JWT_S =  "Apple@12isThepassCode";


router.post("/createUser",
// validation occurs here 
[ body('email',"The email is ot valid").isEmail(),
body('password').isLength({ min: 5 }),
body('name').isLength({ min: 5 })]
//harry used array
,async (req,res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //https://express-validator.github.io/docs/
      return res.status(400).json({ errors: errors.array() });
    }

  try{
   if (await User.findOne({email : req.body.email}))
      {
        return res.status(400).json({"message":"email already exist"})
      }
      // using BCRYPTJS for Hashing password genrating Salt
    const salt =  await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password,salt);
  user = await  User.create({
        email: req.body.email,
        password: secPassword,
        name: req.body.name,
      });
     data = {
       "id" : user.id
     } 
     const token = jwt.sign(data,JWT_S);
      
    //   .then(User => res.json(User)).catch(err => {console.log(errors);
    // res.json(errors)})
  res.json(user);
  res.json({token});
    } 
    catch(error)
      {
        // status 500 some error occurred 
        res.status(500).send("error occured" + error);
      }
})

module.exports = router