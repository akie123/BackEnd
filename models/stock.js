const mongoose = require('mongoose');
const stockSchema = new mongoose.Schema({

    Date : {
        type: Date,
        required: [true, 'Invalid Date'],
    },
    Open : {
        type: Number,
        required: [true,'Open Value Required']
    },
    High: {
        type: Number,
        required: [true, "High Value Required"],
    },
    Low:{
        type: Number,
        required:[true,"Low Value Required"]
    },
    Close:{
        type: Number,
        required:[true,"Close Value Required"]
    },
    Adj_Close:{
        type: Number,
        required:[true,"Low Value Required"]
    },
    Volume:{
        type: Number,
        required:[true,"Low Value Required"]
    },
    Key:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Stock', stockSchema); 