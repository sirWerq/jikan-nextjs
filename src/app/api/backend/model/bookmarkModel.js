import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    anime_id: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ["Completed", "Watching", "Plan to watch", "Drop"],
        required: true,
        default: "Plan to watch",
        index: true
    }
});

const Bookmarks = mongoose.model("Bookmarks", bookmarkSchema);

module.exports = { Bookmarks }