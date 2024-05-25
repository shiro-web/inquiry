import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        login:(state,action) => {
            state.isAuthenticated = true;
            state.user = action.payload
        },
        logout:(state) => {
            state.isAuthenticated = true;
            state.user = null
        },
    }
})
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;