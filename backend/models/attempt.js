const mongoose = require("mongoose");

const AttemptSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    time: {
        type: Number,
        required: true,
    },
    profit: {
        type: [String],
        default: [],
    },
    loss: {
        type: [String],
        default: [],
    },
    score: {
        type: Number,
        required: true,
    },
});

const Attempt = mongoose.model("Attempt", AttemptSchema);

module.exports = { Attempt };
