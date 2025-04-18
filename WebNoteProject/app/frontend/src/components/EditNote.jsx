import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditNote({ onNoteUpdated }) {
  const { id } = useParams(); // Haetaan muistiinpanon ID URL:sta
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: '', content: '' });

  useEffect(() => {
    // Haetaan muistiinpano palvelimelta
    axios.get(`/api/notes/${id}`).then((res) => setNote(res.data));
  }, [id]);

  const handleSave = async () => {
    try {
      // Lähetetään muutokset palvelimelle
      const updatedNote = await axios.put(`/api/notes/${id}`, note);
      onNoteUpdated(updatedNote.data); // Päivitetään tieto vanhemmalle komponentille
      navigate('/'); // Palataan etusivulle
    } catch (error) {
      console.error('Virhe tallennettaessa:', error);
    }
  };

  return (
    <div>
      <h2>Muokkaa muistiinpanoa</h2>
      <input
        type="text"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />
      <br />
      <textarea
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
      />
      <br />
      <button onClick={handleSave}>Tallenna muutokset</button>
    </div>
  );
}

export default EditNote;
