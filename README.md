<div align="center">

<h1><strong>CertifyMe — Frontend</strong></h1>

<p>
  <strong>Enterprise-level Certification Tracking Platform</strong><br/>
  Built with React 19 · Vite 7 · React Router 7 · Recharts · Axios · Deployed on Vercel
</p>

<p>
  <img src="https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19"/>
  <img src="https://img.shields.io/badge/Vite-7.3.1-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/React_Router-7.13.0-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router"/>
  <img src="https://img.shields.io/badge/Axios-1.14.0-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
  <img src="https://img.shields.io/badge/Recharts-3.7.0-22B5BF?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Recharts"/>
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>
  <img src="https://img.shields.io/badge/Users-4000%2B-FF6B6B?style=for-the-badge&logoColor=white" alt="4000+ Users"/>
  <a href="https://github.com/lalithdev/CertifyMe-Certification-Tracking-Platform/stargazers"><img src="https://img.shields.io/github/stars/lalithdev/CertifyMe-Certification-Tracking-Platform?style=for-the-badge&logo=github&color=yellow" alt="GitHub Stars"/></a>
</p>

<p>
  ⭐ <strong>If you find this project useful, please consider giving it a star!</strong>
</p>

<p>
  <a href="https://certifymeonline.vercel.app" target="_blank"><strong>🌐 Live Demo</strong></a> ·
  <a href="https://github.com/lalithdev/CertifyMe-Certification-Tracking-Platform-Backend" target="_blank">⚙️ Backend Repo</a>
</p>

<p>
  <a href="#-quick-start">Quick Start</a> ·
  <a href="#-page--route-reference">Pages & Routes</a> ·
  <a href="#-architecture--working-flow">Architecture</a> ·
  <a href="#-project-structure">Project Structure</a> ·
  <a href="#-deployment-vercel">Deployment</a>
</p>

</div>

---

## 📑 Table of Contents

