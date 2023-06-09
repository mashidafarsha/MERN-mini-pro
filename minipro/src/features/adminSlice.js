import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   
    id:"",
    email:"",
   
   
  
}
const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminDetails: (state, action) => {
            state.email = action.payload.email;
            state.token = action.payload.token
        },
       
    }
})

export const { setAdminDetails } = adminSlice.actions;

export default adminSlice.reducer;