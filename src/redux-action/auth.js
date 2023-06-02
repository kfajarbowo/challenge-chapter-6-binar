import axios from 'axios';
import { toast } from 'react-toastify';
import { setIsLoggedIn, setToken, setUser } from '../store/auth-reducer';

export const login = (data, navigate) => async dispatch => {
	try {
		const response = await axios.post(
			// `${import.meta.env.VITE_APP_AUTH_API}/api/v1/auth/login`,
			`https://km4-challenge-5-api.up.railway.app/api/v1/auth/login`,
			data,
			{
				'Content-Type': 'application/json',
			}
		);
		const { token } = response?.data?.data ?? response;

		dispatch(setToken(token));
		dispatch(setIsLoggedIn(true));

		// if (dispatch(setIsLoggedIn(true))) {
		// 	toast.success(true?.response?.data?.message);
		// }

		//redirect to home, dont forget to use navigate in component
		navigate('/');
	} catch (error) {
		if (axios.isAxiosError(error)) {
			toast.error(error?.response?.data?.message);
			return;
		}

		toast.error(error.message);
	}
};

export const register = (data, navigate) => async dispatch => {
	try {
		const response = await axios.post(
			`https://km4-challenge-5-api.up.railway.app/api/v1/auth/register`,
			data,
			{
				'Content-Type': 'application/json',
			}
		);
		const { token } = response?.data?.data ?? response;

		dispatch(setToken(token));
		dispatch(setIsLoggedIn(true));

		// if (dispatch(setIsLoggedIn(true))) {
		// 	toast.success(true?.response?.data?.message);
		// }

		//redirect to home, dont forget to use navigate in component
		navigate('/');
	} catch (error) {
		if (axios.isAxiosError(error)) {
			toast.error(error?.response?.data?.message);
			return;
		}

		toast.error(error.message);
	}
};

export const logout = navigate => async dispatch => {
	dispatch(setToken(null));
	dispatch(setIsLoggedIn(false));
	dispatch(setUser(null));

	if (navigate) navigate('/login');
};

export const getProfile = () => async (dispatch, getState) => {
	try {
		const { token } = getState().authTable;
		const response = await axios.get(
			`https://km4-challenge-5-api.up.railway.app/api/v1/auth/me`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const { data } = response?.data ?? response;
		dispatch(setUser(data));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			toast.error(error?.response?.data?.message);
			if (error.response.status === 401) {
				dispatch(logout());
			}
			return;
		}
		toast.error(error.message);
	}
};

export const googleLogin = (data, navigate) => async dispatch => {
	try {
		const response = await axios.post(
			`https://km4-challenge-5-api.up.railway.app/api/v1/auth/google`,
			data,
			{
				'Content-Type': 'application/json',
			}
		);

		const { token } = response?.data?.data ?? response;

		dispatch(setToken(token));
		dispatch(setIsLoggedIn(true));

		navigate('/');
	} catch (error) {
		if (axios.isAxiosError(error)) {
			toast.error(error?.response?.data?.message);
			if (error.response.status === 401) {
				dispatch(logout());
			}
			return;
		}
		toast.error(error.message);
	}
};
