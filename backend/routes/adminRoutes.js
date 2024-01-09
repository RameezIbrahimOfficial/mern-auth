const express = require('express')
const { loginAdmin, getUsers, userBlock, userUnBlock, editUser, searchUser } = require('../controllers/adminController')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

router.post('/login', loginAdmin)
router.get('/', protect, getUsers)
router.post('/block', protect,  userBlock)
router.post('/unblock', protect, userUnBlock)
router.put('/:userId', protect, editUser)
router.get('/search', protect, searchUser)

module.exports = router