import { describe, it, expect } from 'vitest'; // Testauskirjaston funktiot
import axios from 'axios'; // HTTP-pyyntöjä varten

// Testikokonaisuus muistiinpanon luomiselle
describe('Muistiinpanon luominen', () => {
  // Yksittäinen testitapaus
  it('Luodaan uusi muistiinpano POST-pyynnöllä', async () => {
    // Määritellään uusi muistiinpano, joka lähetetään palvelimelle
    const newNote = { title: 'Test Title', content: 'Test Content' };
    
    // Lähetetään POST-pyyntö backendille, joka luo uuden muistiinpanon
    const response = await axios.post('http://localhost:5000/api/notes', newNote);
    
    // Varmistetaan, että palvelin palauttaa onnistuneen tilakoodin (201 Created)
    expect(response.status).toBe(201);

    // Tarkistetaan, että vastauksen tiedot vastaavat lähetettyä sisältöä
    expect(response.data.title).toBe(newNote.title);
    expect(response.data.content).toBe(newNote.content);

    // Varmistetaan, että uusi muistiinpano ei ole oletuksena suosikki
    expect(response.data.isFavorite).toBe(false);
  });
});
