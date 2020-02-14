import axios from 'axios';


const initInterceptors = (store) => {

	axios.interceptors.request.use(request => {
		request.url=process.env.REACT_APP_API_URL+request.url	
		document.getElementById('loader_div').style.display = "block"
		let user = JSON.parse(localStorage.getItem('user'));
		if (user && user.jwtToken) {
			request.headers.Authorization = 'Bearer ' + user.jwtToken
		}
		// const authConfig = await getAuthConfig();
		// if (authConfig != null && authConfig.authConfigs != null) {
		// 	config.headers.Authorization = !isRefreshing
		// 		? authConfig.authConfigs.accessToken : jwtToken;
		// }
		return request;
	},
		(error) => {
			setTimeout(function () { document.getElementById('loader_div').style.display = "none" }, 250);
			return error;
		},
	);

	axios.interceptors.response.use(response => {
		setTimeout(function () { document.getElementById('loader_div').style.display = "none" }, 250);
		return response;
	},
		(error) => {
			setTimeout(function () { document.getElementById('loader_div').style.display = "none" }, 250);
			const { config } = error;
			const originalRequest = config;
			if (error.response && error.response.status === 401) {

				// if (!isRefreshing) {

				// 	isRefreshing = true;  
				// 	const currentUser = getCognitoUser({
				// 		bypassCache: true,
				// 	});
				// 	if (currentUser) {
				// 		setAuthConfig(currentUser);
				// 		const retryOrigReq = new Promise((resolve) => {
				// 			jwtToken = currentUser.signInUserSession.accessToken.jwtToken;
				// 			resolve(axios(originalRequest));
				// 		});
				// 		return retryOrigReq;
				// 	}
				// }
				//store.dispatch({ type: SIGN_IN_USER_FAIL });
				localStorage.removeItem('user');
				window.location.href = "/login";
			}
			return error;
		},
	);
};

export default initInterceptors;
