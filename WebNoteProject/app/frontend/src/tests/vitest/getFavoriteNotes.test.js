import { describe, it, expect } from 'vitest'; // Tuodaan testikirjaston funktiot
import axios from 'axios'; // HTTP-pyyntöjen tekemiseen

// Testikokonaisuus: suosikkimuistiinpanojen hakeminen
describe('Suosikkimuistiinpanojen hakeminen', () => {
  it('Haetaan suosikkimuistiinpanot GET-pyynnöllä', async () => {
    // Lähetetään GET-pyyntö suosikkimuistiinpanojen reitille
    const response = await axios.get('http://localhost:5000/api/notes/favorite');

    // Tarkistetaan, että vastaus on onnistunut (HTTP 200 OK)
    expect(response.status).toBe(200);

    // Varmistetaan, että saatu data on taulukko
    expect(Array.isArray(response.data)).toBe(true);

    // Tarkistetaan, että jokaisella muistiinpanolla on isFavorite === true
    expect(response.data.every(note => note.isFavorite)).toBe(true);
  });
});
