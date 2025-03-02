const sqlite3 = require('sqlite3').verbose();

// Connect to (or create) the database
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

// Insert a record
const insertUser = (name, email) => {
    const sql = `INSERT INTO users (name, email) VALUES (?, ?)`;
    db.run(sql, [name, email], function (err) {
        if (err) {
            return console.error('Error inserting data:', err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
};

// Example usage
insertUser('John Doe', 'john@example.com');

// Close the database
db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('Database connection closed.');
    }
});
