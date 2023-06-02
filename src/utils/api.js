import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN =
	'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2I0Zjk1OTI1MDU2MTE3ZmUwMjBhMzIzM2VhMjIyZSIsInN1YiI6IjVmOWFiOTMyZTk0MmVlMDAzN2FkMTIzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MvaHZj-ihOHQt1KBUlzIHkq_TT70WG-5lG6Uh3vEot0';

const headers = {
	// Authorization: 'bearer ' + TMDB_TOKEN,
	Authorization: `Bearer ${TMDB_TOKEN}`,
};

export const fetchDataFromApi = async (url, params) => {
	try {
		const { data } = await axios.get(BASE_URL + url, {
			headers,
			params,
		});
		return data;
	} catch (err) {
		console.log(err);
		return err;
	}
};
