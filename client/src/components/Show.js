import QRCode from "qrcode.react";
import React from "react";

import { useState } from "react";
import { Card, Button, Container, ButtonGroup, Modal } from "react-bootstrap";
import {
	ArrowLeftCircleFill,
	Download,
	Trash,
	Phone,
	Check,
} from "react-bootstrap-icons";
import Home from "./Home";
import "../assets/styles/Show.css";

const Show = ({ qRCodes, RemoveTask }) => {
	const [showModal, setShowModal] = useState(false);
	const [selectedQRCode, setSelectedQRCode] = useState({});

	const openModal = (qRCode) => {
		setSelectedQRCode(qRCode);
		setShowModal(true);
	};
	console.log(selectedQRCode);
	const closeModal = () => {
		setShowModal(false);
	};
	const [deleteId, setDeleteId] = useState(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);

	const handleDelete = (qRCodeId) => {
		setShowDeleteModal(true);
		setDeleteId(qRCodeId);
	};

	const handleDeleteConfirmInModal = () => {
		RemoveTask(deleteId);
		setShowDeleteModal(false);
		setShowDeleteSuccessModal(true);
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
			{qRCodes && qRCodes.length > 0 ? (
				qRCodes.map((qRCode, index) => {
					return (
						<Card key={`${qRCodes._id}_${index}`} className="grid-item">
							<Card.Header>
								<Card.Title className="text-center">{qRCode.title}</Card.Title>
							</Card.Header>
							<Card.Body className="text-center">
								<QRCode size={100} value={qRCode.url} />
							</Card.Body>
							<Card.Footer className="d-flex justify-content-center">
								<ButtonGroup>
									<Button
										variant="primary"
										className="ml-2"
										onClick={() => openModal(qRCode)}>
										<Phone />
									</Button>
									<Button
										variant="danger"
										className="ml-2"
										onClick={() => handleDelete(qRCode._id)}>
										<Trash />
									</Button>
								</ButtonGroup>
							</Card.Footer>
						</Card>
					);
				})
			) : (
				<Home />
			)}

			{showModal && (
				<Modal
					show={showModal}
					onHide={closeModal}
					aria-labelledby="contained-modal-title-vcenter"
					centered>
					<Modal.Header className="d-flex justify-content-center">
						<Modal.Title>Scan the QR Code to access our location!</Modal.Title>
					</Modal.Header>
					<Modal.Body className="text-center">
						<Modal.Title>{selectedQRCode.title}</Modal.Title>
						<QRCode
							size={200}
							value={selectedQRCode.url}
							id="show_qrcode_image"
						/>
					</Modal.Body>
					<Modal.Footer className="d-flex justify-content-center">
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
							onClick={() => handleDelete(selectedQRCode._id)}>
							<Trash />
						</Button>
					</Modal.Footer>
				</Modal>
			)}

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
					Are you sure you want to delete -{selectedQRCode.title}- QR code?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
						Cancel
					</Button>
					<Button variant="danger" onClick={() => handleDeleteConfirmInModal()}>
						OK
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Delete Success Modal */}
			<Modal
				show={showDeleteSuccessModal}
				onHide={() => setShowDeleteSuccessModal(false)}
				centered>
				<Modal.Header
					closeButton
					style={{ backgroundColor: "#7CFC00" }}
					className="d-flex justify-content-center"></Modal.Header>
				<Modal.Body style={{ fontSize: "24px", backgroundColor: "#7CFC00" }}>
					The QR Code {selectedQRCode.title} was deleted successfully!
					<Check />
				</Modal.Body>
				<Modal.Footer style={{ backgroundColor: "#7CFC00" }}></Modal.Footer>
			</Modal>
		</Container>
	);
};

export default Show;
