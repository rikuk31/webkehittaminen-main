# Phase 4 – Projektin esittely

## 🎯 Projektin nimi

**WebNoteProject – Responsiivinen muistiinpanosovellus Reactilla**

---

## 📝 Projektin yleiskuvaus

WebNoteProject on selainpohjainen muistiinpanosovellus, jonka avulla käyttäjä voi luoda, muokata, poistaa ja etsiä muistiinpanoja sekä merkitä ne suosikeiksi. Sovellus on suunnattu erityisesti opiskelijoille ja tietotyöläisille, jotka tarvitsevat selkeän ja helppokäyttöisen tavan jäsentää ajatuksiaan. Sovellus toimii responsiivisesti eri laitteilla, ja se toteutettiin Web-ohjelmointi-kurssin projektityönä.

---

## 📌 Käyttötapausten yhteenveto

Linkki vaiheen 1 käyttötapauksiin: [Vaihe 1 - käyttötapaukset](https://github.com/rikuk31/webkehittaminen-main/blob/master/WebNoteProject/Projektisuunnitelmat/vaihe1.md)

| Käyttötapaus                                     | Toteutettu (K/E) | 
|--------------------------------------------------|------------------|
| Käyttäjä luo muistiinpanon                        | Kyllä            |
| Käyttäjä muokkaa olemassa olevaa muistiinpanoa   | Kyllä            |
| Käyttäjä poistaa muistiinpanon                   | Kyllä            |
| Käyttäjä hakee muistiinpanoja                     | Kyllä            |
| Käyttäjä merkitsee muistiinpanon suosikiksi       | Kyllä            |
| Käyttäjä tarkastelee suosikkimuistiinpanoja       | Kyllä            |

---

## ✍️ Tekninen toteutus

Sovelluksen frontend on toteutettu Reactilla ja Vite-kehitysympäristöllä. Backend on Node.js:llä rakennettu REST API, joka hyödyntää Expressiä. Tietokantana toimii PostgreSQL, ja tietokantayhteys hoidetaan `pg`-kirjastolla. Frontend ja backend kommunikoivat JSON-rajapinnan avulla. Sovellus on jaettu komponenttipohjaiseen arkkitehtuuriin, ja se on testattu Vitest- ja Playwright-testikirjastoilla. Backend, frontend ja tietokantanta pyörivät paikallisella virtuaalipalvelimella.

---

## 🚂 Kehitysprosessi

Projektin alussa määriteltiin selkeät käyttötapaukset ja suunniteltiin toteutusvaiheet vaiheittain. Ensimmäiseksi rakennettiin perustoteutus muistiinpanojen luonnille ja listaukselle. Tämän jälkeen lisättiin hakutoiminto ja suosikkimerkinnät. Projektin keskivaiheilla refaktoroitiin frontendin rakennetta ja kehitettiin komponenttien uudelleenkäytettävyyttä. Loppuvaiheessa panostettiin testaukseen ja virheenkäsittelyyn backendissä.

---

## ☀️ Reflektio ja jatkokehitys

Projektissa onnistuttiin erityisesti komponenttipohjaisessa rakenteessa ja yksinkertaisessa käyttöliittymässä. Suurimmat haasteet liittyivät testauksen ja virheenkäsittelyn yhteensovittamiseen backendissä. Jatkossa voisi kehittää käyttäjätunnistuksen (kirjautuminen), lisätä muistiinpanojen luokittelun ja synkronoinnin eri laitteiden välillä sekä kehittää mobiiliystävällisyyttä entisestään. Lisäksi palvelut voisi siirtää pilveen paikalliselta virtuaalikoneelta.

---

## 📊 Työtuntikirjanpito

| Päivämäärä  | Käytetty aika | Aihe |  Lopputulos |
| :---  |     :---:      |     :---:      |     :---:      |
| 23.3.2025 | 4t | Ensimmäisen vaiheen suunnittelua ja ohjelmistosuunnitelman laatimista |  Käyttäjäpersoonien, käyttötapauksien- ja tilanteiden laatiminen |
| 23.3.2025 | 3t | Ensimmäisen vaiheen suunnittelua ja ohjelmistosuunnitelman laatimista |  Tietoarkkitehtuurin, teknisen suunnittelun, projektinhallinnan ja käyttäjätestauksen laatiminen |
| 24.3.2025 | 3t | Ensimmäisen vaiheen suunnittelua |  Prototyyppien laatiminen |
| 25.3.2025 | 1t | Ensimmäisen vaiheen suunnittelua | Protyyppien lisääminen projektisuunnitelmaan ja tyylistystä  |
| 26.3.2025 | 2t | Ensimmäisen vaiheen suunnittelua |  Projektisuunnitelman viimeistelyä ja tyylitystä |
| 27.3.2025 | 1t | Ensimmäisen vaiheen suunnittelua |  Kehitysideoiden miettimistä ja kirjaamista |
| 1.4.2025 | 2t | Ensimmäisen vaiheen suunnittelua |  Tietokannan rakenteen ja testitapauksien lisääminen sekä käyttötapausten yhtenäistämistä |
| 11.4.2025 | 6t | Toisen vaiheen toteutusta |  Tietokannan rakentaminen ja rungon aloitus |
| 12.4.2025 | 7t | Toisen vaiheen toteutusta |  Backendin toteutusta |
| 13.4.2025 | 10t | Toisen vaiheen toteutusta |  Backendin ja frontendin toteutusta |
| 14.4.2025 | 2t | Toisen vaiheen toteutusta |  Backendin ja frontendin toteutusta |
| 15.4.2025 | 3t | Toisen vaiheen toteutusta |  Testauksen toteutusta ja koodin dokumentointia |
| 16.4.2025 | 6t | Toisen vaiheen toteutusta |  Testauksen toteutusta ja koodin dokumentointia |
| 17.4.2025 | 8t | Toisen vaiheen toteutusta |  Koodin viimeistelyä |
| 18.4.2025 | 4t | Toisen vaiheen toteutusta |  Projektin dokumentointia |
| 24.4.2025 | 2t | Neljännen vaiheen toteutusta |  Esittelyn luonti |
| **Yhteensä** | **64t** |  |  |

---

## 🪢 Esityksen linkki

Esitys pidetään livenä oppitunnilla 29.4.2025.
