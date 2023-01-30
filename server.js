const mongoose = require('mongoose');

// define the schema, name it and create the model

const user = new mongoose.Schema({
    username: {type: String, unique: true, required: true, trimmed: true},
    email: {type: String, unique: true, required: true, trimmed: true},
    thoughts: [
        _id: thougth.id,
        
    ],
    friends: [
        _id: friend.id
    ]
});

