const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
    iduser: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: [true, "The Id is required"],
    },
    title: {
        type: String
    },
    description: {
        type: Text
    },
    ubication: {
        type: String
    },
    date: {
        type: Date
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model("post", postSchema);