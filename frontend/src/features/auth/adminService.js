import axios from 'axios'

const API_URL = '/api/admin/'


// Login Admin
const Adminlogin = async(adminData) => {
    const response = await axios.post(API_URL + 'login', adminData)

    if(response.data) {
        localStorage.setItem('admin', JSON.stringify(response.data))
    }

    return response.data
}

// Get All Users
const getAllUsers = async (token) => {
    const config = {
        headers : {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

// Block User
const userBlock = async (token, userId) => {
    const config = {
        headers : {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + 'block', {
        userId
    }, config)

    return response.data
}

// UnBlock User
const userUnBlock = async (token, userId) => {
    const config = {
        headers : {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + 'unblock', {
        userId
    }, config)

    return response.data
}

// User Search
const searchUser = async (query, token) => {
    const config = {
        headers : {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + 'search', {
        query
    }, config)

    return response.data
}

// Edit User Details
const editUserDetails = async (token, userId, name, email) => {
    const config = {
        headers : {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + userId , {userId,
        name, email
    }, config)
    return response.data
}


// Logout Admin
const Adminlogout = () => {
    localStorage.removeItem('admin')
}

const adminAuthService = {
    Adminlogout,
    Adminlogin,
    userBlock,
    userUnBlock,
    searchUser,
    getAllUsers,
    editUserDetails
}

export default adminAuthService