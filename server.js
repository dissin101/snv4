const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect DB

connectDB();

// Init Middleware

app.use(express.json({ extended: true }));

// Routes

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`[server]  started on port ${PORT}`));
