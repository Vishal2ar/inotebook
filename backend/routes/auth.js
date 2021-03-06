const express =require('express');
const User = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { findOne } = require('../models/Users');
const fetchUser = require("../middleWare/fetch")

const  JWT_S =  "Apple@12isThepassCode";

//Route 1 : Create a new User Post User no Authentication needed
router.post("/createUser",
// validation occurs here 
[ body('email',"The email is ot valid").isEmail(),
body('password').isLength({ min: 5 }),
body('name').isLength({ min: 2 })]
//harry used array
,async (req,res)=> {
    let success= false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //https://express-validator.github.io/docs/
      return res.status(400).json({success, errors: errors.array() });
    }

  try{
   if (await User.findOne({email : req.body.email}))
      {
        return res.status(400).json({success,"message":"email already exist"})
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
  
     res.json({success:true,token});
      
    //   .then(User => res.json(User)).catch(err => {console.log(errors);
    // res.json(errors)})
 
 
    } 
    catch(error)
      {
        // status 500 some error occurred 
        res.status(500).send(success,"error occured");
        console.error(error.message)
      }
})



//Route 2 : Login route Post req Authentication not needed 
router.post("/login",
  [body('email',"Enter Valid Credentials").isEmail(),
  body('password',"Password cannot be empty").exists()],
  async (req,res)=>{
  const errors = validationResult(req);
  let success = false;
  if(!errors.isEmpty()){
    res.status(400).json({success,errors: errors.array()})
  }
  const {email,password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user)
    {
      res.status(400).json({success,error :"Incorrect Credentials"})
    }
  if(! await bcrypt.compare(password,user.password))
    {
      res.status(400).json({success,error :"Incorrect Credentials"})
    }
    data = {
      "id" : user.id
    } 
    const token = jwt.sign(data,JWT_S);
    res.json({success:true,token});
  
  } catch (error) {
    res.status(500).send("error occured");
    console.error(error.message)
  }

})

//Route 3 :get User Info 
router.post("/getUser",fetchUser,async (req,res)=>{
  // console.log(req.user+"Hello");
try {
  let userid = req.user;
  const u = await User.findById(userid).select("-password")
  res.send({u})
} catch (error) {
  res.status(500).send("error occured 1");
    console.error(error.message)
}
})

module.exports = router