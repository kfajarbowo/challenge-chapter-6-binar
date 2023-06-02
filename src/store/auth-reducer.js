import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	token: localStorage.getItem('token') || null,
	isLoggedIn: !!localStorage.getItem('token'), // undefined/null => false
	// isLoggedIn : false,
	user: null,
};
const authSlicer = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setToken: (state, action) => {
			if (action.payload) {
				localStorage.setItem('token', action.payload);
			} else {
				localStorage.removeItem('token');
			}
			state.token = action.payload;
		},
		setIsLoggedIn: (state, action) => {
			state.isLoggedIn = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { setIsLoggedIn, setToken, setUser } = authSlicer.actions;

export default authSlicer.reducer;
