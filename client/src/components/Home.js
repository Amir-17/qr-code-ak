import { Container, Image } from "react-bootstrap";
import image from "../assets/images/home-page-image.png";
const Home = () => {
	return (
		<Container
			className="d-flex justify-content-center align-items-center"
			fluid>
			<Image
				className="d-flex justify-content-center align-items-center"
				src={image}
				fluid></Image>
		</Container>
	);
};

export default Home;
