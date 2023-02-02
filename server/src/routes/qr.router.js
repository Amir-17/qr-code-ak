import express from "express";
import {
	getHome,
	generateQRCode,
	getQRCode,
	deleteQRCode,
	getQRCodes,
	searchQrCodes,
} from "../controllers/qr.controller";

const router = express.Router();

router.get("/api/", getHome);
router.post("/api/qrcode", generateQRCode);
router.get("/api/qrcode", getQRCodes);
router.get("/api/qrcode/:id", getQRCode);
router.delete("/api/qrcode/:id", deleteQRCode);
router.get("/api/search", searchQrCodes);

export default router;
