const mongoose = require("mongoose");
const {
	Schema
} = mongoose;

const schema = Schema({
    course: {
		type: String,
		required: true,
	},
	flag: {
		type: Boolean,
		default: true,
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
	updatedDate: Date,
});

module.exports = mongoose.model("course", schema);