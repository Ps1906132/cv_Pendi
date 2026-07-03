# 🎨 UI SPECIFICATION - CV ONLINE MODERN

## ⚠️ Catatan Penting
Dokumen ini menjelaskan desain UI tanpa Figma, langsung sebagai acuan coding.

---

# 🧑 1. HALAMAN PUBLIK (CV PAGE)

## 📌 Struktur Halaman

Halaman CV terdiri dari 6 bagian utama:

---

## 1.1 HEADER PROFIL

### Isi:
- Foto profil (lingkaran besar)
- Nama lengkap (besar, bold)
- Headline / profesi

### Layout:

---

## 1.2 PENDIDIKAN

### Isi:
- Nama sekolah / universitas
- Jurusan
- Tahun

### Bentuk UI:
- Card list

---

## 1.3 KEAHLIAN (SKILLS)

### Isi:
- Daftar skill

### Bentuk UI:
- Badge / pill


---

## 1.4 PENGALAMAN KERJA

### Isi:
- Nama perusahaan
- Posisi
- Tahun
- Deskripsi singkat

### Bentuk UI:
- Card vertikal

---

## 1.5 DOKUMEN

### Isi:
- Link Google Drive / PDF

### UI:
- Button list


---

## 1.6 SOCIAL MEDIA

### Isi:
- GitHub
- LinkedIn
- YouTube
- Instagram
- Facebook

### UI:
- Icon row clickable

---

## 🎨 STYLE PUBLIC PAGE

### Warna:
- Background: #0B0B0B (hitam)
- Primary: #00FF88 (hijau neon)
- Accent: #FFD400 (kuning)
- Text: putih / abu

### Style:
- Dark mode modern
- Card rounded (12px)
- Hover glow hijau
- Minimalis (seperti Notion + Vercel)

---

# 🧑‍💻 2. DASHBOARD ADMIN

## 📌 Struktur Layout

### Sidebar:
- Profile
- Education
- Skills
- Experience
- Documents
- Social Links
- Logout

---

### Main Panel:
Setiap menu berisi form input:

---

## 2.1 PROFILE
- Nama
- Headline
- Upload foto

---

## 2.2 EDUCATION
- Tambah pendidikan
- Edit / delete

Field:
- Nama sekolah
- Jurusan
- Tahun

---

## 2.3 SKILLS
- Tambah skill
- Delete skill

---

## 2.4 EXPERIENCE
- Tambah pengalaman kerja
- Edit / delete

Field:
- Perusahaan
- Posisi
- Tahun
- Deskripsi

---

## 2.5 DOCUMENTS
- Input link Google Drive
- Label dokumen

---

## 2.6 SOCIAL LINKS
- Platform (GitHub, IG, dll)
- URL link
- Icon otomatis

---

# 🗄️ 3. DATA MODEL (UNTUK NEON + PRISMA)

## RELASI DATA:
User
└── Profile
├── Education
├── Skills
├── Experience
├── Documents
└── SocialLinks


---

## KONSEP DATABASE:

- 1 user = 1 CV
- 1 profile = pusat data CV
- semua data lain terhubung ke profile_id

---

# ⚙️ 4. USER FLOW (ALUR SISTEM)

## 👤 ADMIN FLOW:
Login
↓
Dashboard
↓
Input/Edit Data
↓
Save ke Database Neon
↓
CV Publik otomatis update

---

## 🌍 VISITOR FLOW:
Buka /username
↓
Lihat CV
↓
Klik social / dokumen

---

# 🚀 5. TUJUAN DESAIN INI

Dokumen ini dipakai untuk:

- Coding Next.js
- Struktur UI komponen
- Database design (Neon)
- API endpoint

---

# 🔥 HASIL AKHIR YANG DIHARAPKAN

Kamu akan punya:

- CV online seperti Linktree + Notion style
- Dashboard admin sederhana
- URL publik per user
- Data tersimpan di Neon DB
- Deploy otomatis di Vercel