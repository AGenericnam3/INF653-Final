import mongoose from('mongoose')

const state = new mongoose.Schema({
    stateCode: {
        required: true,
        unique: true,
        type: String
    },
    funfact:{
        type: [String]
    }
});


module.exports = mongoose.model('States', state);