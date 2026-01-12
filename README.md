# Firebase Authentication App (React + TypeScript + Vite)

A production-ready authentication flow built with React, TypeScript, Firebase Authentication, React Router v7, Tailwind CSS, and Docker.
This project demonstrates protected routes, persistent login, clean auth state modeling, automated tests with >80% coverage, and a Docker-first deployment.

## 🌐 Live Demo

👉 https://firebase-auth-app-j3cb.onrender.com/sign-in

## ✨ Features

- Email / Password authentication using Firebase Auth
- Protected routes with React Router v7
- Persistent login across page refresh
- Redirect handling for authenticated / unauthenticated users
- Explicit auth state via a finite state machine
- Tailwind CSS–based responsive UI
- Dockerized production build served via Nginx
- Automated tests with Vitest + Testing Library
- Coverage enforced above 80%
- Render-ready deployment

## 🧱 Tech Stack

- **Frontend:** React + TypeScript
- **Bundler:** Vite
- **Routing:** React Router v7
- **Auth:** Firebase Authentication (Email / Password)
- **Styling:** Tailwind CSS
- **Testing:** Vitest, @testing-library/react
- **Containerization:** Docker (multi-stage build)
- **Deployment:** Render (Docker Web Service)

## 🔐 Authentication Flow

### Routes

| Route | Access | Behavior |
|-------|--------|----------|
| `/sign-in` | Public | Email/password login |
| `/` | Protected | Redirects to /dashboard |
| `/dashboard` | Protected | Shows user email + logout |
| `*` | Public | Not Found page |

### Rules

- Unauthenticated users accessing protected routes → redirected to /sign-in
- Authenticated users accessing /sign-in → redirected to /dashboard
- Logout always redirects to /sign-in
- Auth state persists across refresh via Firebase

## 🧠 Auth State Design

The app uses an explicit status-based model (instead of a boolean flag):

```typescript
type AuthStatus = "loading" | "authenticated" | "unauthenticated";
```

This improves clarity, eliminates ambiguous states, and makes route guards and tests deterministic.

## 📁 Project Structure

```
firebase-auth-app/
├── src/
│   ├── auth/              # Auth context, hooks, route guards
│   ├── pages/             # SignIn, Dashboard, NotFound
│   ├── components/        # Shared UI components (Loader)
│   ├── router/            # React Router configuration
│   ├── test/              # Test setup & mocks
│   └── firebase/          # Firebase initialization
├── script/
│   └── setup.sh           # One-command local setup
├── Dockerfile
├── nginx.conf
├── .env.example
├── vite.config.ts
└── README.md
```

## 🚀 Local Development (Docker-First)

### Prerequisites

- Docker
- Git
- Node.js is not required on the host machine.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/shivam-shukla-25/firebase-auth-app
cd firebase-auth-app
```

### 2️⃣ Configure Environment Variables

```bash
cp .env.example .env
```

Fill in Firebase values:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
```

### 3️⃣ Run Setup Script

```bash
./script/setup.sh
```

The script:

- Validates prerequisites
- Validates .env
- Builds the Docker image
- Runs the app locally

App runs at:

```
http://localhost:8080
```

## 🐳 Docker Details

- Multi-stage Docker build
- Vite build runs at build time
- Static assets served via Nginx
- SPA routing handled with try_files /index.html
- Environment variables injected at build time (required by Vite)

## 🧪 Testing

### Tooling

- Vitest
- React Testing Library
- jsdom
- Firebase SDK mocked

### Coverage

- Lines ≥ 80%
- Statements ≥ 80%
- Functions ≥ 80%
- Branches ≥ 80%

### Commands

```bash
npm run test
npm run test:coverage
```

HTML coverage report:

```
coverage/index.html
```

## ☁️ Deployment (Render)

The app is deployed as a Docker Web Service on Render.

### Summary Steps

1. Push code to GitHub
2. Create a Render Web Service
3. Choose Docker runtime
4. Add environment variables:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_APP_ID`
5. Deploy

Render builds the image and serves the app over HTTPS.

## 🔒 Security Notes

- Firebase API keys are public by design
- .env files are ignored by Git
- .env.example documents required configuration
- No secrets are committed to the repository

## 📦 Submission Notes

- node_modules excluded
- Production-ready Docker setup
- Automated tests included
- Clean commit history
- One-command onboarding script

## ✅ Status

- ✔ All requirements met
- ✔ Bonus items implemented (TypeScript, loading states, error handling, tests)
- ✔ Deployed and production-ready