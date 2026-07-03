# 📘 SRS - CV ONLINE MODERN

## 1. Nama Sistem
CV Online Modern (Personal Portfolio Builder)

---

## 2. Tujuan Sistem
Sistem ini digunakan untuk membuat CV digital berbasis web yang bisa:
- Ditampilkan secara publik melalui URL
- Dikelola melalui dashboard admin
- Menyimpan data di database cloud (Neon PostgreSQL)

---

## 3. Ruang Lingkup Sistem
Sistem mencakup:
- Pembuatan dan pengelolaan CV online
- Tampilan CV publik
- Dashboard admin untuk input dan edit data
- Penyimpanan data di database

---

## 4. Pengguna Sistem
1. **User (Pemilik CV)**
   - Login ke dashboard
   - Mengisi dan mengubah data CV

2. **Visitor (Pengunjung)**
   - Melihat CV publik tanpa login

---

## 5. Kebutuhan Fungsional

### 5.1 Login & Autentikasi
- User dapat login ke sistem
- User dapat logout

---

### 5.2 Manajemen Profil
- Menambahkan dan mengubah:
  - Nama
  - Foto profil
  - Deskripsi / headline

---

### 5.3 Manajemen Pendidikan
- Tambah data pendidikan
- Edit data pendidikan
- Hapus data pendidikan

---

### 5.4 Manajemen Keahlian
- Tambah skill
- Edit skill
- Hapus skill

---

### 5.5 Manajemen Pengalaman Kerja
- Tambah pengalaman kerja
- Edit pengalaman kerja
- Hapus pengalaman kerja

---

### 5.6 Manajemen Dokumen
- Menambahkan link dokumen (Google Drive / PDF)
- Menghapus dokumen

---

### 5.7 Manajemen Social Media
- Tambah link sosial media
- Edit link sosial media
- Hapus link sosial media
- Icon yang didukung:
  - GitHub
  - LinkedIn
  - YouTube
  - Instagram
  - Facebook

---

### 5.8 CV Publik
- Menampilkan semua data CV secara publik
- Akses melalui URL:
  `/username`

---

## 6. Kebutuhan Non-Fungsional

- Sistem harus responsive (mobile & desktop)
- Loading cepat (< 3 detik)
- Data tersimpan di cloud database (Neon PostgreSQL)
- Aman (data user tidak bisa diakses tanpa login)
- Dapat di-deploy di Vercel
- SEO friendly untuk halaman CV publik

---

## 7. Teknologi yang Digunakan

- Frontend: Next.js
- Styling: Tailwind CSS
- Backend API: Next.js API Routes
- Database: Neon PostgreSQL
- ORM: Prisma
- Hosting: Vercel
- Version Control: GitHub

---

## 8. Output Sistem

Sistem menghasilkan:
- Halaman CV publik
- Dashboard admin
- Data tersimpan di database
- Link CV unik per user