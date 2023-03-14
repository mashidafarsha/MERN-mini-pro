import { configureStore } from '@reduxjs/toolkit';
import adminSlice from '../features/adminSlice';
import userSlice from '../features/userSlice'

export default configureStore({
    reducer: {
        user: userSlice,
        admin:adminSlice
       
    },
    
})