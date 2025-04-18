import { describe, it, expect } from 'vitest'; // Testikirjaston funktiot
import axios from 'axios'; // HTTP-pyyntöjen tekoon

describe('Muistiinpanon hakeminen ja poistaminen', () => {
  it('Luodaan, haetaan ja poistetaan muistiinpano', async () => {
    // Luodaan satunnainen otsikko testin erottamiseksi muista
    const randomTitle = `Testimuistiinpano-${Math.random().toString(36).substring(7)}`;
    const newNote = {
      title: randomTitle,
      content: 'Tämä on testimuistiinpano, joka luodaan, haetaan ja poistetaan.'
    };

    // 1. Luodaan uusi muistiinpano POST-pyynnöllä
    const createResponse = await axios.post('http://localhost:5000/api/notes', newNote);
    expect(createResponse.status).toBe(201); // Varmistetaan että luonti onnistui
    const createdNote = createResponse.data;
    expect(createdNote.title).toBe(newNote.title); // Otsikon pitää täsmätä
    expect(createdNote.content).toBe(newNote.content); // Sisällön pitää täsmätä

    const noteId = createdNote.id; // Talteen muistiinpanon ID

    // 2. Haetaan luotu muistiinpano GET-pyynnöllä
    const getResponse = await axios.get(`http://localhost:5000/api/notes/${noteId}`);
    expect(getResponse.status).toBe(200); // Varmistetaan että haku onnistui
    expect(getResponse.data.id).toBe(noteId);
    expect(getResponse.data.title).toBe(newNote.title);
    expect(getResponse.data.content).toBe(newNote.content);

    // 3. Poistetaan muistiinpano DELETE-pyynnöllä
    const deleteResponse = await axios.delete(`http://localhost:5000/api/notes/${noteId}`);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.data.id).toBe(noteId); // Varmistetaan, että oikea muistiinpano poistettiin

    // 4. Yritetään hakea poistettu muistiinpano, pitäisi tulla 404
    try {
      await axios.get(`http://localhost:5000/api/notes/${noteId}`);
    } catch (error) {
      expect(error.response.status).toBe(404); // Varmistetaan että muistiinpanoa ei löydy
    }
  });
});
