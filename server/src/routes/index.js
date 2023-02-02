import qr from "./qr.router";

export default (app) => {
	app.use("/", qr);
};
