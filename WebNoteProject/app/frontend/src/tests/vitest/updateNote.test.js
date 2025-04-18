import { describe, it, expect } from 'vitest';
import axios from 'axios';

describe('Muistiinpanon muokkaaminen ja poistaminen', () => {
  it('Luodaan, muokataan ja poistetaan muistiinpano', async () => {
    // Luodaan satunnainen otsikko, jotta testi ei törmää muihin tietueisiin
    const randomTitle = `Testimuistiinpano-${Math.random().toString(36).substring(7)}`;
    const newNote = {
      title: randomTitle,
      content: 'Tämä on testimuistiinpano, joka luodaan, muokataan ja poistetaan.'
    };

    // 1. Luodaan muistiinpano POST-pyynnöllä
    const createResponse = await axios.post('http://localhost:5000/api/notes', newNote);
    expect(createResponse.status).toBe(201); // Varmistetaan että luonti onnistui
    const createdNote = createResponse.data;
    expect(createdNote.title).toBe(newNote.title);
    expect(createdNote.content).toBe(newNote.content);

    const noteId = createdNote.id; // Muistiinpanon ID talteen

    // 2. Muokataan muistiinpanoa PUT-pyynnöllä
    const updatedNote = {
      title: 'Updated Title',
      content: 'Updated Content',
      isFavorite: true
    };
    const updateResponse = await axios.put(`http://localhost:5000/api/notes/${noteId}`, updatedNote);
    expect(updateResponse.status).toBe(200); // Päivityksen pitää onnistua
    expect(updateResponse.data.title).toBe(updatedNote.title);
    expect(updateResponse.data.content).toBe(updatedNote.content);
    expect(updateResponse.data.isFavorite).toBe(updatedNote.isFavorite);

    // 3. Varmistetaan että päivitys tallentui oikein
    const getResponse = await axios.get(`http://localhost:5000/api/notes/${noteId}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.data.title).toBe(updatedNote.title);
    expect(getResponse.data.content).toBe(updatedNote.content);
    expect(getResponse.data.isFavorite).toBe(updatedNote.isFavorite);

    // 4. Poistetaan muistiinpano
    const deleteResponse = await axios.delete(`http://localhost:5000/api/notes/${noteId}`);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.data.id).toBe(noteId); // Poistetun muistiinpanon ID pitää täsmätä

    // 5. Varmistetaan, että muistiinpanoa ei enää ole
    try {
      await axios.get(`http://localhost:5000/api/notes/${noteId}`);
    } catch (error) {
      expect(error.response.status).toBe(404); // Haku palauttaa 404, koska muistiinpano on poistettu
    }
  });
});
