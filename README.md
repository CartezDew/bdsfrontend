# BDS Talent Group – Frontend

Modern, responsive React app (Vite + React 18) for BDS Talent Group. It includes marketing pages, rich interactions, a reusable dropdown system, and a lightweight Admin Dashboard backed by localStorage for demo purposes.

## Quick Start

Prerequisites
- Node.js ≥ 16
- npm or yarn

Install and run
```bash
npm install
npm run dev
```
App runs at `http://localhost:3000`.

Build and preview
```bash
npm run build
npm run preview
```

## Routes and Pages

- `/` Home
  - Sections: Hero, Avoid Confusion, Services, Contact/Office Hours
  - Smooth hash navigation (e.g., `/#services`, `/#social-proof`, `/#meet-the-owner`, `/#appointment-scheduler`)
- `/services` Services page
  - Reuses `Services` with page-specific container and styling
- `/get-started` Get Started
  - Multi-step form (Service → Contact → Files), SEO metadata, image lazy-loading
- `/sign-in` Sign In
  - Clean, on-brand layout with entrance animations; footer placement consistent across pages
- `/admin` Admin Dashboard (demo)
  - Overview/workflow widgets and Appointments tab with simple scheduler controls

Document title updates automatically per route (e.g., “BDS Talent Group | Services”, “| Get Started”, “| Sign In”).

## Navigation Behavior

- Desktop navbar is visible across routes except on `/admin`. On the home page it hides while the hero is in view and shows as you scroll.
- Mobile hamburger interactions are debounced and rebroadcast to ensure one-tap open/close behavior.
- Global link handling centralizes the following behaviors:
  - “Get Started”: If already on `/get-started`, scrolls to top; otherwise navigates and then scrolls to top.
  - “Schedule Consultation/Appointment”: If on home, scrolls to `#appointment-scheduler` with navbar offset; otherwise navigates home and scrolls.
- Footer buttons reuse the same cross-route, hash-based scroll logic.

## Reusable Dropdown (Custom Select)

- Component: `src/components/CustomSelect.jsx`
- Styles: `src/styles/dropdown_reusable.css`
- Features: grouped/flat options, keyboard navigation, click-outside close, accessible combobox/listbox roles.
- Usage examples:
  - Appointment Scheduler (service/referral selects)
  - Get Started (service/referral/country selects)

If a dropdown is visually behind neighbors, ensure its container does not clip overflow. Get Started form sections are configured with `overflow: visible`.

## Admin Dashboard (Demo)

- Components
  - `AdminDashboard.jsx`: Tabs for Workflow and Appointments
  - `AdminNavbar.jsx`: Minimal navbar with Sign Out
  - `AdminAppointmentsPanel.jsx`: Weekly availability, date blocking, cancel/reschedule actions
- Data utilities (localStorage): `src/utils/adminData.js`
  - Seed data on first run
  - Keys: submissions and appointment lists, availability by weekday, blocked dates
- Styling: `src/styles/admin.css`
- The public `Navbar` is hidden on `/admin` (admin has its own navbar).

## Key Components

- `App.jsx`
  - Global handlers for navigation and precise cross-route scrolling
  - Hides main navbar on `/admin`, manages hero intersection behavior on home
  - Mounts `PageTitle` globally for route-based tab names
- `Navbar.jsx`, `NavbarDesktop.jsx`, `NavbarMobile.jsx`
  - Desktop links: Home, Services, Why Us, FAQ, Contact, Sign In; smooth show/hide transitions
  - Mobile: hamburger menu, dropdown with icons; CTA links use global navigation logic
- `Hero.jsx`, `Services.jsx`, `AvoidConfusion.jsx`, `OfficeHoursLocations.jsx`
  - Responsiveness with `clamp()` for font sizes, paddings, and button dimensions
- `GetStarted.jsx`
  - Three-step process with validations, drag-and-drop-like file area, and content performance tweaks (lazy images, canonical, robots)
- `Footer.jsx`
  - Hash navigation to home sections with consistent offsets and special cases (e.g., bottom of “Meet the Owner”)

## Styling & Responsiveness

- CSS variables: colors from `index.css` color palette (hunter green, golden brown, timberwolf, sinopia, eerie black)
- Media queries grouped per file; heavy use of `clamp()` for responsive typography, spacing, and controls
- Reusable dropdown styles in `dropdown_reusable.css`

## Accessibility & UX

- `aria-` attributes on interactive elements
- Keyboard navigation in `CustomSelect`
- Smooth scrolling and controlled scroll restoration across routes

## Environment Variables (optional)

Create a `.env` if needed:
```
VITE_APP_TITLE=BDS Talent Group
VITE_API_URL=http://localhost:8000
```

## Project Structure (high-level)

```
src/
├── components/
│   ├── AdminDashboard.jsx
│   ├── AdminNavbar.jsx
│   ├── AdminAppointmentsPanel.jsx
│   ├── CustomSelect.jsx
│   ├── Footer.jsx
│   ├── GetStarted.jsx
│   ├── Hero.jsx
│   ├── Navbar.jsx
│   ├── NavbarDesktop.jsx
│   ├── NavbarMobile.jsx
│   ├── OfficeHoursLocations.jsx
│   ├── PageTitle.jsx
│   ├── Services.jsx
│   └── SignIn.jsx
├── utils/
│   └── adminData.js
├── styles/
│   ├── admin.css
│   ├── dropdown_reusable.css
│   ├── getStarted.css
│   ├── hero.css
│   ├── navbar.css
│   ├── services.css
│   └── signin.css
└── App.jsx
```

## Known Behaviors / Tips

- Title mapping lives in `PageTitle.jsx` (add cases for new routes).
- If a route-specific button should scroll to the top (e.g., Get Started), rely on the global click handler in `App.jsx`—do not duplicate logic in each component.
- On the Sign In page, the global back-to-top button is hidden and the footer stays anchored to the bottom.

## Scripts

- `npm run dev` – Start dev server
- `npm run build` – Build for production
- `npm run preview` – Preview the production build

---

For any issues with scrolling offsets or hash navigation landing positions, check the special cases in `App.jsx` (e.g., `#social-proof`, `#meet-the-owner`, `#appointment-scheduler`) which compute positions using the mounted navbar height.
