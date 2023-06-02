import React, { useState } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import ContentWrapper from '../components/contentWrapper/ContentWrapper';
import GoogleLogin from '../components/googleLogin/GoogleLogin';
import { login } from '../redux-action/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
	const colorText = {
		color: 'white',
		paddingTop: '100px',
	};
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = e => {
		e.preventDefault();

		const data = { email, password };

		dispatch(login(data, navigate));
	};
	return (
		<Container style={colorText}>
			<Row>
				<Col>
					{' '}
					<Form onSubmit={onSubmit}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
							<Form.Text className="text-muted">
								Well never share your email with anyone else.
							</Form.Text>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicCheckbox">
							<Form.Check type="checkbox" label="Check me out" />
						</Form.Group>
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
			<Row>
				<Col>
					<h3 className="text-center">Or</h3>
					<div className="d-flex justify-content-center align-items-center">
						<GoogleLogin buttonText={'Login with Google'}></GoogleLogin>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default Login;
