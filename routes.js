const express = require("express");
const router = express.Router();

const Movie = require("./models/Movie");

// Get all products
// curl localhost:5000/api/movies/getAll
router.get("/movies/getAll", async(req, res) => {
    const prod = await Movie.find();
    res.send(prod);
})

// Get one products
// curl localhost:5000/api/movies/getOne
router.get("/movies/getOne/:id", async(req, res) => {
    try {
        const prod = await Movie.findById(req.params.id);
        res.send(prod);
    } catch {
        res.status(500).send("Movie does not exist");
    }
})

// Create products
// curl -X POST -H"Content-Type:application/json" localhost:5000/api/movies/create
router.post("/movies/create", async(req, res) => {
    const prod = new Movie({
        title: req.body.title,
        dateReleased: req.body.dateReleased,
        Description: req.body.Description,
        actors:req.body.actors,
        reviews: req.body.reviews
    })
    await prod.save();
    res.send(prod);
})


// curl -X POST -H"Content-Type:application/json" localhost:5000/api/movies/update
router.post("/movies/update/:id", async(req, res) => {
    try {
        const FIND = { _id: req.params.id };
        const update = { title: req.body.title,
            dateReleased: req.body.dateReleased,
            Description: req.body.Description,
            actors:req.body.actors,
            reviews: req.body.reviews };
        const prod = await Product.findOneAndUpdate(FIND, update, {
            returnOriginal: false
        })
        await prod.save();

        res.send(`${req.params.id} has been updated with new price of £${update.price}`);
    } catch {
        res.status(500).send("Product does not exist");
    }
})

// Delete product
// curl localhost:5000/api/movies/delete
router.get("/movies/delete/:id", async(req, res) => {
    try {
        const prod = await Movie.findByIdAndDelete(req.params.id);
        res.send(prod);
    } catch {
        res.status(500).send("Movie does not exist");
    }
})

module.exports = router;