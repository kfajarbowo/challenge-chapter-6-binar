import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchDataFromApi } from './utils/api';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';
import Login from './pages/Login';
import Register from './pages/Register';

import { GoogleOAuthProvider } from '@react-oauth/google';
import RedirectIfProtected from './components/redirectIfProtected/RedirectIfProtected';
import Protected from './components/protected/Protected';

function App() {
	const dispatch = useDispatch();
	const { url } = useSelector(state => state.home);
	console.log(url);

	useEffect(() => {
		fetchApiConfig();
		genresCall();
	}, []);

	const fetchApiConfig = () => {
		fetchDataFromApi('/configuration').then(res => {
			console.log(res);

			const url = {
				backdrop: res.images.secure_base_url + 'original',
				poster: res.images.secure_base_url + 'original',
				profile: res.images.secure_base_url + 'original',
			};

			dispatch(getApiConfiguration(url));
		});
	};

	const genresCall = async () => {
		let promises = [];
		let endPoints = ['tv', 'movie'];
		let allGenres = {};

		endPoints.forEach(url => {
			promises.push(fetchDataFromApi(`/genre/${url}/list`));
		});

		const data = await Promise.all(promises);
		console.log(data);
		data.map(({ genres }) => {
			return genres.map(item => (allGenres[item.id] = item));
		});

		dispatch(getGenres(allGenres));
	};

	return (
		<GoogleOAuthProvider clientId='638538265910-hrr5vq8cugv9ku1l9kqprokgplod6oh0.apps.googleusercontent.com'>
		{/* <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}> */}
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/login"
						element={
							<RedirectIfProtected>
								<Login />
							</RedirectIfProtected>
						}
					/>
					<Route
						path="/register"
						element={
							<RedirectIfProtected>
								<Register />
							</RedirectIfProtected>
						}
					/>
					<Route
						path="/:mediaType/:id"
						element={
							<Protected>
								<Details />
							</Protected>
						}
					/>
					<Route path="/search/:query" element={<SearchResult />} />
					<Route path="/explore/:mediaType" element={<Explore />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
				<Footer />
				<ToastContainer theme="colored" />
			</BrowserRouter>
		</GoogleOAuthProvider>
	);
}

export default App;
