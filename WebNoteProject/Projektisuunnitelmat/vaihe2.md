# Projekti vaihe 2 - Perus rakenne ja pää-toimninnallisuudet

WebNoteProject on Node.js:llä ja Expressillä toteutettu RESTful-sovellus, joka mahdollistaa muistiinpanojen hallinnan. Sovellus tarjoaa seuraavat toiminnot:​
- Muistiinpanojen luonti
- Muistiinpanojen haku ja listaus
- Muistiinpanojen muokkaus
- Muistiinpanojen poisto
- Muistiinpanojen merkitseminen suosikeiksi
- Suosikkimuistiinpanojen listaus​

## 1. Ympäristö

Projekti on jaettu frontend- ja backend-osioihin. Frontend toimii Reactilla selaimessa, ja backend toimii Node.js:n ja Expressin päällä, PostgreSQL-tietokannan kanssa. Backend tarjoaa REST API -rajapinnan, ja frontend kommunikoi sen kanssa Axios-kirjaston kautta. Kehitysympäristö toimii Vite- ja npm-työkalujen avulla.

## 2. Sovelluslogiikka
Backend on rakennettu Node.js:llä ja Express.js-sovelluskehyksellä. Se tarjoaa RESTful-rajapinnan muistiinpanojen hallintaan. Tiedot tallennetaan PostgreSQL-tietokantaan, ja sovellus tukee mm. muistiinpanojen lisäämistä, hakua, muokkaamista, poistamista sekä suosikiksi merkitsemistä.

### Käytetyt teknologiat
- Node.js – JavaScript-ajoympäristö palvelinpuolen sovellukselle
- Express.js – kevyt web-framework reititystä ja API-pyyntöjä varten
- PostgreSQL – relaatiotietokanta muistiinpanojen tallentamiseen
- pg – PostgreSQL-tietokantakirjasto Node.js:lle
- CORS & body-parser – JSON-datan ja selaimen välisen viestinnän hallintaan

### Api-päätepisteet
#### Metodi | Polku | Kuvaus
- GET | /api/notes | Hakee kaikki muistiinpanot (myös haun kanssa)
- POST | /api/notes | Lisää uuden muistiinpanon
- GET | /api/notes/:id | Hakee yksittäisen muistiinpanon
- PUT | /api/notes/:id | Päivittää muistiinpanon
- DELETE | /api/notes/:id | Poistaa muistiinpanon
- GET | /api/notes/favorite | Hakee suosikkimuistiinpanot
- PUT | /api/notes/:id/favorite | Päivittää muistiinpanon suosikkistatuksen

## 3. Käyttöliittymä
Käyttöliittymä on rakennettu Reactilla ja tarjoaa seuraavat ominaisuudet:

- Näytä kaikki muistiinpanot
- Suodata hakusanan perusteella
- Lisää, muokkaa ja poista muistiinpanoja
- Merkitse muistiinpano suosikiksi
- Näytä vain suosikit

UI on tyylitelty Tailwind CSS:n avulla. Komponentit on eroteltu selkeästi, ja käyttö on intuitiivista ja yksinkertaista.

