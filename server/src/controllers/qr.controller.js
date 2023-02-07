import _ from "lodash";
import Qrc from "../models/qr.model";
import QRCode from "qrcode";

const getHome = async (req, res) => {
	Qrc.find()
		.then((qrCodes) => res.render("qrCodeHome", { qrCodes }))
		.catch((err) => res.status(400).json(err));
};

const generateQRCode = async (req, res) => {
	QRCode.toDataURL(req.body.url).then((response) => {
		const qrcode = Qrc({
			title: req.body.title,
			url: response.split(",")[1],
		});

		qrcode.save((err, data) => {
			if (err) {
				return res.status(400).json(err.message);
			}
			res.status(201).json(data);
		});
	});
};

const getQRCodes = (req, res) => {
	Qrc.find((err, docs) => {
		if (err) {
			return res.status(400).json(err.message);
		}

		res.status(201).json(docs);
	});
};

const searchQrCodes = (req, res) => {
	const queryString = req.query.q;

	Qrc.find({ title: { $regex: queryString } }, (err, data) => {
		if (err) {
			return res.status(400).json(err.message);
		}
		res.status(201).json(data);
	});
};

const getQRCode = async (req, res) => {
	const id = req.params.id;
	Qrc.findById(id).exec((err, data) => {
		if (err || !data) {
			return res.status(400).json("QR Code not found!");
		}
		res.status(201).json(data);
	});
};

const deleteQRCode = async (req, res) => {
	const id = req.params.id;
	Qrc.findById(id).exec((err, data) => {
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
