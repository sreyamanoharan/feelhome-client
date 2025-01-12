import { createSlice } from '@reduxjs/toolkit'


export const user = createSlice({
    name:'userAuth',
    initialState:{
        name:null,
        role:null,
        token: null,
        userId: null,
        isBlocked: false,
    },
    reducers:{
        userLogin:(state,action)=>{
            state.name = action.payload.name
            state.role = action.payload.role
            state.token = action.payload.token
            state.userId = action.payload.userId
        },
        userBlock:(state,action)=>{
            state.isBlocked = action.payload.isblocked
        },
        userLogout:(state,action)=>{
              
             state.name = null
             state.role = null
             state.token = null
             state.userId = null
        }
    }
})

export const {userLogin,userLogout,userBlock} = user.actions
export default user.reducer