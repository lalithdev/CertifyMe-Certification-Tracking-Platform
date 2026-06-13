# CertifyMe-Certification Tracking Platform
Track | Manage | Renew
> A modern, responsive frontend application for certification management, built with React and Vite. Designed to help students track, manage, and renew their certifications while providing administrators with comprehensive oversight and verification tools.

**Live Demo:** https://certifymeonline.vercel.app

## 🎯 Project Overview

CertifyMe is a full-featured certification tracking and management platform that streamlines the certification lifecycle for both students and administrators. The platform provides real-time monitoring, renewal workflows, and intelligent alerts to ensure certifications never expire unexpectedly.

### Key Features

#### 👨‍🎓 Student Features
- **Dashboard Overview** - Visualize certification statistics (total, active, expiring soon, expired)
- **Certification Management** - Register, upload, and track certifications with detailed metadata
- **Progress Tracking** - Monitor certification progression and compliance status
- **Renewal Workflows** - Request renewals for expired certifications with approval tracking
- **Smart Reminders** - Receive real-time notifications about upcoming expiration dates
- **Alert System** - High-priority alerts for expiring and expired certifications
- **Report Generation** - View compliance charts, aggregates, and historical data
- **Profile Management** - Update password and personal profile information
- **Intelligent Search** - Command palette-style navigation across the dashboard

#### 👨‍💼 Admin Features
- **Comprehensive Dashboard** - High-level administrator console with platform statistics
- **Certification Oversight** - Browse and manage all user certifications in the system
- **Student Management** - Track, manage, and monitor all student accounts
- **Expiration Monitoring** - Quick overview of decaying certifications across the platform
- **Renewal Management** - Approve or reject certification renewal requests
- **Verification Feedback** - Add remarks and verification notes for students

#### 🌍 Multi-Language Support
- Integrated Google Translate for 6+ languages (English, Hindi, Telugu, Japanese, Spanish, German)
- Seamless language switching

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 19.2.0 |
| **Build Tool** | Vite 7.3.1 |
| **Routing** | React Router DOM 7.13.0 |
| **HTTP Client** | Axios 1.14.0 |
| **UI Components** | Lucide React 0.575.0, React Icons 5.6.0 |
| **Data Visualization** | Recharts 3.7.0 |
| **Notifications** | Sonner 2.0.7 |
| **Performance** | Vercel Speed Insights 2.0.0 |
| **Styling** | Modern CSS with CSS Variables |
| **Linting** | ESLint 9.39.1 |
| **Font** | Inter (Google Fonts) |

---

## 📁 Folder Structure

