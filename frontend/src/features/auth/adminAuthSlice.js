import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminAuthService from "./adminService";

// Get Admin From LocalStorage
const admin = JSON.parse(localStorage.getItem('admin'))

const initialState = {
    admin: admin ? admin : null,
    users: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Login Admin
export const AdminLogin = createAsyncThunk('auth/AdminLogin', async (admin, thunkAPI) => {
    try {
        return await adminAuthService.Adminlogin(admin)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Admin Logout
export const AdminLogout = createAsyncThunk('auth/AdminLogout', async () => {
    await adminAuthService.Adminlogout()
})

// User Block
export const UserBlock = createAsyncThunk('admin/userBlock', async (userId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().adminAuth.admin.token
        return await adminAuthService.userBlock(token, userId)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// User UnBlock
export const UserUnBlock = createAsyncThunk('admin/userUnBlock', async (userId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().adminAuth.admin.token
        return await adminAuthService.userUnBlock(token, userId)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Search User
export const searchUser = createAsyncThunk('admin/searchUser', async (query, thunkAPI) => {
    try {
        const token = thunkAPI.getState().adminAuth.admin.token
        return await adminAuthService.searchUser(query, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get All Users
export const getAllUsers = createAsyncThunk('admin/getAllUsers', async (_,thunkAPI) => {
    try {
        const token = thunkAPI.getState().adminAuth.admin.token
        const response = await adminAuthService.getAllUsers(token)
        console.log(response.user);
        return response.users
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Edit User 
export const editUser = createAsyncThunk('admin/editUser', async ({userId, name, email}, thunkAPI) => {
    try {
        const token = thunkAPI.getState().adminAuth.admin.token
        return await adminAuthService.editUserDetails(token, userId, name, email)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder 
            .addCase(AdminLogin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(AdminLogin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.admin = action.payload
            })
            .addCase(AdminLogin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(AdminLogout.pending, (state) => {
                state.isLoading = true
            })
            .addCase(AdminLogout.fulfilled)
            .addCase(AdminLogout.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(UserBlock.pending, (state) => {
                state.isLoading = true
            })
            .addCase(UserBlock.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(UserBlock.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(UserUnBlock.pending, (state) => {
                state.isLoading = true
            })
            .addCase(UserUnBlock.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(UserUnBlock.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(searchUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(searchUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload
            })
            .addCase(searchUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(editUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload
            })
            .addCase(editUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
}) 


export const { reset }  = adminAuthSlice.actions
export default adminAuthSlice.reducer