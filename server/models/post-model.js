const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
    iduser: {
        type: Schema.Types.ObjectId,
        ref: "user",
        // required: [true, "The Id is required"],
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    ubication: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String
    },
    like: {
        type: Boolean
    }
});

module.exports = mongoose.model("posts", postSchema);