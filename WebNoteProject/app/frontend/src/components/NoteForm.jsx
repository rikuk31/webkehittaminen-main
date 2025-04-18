import { useState } from 'react';

function NoteForm({ onAdd }) {
  const [note, setNote] = useState({ title: '', content: '' });

  const handleSubmit = () => {
    if (note.title && note.content) {
      onAdd(note); // Kutsutaan yläkomponentin lisäysfunktiota
      setNote({ title: '', content: '' }); // Tyhjennetään kentät
    }
  };

  return (
    <div>
      <h2>Lisää uusi muistiinpano</h2>
      <input
        type="text"
        placeholder="Otsikko"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />
      <br />
      <textarea
        placeholder="Sisältö"
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
      />
      <br />
      <button onClick={handleSubmit}>Tallenna</button>
    </div>
  );
}

export default NoteForm;