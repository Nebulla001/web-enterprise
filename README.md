# Admin SaaS - Web Enterprise Project

## 📌 Deskripsi
Aplikasi Admin Dashboard berbasis Web Enterprise menggunakan Next.js, Prisma ORM, dan MySQL.

## 🚀 Fitur
- Dashboard
- CRUD Items (Create, Read, Update, Delete)
- Search & Pagination
- REST API
- Dark Mode
- Toast Notification

## 🛠️ Teknologi
- Next.js
- Prisma ORM
- MySQL
- Tailwind CSS

## 📂 Arsitektur
- App Router
- API Route (RESTful)
- Modular Component
- Database Layer (Prisma)

## 📂 Struktur Folder
project-root/
 ├─ app/
 │   ├─ crud/                # Halaman CRUD
 │   ├─ components/          # Komponen Form & Tabel
 │   └─ api/items/           # API Route (GET, POST, PUT, DELETE)
 ├─ lib/db.ts                # Prisma Client
 ├─ prisma/schema.prisma     # Definisi model Item
 ├─ prisma/prisma.config.ts  # Konfigurasi datasource Prisma 7
 ├─ .env                     # Koneksi MySQL
 └─ README.md

## 🗄️ Setup Database
1. Buat database di MySQL:
   ```sql
   CREATE DATABASE web_enterprise;
