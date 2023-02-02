import _ from "lodash";
import QRCode from "../models/qr.model";

const getHome = async (req, res) => {
	QRCode.find()
		.then((qrCodes) => res.render("qrCodeHome", { qrCodes }))
		.catch((err) => res.status(400).json(err));
};

const generateQRCode = async (req, res) => {
	const qrcode = QRCode(req.body);

	qrcode.save((err, data) => {
		if (err) {
			return res.status(400).json(err.message);
		}
		res.status(201).json(data);
	});
};

const getQRCodes = async (req, res) => {
	QRCode.find((err, data) => {
		if (err) {
			return res.status(400).json(err.message);
		}
		res.status(201).json(data);
	});
};

const searchQrCodes = (req, res) => {
	const queryString = req.query.q;

	QRCode.find({ title: { $regex: queryString } }, (err, data) => {
		if (err) {
			return res.status(400).json(err.message);
		}
		res.status(201).json(data);
	});
};

const getQRCode = async (req, res) => {
	const id = req.params.id;
	QRCode.findById(id).exec((err, data) => {
		if (err || !data) {
			return res.status(400).json("QR Code not found!");
		}
		res.status(201).json(data);
	});
};

const deleteQRCode = async (req, res) => {
	const id = req.params.id;
	QRCode.findById(id).exec((err, data) => {
		if (err || !data) {
			return res.status(400).json("QR Code not found");
		}
		data.remove((err, data) => {
			if (err) {
				return res.status(400).json(err.message);
			}
			res.status(200).json("QR Code successfully deleted");
		});
	});
};

export {
	deleteQRCode,
	generateQRCode,
	getQRCodes,
	getHome,
	getQRCode,
	searchQrCodes,
};
