const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
    Idpost: {
        type: Schema.Types.ObjectId,
        ref: "post",
        //required: [true, "The IdPost is required"],
    },
    iduser: {
        type: Schema.Types.ObjectId,
        ref: "user",
        //required: [true, "The IdUser is required"],
    },
    comment: {
        type: Text
    }
});

module.exports = mongoose.model("comment", commentSchema);