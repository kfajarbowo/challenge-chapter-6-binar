import React from 'react';
import { Button } from 'react-bootstrap';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { googleLogin } from '../../redux-action/auth';

function GoogleLogin({ buttonText }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const login = useGoogleLogin({
		onSuccess: tokenResponse => {
			const data = {
				access_token: tokenResponse.access_token,
			};

			dispatch(googleLogin(data, navigate));
			// console.log('token nya ini');
			// console.log(tokenResponse);
		},
	});
	return (
		<Button variant="primary" onClick={() => login()}>
			{buttonText}
		</Button>
	);
}

export default GoogleLogin;
