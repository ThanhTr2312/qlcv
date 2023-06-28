const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { config, connection } = require('./app/config/index.js');
const nguoidungRoutes = require("./app/routes/nguoidung.route");
const authRoutes = require("./app/routes/auth.route");
const thongkeRoutes = require("./app/routes/thongke.route")
const duanRoutes = require("./app/routes/duan.routes")
const { BadRequestError } = require("./app/helpers/errors");
const path = require('path');


const app = express();

app.use(cors({ origin: config.origins }));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connection.getConnection((error) => {
    if (error) {
        console.error('Error connecting to database:', error);
        return;
    }

    console.log('Connected to the database.');

    // Start the server
    const PORT = config.app.port;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome." });
});
app.use("/api/auth", authRoutes);

app.use('/api', nguoidungRoutes);

app.use('/api', thongkeRoutes);

app.use('/api', duanRoutes);

// app.use('/api', congviecRoutes);


//handle 404 response
app.use((req, res, next) => {  
    next(new BadRequestError(404, "Resource not found"));
});
//define error - handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {  
    console.log(err);  
    res.status(err.statusCode || 500).json({     message: err.message || "Internal Server Error",   });
});