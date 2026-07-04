# 🌐 CV Online Modern

CV Online Modern adalah aplikasi web untuk membuat, mengelola, dan menampilkan Curriculum Vitae (CV) secara online. Pengguna dapat mengelola data melalui dashboard admin dan membagikan CV melalui URL publik.

---

# 📖 Daftar Isi

- Tentang Proyek
- Fitur
- Teknologi
- Struktur Proyek
- Persyaratan Sistem
- Instalasi
- Konfigurasi Environment
- Setup Database
- Menjalankan Aplikasi
- Deployment
- Struktur Database
- API
- Dokumentasi
- Roadmap
- Kontribusi
- Lisensi

---

# 📌 Tentang Proyek

Aplikasi ini dibuat untuk memudahkan pengguna dalam membuat CV digital yang modern, responsif, dan mudah dibagikan melalui internet.

Setiap pengguna memiliki halaman CV publik dengan alamat seperti:

```
https://domain.com/username
```

Selain halaman publik, tersedia Dashboard Admin untuk mengelola seluruh data CV.

---

# ✨ Fitur

## Halaman Publik

- Profil pengguna
- Foto profil
- Tentang saya
- Pendidikan
- Keahlian
- Pengalaman kerja
- Dokumen pendukung
- Social media
- Portfolio Project
- Sertifikat

---

## Dashboard Admin

- Register
- Login
- Edit Profil
- Upload Foto
- Kelola Pendidikan
- Kelola Skill
- Kelola Pengalaman Kerja
- Kelola Dokumen
- Kelola Social Media
- Kelola Portfolio Project
- Kelola Sertifikat
- Logout

---

# 🛠 Teknologi

## Frontend

- Next.js (App Router)
- React
- Tailwind CSS
- TypeScript

---

## Backend

- Next.js API Route
- Prisma ORM

---

## Database

- Neon PostgreSQL

---

## Deployment

- GitHub
- Vercel

---

# 📂 Struktur Project

```
cv-online/
│
├── app/
├── components/
├── lib/
├── prisma/
├── public/
├── styles/
├── docs/
├── middleware.ts
├── package.json
└── README.md
```

---

# 💻 Persyaratan Sistem

- Node.js 20+
- npm / pnpm
- Git
- Akun GitHub
- Akun Vercel
- Akun Neon Database

---

# 🚀 Instalasi

Clone repository

```bash
git clone https://github.com/username/cv-online.git
```

Masuk ke folder project

```bash
cd cv-online
```

Install dependency

```bash
npm install
```

---

# ⚙️ Environment Variable

Buat file

```
.env
```

Isi dengan konfigurasi berikut

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
```

---

# 🗄 Setup Database

Generate Prisma Client

```bash
npx prisma generate
```

Migrasi Database

```bash
npx prisma migrate dev
```

Melihat database

```bash
npx prisma studio
```

---

# ▶️ Menjalankan Project

Mode Development

```bash
npm run dev
```

Build Production

```bash
npm run build
```

Production

```bash
npm start
```

---

# ☁️ Deployment

## GitHub

```bash
git add .

git commit -m "Initial Commit"

git push origin main
```

---

## Vercel

Hubungkan repository GitHub ke Vercel.

Tambahkan Environment Variable:

```
DATABASE_URL

NEXTAUTH_SECRET

NEXTAUTH_URL
```

Deploy.

---

# 🗄 Database

Database menggunakan

```
Neon PostgreSQL
```

ORM

```
Prisma
```

Relasi utama

```
Users
    │
    ├── Profile
    ├── Education
    ├── Skills
    ├── Experience
    ├── Documents
    ├── Social Links
    ├── Projects
    └── Certificates
```

---

# 🔌 API

Endpoint utama

```
POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout

GET /api/profile

PUT /api/profile

GET /api/education

POST /api/education

PUT /api/education/{id}

DELETE /api/education/{id}

GET /api/skills

POST /api/skills

PUT /api/skills/{id}

DELETE /api/skills/{id}

GET /api/experience

POST /api/experience

PUT /api/experience/{id}

DELETE /api/experience/{id}

GET /api/documents

POST /api/documents

PUT /api/documents/{id}

DELETE /api/documents/{id}

GET /api/social-links

POST /api/social-links

PUT /api/social-links/{id}

DELETE /api/social-links/{id}

GET /api/projects

POST /api/projects

PUT /api/projects/{id}

DELETE /api/projects/{id}

GET /api/certificates

POST /api/certificates

PUT /api/certificates/{id}

DELETE /api/certificates/{id}

GET /api/public/{username}
```

---

# 📚 Dokumentasi

Dokumen proyek disimpan pada folder

```
docs/
```

Berisi:

```
1. SRS.md

2. UI.md

3. DATABASE.md

4. API.md

5. STRUKTUR.md

README.md
```

---

# 🛣 Roadmap

Versi 1.0

- Register
- Login
- Dashboard
- CV Publik

Versi 1.1

- Portfolio Project
- Sertifikat

Versi 1.2

- Download PDF

Versi 1.3

- Theme CV

Versi 1.4

- Analytics Pengunjung

Versi 1.5

- Multi Bahasa

---

# 🤝 Kontribusi

Kontribusi sangat terbuka.

Langkah:

1. Fork Repository
2. Buat Branch Baru
3. Commit
4. Push
5. Pull Request

---

# 📄 Lisensi

MIT License

Copyright © 2026