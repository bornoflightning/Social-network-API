const router = require('express').Router();
const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// this route gets all users
router.route('/').get(getAllUsers).post(createUser);

// this route handles users
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

// this route handles friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;