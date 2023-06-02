import { configureStore } from '@reduxjs/toolkit';

import homeSlice from './homeSlice';
import auth from './auth-reducer';

export const store = configureStore({
	reducer: {
		home: homeSlice,
		authTable: auth,
	},
});
