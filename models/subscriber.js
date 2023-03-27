const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({ //Takes in a javascript object
    name: {
        type: String,
        required: true
    },
    subscribedToChannel:{
        type: String,
        required: true
    },
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model('Subscriber', subscriberSchema);