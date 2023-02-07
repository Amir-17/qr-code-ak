import {
	Trash,
	Phone,
	Check,
	Download,
	ArrowLeftCircleFill,
} from "react-bootstrap-icons";
import "../assets/styles/Show.css";
import React, { useEffect } from "react";
import { useQrContext } from "../context/qr-context";
import {
	Card,
	Button,
	Container,
	ButtonGroup,
	Modal,
	Image,
} from "react-bootstrap";

const Show = () => {
	//new states and methods with context api
	const {
		state,
		removeQr,
		getQrCodes,
		openQrModal,
		closeQrModal,
		closeInfoModal,
		setDeleteModal,
		handleDeleteModalOpen,
		setDeleteSuccessModal,
	} = useQrContext();

	useEffect(() => {
		getQrCodes();
	}, [state.searchQuery, state.generatedQr, state.showDeleteLocation]);

	const downloadQRCode = () => {
		const qrCodeUrl = document.getElementById("show_qrcode_image").src;

		let downloadLink = document.createElement("a");
		downloadLink.href = qrCodeUrl;
		downloadLink.download = "paragon-qr-code.png";
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};
	return (
		<Container className="container_items">
			{state.allQrCodes && state.allQrCodes.length > 0
				? state.allQrCodes.map((qrCode, index) => {
						return (
							<Card key={`${qrCode._id}_${index}`} className="grid-item">
								<Card.Header>
									<Card.Title className="text-center">
										{qrCode.title}
									</Card.Title>
								</Card.Header>
								<Card.Body className="text-center">
									<Image
										id="show_qrcode_image"
										src={`data:image/png;base64,${qrCode.url}`}
									/>
								</Card.Body>
								<Card.Footer className="d-flex justify-content-center">
									<ButtonGroup>
										<Button
											variant="primary"
											className="ml-2"
											onClick={() => openQrModal(qrCode)}>
											<Phone />
										</Button>
										<Button
											variant="danger"
											className="ml-2"
											onClick={() => {
												handleDeleteModalOpen("CARD", qrCode._id);
											}}>
											<Trash />
										</Button>
									</ButtonGroup>
								</Card.Footer>
							</Card>
						);
				  })
				: null}

			{/* Single QR Code Modal */}
			<Modal
				show={state.showQrModal}
				onHide={() => closeQrModal()}
				aria-labelledby="contained-modal-title-vcenter"
				centered>
				<Modal.Header className="d-flex justify-content-center">
					<Modal.Title>Scan the QR Code to access our location!</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-center">
					<Modal.Title>{state.selectedQr.title}</Modal.Title>
					<Image src={`data:image/png;base64,${state.selectedQr.url}`} />
				</Modal.Body>
				<Modal.Footer className="d-flex justify-content-center">
					<Button onClick={() => closeQrModal()}>
						<ArrowLeftCircleFill />
					</Button>
					<Button
						variant="success"
						value="Download"
						onClick={() => downloadQRCode()}>
						<Download />
					</Button>
					<Button
						variant="danger"
						onClick={() => {
							handleDeleteModalOpen("MODAL", "");
						}}>
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
					Are you sure you want to delete "
					{state.cardDeleteId === ""
						? state.selectedQr.title
						: state.allQrCodes.find((x) => x._id === state.cardDeleteId).title}
					" QR code?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setDeleteModal(false)}>
						Cancel
					</Button>
					<Button
						variant="danger"
						onClick={() => {
							removeQr();
						}}>
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

			{/* No QR Codes in database Modal */}
			<Modal
				show={!state.showDeleteSuccessModal && state.showInfoModal}
				onHide={() => closeInfoModal()}
				centered>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>
					We are sorry there is no QR Codes stored, please generate your first
					QR Code!
				</Modal.Body>
			</Modal>
		</Container>
	);
};

export default Show;
