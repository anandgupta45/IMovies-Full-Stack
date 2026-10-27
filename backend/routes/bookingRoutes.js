const express = require("express");
const crypto = require("crypto");
const Booking = require("../models/Booking");
const Movie = require("../models/Movie");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Starter booking flow. Payment processing and cross-request seat locking need a real provider/transaction strategy.
router.post("/", protect, async (req, res, next) => {
  try {
    const { movieId, theatreName, showDate, showTime, seats, totalAmount } = req.body;
    if (!movieId || !theatreName || !showDate || !showTime || !Array.isArray(seats) || seats.length === 0 || totalAmount == null) {
      return res.status(400).json({ message: "movieId, theatreName, showDate, showTime, seats and totalAmount are required." });
    }
    const movie = await Movie.findOne({ _id: movieId, isActive: true });
    if (!movie) return res.status(404).json({ message: "Movie not found." });
    if (Number(totalAmount) < 0 || !Number.isFinite(Number(totalAmount))) return res.status(400).json({ message: "totalAmount must be a valid non-negative number." });

    const booking = await Booking.create({
      user: req.user._id, movie: movie._id, theatreName, showDate, showTime,
      seats: [...new Set(seats.map(String))], totalAmount: Number(totalAmount),
      bookingReference: `IM-${crypto.randomBytes(4).toString("hex").toUpperCase()}`
    });
    res.status(201).json({ message: "Booking created (payment is not integrated)", booking });
  } catch (error) { next(error); }
});

router.get("/my", protect, async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("movie", "title posterUrl durationMinutes").sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (error) { next(error); }
});

router.patch("/:id/cancel", protect, async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
    if (!booking) return res.status(404).json({ message: "Booking not found." });
    if (booking.status === "cancelled") return res.status(400).json({ message: "Booking is already cancelled." });
    booking.status = "cancelled";
    await booking.save();
    res.json({ message: "Booking cancelled", booking });
  } catch (error) { next(error); }
});

module.exports = router;
