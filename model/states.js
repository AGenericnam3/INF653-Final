const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    stateCode: {
        required: true,
        unique: true,
        type: String
    },
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    admission: {
        type: Date,
        required: true,
        index: true,
        unique: false
    },
    capital: {
        type: String,
        required: true,
        unique: true
    },
    population: {
        type: Number,
        required: true,
        index: true,
        unique: false
    },
    funfact:{
        type: [String]
    }
});


module.exports = mongoose.model('States', stateSchema);