```
CertifyMe-Certification-Tracking-Platform/
├── public/                          # Static assets (favicons, logos)
├── src/
│   ├── api/                        # API service layer
│   │   ├── axiosInstance.js        # Axios interceptors for auth & error handling
│   │   ├── authApi.js              # Authentication endpoints
│   │   ├── certificationApi.js     # Certification CRUD operations
│   │   ├── notificationApi.js      # Notification polling
│   │   ├── adminApi.js             # Admin-specific operations
│   │   └── reportApi.js            # Dashboard stats & reports
│   │
│   ├── features/                   # Feature-specific components
│   │   ├── public/                 # Public landing page
│   │   ├── auth/                   # Authentication pages
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── password/           # Password reset flow
│   │   ├── student/                # Student dashboard components
│   │   │   ├── Overview.jsx        # Main dashboard
│   │   │   ├── MyCertifications.jsx
│   │   │   ├── Progress.jsx
│   │   │   ├── Renewals.jsx
│   │   │   ├── Reminders.jsx
│   │   │   ├── Alerts.jsx
│   │   │   ├── Reports.jsx
│   │   │   ├── Register.jsx        # Add certification
│   │   │   ├── Remarks.jsx
│   │   │   └── components/         # Reusable feature components
│   │   ├── admin/                  # Admin dashboard components
│   │   │   ├── AdminOverview.jsx
│   │   │   ├── AdminAllCertifications.jsx
│   │   │   ├── AdminAllStudents.jsx
│   │   │   ├── ExpiringCerts.jsx
│   │   │   ├── RenewalManagement.jsx
│   │   │   └── components/
│   │   └── common/                 # Shared components
│   │       └── Profile.jsx
│   │
│   ├── layouts/                    # Layout wrappers
│   │   ├── PublicLayout.jsx
│   │   ├── AuthLayout.jsx
│   │   └── DashboardLayout.jsx     # Dashboard with sidebar navigation
│   │
│   ├── routes/                     # Route configuration
│   │   ├── AppRoutes.jsx           # Route definitions
│   │   └── ProtectedRoute.jsx      # Role-based route protection
│   │
│   ├── context/                    # React Context (State Management)
│   │   ├── AuthContext.jsx         # Auth provider & useAuth hook
│   │   ├── AuthContextValue.js     # Context object definition
│   │   └── index.js                # Barrel export
│   │
│   ├── styles/                     # Shared CSS design tokens
│   │   ├── variables.css
│   │   ├── typography.css
│   │   └── utilities.css
│   │
│   ├── utils/                      # Utility functions
│   │   ├── dateformatter.js        # Date formatting utilities
│   │   └── userUtils.js            # User data helpers
│   │
│   ├── App.jsx                     # Root component
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles & CSS variables
│
├── index.html                      # HTML entry point
├── vite.config.js                  # Vite configuration
├── package.json                    # Dependencies & scripts
├── .env.example                    # Environment variable template
└── eslint.config.js                # ESLint flat config (v9)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn installed
- Backend API running (Spring Boot REST API)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lalithdev/CertifyMe-Certification-Tracking-Platform.git
   cd CertifyMe-Certification-Tracking-Platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment configuration** (copy the provided template)
   ```bash
   # Windows
   copy .env.example .env

   # macOS / Linux
   cp .env.example .env
   ```

4. **Configure environment variables**
   ```env
   VITE_BACKEND_URL=http://localhost:8080/api
   ```

### Development

Start the development server with hot module reloading:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create an optimized production build:

```bash
npm run build
```

### Preview Build Locally

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

---

## 📋 Environment Variables

Create a `.env` file in the project root with the following configuration:

```env
# Required: Backend API URL
# Example: http://localhost:8080/api or https://api.certifyme.com
VITE_BACKEND_URL=http://localhost:8080/api
```

> **Note:** Vite environment variables must be prefixed with `VITE_` to be accessible in the frontend.

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

The application is configured for seamless deployment on Vercel with Speed Insights integration.

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy

3. **Configure Environment in Vercel**
   - In Vercel dashboard: Settings → Environment Variables
   - Add `VITE_BACKEND_URL` with your production backend URL

### Deploy to Other Platforms

**Netlify:**
```bash
npm run build
# Upload 'dist' folder to Netlify
```

**GitHub Pages / Static Host:**
```bash
npm run build
# Host the 'dist' folder contents
```

---

## 🔐 Authentication Flow

### Login Process
1. User enters email and password
2. Backend validates credentials and returns JWT token
3. Token stored in localStorage
4. Axios interceptor automatically includes token in all requests
5. Protected routes check user role (student/admin)

### Token Management
- **Storage:** `localStorage` — token stored under key `"token"`, user data under `"user"`
- **401 Handling:** Axios response interceptor clears both keys and hard-redirects to `/login` — no silent token refresh; auth flow restarts
- **Auth-flow bypass:** 401s from `/auth/*` routes (login, OTP, password reset) do **not** trigger the redirect, so error messages surface correctly
- **Logout:** Both keys removed from `localStorage`, user navigated to `/login`

### Admin Login — Two-Stage OTP Flow
1. Admin enters email and password
2. Backend responds with `otpRequired: true` instead of a token
3. Admin receives OTP on registered email
4. OTP submitted to `/auth/resend-otp` or verified via `/auth/verify-otp`
5. On success, JWT token issued and session set

### Password Recovery
1. User initiates "Forgot Password"
2. System sends OTP to registered email
3. User verifies OTP via `/auth/verify-reset-otp`
4. New password set via `/auth/reset-password`
5. User logs in with new credentials

---

## 🎨 UI/UX Design

### Design System
- **Color Palette:** Modern indigo-based premium SaaS theme
  - Primary: `#4f46e5` (Indigo)
  - Success: `#10b981` (Green)
  - Warning: `#f59e0b` (Amber)
  - Danger: `#ef4444` (Red)

- **Typography:** Inter font family (400, 500, 600, 700, 800 weights)
- **Border Radius:** Consistent 8px-24px scale
- **Shadows:** Multiple depth levels for visual hierarchy

### Responsive Design
- **Mobile First:** Optimized for mobile (320px+)
- **Tablet:** 768px+ breakpoint
- **Desktop:** Full-width layouts at 1920px+
- **Collapsible Sidebar:** Auto-collapse on mobile, toggle available

### User Interface Highlights
- Dashboard with gradient background
- Command palette for navigation
- Real-time notification system
- Status badges and icons
- Skeleton loading states
- Toast notifications (Sonner)
- Interactive modal dialogs

---

## 🔄 API Integration

### Axios Configuration
- **Base URL:** Configured from `VITE_BACKEND_URL`
- **Interceptors:** Automatic token attachment & 401 handling
- **Error Handling:** Global error response handling

### Available APIs

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/register` | POST | User registration |
| `/auth/login` | POST | User authentication |
| `/auth/resend-otp` | POST | Resend OTP (admin two-stage login) |
| `/auth/forgot-password` | POST | Initiate password reset |
| `/auth/verify-otp` | POST | Verify OTP (admin login flow) |
| `/auth/verify-reset-otp` | POST | Verify OTP (password reset flow) |
| `/auth/reset-password` | POST | Set new password after OTP |
| `/auth/change-password` | POST | Change password while authenticated |
| `/certifications/user/:userId` | GET | Fetch all certifications for a user |
| `/certifications/user/:userId` | POST | Register a new certification |
| `/certifications/:id` | PUT | Update certification details |
| `/certifications/:id` | DELETE | Delete a certification |
| `/certifications/:id/renewal` | PUT | Request or update renewal status |
| `/certifications/:id/remind` | PUT | Admin: trigger a reminder notification |
| `/certifications/all` | GET | Admin: fetch all certifications |
| `/certifications/stats/:userId` | GET | Fetch dashboard stats for a user |
| `/users` | GET | Admin: fetch all users |
| `/users/students` | GET | Admin: fetch students only |
| `/student/notifications` | GET | Fetch notifications (paginated) |
| `/student/notifications/unread-count` | GET | Get unread notification count |

---

## 🔔 Key Features Deep Dive

### Real-Time Notifications
- 10-second polling interval for unread notifications
- Sonner toast notifications with custom styling
- Only notifies on new reminder increases
- Admin bypass: Disabled for admin accounts

### Certification Status Tracking
```
Days Remaining  │  Status
───────────────────────────
   > 30 days    │  Active
  1-30 days     │  Expiring Soon
     ≤ 0 days   │  Expired
```

### Smart Search
- Dashboard-level search across navigation items
- Fuzzy matching on labels and descriptions
- Role-based search results (student vs admin)

### Data Visualization
- Recharts for dashboard statistics
- Real-time stat card updates
- Status breakdown charts
- Historical data trends

---

## 📊 Performance Optimizations

- **Vite:** Lightning-fast development and production builds
- **React 19:** Latest optimizations and features
- **Vercel Speed Insights:** Real-time performance monitoring
- **CSS Variables:** Minimal runtime overhead
- **Code Splitting:** Automatic route-based splitting
- **Lazy Loading:** Dynamic imports for features
- **Skeleton Loaders:** Improved perceived performance

---

## 🐛 Debugging & Troubleshooting

### Common Issues

**Issue: "Cannot GET /student/dashboard"**
- Solution: Ensure you're running `npm run dev` and accessing `http://localhost:5173`

**Issue: API returns 401 Unauthorized**
- Solution: Check if `VITE_BACKEND_URL` is correct and backend is running
- Verify localStorage has valid JWT token

**Issue: Google Translate not working**
- Solution: Check browser's Content Security Policy settings
- Ensure translate.google.com is accessible

**Issue: Notifications not showing**
- Solution: Verify polling is enabled (check browser console)
- Ensure user role is "student" (admins bypass polling)

---

## 🗺️ Future Roadmap

- [ ] **Dark Mode** - Theme switcher for dark/light modes
- [ ] **Bulk Operations** - Multi-select and bulk actions for certifications
- [ ] **Advanced Filtering** - Faceted search with custom filters
- [ ] **Export Features** - PDF/Excel export for certifications and reports
- [ ] **Email Notifications** - Configurable email alerts
- [ ] **Audit Logging** - Complete audit trail of all actions
- [ ] **Two-Factor Authentication** - Enhanced security with 2FA
- [ ] **Certificate Preview** - Direct preview of uploaded certificates
- [ ] **Integration APIs** - RESTful API for third-party integrations
- [ ] **Performance Analytics** - Detailed platform usage analytics

---

## 📝 License

This project is proprietary software. All rights reserved.

---

## 🤝 Support & Contact

For issues, questions, or feature requests:
- GitHub Issues: [CertifyMe Issues](https://github.com/lalithdev/CertifyMe-Certification-Tracking-Platform/issues)
- Email: [lalithadityasinguparapu@gmail.com]

---

## 👨‍💻 Developer

**Lalith Dev**
- GitHub: [@lalithdev](https://github.com/lalithdev)
- Portfolio: [about-lalith.vercel.app](https://about-lalith.vercel.app)

---

<div align="center">

**Designed  by LalithDev**

⭐ If you find this helpful, please consider giving it a star!

</div>