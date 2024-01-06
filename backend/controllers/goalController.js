const asyncHandler = require('express-async-handler')

// @desc   Get Goals
// @route  GET /api/goals
// @access Private 
const getGoals = asyncHandler (async (req, res) => {
    res.status(200).json({ message: "Get Goals" })
})

// @desc   Set Goals
// @route  POST /api/goals
// @access Private 
const setGoals = asyncHandler (async (req, res) => {
    if(!req.body.goals){
        res.status(400)
        throw new Error('Please add a text field')
    }

    res.status(201).json({ message: "Set Goals" })
})

// @desc   Update Goals
// @route  PUT /api/goals/:id
// @access Private 
const updateGoals = asyncHandler (async (req, res) => {
    res.status(200).json({ message: `Update Goal ${req.params.id}` })
})

// @desc   Delete Goals
// @route  DELETE /api/goals/:id
// @access Private 
const deleteGoals = asyncHandler (async (req, res) => {
    res.status(200).json({ message: `Delete Goal ${req.params.id}` })
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}