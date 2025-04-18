import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';
import NoteList from './components/NoteList';
import FavoriteNotes from './components/FavoriteNotes';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('/api/notes');
        setNotes(res.data);
      } catch (err) {
        console.error('Virhe muistiinpanojen haussa:', err);
      }
    };
    fetchNotes(); 
  }, []);

  const handleNoteAdded = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleNoteUpdated = (updatedNote) => {
    setNotes(notes.map(note => (note.id === updatedNote.id ? updatedNote : note)));
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<NoteList notes={notes} setNotes={setNotes} />} />
          <Route path="/add" element={<AddNote onNoteAdded={handleNoteAdded} />} />
          <Route path="/edit/:id" element={<EditNote onNoteUpdated={handleNoteUpdated} />} />
          <Route path="/favorite" element={<FavoriteNotes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
