const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  theatreName: { type: String, required: true, trim: true },
  showDate: { type: Date, required: true },
  showTime: { type: String, required: true },
  seats: {
    type: [String],
    required: true,
    validate: { validator: (v) => v.length > 0, message: "Select at least one seat." }
  },
  totalAmount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" },
  paymentStatus: { type: String, enum: ["pending", "paid", "failed", "not_required"], default: "pending" },
  bookingReference: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
