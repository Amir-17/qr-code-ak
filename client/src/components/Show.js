import QRCode from "qrcode.react";
import React, { useEffect } from "react";
import { useState } from "react";
import { Card, Button, Container, ButtonGroup, Modal } from "react-bootstrap";
import {
	ArrowLeftCircleFill,
	Download,
	Trash,
	Phone,
	Check,
} from "react-bootstrap-icons";
import "../assets/styles/Show.css";
import { useQrContext } from "../context/qr-context";

const Show = () => {
	const {
		state,
		getQrCodes,
		removeQr,
		closeInfoModal,
		setSelectedQr,
		handleDeleteModalOpen,
		setDeleteSuccessModal,
		setDeleteModal,
	} = useQrContext();

	useEffect(() => {
		getQrCodes();
	}, [state.searchQuery, state.generatedQr]);

	const [deleteId, setDeleteId] = useState(null);
	const [showModal, setShowModal] = useState(false);

	const openModal = (qrCode) => {
		setSelectedQr(qrCode);
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	const downloadQRCode = () => {
		const qrCodeUrl = document
			.getElementById("show_qrcode_image")
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
									<QRCode size={100} value={qrCode.url} />
								</Card.Body>
								<Card.Footer className="d-flex justify-content-center">
									<ButtonGroup>
										<Button
											variant="primary"
											className="ml-2"
											onClick={() => openModal(qrCode)}>
											<Phone />
										</Button>
										<Button
											variant="danger"
											className="ml-2"
											onClick={() => {
												setDeleteId(qrCode._id);
												handleDeleteModalOpen();
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
				show={showModal}
				onHide={closeModal}
				aria-labelledby="contained-modal-title-vcenter"
				centered>
				<Modal.Header className="d-flex justify-content-center">
					<Modal.Title>Scan the QR Code to access our location!</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-center">
					<Modal.Title>{state.selectedQr.title}</Modal.Title>
					<QRCode
						size={200}
						value={state.selectedQr.url}
						id="show_qrcode_image"
					/>
				</Modal.Body>
				<Modal.Footer className="d-flex justify-content-center">
					{/* <Link to="/show"></Link> */}
					<Button onClick={closeModal}>
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
							setDeleteId(state.selectedQr._id);
							handleDeleteModalOpen();
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
					Are you sure you want to delete "{state.selectedQr.title}" QR code?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setDeleteModal(false)}>
						Cancel
					</Button>
					<Button
						variant="danger"
						onClick={() => {
							removeQr(deleteId);
							setDeleteId(null);
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
				show={state.showInfoModal}
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
