import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import goalRedcer from '../features/goals/goalSlice'
import adminReducer from '../features/auth/adminAuthSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalRedcer,
    adminAuth: adminReducer
  }
});
