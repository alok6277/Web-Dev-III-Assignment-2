const express = require("express");

const app = express();

const studentRoutes = require("./routes/studentRoutes");
const logger = require("./middleware/logger");


// Middleware
app.use(express.json());
app.use(logger);


// Routes
app.use("/students", studentRoutes);


// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Student Management REST API is running"
    });
});


// 404 Error Handler
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});


// General Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        error: "Internal Server Error"
    });
});


// Start Server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});