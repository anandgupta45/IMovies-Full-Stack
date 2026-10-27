require("dotenv").config();
const connectDB = require("./config/db");
const Movie = require("./models/Movie");

const sampleMovies = [
  { title: "The Last Horizon", description: "A science-fiction adventure across a distant galaxy.", genre: ["Sci-Fi", "Adventure"], language: "English", durationMinutes: 128, certificate: "UA", rating: 8.1, posterUrl: "https://placehold.co/400x600?text=The+Last+Horizon" },
  { title: "Mumbai Nights", description: "A heartfelt drama set in a city that never sleeps.", genre: ["Drama", "Romance"], language: "Hindi", durationMinutes: 116, certificate: "UA", rating: 7.4, posterUrl: "https://placehold.co/400x600?text=Mumbai+Nights" },
  { title: "Laughing Matters", description: "Friends find themselves in a comedy of errors.", genre: ["Comedy"], language: "Hindi", durationMinutes: 105, certificate: "U", rating: 7.8, posterUrl: "https://placehold.co/400x600?text=Laughing+Matters" }
];


async function seed() {
  await connectDB();
  await Movie.deleteMany({ title: { $in: sampleMovies.map((m) => m.title) } });
  await Movie.insertMany(sampleMovies);
  console.log("Sample movies inserted");
  process.exit(0);
}
seed().catch((error) => { console.error(error); process.exit(1); });
