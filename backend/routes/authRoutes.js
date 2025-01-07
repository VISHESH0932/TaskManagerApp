const express = require('express');
const router = express.Router();
const { registerUser, authUser, getProfile ,logoutUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getProfile);
router.post('/logout', protect, logoutUser);

module.exports = router;