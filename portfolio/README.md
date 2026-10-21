# Prithviraj Singh Chouhan — Portfolio (MERN)

A code-editor-inspired developer portfolio. The homepage is styled like an IDE:
a file-explorer sidebar on the left ("about.py", "skills.py", "projects.py" …)
and a main pane that reads like an open file, with a line-number gutter and
comment-style section headers. Built to reflect a Python/Django backend
developer's day-to-day tool — not a generic template.

## Stack

- **Frontend:** React 18 + Vite, plain CSS (no framework), fetches data from the API
- **Backend:** Node.js + Express, serves your profile data as JSON from `server/data/profile.json`
- **Database:** MongoDB (optional) — the server works out of the box reading from the JSON
  file; a Mongoose model + seed script is included so you can switch to MongoDB later
  without touching the frontend.

## Project structure

```
portfolio/
├── client/                 # React (Vite) frontend
│   └── src/
│       ├── components/     # Sidebar, TabBar, sections (About, Skills, Projects, …)
│       ├── data/profile.js # Local fallback data (same shape as the API)
│       ├── App.jsx
│       └── index.css       # All styling — design tokens at the top
├── server/                 # Express backend
│   ├── data/profile.json   # Your resume content, editable directly
│   ├── models/Profile.js   # Mongoose schema (optional MongoDB path)
│   ├── routes/api.js       # GET /api/profile, POST /api/contact
│   └── server.js
└── README.md
```

## Running it locally

### 1. Backend

```bash
cd server
npm install
npm run dev        # starts on http://localhost:5000
```

By default it reads `server/data/profile.json`. To use MongoDB instead, set
`MONGO_URI` in a `.env` file in `server/` and run `npm run seed` once to load
`profile.json` into the `profiles` collection — `server.js` will automatically
prefer Mongo when `MONGO_URI` is set.

### 2. Frontend

```bash
cd client
npm install
npm run dev         # starts on http://localhost:5173
```

The client calls `VITE_API_URL` (defaults to `http://localhost:5000/api/profile`).
If the API isn't reachable, it silently falls back to the bundled
`src/data/profile.js` so the site still renders.

## Customizing

- **Content:** edit `server/data/profile.json` (or `client/src/data/profile.js` for the
  offline fallback) — name, summary, experience, projects, skills, education, certifications.
- **Colors/fonts:** all design tokens are CSS variables at the top of `client/src/index.css`.
- **Sections:** each "file" in the sidebar maps to one component in
  `client/src/components/`; add a new entry to the `sections` array in `App.jsx`
  to add a new tab.
- **Contact form:** `POST /api/contact` sends you a real email via Nodemailer whenever
  someone submits the form — see "Setting up the contact form email" below.

## Setting up the contact form email

The contact form emails you directly using Gmail + Nodemailer. It needs two things in
`server/.env` (copy `server/.env.example` to `server/.env` first):

```
EMAIL_USER=youraddress@gmail.com
EMAIL_PASS=your16characterapppassword
CONTACT_TO=youraddress@gmail.com     # optional, defaults to EMAIL_USER
```

**Important — do not use your normal Gmail password.** Google blocks plain-password
logins from apps like this. You need an **App Password** instead:

1. Turn on 2-Step Verification on your Google account, if it isn't already:
   https://myaccount.google.com/security
2. Go to https://myaccount.google.com/apppasswords
3. Create a new App Password (name it something like "Portfolio Contact Form")
4. Google gives you a 16-character code (e.g. `abcd efgh ijkl mnop`) — paste that into
   `EMAIL_PASS` in `server/.env`, with or without the spaces.

Keep `server/.env` local — it's already listed in `server/.gitignore` so it won't get
committed or pushed to GitHub. Never paste real credentials into a chat, issue, or
commit message.

Restart the backend (`npm run dev`) after editing `.env` so it picks up the new values.
If `EMAIL_USER`/`EMAIL_PASS` aren't set, the contact form still works but just logs the
message to the server console instead of emailing it.

When you deploy the backend (Render/Railway/etc.), set the same three variables in that
host's environment variable settings — don't put them in the code.

## Deploying

- Frontend: `npm run build` in `client/` → deploy the `dist/` folder to Vercel/Netlify.
- Backend: deploy `server/` to Render/Railway, set `MONGO_URI` + `PORT` env vars.
- Update `VITE_API_URL` in the client's `.env` to point at your deployed API.
