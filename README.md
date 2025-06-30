# 🥗 What's in my fridge? - Recipe Finder App

A full-stack web application that helps users discover recipes based on ingredients they have. Powered by the Spoonacular API, users can filter by cuisine, view recipe instructions, and save their favorite recipes.

## 🌐 Live Demo

- **Check it out**: [https://recipe-finder-frontend-rho.vercel.app](https://recipe-finder-frontend-rho.vercel.app)

---

## 📦 Tech Stack:

### Frontend:
- React + Vite
- Tailwind CSS
- Axios
- React Context API

### Backend:
- Node.js + Express.js
- MongoDB (Mongoose)
- Spoonacular API
- Render Deployment

---

## 🚀 Features

- 🔍 Search recipes by ingredients u have.
- 🌍 Filter by cuisine (Indian, Mexican, Italian, etc.).
- 🧾 View complete recipe instructions and ingredients.
- 🧡 Save/unsave recipes (stored in MongoDB).
- 📱 Responsive UI with loading skeletons.
- 🔐 Rate-limited API to prevent overuse (backend).

---

## ⚙️ Installation & Development

### 1. Clone Repositories

```bash
git clone https://github.com/yourusername/recipe-finder-frontend.git
git clone https://github.com/yourusername/recipe-finder-backend.git
```

2. Setup Backend
```bash
cd recipe-finder-backend
npm install
```
Create a .env file:
```env
MONGO_URI=your_mongodb_connection_string
SPOONACULAR_API_KEY=your_spoonacular_api_key
```

Run server:
```bash
npm run dev
``` 

3. Setup Frontend
```bash
cd recipe-finder-frontend
npm install
```

Create a .env file:
```env
VITE_BASE_URL=http://localhost:5000
```

Run development server:
```bash
npm run dev
```