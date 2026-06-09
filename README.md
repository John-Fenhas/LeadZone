# LeadZone

A focused CRM for managing and tracking sales leads — built with React, Supabase, and Tailwind CSS.

🌐 **Live:** [lead-zone.vercel.app](https://lead-zone.vercel.app)

---

## Overview

LeadZone is a single-page lead management application built around a real sales workflow. It handles the full lifecycle of a lead — from first contact through to a site visit or a closed deal — with clean filtering, follow-up scheduling, and per-user data isolation baked in from the start.

The project focuses on getting auth and data security right, not just functional. Every user's leads are isolated at the database level using Supabase Row Level Security, and protected routes prevent any unauthenticated access on the frontend.

---

## Features

**Authentication & Security**
- Email/password login via Supabase Auth
- Auth state managed globally with React Context API
- Protected routes — unauthenticated users are redirected automatically
- Row Level Security (RLS) enforced in Supabase so each user can only read and write their own data
- Supabase credentials stored in environment variables, never in source code

**Lead Management**
- Add leads with name, contact info, and budget
- Edit any field inline at any time
- Delete leads you no longer need
- Eight status labels that match a real sales pipeline: `Fresh`, `No Answer`, `Call Back`, `Follow Up`, `Meeting Booked`, `Site Visit`, `Low Budget`, `Not Interested`

**Filtering & Search**
- Live search across name, email, and phone number
- Filter the list by any status label
- Sort by newest or oldest
- Filters and sorting work together simultaneously

**Responsive Design**
- Fully responsive across mobile, tablet, and desktop
- Layout adapts cleanly at every breakpoint — built with Tailwind's responsive utilities

**Follow-Up Scheduling**
- Schedule a follow-up with a date and time picker (Flatpickr)
- AM/PM formatting
- Past dates are disabled so you can't accidentally schedule in the past

---

## Tech Stack

- **React 18** (Vite) — frontend framework
- **Tailwind CSS** — styling
- **Supabase** — auth, PostgreSQL database, and RLS policies
- **Flatpickr** — date/time picker
- **Vercel** — deployment

---

## Project Structure

```
src/
├── components/       # Reusable UI components
├── context/          # React Context for global auth state
├── pages/            # Route-level views (Login, Dashboard)
└── supabaseClient.js # Supabase client initialized from env vars
```

---


```bash
npm run dev
```

---

## Screenshots

<img width="1910" height="943" alt="LeadZone 1" src="https://github.com/user-attachments/assets/542d4fa0-b011-4b2f-923e-0e64cf600e35" />
<img width="1909" height="940" alt="LeadZone 2" src="https://github.com/user-attachments/assets/76424ba1-7563-4d00-9235-181fc40458c2" />
<img width="489" height="753" alt="LeadZone 3" src="https://github.com/user-attachments/assets/4d3dcffd-d9f0-4425-aabe-c3f8e1a7a10b" />



---
## Running Locally

```bash
git clone https://github.com/John-Fenhas/LeadZone.git
cd LeadZone
npm install
```

Create a `.env` file in the root with your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```
---

## About

Built as a portfolio project to demonstrate a production-style frontend application — real auth, real security policies, and a UI built around an actual use case rather than placeholder data.

Part of a two-project portfolio. Built by [John Fenhas](https://github.com/John-Fenhas).
