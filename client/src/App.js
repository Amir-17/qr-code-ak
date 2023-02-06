import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Generate from "./components/Generate";
import Show from "./components/Show";
import React from "react";
import { QrProvider } from "./context/qr-context";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<QrProvider>
				<BrowserRouter>
					<Header />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/show" element={<Show />} />
					</Routes>
					<Generate />
					<Footer />
				</BrowserRouter>
			</QrProvider>
		</div>
	);
}

export default App;
