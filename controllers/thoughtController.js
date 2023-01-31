const { Thought, User } = require('../models')


const thoughtController = {
    //this is the code that requests all thoughts
    allThoughts(req, res) {

        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((error) => res.status(500).json(error));
    },

    //this is the code that requests one thought
    oneSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: "The thought you requested is invalid, please check your records and try again." })
                : res.json(thought)
        )
        .catch((error) => res.status(500).json(error));
    },

    //this is the code that creates a new thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
               { username: req.body.username },
               { $addToSet: { thoughts: thought._id }},
               { new: true } 
            );
        })
        .then((user) => {
            !user
                ? res.status(404).json({ message: 'The thought you requested is invalid, please check your records and try again.' })
                : res.json('You successfully created a thought, it was added to the list.')
        })
        .catch((error) => {
            console.log('there was an error, here are the details: ' + error);
            return res.status(500).json(error);
        });
    },

    //This is the code that updates existing thoughts
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought
                ?res.status(404).json({ message: 'The thought you requested is invalid, please check your records and try again.' })
                : res.json(thought)
        )
        .catch((error) => res.status(500).json(error));
    },
    //This is the code that deletes thoughts
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'The thought you requested is invalid, please check your records and try again.' })
                : User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                )
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: "That thought no longer exists, but the input provided for user was wrong." })
                : res.json({ message: 'Thought deleted.' })
        )
        .catch((error) => {
            console.log('there was an error, here are the details: ' + error);
            res.status(500).json(error);
        })
    },

    // this is the code that adds reactions
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) => {
            !thought
                ? res.status(404).json({ message: 'The reaction was created, but there is no existing thought with that id.' })
                : res.json('the reaction was successfully created')
            })
            .catch((error) => {
                console.log(error);
                return res.status(500).json(error);
            });
    },

    // This is the code that deletes reactions
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true } 
        )
        .then((thought) => {
            !thought
                ? res.status(404).json({ message: 'The reaction was removed, but that user id does not exist' })
                : res.json('Reaction deleted')
            })
            .catch((error) => {
                console.log('there was an error, here are the details: ' + error);
                return res.status(500).json(error);
            });
    }
}


module.exports = thoughtController;