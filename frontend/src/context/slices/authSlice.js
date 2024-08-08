import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem("x-auth-token") || null,
  user: JSON.parse(localStorage.getItem("x-user")) || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("x-auth-token", action.payload)
    },
    setUser: (state, action) => {
      state.user = action.payload
      localStorage.setItem("x-user", JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("x-auth-token")
      localStorage.removeItem("x-user")
    },
  },
});

export const { logout, setToken, setUser } = authSlice.actions;
export default authSlice.reducer;