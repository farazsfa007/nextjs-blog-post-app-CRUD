# Full-Stack Next.js Blog (CRUD Application)

A modern, high-performance, full-stack blog application built with Next.js (App Router), styled using Tailwind CSS v4, and backed by a serverless cloud PostgreSQL database using Neon and Drizzle ORM.

## 🚀 Tech Stack

* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS v4 (with `@source` compilation)
* **Database:** Neon (Serverless Postgres)
* **Database ORM:** Drizzle ORM & Drizzle Kit (neon-http driver)
* **Language:** TypeScript

---

## 🛠️ Features

* **Full CRUD Functionality:** Create, Read, Update, and Delete blog entries natively.
* **Next.js Server Actions:** Zero API routing needed; handles all form submissions and DB updates securely on the server.
* **Dynamic Routing:** Implements dynamic parameter loading handling advanced Next.js routing structures seamlessly.
* **Drizzle Studio Integration:** Visual database browser accessible straight from your local host machine.
* **Optimized Architecture:** Uses stateless HTTP queries via `@neondatabase/serverless` to bypass connection limits in serverless functions.

---

## 📦 Directory Overview

```text
src/
└── app/
    ├── globals.css        # Tailwind CSS integration core configuration
    ├── layout.tsx         # Root application layout shell
    ├── page.tsx           # Home Feed - Reads and maps post arrays
    ├── create/
    │   └── page.tsx       # Write/Publish content using Server Actions
    ├── post/[id]/
    │   └── page.tsx       # Dynamic blog detail views (resolves Promise params)
    ├── edit/[id]/
    │   └── page.tsx       # Form modification engine populated with existing data
    └── delete/[id]/
        └── page.tsx       # Safe records deletion view 
src/db/
├── index.ts               # Drizzle database client deployment setup
└── schema.ts              # PostgreSQL relational tables definition mappings