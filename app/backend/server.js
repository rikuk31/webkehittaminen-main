const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

// Initialize Express
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.static('public'));

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
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
)`);

// Route to handle adding a user via POST request
app.post('/addUser', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).send({ error: 'Name and email are required' });
    }

    const sql = `INSERT INTO users (name, email) VALUES (?, ?)`;
    db.run(sql, [name, email], function (err) {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        res.status(201).send({ message: `User added with ID: ${this.lastID}` });
    });
});

// Route to handle retrieving all users via GET request
app.get('/getUsers', (req, res) => {
    const sql = `SELECT * FROM users`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

// Route to handle retrieving a user by ID via GET request
app.get('/getUser/:id', (req, res) => {
    const userId = req.params.id;

    const sql = `SELECT * FROM users WHERE id = ?`;
    
    db.get(sql, [userId], (err, row) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        if (!row) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).json(row);
    });
});

// Route to handle updating a user by ID via PUT request
app.put('/updateUser/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).send({ error: 'Name and email are required' });
    }

    const sql = `UPDATE users SET name = ?, email = ? WHERE id = ?`;

    db.run(sql, [name, email, userId], function (err) {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send({ message: `User with ID ${userId} updated successfully` });
    });
});

// Route to handle deleting a user by ID via DELETE request
app.delete('/deleteUser/:id', (req, res) => {
    const userId = req.params.id;

    const sql = `DELETE FROM users WHERE id = ?`;

    db.run(sql, [userId], function (err) {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send({ message: `User with ID ${userId} deleted successfully` });
    });
});


// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
