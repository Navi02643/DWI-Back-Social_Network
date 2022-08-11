const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
    username: {
        type: String
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
    }
});

module.exports = mongoose.model("posts", postSchema);