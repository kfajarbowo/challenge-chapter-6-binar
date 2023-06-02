import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../redux-action/auth';
// import auth from '../redux/reducers/auth';

function Protected({ children }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isLoggedIn, token } = useSelector(state => state.authTable);
	useSelector(state => state.authTable);

	useEffect(() => {
		if (!token && !isLoggedIn) {
			navigate('/login');
			return;
		}
		dispatch(getProfile());
	}, [dispatch, isLoggedIn, navigate, token]);

	return children;
}

export default Protected;
