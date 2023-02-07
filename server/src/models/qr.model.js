import mongoose from "mongoose";

const QRSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
		minlength: 2,
		maxlength: 25,
		validate: {
			validator: function (v) {
				return /^[a-zA-Z0-9 ]+$/.test(v);
			},
			message: (props) => `${props.value} is not a valid title!`,
		},
	},
	url: {
		type: String,
		required: true,
		unique: true,
	},
});

export default mongoose.model("Qrc", QRSchema);
