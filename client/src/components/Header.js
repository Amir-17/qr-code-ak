import logo from "../assets/images/logo.svg";
import { useState } from "react";
import {
	Form,
	Button,
	Navbar,
	Container,
	ButtonGroup,
	Modal,
} from "react-bootstrap";

function Header({
	showModalG,
	showQRCodes,
	setShowQRCodes,
	allqRCodes,
	searchQuery,
	handleSearchQueryChange,
}) {
	const [showInfoModal, setShowInfoModal] = useState(false);

	const showingAllQRCodes = () => {
		if (allqRCodes && allqRCodes.length === 0) {
			setShowInfoModal(true);
		} else {
			setShowQRCodes(!showQRCodes);
		}
	};

	const handleChange = (e) => {
		e.preventDefault();

		handleSearchQueryChange(e.target.value);
	};

	return (
		<>
			<Navbar bg="light" fixed="top" className="header">
				<Container>
					<Navbar.Brand href="/">
						<img
							alt="logo"
							src={logo}
							width="40"
							height="40"
							className="d-inline-block align top"
						/>{" "}
					</Navbar.Brand>
					<Form className="d-flex">
						<Form.Control
							type="search"
							placeholder="Search"
							className="me-2"
							aria-label="Search"
							value={searchQuery}
							onChange={(e) => handleChange(e)}
						/>
					</Form>
					<ButtonGroup>
						<Button onClick={showModalG} variant="success">
							Generate
						</Button>
						<Button onClick={() => showingAllQRCodes()} variant="info">
							Show
						</Button>
					</ButtonGroup>
				</Container>
			</Navbar>
			<Modal
				show={showInfoModal}
				onHide={() => setShowInfoModal(false)}
				centered>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>
					We are sorry there is no QR Codes stored, please generate your first
					QR Code!
				</Modal.Body>
			</Modal>
		</>
	);
}

export default Header;