1. [Project Overview](#-project-overview)
2. [Tech Stack](#-tech-stack)
3. [Architecture & Working Flow](#-architecture--working-flow)
4. [Project Structure](#-project-structure)
5. [Pages & Route Reference](#-page--route-reference)
6. [API Layer Deep Dive](#-api-layer-deep-dive)
7. [State Management — Context API](#-state-management--context-api)
8. [Prerequisites](#-prerequisites)
9. [Quick Start (Local Setup)](#-quick-start-local-setup)
10. [Environment Variables Reference](#-environment-variables-reference)
11. [Available Scripts](#-available-scripts)
12. [Feature Walkthrough](#-feature-walkthrough)
13. [Security & Route Protection](#-security--route-protection)
14. [Deployment (Vercel)](#-deployment-vercel)
15. [Common Issues & Troubleshooting](#-common-issues--troubleshooting)
16. [Contributing](#-contributing)

---

## 🎯 Project Overview

**CertifyMe** is a full-stack certification lifecycle management platform. This repository is the **React frontend** — a single-page application (SPA) that connects to the [Spring Boot backend](https://certifyme-backend.onrender.com) to provide a complete certification tracking experience for both students and administrators.

> 🚀 **Live at scale** — powering **4,000+ student users** and **10+ faculty/admin accounts** across an academic institution, managing thousands of certification records with real-time status tracking.

<div align="center">

| 👨‍🎓 Students | 👨‍🏫 Faculty / Admins | 🏅 Certifications Tracked | 🌐 Deployed On |
|:---:|:---:|:---:|:---:|
| **4,000+** | **10+** | **Thousands** | **Vercel** |

</div>

### 🎭 Two Distinct User Roles

| Role | Portal Path | Capabilities |
|---|---|---|
| **STUDENT** | `/student/*` | Register, view, and manage personal certifications; request renewals; view dashboard stats, charts, reminders, alerts, and export reports |
| **ADMIN** | `/admin/*` | Manage all students and their certifications; approve/reject renewals; send expiry reminders; view platform-wide analytics |

### ✨ Key Frontend Features

- 🔐 **JWT Authentication** — token stored in `localStorage`, auto-attached via Axios interceptors
- 🛡️ **Role-based Route Guards** — `ProtectedRoute` ensures students can't access admin routes and vice versa
- 📊 **Interactive Charts** — Recharts visualize certification status distribution (Active / Expiring / Expired)
- 🔔 **Real-time Notification Badge** — live unread count from backend, auto-clears on read
- 📥 **Excel Export** — download certification reports as `.xlsx` directly from the browser
- 🌍 **Google Translate Integration** — multilingual support (EN, HI, TE, JA, ES, DE) via Google Translate Widget
- ⏱️ **OTP Timer UI** — countdown timer for Admin 2FA OTP with resend cooldown enforcement
- 🎨 **Fully Custom CSS** — zero UI framework dependency; all styles hand-crafted with Inter font
- 📱 **Responsive Design** — works across desktop and tablet viewports
- 🏃 **Vercel Speed Insights** — real user performance monitoring in production

---

## 🛠 Tech Stack

| Category | Package | Version | Purpose |
|---|---|---|---|
| **UI Framework** | React | ^19.2.0 | Component-based UI library |
| **Build Tool** | Vite | ^7.3.1 | Lightning-fast dev server & bundler |
| **Routing** | React Router DOM | ^7.13.0 | Client-side routing with nested routes |
| **HTTP Client** | Axios | ^1.14.0 | API calls with request/response interceptors |
| **Charts** | Recharts | ^3.7.0 | Composable chart library for React |
| **Icons** | Lucide React | ^0.575.0 | Clean, consistent icon set |
| **Icons (Extended)** | React Icons | ^5.6.0 | Extended icon library (FI, HI, etc.) |
| **Toasts** | Sonner | ^2.0.7 | Elegant toast notifications |
| **Analytics** | @vercel/speed-insights | ^2.0.0 | Vercel real user monitoring |
| **Linting** | ESLint + plugins | ^9.39.1 | Code quality enforcement |
| **Language** | JavaScript (ESM) | ES2022+ | Module-based JavaScript |
| **CSS** | Vanilla CSS | — | Custom styles per component |
| **Font** | Inter (Google Fonts) | — | Modern, readable typography |
| **Hosting** | Vercel | — | SPA deployment with SPA fallback routing |
| **Translation** | Google Translate Widget | — | In-browser multilingual support |

---

## 🏛 Architecture & Working Flow

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     BROWSER (User)                              │
│                                                                  │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │                React SPA (Vite)                           │  │
│   │                                                           │  │
│   │  main.jsx                                                │  │
│   │    └── <BrowserRouter>                                   │  │
│   │         └── <AuthProvider>       ← Context API           │  │
│   │              └── <AppRoutes>     ← Route definitions     │  │
│   │                   ├── PublicLayout  → Landing page       │  │
│   │                   ├── AuthLayout   → Login / Signup      │  │
│   │                   └── DashboardLayout                    │  │
│   │                        ├── /student/* (ProtectedRoute)   │  │
│   │                        └── /admin/*  (ProtectedRoute)    │  │
│   │                                                           │  │
│   │  ┌────────────────────────────────────────────────┐      │  │
│   │  │          API Layer (src/api/)                   │      │  │
│   │  │  axiosInstance  ← Base URL + JWT Interceptor   │      │  │
│   │  │  authApi        ← /auth endpoints              │      │  │
│   │  │  certificationApi ← /certifications endpoints  │      │  │
│   │  │  adminApi       ← /users, /certifications/all  │      │  │
│   │  │  notificationApi ← /student/notifications      │      │  │
│   │  │  reportApi      ← /certifications/stats        │      │  │
│   │  └──────────────────────┬─────────────────────────┘      │  │
│   └─────────────────────────┼─────────────────────────────── ┘  │
└─────────────────────────────┼────────────────────────────────────┘
                              │  HTTPS (Bearer JWT)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│          Spring Boot Backend (Render)                           │
│          https://certifyme-backend.onrender.com/api             │
└─────────────────────────────────────────────────────────────────┘
```

---

### 🔄 Complete A-to-Z Request Flow

Using **"Student views their Dashboard"** as the example:

```
Step 1: APP BOOT
  └── main.jsx renders <BrowserRouter> → <AuthProvider> → <AppRoutes>
  └── AuthProvider reads localStorage → restores user session if token exists

Step 2: ROUTE RESOLUTION
  └── User visits /student/dashboard
  └── AppRoutes matches → ProtectedRoute checks:
        ✅ localStorage["user"] exists?
        ✅ user.role === "student"?
      → Renders <DashboardLayout> with <Overview> as child

Step 3: COMPONENT MOUNT (Overview.jsx)
  └── useEffect() fires on mount
  └── Calls reportApi.getDashboardStats(userId)
      └── axiosInstance.get("/certifications/stats/1")
            └── Request Interceptor runs:
                  → localStorage.getItem("token")
                  → Sets header: Authorization: Bearer eyJ...
  └── Response arrives → setState(stats)
  └── Component re-renders with live data

Step 4: CHART RENDER
  └── Stats passed to <CertificationChart />
  └── Recharts PieChart renders Active / Expiring / Expired donut chart

Step 5: NOTIFICATION BADGE
  └── DashboardLayout calls notificationApi.getUnreadCount()
  └── Backend returns count → badge renders on notification icon
```

---

### 🔐 Authentication Flow — Student

```
/login (Login.jsx)
    │
    ├── User enters email + password
    ├── authApi.login({ email, password })
    ├── AuthContext.login() handles response:
    │     → stores token in localStorage
    │     → stores user in localStorage
    │     → setUser(formattedUser)
    └── Navigate to /student/dashboard
```

### 🔐 Authentication Flow — Admin (OTP 2FA)

```
/login (Login.jsx)
    │
    ├── Step 1: Enter email + password → POST /auth/login
    │     Response: { otpRequired: true, remainingValiditySeconds: 120 }
    │     → UI shows OTP input + countdown timer
    │
    ├── Step 2: Enter OTP → POST /auth/login (email + password + otp)
    │     Response: { token, user }
    │     → token + user stored → navigate to /admin/dashboard
    │
    └── Resend OTP: authApi.resendOtp(email)
          → 30-second cooldown enforced in UI
```

### 🔄 Forgot Password Flow

```
/login/forgotpassword  (ForgotPassword.jsx)
    │  POST /auth/forgot-password { email }
    ▼
/login/verify-otp  (OtpVerification.jsx)
    │  POST /auth/verify-otp { email, otp }
    │  → receives JWT + user → setSession() in AuthContext
    ▼
/login/reset-password  (ResetPassword.jsx)
    │  POST /auth/reset-password { email, otp, newPassword }
    ▼
Redirected to /login with success toast
```

### 🔄 Renewal Request Flow (Student)

```
Student visits /student/renewals (Renewals.jsx)
    │
    ├── Loads certifications → filters by RenewalStatus
    ├── Clicks "Request Renewal" on a certification
    │     PUT /certifications/{id}/renewal { action: "REQUEST" }
    └── Backend updates status → notification created → UI refreshes
```

---

## 📁 Project Structure

```
CERTIFICATION-TRACKING-PLATFORM/
│
├── index.html                    # HTML shell — Google Fonts, Favicon, Google Translate
├── vite.config.js                # Vite config — @vitejs/plugin-react
├── vercel.json                   # Vercel SPA fallback routing (/* → index.html)
├── eslint.config.js              # ESLint with react-hooks + react-refresh plugins
├── package.json                  # Dependencies & npm scripts
├── .env                          # Local env vars (DO NOT COMMIT)
├── .env.example                  # Safe env template for new developers
│
└── src/
    │
    ├── main.jsx                  # App entry — BrowserRouter + AuthProvider + SpeedInsights
    ├── App.jsx                   # Root component (renders <AppRoutes />)
    ├── index.css                 # Global CSS — reset, root variables, shared utility classes
    │
    ├── api/                      # API Layer — all backend communication
    │   ├── axiosInstance.js      # Axios instance: base URL + JWT interceptor + 401 handler
    │   ├── authApi.js            # Auth endpoints: register, login, OTP, password flows
    │   ├── certificationApi.js   # Certification CRUD: create, read, update, delete
    │   ├── adminApi.js           # Admin ops: all users, all certs, renewal mgmt, reminders
    │   ├── notificationApi.js    # Notifications: paged fetch, unread count
    │   └── reportApi.js          # Reports: user cert list, dashboard stats
    │
    ├── context/                  # Global State — React Context API
    │   ├── AuthContext.jsx       # AuthProvider: login, logout, signup, resendOtp, setSession
    │   ├── AuthContextValue.js   # createContext() — the context object itself
    │   └── index.js              # Re-exports for cleaner imports
    │
    ├── routes/                   # Routing
    │   ├── AppRoutes.jsx         # All route definitions: public, auth, student, admin
    │   └── ProtectedRoute.jsx    # Role-based guard: redirects to /login if unauthorized
    │
    ├── layouts/                  # Layout Shells (Outlet-based)
    │   ├── PublicLayout.jsx      # Landing page layout (hero, features, CTA)
    │   ├── PublicLayout.css
    │   ├── AuthLayout.jsx        # Minimal centered layout for login/signup pages
    │   ├── AuthLayout.css
    │   ├── DashboardLayout.jsx   # Shared sidebar + topbar + notification bell
    │   └── DashboardLayout.css
    │
    ├── features/                 # Feature Modules (grouped by domain)
    │   │
    │   ├── public/               # Unauthenticated public pages
    │   │   └── Landing.jsx       # Landing page hero section
    │   │
    │   ├── auth/                 # Authentication pages
    │   │   ├── Login.jsx         # Login form (Student direct + Admin OTP 2FA)
    │   │   ├── Login.css
    │   │   ├── Signup.jsx        # Registration form
    │   │   ├── Signup.css
    │   │   └── password/         # Password management flow
    │   │       ├── ForgotPassword.jsx   # Step 1 — enter email
    │   │       ├── OtpVerification.jsx  # Step 2 — verify OTP
    │   │       ├── ResetPassword.jsx    # Step 3 — set new password
    │   │       └── PasswordFeatures.css
    │   │
    │   ├── student/              # Student dashboard pages
    │   │   ├── Overview.jsx      # Dashboard home: stats cards + charts
    │   │   ├── Overview.css
    │   │   ├── MyCertifications.jsx  # List + CRUD for student's own certs
    │   │   ├── MyCertifications.css
    │   │   ├── Register.jsx      # Add new certification form
    │   │   ├── Register.css
    │   │   ├── Progress.jsx      # Visual progress tracking with charts
    │   │   ├── Progress.css
    │   │   ├── Renewals.jsx      # Renewal request management
    │   │   ├── Renewals.css
    │   │   ├── Reminders.jsx     # Upcoming expiry reminders list
    │   │   ├── Reminders.css
    │   │   ├── Alerts.jsx        # Notifications / system alerts
    │   │   ├── Alerts.css
    │   │   ├── Reports.jsx       # Download Excel report
    │   │   ├── Reports.css
    │   │   ├── Remarks.jsx       # View admin remarks on rejected renewals
    │   │   ├── Remarks.css
    │   │   └── components/       # Reusable sub-components
    │   │       ├── CertificationCard.jsx  # Card UI for a single certification
    │   │       ├── CertificationCard.css
    │   │       ├── CertificationChart.jsx # Recharts donut chart
    │   │       └── StatCard.jsx           # KPI stat box (Total, Active, etc.)
    │   │
    │   ├── admin/                # Admin dashboard pages
    │   │   ├── AdminOverview.jsx        # Admin home: platform-wide analytics
    │   │   ├── AdminOverview.css
    │   │   ├── AdminAllCertifications.jsx # Browse all certifications
    │   │   ├── AdminAllCertifications.css
    │   │   ├── AdminAllStudents.jsx     # Manage all student accounts
    │   │   ├── AdminAllStudents.css
    │   │   ├── ExpiringCerts.jsx        # Certifications expiring within 30 days
    │   │   ├── ExpiringCerts.css
    │   │   ├── RenewalManagement.jsx    # Approve / Reject pending renewals
    │   │   └── RenewalManagement.css
    │   │
    │   └── common/               # Shared pages (both roles)
    │       ├── Profile.jsx       # User profile view
    │       └── Profile.css
    │
    ├── utils/                    # Reusable utility functions
    │   ├── dateformatter.js      # Formats raw ISO date strings for display
    │   └── userUtils.js          # Robustly resolves user full name from various object shapes
    │
    ├── styles/                   # (Reserved for global shared style tokens)
    ├── data/                     # (Reserved for static/mock data if needed)
    └── assets/                   # Images, icons, and static assets
```

---

## 🗺 Page & Route Reference

### Public Routes

| Path | Component | Description |
|---|---|---|
| `/` | `PublicLayout` | Landing page with hero, features, and CTA |

### Auth Routes (No Auth Required)

| Path | Component | Description |
|---|---|---|
| `/login` | `Login.jsx` | Student login (direct) + Admin login (OTP 2FA) |
| `/signup` | `Signup.jsx` | New student registration |
| `/login/forgotpassword` | `ForgotPassword.jsx` | Initiate password reset via email |
| `/login/verify-otp` | `OtpVerification.jsx` | Enter OTP from email |
| `/login/reset-password` | `ResetPassword.jsx` | Set a new password |

### Student Routes — `/student/*` (🔒 Requires: `role === "student"`)

| Path | Component | Description |
|---|---|---|
| `/student/dashboard` | `Overview.jsx` | Dashboard home — stat cards, donut chart, quick actions |
| `/student/certifications` | `MyCertifications.jsx` | View all certifications — edit and delete |
| `/student/register` | `Register.jsx` | Add a new certification |
| `/student/progress` | `Progress.jsx` | Visual progress with Recharts bar/line charts |
| `/student/renewals` | `Renewals.jsx` | View renewal status; request new renewals |
| `/student/reminders` | `Reminders.jsx` | Certifications expiring within 30 days |
| `/student/alerts` | `Alerts.jsx` | All in-app notifications with read/unread states |
| `/student/reports` | `Reports.jsx` | Download certifications as `.xlsx` |
| `/student/remarks` | `Remarks.jsx` | Admin remarks on rejected renewal requests |
| `/student/profile` | `Profile.jsx` | User profile information |

### Admin Routes — `/admin/*` (🔒 Requires: `role === "admin"`)

| Path | Component | Description |
|---|---|---|
| `/admin/dashboard` | `AdminOverview.jsx` | Platform-wide analytics and summary |
| `/admin/certifications` | `AdminAllCertifications.jsx` | Browse and filter all certifications |
| `/admin/mystudents` | `AdminAllStudents.jsx` | View and manage all student accounts |
| `/admin/expiring` | `ExpiringCerts.jsx` | Certifications expiring within 30 days; send reminders |
| `/admin/renewals` | `RenewalManagement.jsx` | Approve / Reject pending renewal requests |
| `/admin/profile` | `Profile.jsx` | Admin profile information |

---

## 🔌 API Layer Deep Dive

All API calls are centralized in `src/api/`. Components **never** call `fetch` or `axios` directly — they always use these service modules.

### `axiosInstance.js` — The Network Command Center

```javascript
// Base URL from environment variable (falls back to localhost for dev)
baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api"

// REQUEST INTERCEPTOR
// Automatically attaches JWT to every outgoing request:
Authorization: `Bearer ${localStorage.getItem("token")}`

// RESPONSE INTERCEPTOR
// On 401 Unauthorized from a non-auth endpoint:
//   → Clears localStorage (token + user)
//   → Hard redirects to /login
// Auth endpoints (login, forgot-password, verify-otp, etc.) are excluded
//   from this redirect to prevent loops
```

### API Module Summary

| Module | File | Endpoints Covered |
|---|---|---|
| **Auth** | `authApi.js` | register, login, resendOtp, forgotPassword, verifyOtp, resetPassword, changePassword |
| **Certifications** | `certificationApi.js` | create, getAll (by userId), update, delete |
| **Admin** | `adminApi.js` | getAllUsers, getAllStudents, getAllCertifications, updateRenewalStatus, sendReminder, addStudent |
| **Notifications** | `notificationApi.js` | getNotifications (paged), getUnreadCount |
| **Reports** | `reportApi.js` | getUserReports, getDashboardStats |

---

## 🧠 State Management — Context API

CertifyMe uses **React's built-in Context API** for global state — no Redux or Zustand needed.

### `AuthContext` — What It Provides

```javascript
// Accessible in any component via:
const { user, login, logout, signup, resendOtp, setSession } = useAuth();
```

| Value | Type | Description |
|---|---|---|
| `user` | Object \| null | Logged-in user (from localStorage, hydrated on app boot) |
| `login(data)` | async function | Calls backend, stores token + user, handles OTP response |
| `signup(userData)` | async function | Registers a new user, auto-logs in |
| `resendOtp(email)` | async function | Resends Admin 2FA OTP with cooldown data |
| `setSession(token, user)` | function | Manually sets session — used after OTP password reset flow |
| `logout()` | function | Clears localStorage + resets user to null |

### `localStorage` Keys

| Key | Content | Set By |
|---|---|---|
| `"token"` | JWT string (`eyJ...`) | `AuthContext.login()` / `setSession()` |
| `"user"` | JSON-stringified user object | `AuthContext.login()` / `setSession()` |

---

## ✅ Prerequisites

| Tool | Minimum Version | Download |
|---|---|---|
| **Node.js** | 18 LTS or higher | [nodejs.org](https://nodejs.org/) |
| **npm** | 9+ (comes with Node.js) | — |
| **Git** | Any | [git-scm.com](https://git-scm.com/) |

> **No separate backend setup is required** if you use the production `.env` pointing to the live Render API. The app works out of the box with the live backend.

---

## 🚀 Quick Start (Local Setup)

Follow these steps to have the frontend running locally in under 3 minutes.

### Step 1 — Clone the Repository

```bash
git clone https://github.com/lalithdev/CertifyMe-Certification-Tracking-Platform.git
cd CertifyMe-Certification-Tracking-Platform
```

### Step 2 — Install Dependencies

```bash
npm install
```

This installs all packages from `package.json` into `node_modules/`.

### Step 3 — Configure Environment Variables

The app needs to know where the backend API is running.

```bash
# Copy the example file
copy .env.example .env     # Windows
# cp .env.example .env    # macOS / Linux
```

Then open `.env` and set your backend URL:

```env
# For LOCAL development (if you're running the Spring Boot backend locally)
VITE_BACKEND_URL=http://localhost:8080/api

# For PRODUCTION (using the live deployed backend on Render)
VITE_BACKEND_URL=https://certifyme-backend.onrender.com/api
```

> **Note**: Vite only exposes environment variables prefixed with `VITE_` to the browser. Never put secrets here.

### Step 4 — Start the Development Server

```bash
npm run dev
```

Vite will start the dev server and display:

```
  VITE v7.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

### Step 5 — Open in Browser

Visit **[http://localhost:5173](http://localhost:5173)**

The app hot-reloads instantly on every file save — no manual refresh needed.

---

## ⚙️ Environment Variables Reference

| Variable | Required | Default | Description |
|---|---|---|---|
| `VITE_BACKEND_URL` | ✅ Yes | `http://localhost:8080/api` (code fallback) | Full base URL of the Spring Boot backend API |

> **How it's used**: `axiosInstance.js` reads `import.meta.env.VITE_BACKEND_URL`. All API calls are prefixed with this URL.

### Example Values

```env
# Local development
VITE_BACKEND_URL=http://localhost:8080/api

# Production (Render)
VITE_BACKEND_URL=https://certifyme-backend.onrender.com/api
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR at `http://localhost:5173` |
| `npm run build` | Build production bundle to `/dist` |
| `npm run preview` | Locally preview the production `/dist` build |
| `npm run lint` | Run ESLint across all source files |

---

## 🧩 Feature Walkthrough

### Student Dashboard (`/student/dashboard`)

- **Stat Cards**: Total, Active, Expiring Soon, Expired — fetched from `/certifications/stats/{userId}`
- **Donut Chart**: Visual breakdown via `<CertificationChart />` (Recharts)
- **Quick Actions**: Links to Register, My Certifications, Renewals

### My Certifications (`/student/certifications`)

- Lists all certifications for the logged-in student
- **Inline Edit** — update title, issuer, dates, credential ID, URL
- **Delete** — with confirmation prompt
- Status badges: 🟢 Active · 🟡 Expiring Soon · 🔴 Expired

### Register Certification (`/student/register`)

- Form fields: Title, Issuer, Credential ID, URL, Issue Date, Expiry Date, Remarks
- Submits to `POST /certifications/user/{userId}`
- Success → Sonner toast notification

### Renewals (`/student/renewals`)

- Groups certifications by renewal status (None / Pending / Approved / Rejected)
- **Request Renewal** button → `PUT /certifications/{id}/renewal { action: "REQUEST" }`
- Rejected renewals show admin remarks via link to `/student/remarks`

### Alerts (`/student/alerts`)

- Paginated notification list from `/student/notifications`
- Unread badge count in sidebar from `/student/notifications/unread-count`
- Mark individual or all as read

### Reports (`/student/reports`)

- Shows certification summary table
- **Download Excel** → calls `/certifications/export/{userId}` → browser downloads `.xlsx`

### Admin Overview (`/admin/dashboard`)

- Platform stats: total students, total certifications, pending renewals, expiring soon
- Charts: certification status distribution across all users

### Renewal Management (`/admin/renewals`)

- Lists all certifications with `renewalStatus = PENDING`
- **Approve** → `PUT /certifications/{id}/renewal { action: "APPROVE" }`
- **Reject** → requires rejection remark → `PUT /certifications/{id}/renewal { action: "REJECT", remarks: "..." }`

### Expiring Certifications (`/admin/expiring`)

- Lists all certifications expiring within 30 days
- **Send Reminder** button → `PUT /certifications/{id}/remind` → triggers in-app notification to student

---

## 🛡️ Security & Route Protection

### `ProtectedRoute.jsx`

Every student and admin route is wrapped in `<ProtectedRoute allowedRole="student|admin">`:

```
User visits /student/dashboard
    │
    ├── ProtectedRoute reads localStorage["user"]
    ├── No user? → <Navigate to="/login" replace />
    ├── user.role !== "student"? → <Navigate to="/login" replace />
    └── ✅ Role matches → render <DashboardLayout>
```

**Role value handling**: The `ProtectedRoute` handles role as both a plain string (`"student"`) and as an object with a `.name` property (`{ name: "STUDENT" }`) — making it resilient to different backend response shapes.

### Axios 401 Auto-Logout

When any API call returns `401 Unauthorized`:
- `localStorage.removeItem("token")`
- `localStorage.removeItem("user")`
- `window.location.href = "/login"` (hard redirect, clears React state)

Auth endpoints are **excluded** from this redirect to prevent loops during the forgot-password flow.

---

## 🚢 Deployment (Vercel)

The app is deployed on **Vercel** with automatic CI/CD from the GitHub repository.

### Live URL

**[https://certifymeonline.vercel.app](https://certifymeonline.vercel.app)**

### SPA Routing Fix — `vercel.json`

React Router uses client-side routing. Without this, refreshing a page like `/student/dashboard` would return a 404 from Vercel's servers. The `vercel.json` fixes this:

```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

This tells Vercel: "Serve static files normally. For everything else, return `index.html` and let React Router handle the URL."

### Steps to Deploy Your Own Fork

1. Push your fork to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. Framework Preset: **Vite** (auto-detected)
4. Add Environment Variable in Vercel's settings:
   ```
   VITE_BACKEND_URL = https://certifyme-backend.onrender.com/api
   ```
5. Click **Deploy** — Vercel handles the rest

### Building the Production Bundle Locally

```bash
npm run build
# Output goes to /dist

npm run preview
# Preview at http://localhost:4173
```

---

## 🔧 Common Issues & Troubleshooting

### ❌ Blank Page on `/student/dashboard` after refresh

**Cause**: Vercel is not configured for SPA routing yet.  
**Fix**: Ensure `vercel.json` exists in the project root with the fallback route configuration shown above.

### ❌ `CORS error` — API calls blocked

**Cause**: The backend CORS config doesn't include your local or deployed frontend origin.  
**Fix**:
- For local dev: Make sure your Vite dev server runs on `localhost:5173` (default). The backend allows `http://localhost:*`.
- For production: Ensure your Vercel domain matches the pattern `https://certifyme*.vercel.app` allowed in Spring Boot's `SecurityConfig`.

### ❌ `401 Unauthorized` immediately after login

**Cause**: The JWT token wasn't stored properly or `VITE_BACKEND_URL` points to the wrong API.  
**Fix**:
- Check browser DevTools → Application → LocalStorage → ensure `token` key exists
- Verify `VITE_BACKEND_URL` in `.env` matches the backend base URL **including `/api`**:
  ```
  VITE_BACKEND_URL=https://certifyme-backend.onrender.com/api   ✅ Correct
  VITE_BACKEND_URL=https://certifyme-backend.onrender.com       ❌ Missing /api
  ```

### ❌ Environment variables not loading (`import.meta.env.VITE_BACKEND_URL` is `undefined`)

**Cause**: `.env` file missing or variable not prefixed with `VITE_`.  
**Fix**:
- Create `.env` from `.env.example`: `copy .env.example .env`
- Restart the Vite dev server after modifying `.env` — Vite does **not** hot-reload env changes

### ❌ `npm install` fails — Node version too old

**Cause**: Vite 7 requires Node.js 18+.  
**Fix**:
```bash
# Check your Node version
node -v

# If below 18, upgrade via nvm (Windows: nvm-windows)
nvm install 20
nvm use 20
```

### ❌ Charts not rendering — blank `<CertificationChart />` area

**Cause**: `recharts` needs a defined width from a parent container.  
**Fix**: Ensure the chart's parent container has an explicit width (not `auto` or `0`). Use `<ResponsiveContainer width="100%" height={300}>` as the outer wrapper.

### ❌ Google Translate Widget not appearing

**Cause**: Ad-blocker or script blocker is preventing Google Translate from loading.  
**Fix**: This is a browser-level issue. Disable your ad-blocker for the domain, or inform users that the translate widget requires Google scripts to load.

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feature/your-feature-name`
3. **Follow the project conventions**:
   - Feature code goes in `src/features/<role>/`
   - Each page gets its own `.jsx` + `.css` co-located in the same folder
   - All API calls go in `src/api/` — never inline `axios` in components
   - Use `useAuth()` for any authentication state access
4. **Run lint before committing**: `npm run lint`
5. **Commit with a descriptive message**:
   ```
   feat: add certification search filter to MyCertifications
   fix: resolve OTP timer not resetting on resend
   docs: update environment variable reference
   ```
6. **Open a Pull Request** with a clear description of changes

### Code Conventions

| Rule | Detail |
|---|---|
| API calls | Always go through `src/api/` modules, never inline |
| State | Use `useAuth()` for auth; `useState` + `useEffect` for local page state |
| Routing | Add new routes in `AppRoutes.jsx`, always wrap protected routes in `<ProtectedRoute>` |
| Styling | Co-locate `.css` with `.jsx` in the same folder; no inline styles |
| Imports | Use relative paths; group imports: React → 3rd party → local |

---

## 👨‍💻 Author & Credits

<div align="center">

| | |
|:---:|:---|
| <img src="https://avatars.githubusercontent.com/lalithdev" width="80" style="border-radius:50%"/> | **Lalith Aditya S** *(LalithDev)*<br/>Full-Stack Developer · Designer · Builder<br/>📍 India |

</div>

> CertifyMe was designed, developed, and deployed end-to-end as a solo project — from database schema to UI design, JWT security to scheduled jobs, and Vercel deployment to production monitoring.

| Platform | Link |
|---|---|
| 🌐 **Portfolio** | [meetlalith.vercel.app](https://meetlalith.vercel.app) |
| 💼 **LinkedIn** | [linkedin.com/in/lalith-aditya-singuparapu](https://www.linkedin.com/in/lalith-aditya-singuparapu) |
| 🐙 **GitHub** | [github.com/lalithdev](https://github.com/lalithdev) |
| 📧 **Email** | [lalithadityasinguparapu@gmail.com](mailto:lalithadityasinguparapu@gmail.com) |

---

## 📬 Contact & Support

Have a question, found a bug, or want to suggest a feature?

| Channel | Where |
|---|---|
| 🐛 **Bug Reports / Feature Requests** | [Open a GitHub Issue](https://github.com/lalithdev/CertifyMe-Certification-Tracking-Platform/issues) |
| 📧 **Direct Email** | [lalithadityasinguparapu@gmail.com](mailto:lalithadityasinguparapu@gmail.com) |
| 💼 **Professional Enquiries** | [LinkedIn](https://www.linkedin.com/in/lalith-aditya-singuparapu) |

---

## 🐛 Reporting Issues

If you encounter a bug or unexpected behaviour:

1. Check the [Troubleshooting](#-common-issues--troubleshooting) section first
2. Search [existing issues](https://github.com/lalithdev/CertifyMe-Certification-Tracking-Platform/issues) to avoid duplicates
3. [Open a new issue](https://github.com/lalithdev/CertifyMe-Certification-Tracking-Platform/issues/new) and include:
   - **Steps to reproduce** the problem
   - **Expected vs actual behaviour**
   - **Browser & OS** you're using
   - Any **console errors** (F12 → Console)

---

## ⭐ Show Support

If CertifyMe helped you or you find it impressive, consider giving it a star — it means a lot!

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/lalithdev/CertifyMe-Certification-Tracking-Platform?style=for-the-badge&logo=github&color=yellow)](https://github.com/lalithdev/CertifyMe-Certification-Tracking-Platform/stargazers)

</div>

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Lalith Aditya S (LalithDev)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">
  <p>Built with ❤️ by <a href="https://meetlalith.vercel.app" target="_blank"><strong>Lalith Aditya S</strong></a></p>
  <p>
    <a href="https://certifymeonline.vercel.app" target="_blank"><strong>🌐 Live Demo — certifymeonline.vercel.app</strong></a>
  </p>
  <p>
    <a href="https://github.com/lalithdev/CertifyMe-Certification-Tracking-Platform-Backend" target="_blank">⚙️ Backend Repository (Spring Boot)</a> ·
    <a href="https://www.linkedin.com/in/lalith-aditya-singuparapu" target="_blank">💼 LinkedIn</a> ·
    <a href="https://meetlalith.vercel.app" target="_blank">🌐 Portfolio</a>
  </p>
</div>