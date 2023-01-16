const express = require("express");
const router = express.Router();

const{
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile
} = require('../controllers/user')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/profile').get(getUserProfile)
router.route('/profile/update').put(updateUserProfile)

module.exports = router;