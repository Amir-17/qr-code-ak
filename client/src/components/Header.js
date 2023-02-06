import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { useQrContext } from "../context/qr-context";
import { Form, Button, Navbar, Container, ButtonGroup } from "react-bootstrap";

function Header() {
	const { state, setSearchQuery, setGenerateModal } = useQrContext();

	const handleChange = (e) => {
		e.preventDefault();

		setSearchQuery(e.target.value);
	};

	return (
		<Navbar bg="light" fixed="top" className="header">
			<Container>
				<Link to="/">
					<Navbar.Brand>
						<img
							alt="logo"
							src={logo}
							width="40"
							height="40"
							className="d-inline-block align top"
						/>{" "}
					</Navbar.Brand>
				</Link>
				<Form className="d-flex">
					<Form.Control
						type="search"
						placeholder="Search"
						className="me-2"
						aria-label="Search"
						value={state.searchQuery}
						onChange={(e) => handleChange(e)}
					/>
				</Form>
				<ButtonGroup>
					<Button onClick={() => setGenerateModal(true)} variant="success">
						Generate
					</Button>
					<Link to="/show">
						<Button variant="info">Show</Button>
					</Link>
				</ButtonGroup>
			</Container>
		</Navbar>
	);
}

export default Header;
