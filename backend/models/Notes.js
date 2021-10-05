const mongoose = require(mongoose);
const { Schema } = mongoose;

const noteSchema = new Schema({
  topic:{
      type: String,
      required : true
  },
  discription :{
    type: String,
    required : true
},
tag :{
    type: String,
    default :"Genral"
    
},
date:{
    type: date,
    default : date.now
}
});

module.exports=mongoose.model("user",userSchema)