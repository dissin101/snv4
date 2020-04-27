const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// Connect DB

connectDB();

// Init Middleware

<<<<<<< HEAD
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json({ extended: true }));
=======
app.use(express.json({ extended: false }));
>>>>>>> 6ee2403e7b46b973582a217aea64016c57a8826e

// Routes

<<<<<<< HEAD
app.use("/auth", require("./routes/api/profile"));
app.use("/user", require("./routes/api/user"));
app.use("/profile", require("./routes/api/profile"));
app.use("/", require("./routes/api/publication"));
=======
app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));
app.use("/profile", require("./routes/profile"));
app.use("/", require("./routes/publication"));
>>>>>>> b5040443

// Serve static assets in production

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`[server]  started on port ${PORT}`));
