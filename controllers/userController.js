const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;

const userController = {
    //this code retrieves all users
    getAllUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((error) => res.status(500).json(error))
    },
    //this code retrieves one user
    getOneUser(req, res){
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'The info provided is invalid, please check your records and try again.'})
                    : res.json(user)
            )
            .catch((error) => res.status(500).json(error))
    },
    //this code adds a new user
    createUser(req, res){
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((error) => {
            console.log('there was an error, here are the details: ' + error);
            return res.status(500).json(error);
        });
    },
    //this code updates an existing user
    updateUser(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'The info provided is invalid, please check your records and try again.' })
                : res.json(user)
        )
        .catch((error) => res.status(500).json(error))
    },

    //this code removes the use an his/her thoughts
    deleteUser(req, res){
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => 
                !user
                    ? req.status(404).json({ message: 'The info provided is invalid, please check your records and try again.' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User and thought added' }))
            .catch((error) => res.status(500).json(error));
    },

    //this code add user to friend's list
    addFriend(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},
            { new: true }
        )
        .then((user) => {
            !user
                ? res.status(404).json({ message: 'The info provided is invalid, please check your records and try again.' })
                : res.json('Friend added.')
        })
        .catch((error) => {
            console.log('there was an error, here are the details: ' + error);
            return res.status(500).json(error);
        });
    },

    //this code removes from friend's list
    deleteFriend(req, res){
        User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
        .then((user) => {
            !user
                ? res.status(404).json({ message: 'The info provided is invalid, please check your records and try again.' })
                : res.json("User removed from friend's list")
        })
        .catch((error) => {
            console.log('there was an error, here are the details: ' + error);
            return res.status(500).json(error);
        });
    },
}



module.exports = userController;