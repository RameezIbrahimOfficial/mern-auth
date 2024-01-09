const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const Admin = require('../model/adminModel')

// @desc Authenticate An Admin
// @route POST /api/admin/login
// @access Public
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for User email
    const admin = await Admin.findOne({ email })

    if( Admin && password === admin.password ) {
        res.json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    loginAdmin
}