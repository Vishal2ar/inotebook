const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
   userid : {
       type : mongoose.Schema.Types.ObjectId,
    ref:"user"},

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
    type: Date,
    default : Date.now
}
});

module.exports=mongoose.model("note",noteSchema)