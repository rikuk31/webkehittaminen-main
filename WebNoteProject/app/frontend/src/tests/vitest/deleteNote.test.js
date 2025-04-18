import { describe, it, expect } from 'vitest'; // Tuodaan testikirjaston funktiot
import axios from 'axios'; // Käytetään HTTP-pyyntöihin

// Testikokonaisuus: muistiinpanon poistaminen
describe('Muistiinpanon poistaminen', () => {
  it('Luodaan, poistetaan ja varmistetaan, että muistiinpano on poistettu', async () => {
    // 1. Luodaan uusi muistiinpano
    const newNote = {
      title: 'Testimuistiinpano',
      content: 'Tämä on testimuistiinpano, joka poistetaan myöhemmin.'
    };

    // Lähetetään POST-pyyntö palvelimelle
    const createResponse = await axios.post('http://localhost:5000/api/notes', newNote);

    // Varmistetaan, että palvelin vastaa tilakoodilla 201 (Created)
    expect(createResponse.status).toBe(201);

    // Haetaan luodun muistiinpanon tiedot
    const createdNote = createResponse.data;

    // Tarkistetaan, että luotu muistiinpano sisältää oikeat arvot
    expect(createdNote.title).toBe(newNote.title);
    expect(createdNote.content).toBe(newNote.content);

    const noteId = createdNote.id; // Tallennetaan ID poistamista varten

    // 2. Poistetaan muistiinpano DELETE-pyynnöllä
    const deleteResponse = await axios.delete(`http://localhost:5000/api/notes/${noteId}`);

    // Varmistetaan, että poistaminen onnistui
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.data.id).toBe(noteId);

    // 3. Yritetään hakea poistettu muistiinpano -> pitäisi aiheuttaa 404-virhe
    try {
      await axios.get(`http://localhost:5000/api/notes/${noteId}`);
    } catch (error) {
      // Odotetaan 404 Not Found -vastetta, koska muistiinpanoa ei pitäisi enää olla olemassa
      expect(error.response.status).toBe(404);
    }
  });
});
