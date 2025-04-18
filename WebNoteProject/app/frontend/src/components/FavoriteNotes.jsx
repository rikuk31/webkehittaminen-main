import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

function FavoriteNotes() {
  const [favorites, setFavorites] = useState([]);

  // Haetaan suosikkimuistiinpanot palvelimelta
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get('/api/notes/favorite');
        setFavorites(res.data); // Asetetaan haetut suosikit tilaan
      } catch (err) {
        console.error('Error fetching favorite notes:', err);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div className="note-list-container">
      <h1 className="title">Suosikit</h1>
      <div className="top-bar">
        <Link to="/">
          <button className="favorite-btn">Palaa etusivulle</button>
        </Link>
      </div>
      <div className="note-grid">
        {favorites.length === 0 ? (
          <p>Ei suosikkimuistiinpanoja.</p>
        ) : (
          favorites.map(note => (
            <div key={note.id} className="note-card">
              {/* Linkki muistiinpanon muokkausnäkymään */}
              <Link to={`/edit/${note.id}`} className="note-link">
                <h3>{note.title}</h3>
                <p>{note.content}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FavoriteNotes;
