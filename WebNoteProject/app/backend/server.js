// Tuodaan tarvittavat kirjastot
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db'); // Tuodaan yhteys tietokantaan db.js-tiedostosta
const app = express();

// Käytetään CORS:ia ja bodyParseria JSON-datan käsittelyyn
app.use(cors());
app.use(bodyParser.json());

// Muotoillaan muistiinpanon tiedot ennen niiden lähettämistä asiakkaalle
const formatNote = (note) => ({
  id: note.id,
  title: note.title,
  content: note.content,
  isFavorite: note.is_favorite // Muutetaan is_favorite camelCase-muotoon
});

// Haetaan kaikki muistiinpanot, voi käyttää hakua
app.get('/api/notes', async (req, res) => {
  const search = req.query.search;
  try {
    // Haetaan kaikki muistiinpanot tietokannasta
    const result = await pool.query('SELECT * FROM notes');
    let notes = result.rows.map(formatNote); // Muotoillaan tiedot

    // Jos hakusana on annettu, suodatetaan muistiinpanot sen mukaan
    if (search) {
      notes = notes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Palautetaan muistiinpanot asiakkaalle
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).send('Server error'); // Virheenkäsittely
  }
});

// Lisää uusi muistiinpano
app.post('/api/notes', async (req, res) => {
  const { title, content } = req.body;
  try {
    // Lisätään uusi muistiinpano tietokantaan
    const result = await pool.query(
      'INSERT INTO notes (title, content, is_favorite) VALUES ($1, $2, false) RETURNING *',
      [title, content]
    );
    res.status(201).json(formatNote(result.rows[0])); // Palautetaan lisätty muistiinpano
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).send('Server error'); // Virheenkäsittely
  }
});

// Poista muistiinpano ID:n perusteella
app.delete('/api/notes/:id', async (req, res) => {
  const id = req.params.id;
  try {
    // Poistetaan muistiinpano tietokannasta
    const result = await pool.query('DELETE FROM notes WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Note not found'); // Jos muistiinpanoa ei löydy, palautetaan virhe
    }
    res.json(formatNote(result.rows[0])); // Palautetaan poistettu muistiinpano
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).send('Server error'); // Virheenkäsittely
  }
});

// Muokkaa muistiinpanoa
app.put('/api/notes/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, isFavorite } = req.body;
  try {
    // Päivitetään muistiinpano tietokannassa
    const result = await pool.query(
      'UPDATE notes SET title = $1, content = $2, is_favorite = $3 WHERE id = $4 RETURNING *',
      [title, content, isFavorite, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Note not found'); // Jos muistiinpanoa ei löydy, palautetaan virhe
    }
    res.json(formatNote(result.rows[0])); // Palautetaan päivitetty muistiinpano
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).send('Server error'); // Virheenkäsittely
  }
});

// Haetaan kaikki suosikit
app.get('/api/notes/favorite', async (req, res) => {
  try {
    // Haetaan suosikkimuistiinpanot tietokannasta
    const result = await pool.query('SELECT * FROM notes WHERE is_favorite = true');
    if (result.rows.length === 0) {
      return res.status(404).send('No favorite notes found'); // Jos ei suosikkeja, palautetaan virhe
    }
    res.json(result.rows.map(formatNote)); // Muotoillaan ja palautetaan suosikkimuistiinpanot
  } catch (error) {
    console.error('Error fetching favorite notes:', error);
    res.status(500).send('Server error'); // Virheenkäsittely
  }
});

// Päivitetään muistiinpanon suosikkistatusta
app.put('/api/notes/:id/favorite', async (req, res) => {
  const id = req.params.id;
  const { isFavorite } = req.body;
  try {
    // Päivitetään suosikkistatusta tietokannassa
    const result = await pool.query(
      'UPDATE notes SET is_favorite = $1 WHERE id = $2 RETURNING *',
      [isFavorite, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Note not found'); // Jos muistiinpanoa ei löydy, palautetaan virhe
    }
    res.json(formatNote(result.rows[0])); // Palautetaan päivitetty muistiinpano
  } catch (error) {
    console.error('Error updating favorite:', error);
    res.status(500).send('Server error'); // Virheenkäsittely
  }
});

// Haetaan yksittäinen muistiinpano ID:n perusteella
app.get('/api/notes/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    // Haetaan muistiinpano tietokannasta
    const result = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).send('Not found'); // Jos muistiinpanoa ei löydy, palautetaan virhe
    res.json(formatNote(result.rows[0])); // Palautetaan haettu muistiinpano
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).send('Server error'); // Virheenkäsittely
  }
});

// Määritetään portti ja käynnistetään palvelin
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
