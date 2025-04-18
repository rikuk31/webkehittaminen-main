import { test, expect } from '@playwright/test';
import axios from 'axios';

// Testi: Muistiinpanon luominen
test('Muistiinpanojen luominen', async () => {
  const newNote = {
    title: `Test Note ${Math.random().toString(36).substring(7)}`,  // Random uniikki otsikko
    content: 'Tämä on testisisältö'
  };

  console.log('Lähetetään POST-pyyntö uuden muistiinpanon luomiseksi...');
  const createResponse = await axios.post('http://192.168.127.129:5000/api/notes', newNote);

  // Varmista, että muistiinpano luotiin oikein
  console.log('Varmistetaan, että muistiinpano luotiin oikein...');
  expect(createResponse.status).toBe(201);
  const createdNote = createResponse.data;
  expect(createdNote.title).toBe(newNote.title);
  expect(createdNote.content).toBe(newNote.content);
  console.log('Muistiinpano luotu onnistuneesti:', createdNote);
});

// Testi: Muistiinpano näkyy sovelluksessa
test('Muistiinpano näkyy sovelluksessa', async ({ page }) => {
  const newNote = {
    title: `Test Note ${Math.random().toString(36).substring(7)}`,  // Random uniikki otsikko
    content: 'Tämä on testisisältö'
  };

  console.log('Lähetetään POST-pyyntö uuden muistiinpanon luomiseksi...');
  await axios.post('http://192.168.127.129:5000/api/notes', newNote);

  // Siirry sovellukseen ja tarkista, että muistiinpano näkyy
  console.log('Navigoidaan sovellukseen...');
  await page.goto('http://192.168.127.129:3000');
  await page.locator('.note-grid').waitFor();  // Odotetaan, että muistiinpanot on ladattu
  console.log('Sovellus ladattu ja muistiinpano näkyy.');

  const noteItem = await page.locator(`text=${newNote.title}`);
  await expect(noteItem).toBeVisible();  // Varmistetaan, että kortti näkyy
  console.log(`Muistiinpano "${newNote.title}" näkyy sovelluksessa.`);
});

// Testi: Muistiinpano hover-efekti
test('Muistiinpano hover-efekti', async ({ page }) => {
  const newNote = {
    title: `Test Note ${Math.random().toString(36).substring(7)}`,  // Random uniikki otsikko
    content: 'Tämä on testisisältö'
  };

  console.log('Lähetetään POST-pyyntö uuden muistiinpanon luomiseksi...');
  await axios.post('http://192.168.127.129:5000/api/notes', newNote);

  // Siirry sovellukseen
  console.log('Navigoidaan sovellukseen...');
  await page.goto('http://192.168.127.129:3000');
  await page.locator('.note-grid').waitFor();
  console.log('Sovellus ladattu ja muistiinpano näkyy.');

  const noteItem = await page.locator(`text=${newNote.title}`);
  const noteCard = noteItem.locator('..'); // Etsi kortti, joka sisältää muistiinpanon

  // Hover ja tarkista CSS
  console.log('Aloitetaan hover-toiminto...');
  await noteCard.hover();
  console.log('Hover-efekti suoritettu.');

  await expect(noteCard).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, -5)');  // Hover-efektin tarkistus
  console.log('Hover-efekti tarkistettu onnistuneesti.');
});

// Testi: Muistiinpanon merkitseminen suosikiksi
test('Muistiinpanon merkitseminen suosikiksi', async ({ page }) => {
  const newNote = {
    title: `Test Note ${Math.random().toString(36).substring(7)}`,
    content: 'Tämä on testisisältö'
  };

  console.log('Lähetetään POST-pyyntö uuden muistiinpanon luomiseksi...');
  const createResponse = await axios.post('http://192.168.127.129:5000/api/notes', newNote);
  const createdNote = createResponse.data;
  console.log('Muistiinpano luotu:', createdNote);

  // Siirry sovellukseen
  console.log('Navigoidaan sovellukseen...');
  await page.goto('http://192.168.127.129:3000');
  await page.locator('.note-grid').waitFor();
  console.log('Sovellus ladattu ja muistiinpano näkyy.');

  // Etsi muistiinpanon kortti
  console.log(`Etsitään korttia, jonka otsikko on: "${newNote.title}"`);
  const noteItem = page.locator(`.note-card:has-text("${newNote.title}")`).first();
  const favoriteButton = noteItem.locator('.favorite');

  // Varmista, että suosikkipainike on näkyvissä ennen klikkaamista
  console.log('Odottamassa, että suosikkipainike tulee näkyviin...');
  await favoriteButton.waitFor({ state: 'visible' });
  console.log('Suosikkipainike näkyvissä.');

  // Klikkaa suosikkipainiketta
  console.log('Klikataan suosikkipainiketta...');
  await favoriteButton.click();
  
  // Tarkista, että suosikkipainikkeen teksti muuttuu täheksi
  console.log('Tarkistetaan, että painikkeen teksti on nyt tähti...');
  await expect(favoriteButton).toHaveText('★');
  console.log('Testi suoritettu onnistuneesti.');
});

// Testi: Muistiinpanojen poistaminen vahvistuksen kanssa
test('Muistiinpanojen poistaminen vahvistuksen kanssa', async ({ page }) => {
  const newNote = {
    title: `Test Note ${Math.random().toString(36).substring(7)}`,  // Random uniikki otsikko
    content: 'Tämä on testisisältö'
  };

  console.log('Lähetetään POST-pyyntö uuden muistiinpanon luomiseksi...');
  const createResponse = await axios.post('http://192.168.127.129:5000/api/notes', newNote);
  const createdNote = createResponse.data;
  console.log('Muistiinpano luotu:', createdNote);

  // Siirry sovellukseen ja varmista, että muistiinpano näkyy
  console.log('Navigoidaan sovellukseen...');
  await page.goto('http://192.168.127.129:3000');
  await page.locator('.note-grid').waitFor();
  console.log('Sovellus ladattu ja muistiinpano näkyy.');

  // Etsi luotu muistiinpano ja poista se
  console.log(`Etsitään korttia otsikolla: "${newNote.title}"`);
  const noteItem = page.locator(`.note-card:has-text("${newNote.title}")`).first();
  const deleteButton = noteItem.locator('.delete');

  // Kuuntele vahvistusikkunaa ja hyväksy se automaattisesti
  page.on('dialog', async dialog => {
    console.log('Vahvistusikkuna löytyi:', dialog.message());
    await dialog.accept();  // Hyväksy vahvistus
  });

  console.log('Klikataan poista-nappia...');
  await deleteButton.click();

  // Odota, että muistiinpano katoaa näkyvistä (pidentäen odotusaikaa)
  console.log('Odottamassa, että muistiinpano katoaa näkyvistä...');
  try {
    await page.locator(`.note-card:has-text("${newNote.title}")`).waitFor({ state: 'detached', timeout: 10000 });  // Pidennetään odotusaikaa 10 sekuntiin
  } catch (e) {
    console.log('Muistiinpano ei kadonnut odotetusti.', e);
    throw e;
  }

  // Varmista, että muistiinpano on poistettu backendistä
  try {
    console.log('Tarkistetaan, onko muistiinpano poistettu backendistä...');
    await axios.get(`http://192.168.127.129:5000/api/notes/${createdNote.id}`);
    throw new Error('Muistiinpano löytyi, vaikka se olisi pitänyt olla poistettu');
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log('Muistiinpano poistettu onnistuneesti backendistä (404)');
    } else {
      throw error;  // heitetään virhe, jos tilakoodi ei ole 404
    }
  }
});
