const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    desc : {
        type : String,
        require : true
    },
    price : {
        type : String,
        require :true
    },
    image : {
        type : String,
        require : true
    }
})

const movieTbl = mongoose.model('movieCrud',movieSchema);
module.exports = movieTbl;