require("dotenv").config();

module.exports = {
	mongo:
		process.env.DB ||
		"mongodb+srv://Amir17:amir123TR@cluster0.hec27fn.mongodb.net/mongo?retryWrites=true&w=majority",
	port: process.env.PORT || 5000,
};
