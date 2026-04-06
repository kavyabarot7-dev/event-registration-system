const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// DATABASE CONNECTION
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",   // your password
    database: "college_events"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// API
app.post("/register", (req, res) => {
    const { 
        name, 
        enrollmentNumber, 
        branch, 
        contactNumber, 
        email, 
        event 
    } = req.body;

    const sql = `
    INSERT INTO registrations 
    (name, enrollment_number, branch, contact_number, email, event)
    VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, 
        [name, enrollmentNumber, branch, contactNumber, email, event], 
        (err) => {
            if (err) throw err;
            res.send("Registration Successful!");
        }
    );
});
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
app.get("/registrations", (req, res) => {
    const sql = "SELECT * FROM registrations";

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});