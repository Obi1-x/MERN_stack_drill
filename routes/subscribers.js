//const { application } = require('express');
const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

// RESTfull endpoints.

// Getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ message: error.message }); //Error from server side.
    }
});

// Getting one
router.get('/:id', getSubscriber, (req, res) => {
    res.json(Subscriber);
});

// Creating one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    });
    console.log(subscriber);

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber); //Successfully created an object. more specific than 200.
    } catch (error) {
        res.status(400).json({ message: error.message }) ;// Error due to bad data passed by the user.
    }
});

// Updating one
router.patch('/:id', getSubscriber, async (req, res) => { //Updates based on the infor passed in by the user, instead of updating all info.
    if(req.body.name){
        res.subscriber.name = req.body.name;
    }
    if(req.body.subscribedToChannel){
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }
    try {
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    } catch (error) {
        res.status(400).json({ message: error.message }); // Data not found.
    }
});

// Deleting one
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove();
        res.json({ message: 'Deleted subscriber' });
    } catch (error) {
        res.status(500).json({ message: error.message}); // Error from server.
    }
});


//Middleware
async function getSubscriber(req, res, next){ //next is used to move onto the next section of our code (the call back in this case);
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id); //Returns a subscriber.
        if (!subscriber) return res.status(404).json({ message: 'Cannot find subscriber' }); // Cannot find sunbscriber.
    } catch (error) {
        return res.status(500).json({ message: error.message }); //Error from server side.
    }
    res.subscriber = subscriber;
    next(); // Moves to the next peice of code. Still dont understand it though.
}

module.exports = router;