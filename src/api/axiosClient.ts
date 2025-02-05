import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const axiosClient = axios.create({
	baseURL: 'https://webapi.northed.us/v1/',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

axiosClient.interceptors.response.use((response) => (response), (error) => {
	// const statusCode = Errors.response ? Errors.response.status : null;
	// if (statusCode === 500) ToastError('Unexpected Errors occurred!');
	// else if (statusCode === 429) ToastError('You are being rate limited.');
	if (error.response) {
		if (error.response.data.response === 'InvalidToken') {
			Cookies.remove('access_token');
			window.location.reload();
		} else toast.error(error.response.data.response);
	}
	return Promise.reject(error);
});

export default axiosClient;
