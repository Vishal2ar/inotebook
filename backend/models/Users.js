const mongoose = require(mongoose);

const userSchema = new Schema({
  name:{
      type: String,
      required : true
  },
  password:{
    type: String,
    required : true
},
date:{
    type: date,
    default : date.now
}
});

module.exports=mongoose.model("user",userSchema)