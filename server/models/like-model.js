const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeSchema = new Schema({
    Idpost: {
        type: Schema.Types.ObjectId,
        ref: "post",
        required: [true, "The IdPost is required"],
    },
    iduser: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: [true, "The IdUser is required"],
    },
    like: {
        type: Boolean
    }
});

module.exports = mongoose.model("like", likeSchema);