## 4. Tietokanta
Tietokanta toteuttiin käyttämällä Postgres-tietokantaa. Tietokanta asennettiin virtuaalikoneelle ja siinä on seuraavanlainen taulukko sekä trigger toiminto. Trigger toiminto päivittää muokkaus ajan muistiinpanoon kun sitä on muokattu.
![tietokanta](https://github.com/user-attachments/assets/1ed2eabd-3946-43ee-8af6-4ecd4e5f7ccf)


## 5. Arkkitehtuuri

Sovellus noudattaa komponenttipohjaista rakennetta. Kansiorakenne:

app/&nbsp; ├── backend/&nbsp;          # Node.js + Express -pohjainen API ja tietokantayhteys  
app/&nbsp; ├── frontend/&nbsp;         # React-sovellus  
app/&nbsp; │   ├── public/&nbsp;      # Staattiset tiedostot  
app/&nbsp; │   └── src/&nbsp;  
app/&nbsp; │       ├── components/&nbsp;    # React-komponentit (NoteForm, NoteList, NoteItem...)  
app/&nbsp; │       ├── services/&nbsp;      # Axios-kutsut backendille (noteService.js)  
app/&nbsp; │       ├── tests/&nbsp;         # Yksikkötestit komponenttien toiminnalle  
app/&nbsp; │       └── App.jsx/&nbsp;        # Sovelluksen pääkomponentti  
app/&nbsp; └── package.json/&nbsp;      # Projektin riippuvuudet ja skriptit




## 6. Toiminnallisuudet
## Frontend

- Näytä kaikki muistiinpanot
- Hakukenttä (filtteröinti otsikon tai sisällön perusteella)
- Muistiinpanon lisäys, muokkaus ja poisto
- Suosikiksi merkitseminen ja suosikkien suodatus
- Responsiivinen käyttöliittymä

## Backend:

- REST API (GET, POST, PUT, DELETE)
- PostgreSQL-tietokanta
- Virheenkäsittely ja tiedon validointi
- Suosikkisuodatus ja hakuparametri

## 7. Koodin laatu ja dokumentaatio

Koodi on selkeästi jäsennelty komponenttipohjaisesti. Jokainen toiminnallisuus on kapseloitu omaan komponenttiinsa. Koodissa on mukana selittäviä kommentteja (//) kriittisissä kohdissa, ja muuttujanimet ovat kuvaavia. Projektissa käytetään Tailwind CSS -luokkia tyylittelyyn ilman erillisiä CSS-tiedostoja, mikä tekee tyylien hallinnasta kevyttä ja komponenttipohjaista.

## 8. Testaus ja virheiden hallinta
## Testaus
Sovelluksessa on käytetty yksikkö-, päästä-päähän- ja kuormitustestausta sovelluksen toimivuuden varmistamiseksi. Yksikkötestaus on toteutettu Vitestillä, päästä-päähän testaus Playwrightilla ja kuormitustestaus K6:lla.

### Yksikkötestaus
#### Muistiinpanon luominen
1. Testaa muistiinpanon luomista palvelimelle POST /api/notes -pyynnöllä.
2. Varmistaa, että palvelin palauttaa tilakoodin 201 Created.
3. Tarkistaa, että luodun muistiinpanon otsikko, sisältö ja suosikkitila ovat oikein.

#### Muistiinpanon poistaminen
1. Luo ensin muistiinpanon POST /api/notes-pyynnöllä.
2. Poistaa sen DELETE /api/notes/:id-pyynnöllä.
3. Varmistaa, että poistetun muistiinpanon hakeminen palauttaa 404 Not Found-virheen.

#### Suoikkimuistiinpanojen hakeminen
1. Lähettää GET /api/notes/favorite-pyynnön, joka hakee kaikki suosikkimuistiinpanot.
2. Varmistaa, että palvelin palauttaa tilakoodin 200 OK ja datan olevan taulukko.
3. Tarkistaa, että kaikilla muistiinpanolla on isFavorite-kenttä asetettu arvoon true.

#### Muistiinpanon hakeminen ja poistaminen
Tässä testissä:
1. Luodaan muistiinpano.
2. Haetaan se yksittäisenä resurssina.
3. Poistetaan se.
4. Varmistetaan, ettei sitä enää löydy.

#### Muistiinpanon muokkaaminen ja poistaminen
1. Luo muistiinpanon.
2. Muokkaa sitä PUT /api/notes/:id-pyynnöllä.
3. Varmistaa, että päivitys tallentui oikein.
4. Poistaa muistiinpanon ja tarkistaa, ettei sitä enää löydy.

### Päästä-päähän testaus

#### Muistiinpanon luominen
**Tarkoitus:** Varmistaa, että uusi muistiinpano voidaan luoda API:n kautta.  
**Toteutus:**
- Luodaan satunnaisella otsikolla varustettu muistiinpano.
- Lähetetään `POST`-pyyntö backendille.
- Varmistetaan, että statuskoodi on `201`.
- Tarkistetaan, että palautetun muistiinpanon tiedot vastaavat syötettyjä tietoja.

#### Muistiinpano näkyy sovelluksessa
**Tarkoitus:** Varmistaa, että luotu muistiinpano ilmestyy käyttöliittymässä näkyviin.  
**Toteutus:**
- Luodaan muistiinpano backendin kautta.
- Siirrytään frontend-sivulle.
- Odotetaan, että `.note-grid` latautuu.
- Etsitään muistiinpano otsikon perusteella ja varmistetaan sen näkyvyys.

#### Muistiinpano hover-efekti
**Tarkoitus:** Testata hover-efektin visuaalista toimivuutta.  
**Toteutus:**
- Luodaan uusi muistiinpano.
- Siirrytään frontend-sivulle.
- Hoveroidaan muistiinpanon kortin päälle.
- Tarkistetaan, että CSS `transform`-arvo vastaa odotettua `matrix(1, 0, 0, 1, 0, -5)`.

#### Muistiinpanon merkitseminen suosikiksi
**Tarkoitus:** Varmistaa, että muistiinpano voidaan merkitä suosikiksi.  
**Toteutus:**
- Luodaan muistiinpano.
- Siirrytään frontend-sivulle.
- Etsitään muistiinpanon kortti ja sen sisältämä `.favorite`-painike.
- Klikataan suosikkipainiketta.
- Tarkistetaan, että painikkeen teksti muuttuu tähdeksi (`★`).

#### Muistiinpanon poistaminen vahvistuksen kanssa
**Tarkoitus:** Varmistaa, että muistiinpano voidaan poistaa ja että poistaminen vaatii vahvistuksen.  
**Toteutus:**
- Luodaan muistiinpano.
- Siirrytään frontend-sivulle.
- Etsitään muistiinpanon kortti ja sen poistopainike.
- Kuunnellaan selaimen vahvistusdialogia ja hyväksytään se.
- Odotetaan, että muistiinpano katoaa näkymästä.
- Varmistetaan lisäksi, että muistiinpano ei enää löydy backendistä (`404 Not Found`).


### Kuomitustestaus
Kuormitustestauksessa käytettiin k6-työkalua. Testiskripti loadtest.js suorittaa seuraavat toimenpiteet:​

- Hakee kaikki muistiinpanot.
- Luo uuden muistiinpanon.
- Hakee luodun muistiinpanon.
- Päivittää muistiinpanon tiedot.
- Merkitsee muistiinpanon suosikiksi.
- Poistaa muistiinpanon.
  
## Virheiden hallinta
Sovelluksessa on perustason virheenkäsittely Axios-pyyntöjen yhteydessä.
Jos palvelin ei vastaa tai jokin toiminto epäonnistuu, konsoliin tulostetaan virhe.
Sovellus ei kaadu virhetilanteissa, vaan näyttää oletusnäkymän.

Lisäksi Reactin useEffect- ja try/catch-rakenteita käytetään tiedon hakemisessa ja päivittämisessä virheiden hallitsemiseksi.

## 9. Käyttäjien vuorovaikutus

### Sovellus on suunniteltu yksinkertaiseksi ja intuitiiviseksi:

- Käyttäjä voi heti nähdä muistiinpanot
- Toiminnot (lisäys, muokkaus, poisto, suosikki) toimivat yhdellä klikkauksella
- Hakukenttä mahdollistaa nopean filtteröinnin
- Käyttöliittymä ei vaadi uudelleenlatausta – kaikki tapahtuu sujuvasti Reactin sisällä
