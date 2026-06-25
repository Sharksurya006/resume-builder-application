# 📄 Resume Builder Application

A full-stack AI-powered resume builder that lets users create, customize, and share professional resumes with real-time preview. Built with **React + Vite** on the frontend and **Node.js + Express + MongoDB** on the backend, with Google Gemini AI integration for smart content enhancement.

---

## ✨ Features

- 🔐 **User Authentication** — Secure JWT-based register/login flow
- 📝 **Multi-section Resume Editor** — Personal Info, Professional Summary, Experience, Education, Projects, and Skills
- 🎨 **4 Resume Templates** — Classic, Modern, Minimal, and Minimal with Image
- 🌈 **Accent Color Picker** — Personalize your resume's color scheme
- 🤖 **AI Content Enhancement** — Gemini AI rewrites your Professional Summary and Job Descriptions to be ATS-friendly
- 📤 **PDF Resume Import** — Upload an existing resume PDF and let AI extract and populate all fields automatically
- 🖼️ **Profile Photo Upload** — Upload and optionally remove the background via ImageKit
- 🔗 **Shareable Public Link** — Toggle your resume as public and share via URL
- 📥 **Download as PDF** — Print-to-PDF export with one click
- 🔒 **Public / Private Toggle** — Control whether your resume is publicly accessible

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + Vite 7 | UI framework and build tool |
| Redux Toolkit | Global auth state management |
| React Router DOM v7 | Client-side routing |
| Axios | HTTP client with base URL config |
| Tailwind CSS v4 | Utility-first styling |
| Lucide React | Icon library |
| React Hot Toast | Toast notifications |
| react-pdftotext | PDF text extraction for resume import |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express v5 | REST API server |
| MongoDB + Mongoose | Database and ODM |
| JSON Web Tokens (JWT) | Authentication |
| bcrypt | Password hashing |
| Multer | Multipart file upload handling |
| ImageKit Node SDK | Profile image hosting and background removal |
| OpenAI SDK (Gemini) | AI-powered resume content enhancement |
| dotenv | Environment variable management |

---

## 📁 Project Structure

```
resume-builder-application/
│
├── client/                        # React Frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── store.js           # Redux store
│   │   │   └── features/
│   │   │       └── authSlice.js   # Auth state (token, user, loading)
│   │   ├── assets/
│   │   │   ├── assets.js          # Dummy data & static exports
│   │   │   └── templates/         # Template preview components
│   │   ├── components/
│   │   │   ├── home/              # Landing page sections (Hero, Features, etc.)
│   │   │   ├── templates/         # Rendered resume templates
│   │   │   ├── PersonalInfoForm.jsx
│   │   │   ├── ProfessionSummaryForm.jsx
│   │   │   ├── ExperienceForm.jsx
│   │   │   ├── EducationForm.jsx
│   │   │   ├── ProjectForm.jsx
│   │   │   ├── SkillsForm.jsx
│   │   │   ├── ResumePreview.jsx
│   │   │   ├── TemplateSelector.jsx
│   │   │   ├── ColorPicker.jsx
│   │   │   └── Navbar.jsx
│   │   ├── configs/
│   │   │   └── api.js             # Axios instance with VITE_BASE_URL
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Landing page
│   │   │   ├── Login.jsx          # Auth page (login/register)
│   │   │   ├── Dashboard.jsx      # User's resume list
│   │   │   ├── ResumeBuilder.jsx  # Main resume editor
│   │   │   ├── Preview.jsx        # Public resume view
│   │   │   └── Layout.jsx         # Protected layout wrapper
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                       # VITE_BASE_URL
│   └── package.json
│
└── server/                        # Node.js Backend (Express)
    ├── configs/
    │   ├── db.js                  # MongoDB connection
    │   ├── ai.js                  # OpenAI client (Gemini endpoint)
    │   ├── imagekit.js            # ImageKit SDK setup
    │   └── multer.js              # Disk storage config
    ├── controllers/
    │   ├── userController.js      # Register, login, get user, get resumes
    │   ├── resumeController.js    # CRUD for resumes + image upload
    │   └── aiController.js        # AI summary/description/import endpoints
    ├── middlewares/
    │   └── authMiddleware.js      # JWT token verification
    ├── models/
    │   ├── usermodel.js           # User schema with bcrypt comparePassword
    │   └── resume.js              # Resume schema (full structure)
    ├── routes/
    │   ├── userRoutes.js
    │   ├── resumeRoutes.js
    │   └── aiRoutes.js
    ├── server.js                  # Entry point
    ├── .env                       # All server secrets
    └── package.json
```

---

## 🔌 API Endpoints

### User Routes — `/api/users`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | ❌ | Register a new user |
| POST | `/login` | ❌ | Login and receive JWT |
| GET | `/data` | ✅ | Get authenticated user's profile |
| GET | `/resumes` | ✅ | Get all resumes for authenticated user |

### Resume Routes — `/api/resumes`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/create` | ✅ | Create a new blank resume |
| PUT | `/update` | ✅ | Update resume data (supports image upload) |
| DELETE | `/delete/:resumeId` | ✅ | Delete a resume |
| GET | `/get/:resumeId` | ✅ | Get a specific resume by ID |
| GET | `/public/:resumeId` | ❌ | Get a publicly shared resume |

### AI Routes — `/api/ai`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/enhance-pro-sum` | ✅ | Enhance professional summary using AI |
| POST | `/enhance-job-desc` | ✅ | Enhance job description using AI |
| POST | `/upload-resume` | ✅ | Parse and import existing resume via AI |

---

## ⚙️ Environment Variables

### `server/.env`
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
OPENAI_API_KEY=your_gemini_api_key
OPENAI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
OPENAI_MODEL=gemini-2.0-flash
```

### `client/.env`
```env
VITE_BASE_URL=http://localhost:3000
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- [ImageKit](https://imagekit.io) account
- [Google AI Studio](https://aistudio.google.com) API key (for Gemini)

### 1. Clone the Repository
```bash
git clone https://github.com/Sharksurya006/resume-builder-application.git
cd resume-builder-application
```

### 2. Setup the Backend
```bash
cd server
npm install
# Create and fill in your .env (see Environment Variables above)
npm run server   # Development with nodemon
# or
npm start        # Production
```

### 3. Setup the Frontend
```bash
cd client
npm install
# Ensure .env has VITE_BASE_URL=http://localhost:3000
npm run dev
```

The frontend will start at `http://localhost:5173` and connect to the backend at `http://localhost:3000`.

---

## 🐛 Known Issues & Bug Fixes

See the [Bug Report](#-bug-report) section below for a detailed breakdown of all identified issues and their solutions.

---

## 🗺️ Resume Templates

| Template | Description |
|---|---|
| **Classic** | Traditional two-column layout with a clean header |
| **Modern** | Contemporary design with bold section headers |
| **Minimal** | Clean, whitespace-forward single-column layout |
| **Minimal with Image** | Minimal template with profile photo support |

---

## 📸 Screenshots

> _Add screenshots of the Dashboard, Resume Builder, and Resume Preview here_

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 👤 Author

**Surya S**
- GitHub: [@Sharksurya006](https://github.com/Sharksurya006)
- Portfolio: [surya-portfolio-iota.vercel.app](https://surya-portfolio-iota.vercel.app)

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
