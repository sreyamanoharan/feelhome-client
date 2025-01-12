import { createSlice } from "@reduxjs/toolkit";

export const Admin = createSlice({
    name:'adminAuth',
    initialState:{
        email : null,
        token: null,
        role : null,
    },
    reducers :{
        adminLogin:(state,action)=>{
            state.email = action.payload.email,
            state.role = action.payload.role,
            state.token = action.payload.token
        },

        adminLogout:(state,action)=>{
            state.email = null,
            state.role = null,
            state.token = null

        }
    }
})

export const {adminLogin,adminLogout} = Admin.actions;
export default Admin.reducer