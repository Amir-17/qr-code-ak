import {
	insertQRCode,
	removeQRCode,
	searchQRCode,
	getAllQRCodes,
	searchQRCodes,
} from "../api/qrcode";
import React, { createContext, useContext, useState } from "react";

const QrContext = createContext();

const QrProvider = ({ children }) => {
	const [state, setState] = useState({
		allQrCodes: [],
		selectedQr: {},
		newQr: { title: "", url: "" },
		generatedQr: {},
		searchQuery: "",
		errorMessage: "",
		showInfoModal: false,
		showGenerateModal: false,
		showQrModal: false,
		showDeleteModal: false,
		showDeleteSuccessModal: false,
	});

	const closeInfoModal = () => {
		setState({ ...state, showInfoModal: false });
	};

	const setQrModal = (value) => {
		setState({ ...state, showQrModal: value });
	};

	const closeQrModal = () => {
		setState({ ...state, showQrModal: false, generatedQr: {} });
	};

	const setSelectedQr = (qr) => {
		setState({ ...state, selectedQr: qr });
	};

	const setGenerateModal = (value) => {
		setState({ ...state, showGenerateModal: value });
	};

	const setSearchQuery = (value) => {
		setState({ ...state, searchQuery: value });
	};

	const handleNewQrUpdate = (name, value) => {
		setState({ ...state, newQr: { ...state.newQr, [name]: value } });
	};

	const handleDeleteModalOpen = () => {
		setState({ ...state, showQrModal: false, showDeleteModal: true });
	};

	const setDeleteModal = (value) => {
		setState({ ...state, showDeleteModal: value });
	};

	const setDeleteSuccessModal = (value) => {
		setState({ ...state, showDeleteSuccessModal: value });
	};

	const addQrCode = () => {
		insertQRCode(state.newQr.title, state.newQr.url)
			.then((response) => {
				setState({
					...state,
					newQr: { title: "", url: "" },
					generatedQr: response.data,
					showGenerateModal: false,
					showQrModal: true,
					errorMessage: "",
				});
				console.log("New QR Code added successfuly!");
			})
			.then(() => {})
			.catch((error) => {
				console.log(error.message);
				setState({
					...state,
					generatedQr: {},
					newQr: { title: "", url: "" },
					errorMessage:
						"Title and/or URL already exist in database. Try again!",
				});
			});
	};

	const getQrCodes = () => {
		if (state.searchQuery === "" || state.searchQuery === undefined) {
			getAllQRCodes()
				.then((response) => {
					if (response.data.length === 0) {
						setState({ ...state, showInfoModal: true });
					} else {
						setState({
							...state,
							allQrCodes: response.data,
							showInfoModal: false,
						});
					}
				})
				.catch((error) => {
					console.log(error.message);
				});
		} else {
			searchQRCodes(state.searchQuery)
				.then((response) => {
					setState({ ...state, allQrCodes: response.data });
				})
				.catch((error) => console.log(error.message));
		}
	};

	const searchQrCodes = () => {
		searchQRCodes(state.searchQuery)
			.then((response) => {
				setState({ ...state, allQrCodes: response.data });
			})
			.catch((error) => console.log(error.message));
	};

	const removeQr = (id) => {
		removeQRCode(
			JSON.stringify(state.generatedQr) != "{}"
				? state.generatedQr._id
				: JSON.stringify(state.selectedQr) != "{}"
				? state.selectedQr._id
				: id
		)
			.then(() => {
				setState({
					...state,
					showDeleteModal: false,
					showDeleteSuccessModal: true,
					showQrModal: false,
					generatedQr: {},
				});
				console.log(
					`QR Code with id ${
						JSON.stringify(state.generatedQr) != "{}"
							? state.generatedQr._id
							: id
					} successfuly deleted!`
				);
			})
			.catch((error) => {
				console.log(
					`Could not delete code with id ${
						JSON.stringify(state.generatedQr) != "{}"
							? state.generatedQr._id
							: id
					}. Error ${error.message}`
				);
			});
	};

	const value = {
		state,
		removeQr,
		addQrCode,
		setQrModal,
		getQrCodes,
		closeQrModal,
		searchQrCodes,
		setSelectedQr,
		setSearchQuery,
		setDeleteModal,
		closeInfoModal,
		setGenerateModal,
		handleDeleteModalOpen,
		handleNewQrUpdate,
		setDeleteSuccessModal,
	};
	return <QrContext.Provider value={value}> {children}</QrContext.Provider>;
};

const useQrContext = () => {
	const context = useContext(QrContext);
	if (context == undefined) {
		throw new Error("useQrContext must be used within a QrProvider");
	}
	return context;
};

export { QrProvider, useQrContext };
