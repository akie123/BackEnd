const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({

    firstName : {
        type: String,
        required: [true, 'Invalid First Name'],
        maxLength: [50,'Name Cannot exceed more than 50 characters']
    },
    lastName : {
        type: String,
        required: [true,'Invalid Last Name'],
        maxLength: [50,'Name Cannot Exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, "Invalid Email"],
        unique: true,
        // Validate : [validator.isEmail, 'Invalid Email']
    },
    phone:{
        type: String,
        required:true
    },
    password : {
        type: String,
        required: [true, 'Invalid Password'],
        // minLength: [6, 'Password must be longer than 6 characters'],
        // select: false
    }
})

module.exports = mongoose.model('User', userSchema);