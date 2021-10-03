const mongoose = require('mongoose');
const dbURI ="mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongo = () => {
    mongoose.connect(dbURI,()=> {
        console.log("connect Moongoose");
    })
}
module.exports = connectToMongo;