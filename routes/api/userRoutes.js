const router = require('express').Router();
const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userControllers');

// this route gets all users
router.route('/').get(getAllUsers).post(createUser);

// this route handles users
router.route('/:id').get(getOneUser).put(updateUser).delete(deleteUser);

// this route handles friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;