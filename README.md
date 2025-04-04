# 🧘 MeditActive API

API RESTful per la gestione di utenti, obiettivi e intervalli di meditazione quotidiana.

> ✅ \*\*Progetto realizzato per il corso di Node.js su \*\***[Start2Impact University](https://www.start2impact.it/)**

---

## 🧠 Descrizione del progetto

**MeditActive** è una piattaforma backend pensata per supportare un'app di meditazione e crescita personale.
Gli utenti possono:

- Registrarsi e gestire il proprio profilo
- Creare obiettivi meditativi giornalieri, mensili o annuali
- Pianificare intervalli temporali per il raggiungimento di obiettivi
- Collegare più obiettivi a ciascun intervallo

Tutto nel rispetto di principi sostenibili: i server utilizzano solo energia rinnovabile. 🌱

---

## 👤 Cliente (ipotetico)

**MeditActive** nasce per aiutare le persone a ritrovare equilibrio interiore e benessere mentale.
Fondata da un insegnante di meditazione con oltre 20 anni di esperienza e una Project Manager con 16 anni di carriera, l'app intende rendere la meditazione accessibile a tutti.



---

## 🚀 Tecnologie principali

- **Node.js** + **Express**
- **MySQL** con `mysql2`
- **Autenticazione JWT**
- **Unit testing** con Mocha, Chai, Supertest
- **Validazione** con express-validator
- **Upload avatar** con Multer
- **Documentazione** Swagger/OpenAPI

---

## 📦 Setup progetto

1. Clona la repo:

   ```bash
   git clone https://github.com/andreaferrari95/meditactive-api.git
   cd meditactive-api
   ```

2. Installa le dipendenze:

   ```bash
   npm install
   ```

3. Crea il file `.env`:

   ```env
   # .env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=meditactive
   PORT=4000
   JWT_SECRET=supersegreto
   ```

4. (Facoltativo) Esegui il seed dati:

   ```bash
   mysql -u root -p meditactive < database/seed.sql
   ```

5. Avvia il progetto:

   ```bash
   npm run dev
   ```

---

## 🧪 Test automatici

Esegui tutti i test:

```bash
npm test
```

Test coprono:

- CRUD utenti
- Validazioni
- Obiettivi (goals)
- Intervalli (goal\_intervals)
- Upload avatar
- Login JWT

---

## 📚 Documentazione API

Swagger UI attivo su:
👉 [http://localhost:4000/api-docs](http://localhost:4000/api-docs)

Include:

- `/users`, `/goals`, `/goal-intervals`
- Filtri su intervalli
- Associazioni obiettivi-intervalli

---

## 📌 Autore

Progetto sviluppato per l'azienda ipotetica **MeditActive**. A cura di: Andrea Ferrari ✨

