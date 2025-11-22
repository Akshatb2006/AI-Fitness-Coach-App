# 🏋️‍♂️ AI Fitness Coach

A full-stack AI-powered fitness planning app that generates personalized workout plans, diet plans, tips, motivational quotes, AI images, and speech narration.

**Built with:**
- React + Vite (frontend)
- Node.js + Express (backend)
- Gemini API for plan generation
- ElevenLabs (optional) for TTS
- Pollinations / Unsplash fallback for image generation
- TailwindCSS
- LocalStorage persistence

---

## 🚀 Features

### 🧠 AI-Generated Fitness Plan
- Personalized workout routine
- Custom diet plan
- Smart nutrition tips
- Motivational quote
- Fully generated via Gemini

### 🗣️ AI Speech (Text-to-Speech)
- Listen to Workout or Diet plan
- Browser TTS (free)
- ElevenLabs (premium, optional)

### 🖼️ Image Generation
- Exercise images
- Meal images
- Pollinations fallback (100% free)
- Unsplash fallback backup

### 💾 Save & Load Your Plan
- Local storage support
- Export plan as PDF or TXT

### 🎨 Modern UI
- Dark/Light Theme
- Responsive mobile-friendly UI
- TailwindCSS styling

---

## 📂 Project Structure
```
root/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── config/
│   │   └── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (.env)
```env
GEMINI_API_KEY=your_key_here
ELEVENLABS_API_KEY=your_key_here     # optional
MONGODB_URI=your_mongo_uri           # optional
HF_API_KEY=your_huggingface_key      # optional
DEEPINFRA_KEY=your_key_here          # optional
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🛠️ Backend Setup
```bash
cd backend
npm install
npm start
```

**Server starts on:**
```
http://localhost:5000
```

---

## 🎨 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

**Frontend runs on:**
```
http://localhost:5173
```

---

## 🔌 API Endpoints (Backend)

| Endpoint | Description |
|----------|-------------|
| `POST /api/generate-plan` | Generates the full AI fitness plan |
| `POST /api/generate-image` | Generates exercise/food images (or fallback) |
| `POST /api/text-to-speech` | AI speech (ElevenLabs → Browser fallback) |
| `POST /api/export-pdf` | Exports a formatted PDF |

---

## 🧪 Image Generation Logic

The app tries:
1. DeepInfra / HuggingFace → if key available
2. Pollinations AI (free, no login)
3. Unsplash fallback if all else fails

---

## 🎧 Text-to-Speech Logic

1. Try ElevenLabs (if API key exists)
2. Else fallback → Browser Web Speech API

---

## 📦 Build for Production

### Backend
```bash
cd backend
npm run build
```

### Frontend
```bash
cd frontend
npm run build
```

---

## 📝 Save Plan Feature

The app saves:
- user data
- generated plan
- timestamp

**Stored in browser's `localStorage`.**

Opening the app again auto-loads previous plan.

---

## 🧹 .gitignore Included

The root `.gitignore` ignores:
- `node_modules`
- `dist/build`
- logs
- `.env` files
- IDE junk
- MongoDB data
- Python venv
- Vite cache

---

## ❤️ Credits

- **Google Gemini** for AI planning
- **PollinationsAI** for free image generation
- **Unsplash** for backup images
- **Tailwind CSS** for styling
- **React + Vite** for the frontend
- **Node + Express** for the backend

---

## 📌 License

**MIT** – free to use and modify.
