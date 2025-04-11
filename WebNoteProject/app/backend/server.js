const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3001;

const pool = new Pool({
    user: 'your_db_user',
    host: 'your_db_host',
    database: 'your_db_name',
    password: 'your_db_password',
    port: 5432,
});

app.use(cors());
app.use(express.json());

app.get('/notes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM notes');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/notes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.post('/notes', async (req, res) => {
    const { title, content } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO notes (title, content, is_favorite, created_at, updated_at) VALUES ($1, $2, false, NOW(), NOW()) RETURNING *',
            [title, content]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.put('/notes/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, is_favorite } = req.body;
    try {
        const result = await pool.query(
            'UPDATE notes SET title = $1, content = $2, is_favorite = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
            [title, content, is_favorite, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.delete('/notes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM notes WHERE id = $1', [id]);
        res.json({ message: 'Note deleted' });
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});