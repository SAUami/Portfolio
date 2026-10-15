# Premium Tech Startup Portfolio & Engineering Studio

A complete, responsive, production-ready portfolio website built for **Saurabh Sharma**, Founder, Engineer & Entrepreneur.

The platform showcases the startup, founder philosophy, services, live project deployments, development methodology, and an integrated **Founder Admin Portal** allowing Saurabh to log in and inspect incoming client enquiries in real time.

---

## 1. Verified Brand & Identity Details

All core brand parameters are centralized in a single configuration file:
📁 [`src/config/brand.config.ts`](src/config/brand.config.ts)

| Configuration Key | Configured Value | Purpose |
| :--- | :--- | :--- |
| `founder.name` | `"Saurabh Sharma"` | Founder's full name |
| `founder.role` | `"Founder, Engineer & Entrepreneur"` | Professional title |
| `founder.location` | `"New Delhi, India - 201310"` | Geographical base |
| `founder.email` | `"vedyxa.in@gmail.com"` | Primary business contact |
| `founder.whatsAppUrl` | `"https://wa.me/919506986879"` | Direct 1-tap WhatsApp chat |
| `founder.linkedinUrl` | `"https://www.linkedin.com/in/saurabhsharma1385"` | Professional LinkedIn profile |
| `founder.instagramUrl` | `"https://www.instagram.com/saurabhsharma1385/"` | Official Instagram profile |
| `founder.image` | `"/saurabh-sharma.jpg"` | Real founder photograph |
| `startup.name` | `"Saurabh Sharma Studio"` | Brand & business identity |
| `startup.tagline` | `"Turning Ideas Into Powerful Digital Experiences."` | Core brand proposition |

---

## 2. Live Project Deployments & Case Studies (Work in Progress 🚧)

Both client web applications are currently **under active development**:

### 🩺 MedConnect (Healthcare Platform) — *Work In Progress*
- **Live Deployed Prototype**: [https://med-connect-chi.vercel.app/](https://med-connect-chi.vercel.app/)
- **Detailed Case Study Route**: `/projects/medconnect`
- **Current Status**: Active development; doctor discovery, specialization filtering, digital prescription viewer with PDF download, appointment booking workflows.

### 🏺 ClayVista (Artisanal Tableware E-commerce) — *Work In Progress*
- **Live Deployed Prototype**: [https://clayvista.onrender.com/](https://clayvista.onrender.com/)
- **Detailed Case Study Route**: `/projects/clayvista`
- **Current Status**: Active development; filterable catalog, stateful shopping cart drawer, persistent client wishlist, responsive touch browsing, and checkout interface.

---

## 3. Founder Admin Portal (`/login` & `/admin`)

When potential clients fill out the contact form on your portfolio website, their briefs are immediately recorded so you can review them in your private admin dashboard.

### How to Access Your Dashboard:
1. Navigate to: **`http://localhost:5173/login`** (or click **"Founder Portal"** in the footer).
2. Enter your authorized admin credentials (`ADMIN_EMAIL` and `ADMIN_PASSWORD` configured in your environment).
3. You will be redirected to the **Founder Dashboard (`/admin`)**.

### Dashboard Features:
- **KPI Metrics**: Total Enquiries, New/Unread, Under Review, and Responded.
- **Search & Filters**: Search briefs by client name, email, company, or service; filter by status.
- **Detailed Inspection Modal**: View complete project description, budget, timeline, and client IP.
- **1-Click Actions**:
  - **Email Client**: Opens your email client with pre-filled subject and recipient.
  - **WhatsApp Direct**: Opens WhatsApp web/app with pre-filled greeting.
  - **Status Updates**: Mark enquiries as `New`, `Reviewed`, `Responded`, or `Archived`.
  - **Export CSV**: Download all enquiries as an Excel-compatible spreadsheet.

---

## 4. Technology Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Bundler**: Vite 5
- **Styling**: Tailwind CSS with custom Dark Navy (`#070A12`), Electric Blue (`#3B82F6`), and Subtle Violet (`#8B5CF6`)
- **Animations**: Framer Motion (respects `prefers-reduced-motion`)
- **Routing**: React Router 6 (SPA with auto-scroll preservation)
- **Icons**: Lucide React
- **Auth**: React Context + Token authentication stored in LocalStorage

### Backend
- **Runtime**: Node.js (v18+) with Express & TypeScript
- **Security**: Helmet security headers, CORS whitelisting, rate limiting, and honeypot spam detection
- **Persistence**: Dual-layer storage (MongoDB with automatic fallback to local JSON storage so enquiries are never lost)
- **Validation**: Zod runtime schema validation
- **Email Service**: Nodemailer (configurable SMTP)

---

## 5. Running the Project Locally

### 1. Start the Frontend Dev Server:
```powershell
npm.cmd run dev
```
Open **`http://localhost:5173`** in your browser.

### 2. Start the Backend API Server:
In another terminal:
```powershell
npm.cmd run server:dev
```
Runs at **`http://localhost:5000`** with live `/api` proxying.

### 3. Run Backend Integration Tests:
```powershell
npm.cmd run server:test
```

### 4. Build for Production:
```powershell
npm.cmd run build
```
Creates production bundle in `dist/`.

---

## 6. Manual Testing Checklist

| Test Item | Verification Criteria | Status |
| :--- | :--- | :--- |
| **Founder Photo** | Saurabh's real photograph renders crisply in About section and Hero pill | Verified |
| **Email & WhatsApp** | Links route to `saurabhsh8382@gmail.com` and `https://wa.me/919506986879` | Verified |
| **Live Project URLs** | External buttons launch MedConnect (Vercel) and ClayVista (Render) in new tabs | Verified |
| **Contact Submission** | Valid form submission records lead and gives honest confirmation | Verified |
| **Admin Login** | `/login` authenticates `saurabhsh8382@gmail.com` with `Saurabh@2026` | Verified |
| **Enquiries Dashboard** | `/admin` displays incoming leads, search works, and CSV export functions | Verified |
| **Accessibility & Motion** | Keyboard tab navigation, visible focus rings, and reduced-motion compliance | Verified |
