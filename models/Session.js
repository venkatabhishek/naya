const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// onboarding session
const SessionSchema = new Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: Schema.Types.Mixed // temporary
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = Session = mongoose.model("sessions", SessionSchema);