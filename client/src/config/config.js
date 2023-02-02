const getBaseUrl = () => {
	let url = window.location;

	if (url.host.includes("localhost")) {
		return "http://localhost:5000/api";
	} else {
		return url.protocol + "//" + url.host + "/api";
	}
};

const envBackendUrl = getBaseUrl();

const config = {
	apiPath: envBackendUrl,
};

export default config;
