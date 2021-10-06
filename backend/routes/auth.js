const express =require('express');
const User = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require('express-validator');


router.post("/",
[ body('email',"The email is ot valid").isEmail(),
body('password').isLength({ min: 5 }),
body('name').isLength({ min: 5 })]
,(req,res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   
    User.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
      }).then(User => res.json(User)).catch(err => {console.log(errors);
    res.json(errors)})
  
})

module.exports = router