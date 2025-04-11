import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const response = await axios.get('http://localhost:3001/notes');
        setNotes(response.data);
    };

    const createNote = async () => {
        const response = await axios.post('http://localhost:3001/notes', { title, content });
        setNotes([...notes, response.data]);
        setTitle('');
        setContent('');
    };

    return (
        <div className="container">
            <h1>Notes</h1>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="form-control"
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button className="btn btn-primary mt-2" onClick={createNote}>Create Note</button>
            </div>
            <ul className="list-group">
                {notes.map(note => (
                    <li key={note.id} className="list-group-item">
                        <h5>{note.title}</h5>
                        <p>{note.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;