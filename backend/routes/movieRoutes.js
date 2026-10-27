const express = require("express");
const Movie = require("../models/Movie");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// GET /api/movies?search=batman&genre=Action&language=English&page=1&limit=12
router.get("/", async (req, res, next) => {
  try {
    const { search, genre, language } = req.query;
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 12, 1), 50);
    const filter = { isActive: true };
    if (genre) filter.genre = { $in: [new RegExp(`^${String(genre).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i")] };
    if (language) filter.language = new RegExp(`^${String(language).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i");
    if (search) filter.$text = { $search: String(search) };

    const [movies, total] = await Promise.all([
      Movie.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Movie.countDocuments(filter)
    ]);
    res.json({ movies, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) { next(error); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.id, isActive: true });
    if (!movie) return res.status(404).json({ message: "Movie not found." });
    res.json({ movie });
  } catch (error) { next(error); }
});

router.post("/", protect, adminOnly, async (req, res, next) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({ message: "Movie created", movie });
  } catch (error) { next(error); }
});

router.patch("/:id", protect, adminOnly, async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!movie) return res.status(404).json({ message: "Movie not found." });
    res.json({ message: "Movie updated", movie });
  } catch (error) { next(error); }
});

router.delete("/:id", protect, adminOnly, async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!movie) return res.status(404).json({ message: "Movie not found." });
    res.json({ message: "Movie deactivated", movie });
  } catch (error) { next(error); }
});

module.exports = router;
