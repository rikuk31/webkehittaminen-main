const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

// Initialize Express
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.static('public'));
const cors = require("cors");
app.use(cors()); // Allows all origins by default, you can restrict it if needed.

// Connect to the SQLite database
const db = new sqlite3.Database('mydatabase.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create a table if it doesn’t exist
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    age INTEGER NOT NULL
)`);

// Route to handle adding a user via POST request
app.post('/addUser', (req, res) => {
    console.log('Received POST request to /addUser with body:', req.body); // Log the request
    const { firstName, lastName, age } = req.body;

    if (!firstName || !lastName || !age) {
        console.error('Validation error: First name, last name, and age are required'); // Log validation error
        return res.status(400).json({ error: 'First name, last name, and age are required' });
    }

    const sql = `INSERT INTO users (firstName, lastName, age) VALUES (?, ?, ?)`;
    db.run(sql, [firstName, lastName, age], function (err) {
        if (err) {
            console.error('Error inserting data:', err.message); // Log database error
            return res.status(500).json({ error: 'Internal server error' });
        }

        console.log('User added successfully with ID:', this.lastID); // Log successful insertion
        res.status(201).json({
            id: this.lastID,
            firstName,
            lastName,
            age,
        });
    });
});

// Route to handle retrieving all users via GET request
app.get('/getUsers', (req, res) => {
    console.log('Received GET request to /getUsers'); // Log the request
    const sql = `SELECT * FROM users`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err.message); // Log database error
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Users fetched successfully. Count:', rows.length); // Log successful fetch
        res.status(200).json(rows);
    });
});

// Route to handle retrieving a user by ID via GET request
app.get('/getUser/:id', (req, res) => {
    const userId = req.params.id;
    console.log(`Received GET request to /getUser/${userId}`); // Log the request

    const sql = `SELECT * FROM users WHERE id = ?`;
    
    db.get(sql, [userId], (err, row) => {
        if (err) {
            console.error('Error fetching data:', err.message); // Log database error
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!row) {
            console.log(`User with ID ${userId} not found`); // Log not found
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(`User with ID ${userId} fetched successfully`); // Log successful fetch
        res.status(200).json(row);
    });
});

// Route to handle updating a user by ID via PUT request
app.put('/updateUser/:id', (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, age } = req.body;
    console.log(`Received PUT request to /updateUser/${userId} with body:`, req.body); // Log the request

    if (!firstName || !lastName || !age) {
        console.error('Validation error: First name, last name, and age are required'); // Log validation error
        return res.status(400).json({ error: 'First name, last name, and age are required' });
    }

    const sql = `UPDATE users SET firstName = ?, lastName = ?, age = ? WHERE id = ?`;

    db.run(sql, [firstName, lastName, age, userId], function (err) {
        if (err) {
            console.error('Error updating data:', err.message); // Log database error
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (this.changes === 0) {
            console.log(`User with ID ${userId} not found for update`); // Log not found
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(`User with ID ${userId} updated successfully`); // Log successful update
        res.status(200).json({ message: `User with ID ${userId} updated successfully` });
    });
});

// Route to handle deleting a user by ID via DELETE request
app.delete('/deleteUser/:id', (req, res) => {
    const userId = req.params.id;
    console.log(`Received DELETE request to /deleteUser/${userId}`); // Log the request

    const sql = `DELETE FROM users WHERE id = ?`;

    db.run(sql, [userId], function (err) {
        if (err) {
            console.error('Error deleting data:', err.message); // Log database error
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (this.changes === 0) {
            console.log(`User with ID ${userId} not found for deletion`); // Log not found
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(`User with ID ${userId} deleted successfully`); // Log successful deletion
        res.status(200).json({ message: `User with ID ${userId} deleted successfully` });
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});