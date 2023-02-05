const router = require('express').Router();

const {
    allThoughts,
    oneSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thoughtController');

// route for all the thoughts at once
router.route('/').get(allThoughts).post(createThought);

// route to get single thought referencing id
router.route('/:thoughtId').get(oneSingleThought).put(updateThought).delete(deleteThought);



// route to create a thought
router.route('/:thoughtId/reactions').post(addReaction);

// route to delete reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;