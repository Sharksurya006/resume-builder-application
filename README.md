<div align="center">

<img src="client/src/assets/logo.png" alt="Resume Builder Logo" width="100" height="100" />

# AI Resume Builder

### Build professional, ATS-ready resumes in minutes — powered by Google Gemini AI

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?style=flat&logo=mongodb)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)

[Features](#-features) · [Tech Stack](#-tech-stack) · [Project Structure](#-project-structure) · [Getting Started](#-getting-started) · [API Reference](#-api-reference) · [How AI Works](#-how-ai-works) · [Screenshots](#-screenshots)

</div>

---

## ✨ Features

### 🤖 AI-Powered
- **Smart Resume Import** — Upload any existing PDF resume (including scanned documents). Gemini AI reads it using native vision, extracts all information, and pre-fills your entire resume automatically
- **AI Professional Summary Enhancer** — Write a rough summary and let AI rewrite it into a compelling, ATS-optimized 1–2 sentence statement
- **AI Job Description Enhancer** — Paste basic job duties and AI rewrites them with strong action verbs and quantifiable achievements

### 📝 Resume Builder
- **6-section step-by-step editor** — Personal Info, Professional Summary, Experience, Education, Projects, and Skills
- **Live Preview** — See your resume update in real-time as you type on the right panel
- **4 Professional Templates** — Classic, Modern, Minimal, and Minimal with Image
- **Accent Color Picker** — Personalize your resume with a custom color theme
- **Profile Photo Upload** — Upload a headshot with optional AI background removal via ImageKit

### 🔗 Sharing & Export
- **Download as PDF** — One-click print-to-PDF export, perfectly formatted
- **Public / Private Toggle** — Control whether your resume is publicly accessible
- **Shareable Link** — Share a public URL directly with recruiters — no login required for viewers

### 🔐 Authentication
- Secure JWT-based register and login
- Persistent sessions via localStorage
- Protected routes — dashboard and builder only accessible when logged in

---

## 🛠 Tech Stack

### Frontend — `client/`

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 7 | Build tool and dev server |
| React Router DOM | 7 | Client-side routing |
| Redux Toolkit | 2 | Global auth state management |
| Axios | 1 | HTTP client |
| Tailwind CSS | 4 | Utility-first styling |
| Lucide React | 0.545 | Icon library |
| React Hot Toast | 2 | Toast notifications |

### Backend — `server/`

| Technology | Version | Purpose |
|---|---|---|
| Node.js + Express | 5 | REST API server |
| MongoDB + Mongoose | 9 | Database and ODM |
| JSON Web Token | 9 | Authentication |
| bcrypt | 6 | Password hashing |
| Multer | 2 | File upload handling |
| OpenAI SDK | 6 | Gemini API via OpenAI-compatible endpoint |
| ImageKit Node SDK | 7 | Profile image hosting and background removal |
| dotenv | 17 | Environment variable management |

### AI & Cloud Services

| Service | Purpose |
|---|---|
| Google Gemini (`gemini-2.5-flash-lite`) | Resume parsing, summary enhancement, job description enhancement |
| ImageKit | Profile photo hosting and AI background removal |
| MongoDB Atlas | Cloud database |

---

## 📁 Project Structure

```
resume-builder-application/
│
├── client/                                  # React Frontend (Vite)
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── app/
│   │   │   ├── store.js                     # Redux store configuration
│   │   │   └── features/
│   │   │       └── authSlice.js             # Auth state: token, user, isLoading
│   │   │
│   │   ├── assets/
│   │   │   ├── assets.js                    # Dummy data and static exports
│   │   │   ├── logo.png                     # App logo
│   │   │   ├── dummy_profile.png            # Fallback profile image
│   │   │   └── templates/                   # Template preview thumbnail components
│   │   │       ├── ClassicTemplate.jsx
│   │   │       ├── ModernTemplate.jsx
│   │   │       ├── MinimalTemplate.jsx
│   │   │       └── MinimalImageTemplate.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── home/                        # Landing page sections
│   │   │   │   ├── Hero.jsx                 # Hero section with CTA
│   │   │   │   ├── Features.jsx             # Features showcase
│   │   │   │   ├── Banner.jsx               # Promotional banner
│   │   │   │   ├── Testimonial.jsx          # User testimonials
│   │   │   │   ├── CallToAction.jsx         # Bottom CTA
│   │   │   │   ├── Footer.jsx               # Site footer with logo
│   │   │   │   └── Title.jsx                # Reusable section title
│   │   │   │
│   │   │   ├── templates/                   # Rendered resume template components
│   │   │   │   ├── ClassicTemplate.jsx
│   │   │   │   ├── ModernTemplate.jsx
│   │   │   │   ├── MinimalTemplate.jsx
│   │   │   │   ├── MinimalImageTemplate.jsx
│   │   │   │   └── ExperienceForm.jsx       # Experience section with AI enhance
│   │   │   │
│   │   │   ├── Navbar.jsx                   # Top navigation bar
│   │   │   ├── PersonalInfoForm.jsx         # Personal info + photo upload
│   │   │   ├── ProfessionSummaryForm.jsx    # Summary + AI enhance button
│   │   │   ├── EducationForm.jsx            # Education section form
│   │   │   ├── ProjectForm.jsx              # Projects section form
│   │   │   ├── SkillsForm.jsx               # Skills section form
│   │   │   ├── ResumePreview.jsx            # Live resume preview renderer
│   │   │   ├── TemplateSelector.jsx         # Template switcher dropdown
│   │   │   ├── ColorPicker.jsx              # Accent color selector
│   │   │   └── Loader.jsx                   # Loading spinner
│   │   │
│   │   ├── configs/
│   │   │   └── api.js                       # Axios instance with VITE_BASE_URL
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx                     # Public landing page
│   │   │   ├── Login.jsx                    # Login / Register page
│   │   │   ├── Layout.jsx                   # Protected route wrapper
│   │   │   ├── Dashboard.jsx                # Resume list + create/upload modals
│   │   │   ├── ResumeBuilder.jsx            # Main resume editor (6 sections)
│   │   │   └── Preview.jsx                  # Public resume view page
│   │   │
│   │   ├── App.jsx                          # Root component with routes
│   │   ├── main.jsx                         # React entry point
│   │   └── index.css                        # Global styles
│   │
│   ├── .env                                 # VITE_BASE_URL
│   ├── index.html
│   └── package.json
│
└── server/                                  # Node.js Backend (Express)
    ├── configs/
    │   ├── db.js                            # MongoDB connection
    │   ├── ai.js                            # OpenAI SDK configured for Gemini
    │   ├── imagekit.js                      # ImageKit SDK setup
    │   └── multer.js                        # Disk storage for file uploads
    │
    ├── controllers/
    │   ├── userController.js                # Register, login, get user, get resumes
    │   ├── resumeController.js              # Full CRUD + image upload logic
    │   └── aiController.js                  # AI enhance + PDF import endpoints
    │
    ├── middlewares/
    │   └── authMiddleware.js                # JWT token verification (protect)
    │
    ├── models/
    │   ├── usermodel.js                     # User schema with bcrypt comparePassword
    │   └── resume.js                        # Full resume schema with all sections
    │
    ├── routes/
    │   ├── userRoutes.js                    # /api/users/*
    │   ├── resumeRoutes.js                  # /api/resumes/*
    │   └── aiRoutes.js                      # /api/ai/*
    │
    ├── server.js                            # Express app entry point
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **MongoDB Atlas** account (free tier works)
- **Google AI Studio** API key — [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
- **ImageKit** account — [imagekit.io](https://imagekit.io) (free tier works)

### 1. Clone the Repository

```bash
git clone https://github.com/Sharksurya006/resume-builder-application.git
cd resume-builder-application
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net
JWT_SECRET=your_super_secret_jwt_key_here

OPENAI_API_KEY=AIzaSy...your_gemini_api_key
OPENAI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
OPENAI_MODEL=gemini-2.5-flash-lite

IMAGEKIT_PRIVATE_KEY=private_xxxxxxxxxxxx
IMAGEKIT_PUBLIC_KEY=public_xxxxxxxxxxxx
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

> ⚠️ **Important:** No quotes around values, no spaces around `=` signs.

Start the server:

```bash
npm run server        # Development with nodemon (auto-restart)
# or
npm start             # Production
```

Server runs on `http://localhost:3000`

### 3. Setup the Frontend

```bash
cd client
npm install
```

Create a `.env` file inside `client/`:

```env
VITE_BASE_URL=http://localhost:3000
```

Start the dev server:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

### 4. Verify Everything Works

Open your browser at `http://localhost:5173`. You should see the landing page. Register a new account, create a resume, and test the AI enhance button.

To verify your Gemini API key works directly:

```powershell
# Windows PowerShell
curl "https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_API_KEY"
```

A 200 response with a list of models confirms your key is valid.

---

## 🔌 API Reference

All protected routes require the JWT token in the `Authorization` header:
```
Authorization: <token>
```

### User Routes — `/api/users`

| Method | Endpoint | Auth | Description | Request Body |
|--------|----------|------|-------------|-------------|
| `POST` | `/register` | ❌ | Register new user | `{ name, email, password }` |
| `POST` | `/login` | ❌ | Login and get JWT | `{ email, password }` |
| `GET` | `/data` | ✅ | Get logged-in user profile | — |
| `GET` | `/resumes` | ✅ | Get all resumes for user | — |

### Resume Routes — `/api/resumes`

| Method | Endpoint | Auth | Description | Request Body |
|--------|----------|------|-------------|-------------|
| `POST` | `/create` | ✅ | Create blank resume | `{ title }` |
| `PUT` | `/update` | ✅ | Update resume data + optional image | `FormData: { resumeId, resumeData, image? }` |
| `DELETE` | `/delete/:resumeId` | ✅ | Delete a resume | — |
| `GET` | `/get/:resumeId` | ✅ | Get resume by ID (owner only) | — |
| `GET` | `/public/:resumeId` | ❌ | Get public resume by ID | — |

### AI Routes — `/api/ai`

| Method | Endpoint | Auth | Description | Request Body |
|--------|----------|------|-------------|-------------|
| `POST` | `/enhance-pro-sum` | ✅ | Enhance professional summary | `{ userContent }` |
| `POST` | `/enhance-job-desc` | ✅ | Enhance job description | `{ userContent }` |
| `POST` | `/upload-resume` | ✅ | Parse PDF and create resume | `{ title, resumeBase64 }` |

---

## ⚙️ Environment Variables Reference

### `server/.env`

| Variable | Description | Example |
|---|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net` |
| `JWT_SECRET` | Secret key for signing JWTs | Any long random string |
| `OPENAI_API_KEY` | Gemini API key from Google AI Studio | `AIzaSy...` |
| `OPENAI_BASE_URL` | Gemini's OpenAI-compatible endpoint | `https://generativelanguage.googleapis.com/v1beta/openai/` |
| `OPENAI_MODEL` | Gemini model to use | `gemini-2.5-flash-lite` |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key | `private_xxx...` |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public key | `public_xxx...` |
| `IMAGEKIT_URL_ENDPOINT` | Your ImageKit URL endpoint | `https://ik.imagekit.io/your_id` |

### `client/.env`

| Variable | Description | Example |
|---|---|---|
| `VITE_BASE_URL` | Backend server URL | `http://localhost:3000` |

---

## 🧠 How AI Works

### Resume PDF Import

The app uses **Gemini's native vision capability** to read PDFs — including scanned documents:

```
User selects PDF
       ↓
Browser converts PDF → Base64 string (FileReader API)
       ↓
Base64 sent to backend via POST /api/ai/upload-resume
       ↓
Backend sends PDF directly to Gemini as an image_url attachment
       ↓
Gemini reads the full document (text + layout + scanned pages)
       ↓
Gemini returns structured JSON matching your resume schema
       ↓
Backend parses JSON → saves to MongoDB → returns resumeId
       ↓
Frontend navigates to /app/builder/:resumeId with all data pre-filled
```

> Unlike older approaches that extract text first (which fails on scanned PDFs), this app sends the raw PDF to Gemini directly, letting its vision model handle all document types.

### AI Content Enhancement

Both the Professional Summary and Job Description enhancers follow this flow:

```
User types rough content → clicks "AI Enhance"
       ↓
Frontend sends content to backend with JWT
       ↓
Backend wraps content in a professional resume-writing prompt
       ↓
Gemini rewrites it to be ATS-friendly and compelling
       ↓
Enhanced text returned and updated in the form + live preview
```

### Retry Logic

All three AI endpoints include automatic retry on `503` (server busy) and `429` (rate limited) errors — retrying up to 3 times with increasing delays (2s → 4s → 6s) before returning an error to the user.

---

## 🎨 Resume Templates

| Template | Best For | Has Photo |
|---|---|---|
| **Classic** | Traditional industries (Finance, Law, Consulting) | Optional |
| **Modern** | Tech, Design, Product roles | Optional |
| **Minimal** | Clean, whitespace-forward look for any industry | No |
| **Minimal with Image** | Same minimal look with profile photo | Yes |

All templates respect your chosen **accent color** for headers, section dividers, and skill tags.

---

## 📊 Database Schema

### User Model
```js
{
  name:     String,
  email:    String (unique),
  password: String (bcrypt hashed)
}
```

### Resume Model
```js
{
  userId:               ObjectId (ref: User),
  title:                String,
  public:               Boolean,
  template:             String,
  accent_color:         String,
  professional_summary: String,
  skills:               [String],
  personal_info: {
    image, full_name, profession,
    email, phone, location, linkedin, website
  },
  experience: [{
    company, position, start_date,
    end_date, description, is_current
  }],
  projects: [{
    name, type, description
  }],
  education: [{
    institution, degree, field,
    graduation_date, gpa
  }],
  timestamps: true
}
```

---

## 🔒 Security

- Passwords are hashed using **bcrypt** before storage — plain text passwords never hit the database
- All protected routes verified via **JWT middleware** before any controller runs
- Profile images are hosted on **ImageKit CDN** — no images stored on the server
- File uploads handled by **Multer** with disk storage and are deleted after upload to ImageKit
- Environment variables used for all secrets — never hardcoded

---

## 📦 Build for Production

### Backend
```bash
cd server
npm start
```

### Frontend
```bash
cd client
npm run build
```

For the frontend, update `VITE_BASE_URL` in your deployment environment to point to your live backend URL.

---

## 🗺️ Roadmap

- [ ] Forget password / email reset flow
- [ ] Multiple resumes per user with dashboard analytics
- [ ] AI-powered job description matching score
- [ ] LinkedIn profile import
- [ ] Cover letter generator
- [ ] Resume version history

---

## 👤 Author

**Surya S**

- 🌐 Portfolio: [surya-portfolio-iota.vercel.app](https://surya-portfolio-iota.vercel.app)
- 💼 LinkedIn: [linkedin.com/in/Surya-S](https://www.linkedin.com/in/surya-s-0a9121268)
- 🐙 GitHub: [@Sharksurya006](https://github.com/Sharksurya006)
- 📧 Email: suryas632003@gmail.com

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ by Surya S · [⭐ Star this repo](https://github.com/Sharksurya006/resume-builder-application)

</div>