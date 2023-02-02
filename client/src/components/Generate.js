import QRCode from "qrcode.react";
import { useState } from "react";
import { Alert, Button, Container, Form, Modal } from "react-bootstrap";
import { insertQRCode } from "../api/qrcode";
import {
	ArrowLeftCircleFill,
	Download,
	Trash,
	Check,
} from "react-bootstrap-icons";

const Generate = ({
	showGenerateModal,
	closeModalG,
	getQRCodes,
	handleRemoveTask,
}) => {
	const [qrCodeModal, setQRCodeModal] = useState(false);
	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");

	const [deleteId, setDeleteId] = useState(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);

	const [generatedQr, setGeneratedQr] = useState({});
	const [errorMessage, setErrorMessage] = useState("");

	const handleDelete = (qRCodeId) => {
		setQRCodeModal(false);
		setShowDeleteModal(true);
		setDeleteId(qRCodeId);
	};

	const handleDeleteConfirm = () => {
		handleRemoveTask(deleteId);
		setShowDeleteModal(false);
		setShowDeleteSuccessModal(true);
		setQRCodeModal(false);
	};

	const downloadQRCode = () => {
		const qrCodeUrl = document
			.getElementById("qrcode_image")
			.toDataURL("image/png")
			.replace("image/png", "image/octet-stream");

		let downloadLink = document.createElement("a");
		downloadLink.href = qrCodeUrl;
		downloadLink.download = "paragon-qr-code.png";
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

	const QRCodeModal = () => {
		return (
			<Modal
				show={qrCodeModal}
				onHide={() => closeQRCModal()}
				aria-labelledby="contained-modal-title-vcenter"
				centered>
				<Modal.Header className="d-flex justify-content-center">
					<Modal.Title>Scan the QR Code to access our location!</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-center">
					<Modal.Title>
						{JSON.stringify(generatedQr) !== "{}" ? generatedQr.title : ""}
					</Modal.Title>
					<QRCode
						size={200}
						value={JSON.stringify(generatedQr) !== "{}" ? generatedQr.url : ""}
						id="qrcode_image"
					/>
				</Modal.Body>
				<Modal.Footer className="d-flex justify-content-center">
					<Button onClick={() => setQRCodeModal(false)}>
						<ArrowLeftCircleFill />
					</Button>
					<Button variant="success" onClick={() => downloadQRCode()}>
						<Download />
					</Button>
					<Button
						variant="danger"
						onClick={() =>
							handleDelete(
								JSON.stringify(generatedQr) !== "{}" ? generatedQr._id : ""
							)
						}>
						<Trash />
					</Button>
				</Modal.Footer>
			</Modal>
		);
	};

	const closeQRCModal = () => {
		setQRCodeModal(false);
		setGeneratedQr({});
	};

	const generateQRCode = () => {
		setErrorMessage("");

		insertQRCode(title, url)
			.then((response) => {
				setQRCodeModal(true);
				closeModalG();
				setGeneratedQr(response.data);
				setTitle("");
				setUrl("");
				getQRCodes();
			})
			.catch((error) => {
				setErrorMessage(
					"Title and/or URL already exist in database. Try again"
				);

				setGeneratedQr({});
				console.log(error);
				setTitle("");
				setUrl("");
			});
	};
	return (
		<Container>
			<Modal
				aria-labelledby="contained-modal-title-vcenter"
				centered
				show={showGenerateModal}
				onHide={closeModalG}>
				<Modal.Header>
					<Modal.Title>Generate my QR code</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3">
							<Form.Control
								type="text"
								placeholder="QR Code Title"
								autoFocus
								value={title}
								onChange={(e) => setTitle(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Control
								as="textarea"
								rows={3}
								placeholder="Enter URL for your QR Code"
								value={url}
								onChange={(e) => setUrl(e.target.value)}
							/>
						</Form.Group>
					</Form>
					{errorMessage.length > 0 ? (
						<Alert variant="danger">{errorMessage}</Alert>
					) : null}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closeModalG}>
						Close
					</Button>
					<Button variant="primary" onClick={() => generateQRCode()}>
						Generate
					</Button>
				</Modal.Footer>
			</Modal>
			<QRCodeModal />

			{/* Delete Confirmation Modal */}
			<Modal
				show={showDeleteModal}
				onHide={() => setShowDeleteModal(false)}
				aria-labelledby="contained-modal-title-vcenter"
				centered>
				<Modal.Header closeButton>
					<Modal.Title>Confirm Delete</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure you want to delete -{generatedQr.title}- QR code?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
						Cancel
					</Button>
					<Button variant="danger" onClick={() => handleDeleteConfirm()}>
						OK
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Delete Success Modal */}
			<Modal
				show={showDeleteSuccessModal}
				onHide={() => setShowDeleteSuccessModal(false)}
				aria-labelledby="contained-modal-title-vcenter"
				centered>
				<Modal.Header
					style={{ backgroundColor: "#00A86B" }}
					closeButton
					className="d-flex justify-content-center"></Modal.Header>
				<Modal.Body
					style={{
						fontSize: "24px",
						backgroundColor: "#00A86B",
						textAlign: "center",
					}}>
					The QR Code {generatedQr.title} was deleted successfully!
					<Check size={40} />
				</Modal.Body>
				<Modal.Footer style={{ backgroundColor: "#00A86B" }}></Modal.Footer>
			</Modal>
		</Container>
	);
};

export default Generate;
