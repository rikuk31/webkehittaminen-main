import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // Virtual users
  duration: '30s', // Testin kesto
};

const BASE_URL = 'http://localhost:5000/api/notes';

export default function () {
  // 1. Hae kaikki muistiinpanot
  const allNotes = http.get(BASE_URL);
  check(allNotes, {
    'get /notes status is 200': (res) => res.status === 200,
  });

  // 2. Lisää uusi muistiinpano
  const notePayload = JSON.stringify({
    title: `Test Note ${__VU}-${__ITER}`,
    content: 'This is a test note',
  });
  const headers = { 'Content-Type': 'application/json' };
  const createRes = http.post(BASE_URL, notePayload, { headers });
  check(createRes, {
    'post /notes status is 201': (res) => res.status === 201,
  });

  const note = createRes.json();

  // 3. Hae yksittäinen muistiinpano
  const getRes = http.get(`${BASE_URL}/${note.id}`);
  check(getRes, {
    'get /notes/:id status is 200': (res) => res.status === 200,
  });

  // 4. Päivitä muistiinpano
  const updatePayload = JSON.stringify({
    title: 'Updated Title',
    content: 'Updated content',
    isFavorite: true,
  });
  const updateRes = http.put(`${BASE_URL}/${note.id}`, updatePayload, { headers });
  check(updateRes, {
    'put /notes/:id status is 200': (res) => res.status === 200,
  });

  // 5. Merkitse muistiinpano suosikiksi
  const favPayload = JSON.stringify({ isFavorite: true });
  const favRes = http.put(`${BASE_URL}/${note.id}/favorite`, favPayload, { headers });
  check(favRes, {
    'put /notes/:id/favorite status is 200': (res) => res.status === 200,
  });

  // 6. Poista muistiinpano
  const deleteRes = http.del(`${BASE_URL}/${note.id}`);
  check(deleteRes, {
    'delete /notes/:id status is 200': (res) => res.status === 200,
  });

  sleep(1); // Lepo jokaisen kierroksen jälkeen
}
