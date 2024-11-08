const mongoose = require("mongoose");
const {
	Schema
} = mongoose;

const schema = Schema({
    user: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},
    grade:
    [{
        courseId: {
            type: Schema.Types.ObjectId, ref: "course",
        },
        score: String,
    }],
	createdDate: {
		type: Date,
		default: Date.now,
	},
	updatedDate: Date,
});

module.exports = mongoose.model("grade", schema);