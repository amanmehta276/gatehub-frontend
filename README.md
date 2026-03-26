# GateHub Frontend

Modern engineering resource platform for students and faculty. Built with vanilla HTML, CSS, and JavaScript.

## 🌐 Live URL
```
https://projectalps.netlify.app
```

## 📖 About

GateHub is a centralized academic library for engineering students. Students can browse subjects by branch, view PDF notes, and save files for offline access. Admins can upload new PDFs directly from the dashboard.

## ✨ Features

- Browse subjects by engineering branch (Electrical, Electronics, CS & IT, Mechanical, Civil)
- View and download PDF notes
- Save files to local vault for offline access
- Admin panel to upload PDFs and manage subjects
- Search subjects in real time
- Fully responsive — works on mobile and desktop
- JWT-based authentication for students and admins

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Structure |
| Tailwind CSS (CDN) | Styling |
| Vanilla JavaScript | Logic and API calls |
| Lucide Icons | Icon library |
| Fetch API | Backend communication |

## 📁 Folder Structure

```
frontend/
├── index.html      # Main HTML file
├── script.js       # All JavaScript logic
├── style.css       # Custom styles
└── favicon.ico     # Site icon
```

## 🔧 Configuration

In `script.js` line 6, set your backend URL:

```javascript
// Local development
const API_BASE = 'http://localhost:5000/api';

// Production
const API_BASE = 'https://gatehub-backend.onrender.com/api';
```

## 🏃 Running Locally

No build step needed. Just open with Live Server in VS Code:

1. Install **Live Server** extension in VS Code
2. Right click `index.html` → **Open with Live Server**
3. Opens at `http://127.0.0.1:5500`

Make sure your backend is running locally at `http://localhost:5000`.

## 🚢 Deployment

Deployed on **Netlify** via GitHub.

- Connect `gatehub-frontend` GitHub repo to Netlify
- Build command: (empty)
- Publish directory: (empty)
- Auto-deploys on every push to `main` branch

## 👤 Admin Access

```
Email:    admin@gatehub.com
Password: Admin@1234
```

## 🔗 Backend Repository

```
https://github.com/amanmehta276/gatehub-backend
```

Backend API:
```
https://gatehub-backend.onrender.com
```

## 📝 Notes

- Backend hosted on Render free tier — first load may take 2-3 minutes if server is sleeping
- PDF files stored on Supabase Storage
- Subject and user data stored in MongoDB Atlas
