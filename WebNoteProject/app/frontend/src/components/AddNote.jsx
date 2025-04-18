import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddNote({ onNoteAdded }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitting) {
      console.log('Submitting:', isSubmitting);
    }
  }, [isSubmitting]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Estetään tuplaklikkaukset
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const newNote = { title, content };
      const res = await axios.post('/api/notes', newNote);

      // Ilmoitetaan vanhemmalle komponentille, että uusi muistiinpano lisättiin
      onNoteAdded(res.data);

      setSuccessMessage('Muistiinpano lisätty onnistuneesti!');
      navigate('/');
    } catch (err) {
      console.error("Virhe lisättäessä muistiinpanoa:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Lisää uusi muistiinpano</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Otsikko</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Sisältö</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          Tallenna
        </button>
      </form>
      {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
    </div>
  );
}

export default AddNote;