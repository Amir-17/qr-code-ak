import {
	insertQRCode,
	removeQRCode,
	searchQRCodes,
	getAllQRCodes,
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
		showGeneratedQrModal: false,
		showGeneratedDeleteModal: false,
		showGeneratedDeleteSuccessModal: false,
		showQrModal: false,
		showDeleteModal: false,
		showDeleteSuccessModal: false,
		showDeleteLocation: "",
		cardDeleteId: "",
	});

	// console.log(state);

	// methods for handling modals in the Show component
	const openQrModal = (qr) => {
		setState({ ...state, showQrModal: true, selectedQr: qr });
	};

	const closeQrModal = () => {
		setState({ ...state, showQrModal: false, selectedQr: {} });
	};

	const handleDeleteModalOpen = (location, deleteId) => {
		setState({
			...state,
			showQrModal: false,
			showDeleteModal: true,
			showDeleteLocation: location,
			cardDeleteId: deleteId,
			showInfoModal: false,
		});
	};

	const setDeleteModal = (value) => {
		setState({ ...state, showDeleteModal: value });
	};

	const setDeleteSuccessModal = (value) => {
		setState({ ...state, showDeleteSuccessModal: value });
	};

	// methods for handling modals in the Generate component
	const handleNewQrUpdate = (name, value) => {
		setState({ ...state, newQr: { ...state.newQr, [name]: value } });
	};

	const setGenerateModal = (value) => {
		setState({ ...state, showGenerateModal: value });
	};

	const closeGeneratedQrModal = () => {
		setState({ ...state, showGeneratedQrModal: false, generatedQr: {} });
	};

	const handleGeneratedDeleteModalOpen = () => {
		setState({
			...state,
			showGeneratedQrModal: false,
			showGeneratedDeleteModal: true,
		});
	};

	const setGeneratedDeleteModal = (value) => {
		setState({ ...state, showGeneratedDeleteModal: value });
	};

	const setGeneratedDeleteSuccessModal = (value) => {
		setState({ ...state, showGeneratedDeleteSuccessModal: value });
	};

	// other methods
	const closeInfoModal = () => {
		setState({ ...state, showInfoModal: false });
	};

	const setQrModal = (value) => {
		setState({ ...state, showGeneratedQrModal: value });
	};

	const setSelectedQr = (qr) => {
		setState({ ...state, selectedQr: qr });
	};

	const setSearchQuery = (value) => {
		setState({ ...state, searchQuery: value });
	};

	// api methods
	const addQrCode = () => {
		insertQRCode(state.newQr.title, state.newQr.url)
			.then((response) => {
				setState({
					...state,
					newQr: { title: "", url: "" },
					generatedQr: response.data,
					showGenerateModal: false,
					showGeneratedQrModal: true,
					errorMessage: "",
				});
				console.log("New QR Code added successfuly!");
			})
			.then(() => {})
			.catch((error) => {
				console.log(error);
				setState({
					...state,
					generatedQr: {},
					newQr: { title: "", url: "" },
					errorMessage:
						"Could not create new QR. Please check your title and url, and try again!",
				});
			});
	};

	// console.log(state.allQrCodes);

	const getQrCodes = () => {
		if (state.searchQuery === "" || state.searchQuery === undefined) {
			getAllQRCodes()
				.then((response) => {
					if (response.data.length === 0) {
						setState({
							...state,
							allQrCodes: response.data,
							showInfoModal: true,
						});
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

	const removeQr = () => {
		removeQRCode(
			JSON.stringify(state.generatedQr) !== "{}"
				? state.generatedQr._id
				: state.showDeleteLocation === "MODAL"
				? state.selectedQr._id
				: state.cardDeleteId
		)
			.then(() => {
				JSON.stringify(state.generatedQr) !== "{}"
					? setState({
							...state,
							showGeneratedDeleteModal: false,
							showGeneratedDeleteSuccessModal: true,
							showGeneratedQrModal: false,
							generatedQr: {},
					  })
					: setState({
							...state,
							selectedQr: {},
							showDeleteModal: false,
							showDeleteSuccessModal: true,
							showQrModal: false,
							cardDeleteId: "",
							showDeleteLocation: "",
					  });
				console.log(
					`QR Code with id ${
						JSON.stringify(state.generatedQr) !== "{}"
							? state.generatedQr._id
							: state.showDeleteLocation === "MODAL"
							? state.selectedQr._id
							: state.cardDeleteId
					} successfuly deleted!`
				);
			})
			.catch((error) => {
				console.log(error);
				console.log(
					`Could not delete code with id ${
						JSON.stringify(state.generatedQr) !== "{}"
							? state.generatedQr._id
							: state.showDeleteLocation === "MODAL"
							? state.selectedQr._id
							: state.cardDeleteId
					}. Error ${error.message}`
				);
			});
	};

	// export values for context provider
	const value = {
		state,
		removeQr,
		addQrCode,
		setQrModal,
		getQrCodes,
		closeGeneratedQrModal,
		searchQrCodes,
		setSelectedQr,
		setSearchQuery,
		closeInfoModal,
		setGenerateModal,
		handleNewQrUpdate,
		handleGeneratedDeleteModalOpen,
		setGeneratedDeleteModal,
		setGeneratedDeleteSuccessModal,
		openQrModal,
		closeQrModal,
		handleDeleteModalOpen,
		setDeleteModal,
		setDeleteSuccessModal,
	};

	return <QrContext.Provider value={value}>{children}</QrContext.Provider>;
};

const useQrContext = () => {
	const context = useContext(QrContext);
	if (context === undefined) {
		throw new Error("useQrContext must be used within a QrProvider");
	}
	return context;
};

export { QrProvider, useQrContext };
