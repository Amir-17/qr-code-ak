import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Generate from "./components/Generate";
import React from "react";
import { useState, useEffect } from "react";
import { getAllQRCodes, searchQRCodes, removeQRCode } from "./api/qrcode";
import Show from "./components/Show";

function App() {
	const [qRCodes, setQRCodes] = useState([]);
	const [showGenerateModal, setShowGenerateModal] = useState(false);
	const [showQRCodes, setShowQRCodes] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	const generateModalShow = () => {
		setShowGenerateModal(true);
	};
	const generateModalClose = () => {
		setShowGenerateModal(false);
	};

	const getQRCodes = async () => {
		getAllQRCodes()
			.then((response) => setQRCodes(response.data))
			.catch((error) => console.log(error));
	};

	const getSearchQueryQRCodes = () => {
		searchQRCodes(searchQuery)
			.then((response) => {
				setQRCodes(response.data);
			})
			.catch((error) => console.log(error.message));
	};

	useEffect(() => {
		getSearchQueryQRCodes(searchQuery);
	}, [searchQuery]);

	const handleRemoveTask = async (id) => {
		removeQRCode(id)
			.then(() => {
				getQRCodes();
				console.log("Successfully deleted!");
			})
			.catch((error) => console.log(error.message));
	};

	return (
		<div className="App">
			<Header
				allqRCodes={qRCodes}
				showModalG={generateModalShow}
				showQRCodes={showQRCodes}
				setShowQRCodes={setShowQRCodes}
				searchQuery={searchQuery}
				handleSearchQueryChange={setSearchQuery}
			/>

			{showQRCodes ? (
				<Show qRCodes={qRCodes} RemoveTask={handleRemoveTask} />
			) : (
				<Home />
			)}

			<Generate
				getQRCodes={getQRCodes}
				handleRemoveTask={handleRemoveTask}
				idQRCode={qRCodes}
				showGenerateModal={showGenerateModal}
				closeModalG={generateModalClose}
			/>

			<Footer />
		</div>
	);
}

export default App;
