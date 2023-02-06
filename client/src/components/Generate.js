import QRCode from "qrcode.react";
import { Alert, Button, Container, Form, Modal } from "react-bootstrap";
import {
	ArrowLeftCircleFill,
	Download,
	Trash,
	Check,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useQrContext } from "../context/qr-context";

const Generate = () => {
	const {
		state,
		removeQr,
		setGenerateModal,
		handleNewQrUpdate,
		addQrCode,
		closeQrModal,
		handleDeleteModalOpen,
		setDeleteModal,
		setDeleteSuccessModal,
	} = useQrContext();

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

	return (
		<Container>
			{/* Generate New QR Modal */}
			<Modal
				aria-labelledby="contained-modal-title-vcenter"
				centered
				show={state.showGenerateModal}
				onHide={() => setGenerateModal(false)}>
				<Modal.Header>
					<Modal.Title>Generate new QR code</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3">
							<Form.Control
								name="title"
								type="text"
								placeholder="QR Code Title"
								autoFocus
								value={state.newQr.title}
								onChange={(e) => {
									e.preventDefault();
									handleNewQrUpdate(e.target.name, e.target.value);
								}}></Form.Control>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Control
								name="url"
								as="textarea"
								rows={3}
								placeholder="Enter URL for your QR Code"
								value={state.newQr.url}
								onChange={(e) => {
									e.preventDefault();
									handleNewQrUpdate(e.target.name, e.target.value);
								}}
							/>
						</Form.Group>
					</Form>
					{state.errorMessage.length > 0 ? (
						<Alert variant="danger">{state.errorMessage}</Alert>
					) : null}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setGenerateModal(false)}>
						Close
					</Button>
					<Button variant="primary" onClick={() => addQrCode()}>
						Generate
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Generated QR Code Modal */}
			<Modal
				show={state.showQrModal}
				onHide={() => closeQrModal()}
				aria-labelledby="contained-modal-title-vcenter"
				centered>
				<Modal.Header className="d-flex justify-content-center">
					<Modal.Title>Scan the QR Code to access our location!</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-center">
					<Modal.Title>
						{JSON.stringify(state.generatedQr) !== "{}"
							? state.generatedQr.title
							: ""}
					</Modal.Title>
					<QRCode
						size={200}
						value={
							JSON.stringify(state.generatedQr) !== "{}"
								? state.generatedQr.url
								: ""
						}
						id="qrcode_image"
					/>
				</Modal.Body>
				<Modal.Footer className="d-flex justify-content-center">
					<Link to="/show">
						<Button onClick={() => closeQrModal()}>
							<ArrowLeftCircleFill />
						</Button>
					</Link>
					<Button variant="success" onClick={() => downloadQRCode()}>
						<Download />
					</Button>
					<Button variant="danger" onClick={() => handleDeleteModalOpen()}>
						<Trash />
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Delete Prompt Modal */}
			<Modal
				show={state.showDeleteModal}
				onHide={() => setDeleteModal(false)}
				aria-labelledby="contained-modal-title-vcenter"
				centered>
				<Modal.Header closeButton>
					<Modal.Title>Confirm Delete</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure you want to delete "{state.generatedQr.title}" QR code?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setDeleteModal(false)}>
						Cancel
					</Button>
					<Button variant="danger" onClick={() => removeQr()}>
						OK
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Delete Success Modal */}
			<Modal
				show={state.showDeleteSuccessModal}
				onHide={() => setDeleteSuccessModal(false)}
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
					The QR Code {state.generatedQr.title} was deleted successfully!
					<Check size={40} />
				</Modal.Body>
				<Modal.Footer style={{ backgroundColor: "#00A86B" }}></Modal.Footer>
			</Modal>
		</Container>
	);
};

export default Generate;
