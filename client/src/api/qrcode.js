import axios from "axios";
import config from "../config/config";

const apiUrl = config.apiPath;

const headers = {
	"content-type": "application/json",
};

const homePage = async () => {
	return await axios.get(`${apiUrl}/`, headers);
};

const insertQRCode = (title, url) => {
	return axios.post(`${apiUrl}/qrcode`, { title: title, url: url }, headers);
};

const getAllQRCodes = async () => {
	return await axios.get(`${apiUrl}/qrcode`, headers);
};

const uniqueQRCode = (id) => {
	return axios.get(`${apiUrl}/qrcode/${id}`, headers);
};

const removeQRCode = (id) => {
	return axios.delete(`${apiUrl}/qrcode/${id}`, headers);
};

const searchQRCodes = async (query) => {
	return await axios.get(`${apiUrl}/search?q=${query}`, headers);
};

export {
	homePage,
	insertQRCode,
	getAllQRCodes,
	uniqueQRCode,
	removeQRCode,
	searchQRCodes,
};
