import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

function NoteList({ notes, setNotes }) {
  const [search, setSearch] = useState(''); // Hakukentän tila
  const navigate = useNavigate(); // Navigointiin React Routerin avulla

  // Poistaa muistiinpanon varmistuksen jälkeen
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Oletko varma, että haluat poistaa tämän muistiinpanon?');
    if (confirmed) {
      try {
        await axios.delete(`/api/notes/${id}`);
        setNotes(notes.filter(note => note.id !== id)); // Päivitetään muistiinpanolista ilman poistettua
      } catch (error) {
        console.error('Virhe poistettaessa muistiinpanoa:', error);
        alert('Virhe poistossa. Yritä uudelleen.');
      }
    }
  };

  // Käsittelee muistiinpanon suosikiksi tai pois suosikista merkitsemisen
  const handleFavorite = async (id, currentStatus) => {
    try {
      await axios.put(`/api/notes/${id}/favorite`, { isFavorite: !currentStatus });
      // Päivitetään tilaa: vaihdetaan isFavorite-arvo
      setNotes(notes.map(note =>
        note.id === id ? { ...note, isFavorite: !currentStatus } : note
      ));
    } catch (error) {
      console.error('Virhe suosikin vaihtamisessa:', error);
      alert('Virhe suosikin päivittämisessä.');
    }
  };

  // Suodatetaan muistiinpanot haun perusteella
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  // Jos klikataan korttia (eikä esim. nappia sen sisällä), siirrytään muokkaussivulle
  const handleCardClick = (e, id) => {
    if (
      e.target.closest('.delete') ||
      e.target.closest('.favorite')
    ) return;
    navigate(`/edit/${id}`);
  };

  return (
    <div className="note-list-container">
      <div className="top-bar">
        <div className="left">
          <Link to="/favorite">
            <button className="favorite-btn">Suosikit</button>
          </Link>
        </div>
        <div className="right">
          <Link to="/add" className="add-note-btn">Lisää muistiinpano</Link>
        </div>
      </div>

      {/* Hakukenttä */}
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Etsi muistiinpanoista" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Muistiinpanot ruudukossa */}
      <div className="note-grid">
        {filteredNotes.map(note => (
          <div
            key={note.id}
            className="note-card"
            onClick={(e) => handleCardClick(e, note.id)}
          >
            {/* Suosikkinappi */}
            <button
              className="favorite"
              onClick={(e) => {
                e.stopPropagation(); // Estetään klikkaus kortille
                handleFavorite(note.id, note.isFavorite);
              }}
            >
              {note.isFavorite ? '★' : '☆'}
            </button>

            {/* Muistiinpanon sisältö */}
            <h3 className='title'>{note.title}</h3>
            <p>{note.content}</p>

            {/* Poistonappi */}
            <div className="button-group">
              <button
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(note.id);
                }}
              >
                Poista
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteList;
