const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connectDatabase = () => {
    const url = "mongodb+srv://Mohan:Mohan@cluster0.qyzy0fp.mongodb.net/?retryWrites=true&w=majority";
    mongoose.connect(url).then(()=>{
        console.log("Connected to Database");
    }).catch((err)=>{
        console.log("There is an Issue in Connecting to the database ):");
    })
}


module.exports = connectDatabase