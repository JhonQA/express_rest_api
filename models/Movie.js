const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const actorSchema = new Schema({
    Name : {
        type: String,
        required: true,
        minlength: 2
    },
    age: {
        type: Number,
        min: 1,
        max:120
    }
});

const reviewSchema = new Schema({
    rating : {
        type: Number,
        required:true,
        min: 1,
        max:10
    },
    reviewer: {
        type: String,
        required: true,
        minlength: 2
    } 
})

const movieSchema = new Schema({
    Title : String,
    dateReleased: {
        type: Number,
        min: 1900,
        max:2021
    },
    Description: {
        type: String,
        required: true,
        minlength: 2
    },
    actors:[actorSchema],
    reviews: [reviewSchema]
});

module.exports = mongoose.model("movies", movieSchema);