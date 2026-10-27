const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, index: true },
  description: { type: String, default: "" },
  genre: [{ type: String, trim: true }],
  language: { type: String, default: "Hindi" },
  durationMinutes: { type: Number, min: 1, default: 120 },
  certificate: { type: String, default: "UA" },
  posterUrl: { type: String, default: "" },
  releaseDate: { type: Date },
  rating: { type: Number, min: 0, max: 10, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

movieSchema.index({ title: "text", description: "text", genre: "text" });
module.exports = mongoose.model("Movie", movieSchema);
