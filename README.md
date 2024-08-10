Berikut adalah README yang telah diperbarui tanpa kata "Anda":

---

# Market Web Application

Proyek ini adalah aplikasi web market yang dibangun menggunakan **Next.js** untuk frontend dan **Flask** untuk backend. Aplikasi ini menggunakan **Supabase** untuk autentikasi dan manajemen database.

## Fitur Utama

- **Seller** dapat mengelola produk, membuat voucher, dan memperbarui profil.
- **Customer** dapat menambahkan produk ke keranjang, menggunakan voucher, dan melakukan checkout.
- **Autentikasi** dan manajemen data pengguna dilakukan menggunakan Supabase.

## Teknologi yang Digunakan

- **Frontend**: Next.js (TypeScript)
- **Backend**: Flask
- **Database & Autentikasi**: Supabase
- **ORM**: SQLAlchemy

## Persyaratan

- **Node.js**: Versi 14.x atau lebih baru
- **Python**: Versi 3.8 atau lebih baru
- **Git**
- **SQLAlchemy**: Versi 1.3.23
- **Flask-SQLAlchemy**: Versi yang kompatibel dengan SQLAlchemy 1.3.23
- **Werkzeug**: Versi 2.0.3

## Cara Clone Proyek dari GitHub

1. **Clone repository dari GitHub**:
   ```bash
   git clone https://github.com/username/repository-name.git
   ```
   Gantilah `username` dengan nama pengguna GitHub dan `repository-name` dengan nama repository.

2. **Masuk ke direktori proyek**:
   ```bash
   cd repository-name
   ```

## Cara Menjalankan Backend (Flask)

1. **Masuk ke direktori backend**:
   ```bash
   cd src/backend
   ```

2. **Buat virtual environment** (opsional tapi disarankan):
   ```bash
   python -m venv venv
   ```

3. **Aktifkan virtual environment**:
   - Di Windows:
     ```bash
     venv\Scripts\activate
     ```
   - Di macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Instal dependencies Python**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Jalankan server Flask**:
   ```bash
   flask run
   ```
   Server Flask akan berjalan di `http://127.0.0.1:5000/`.

## Cara Menjalankan Frontend (Next.js)

1. **Kembali ke root proyek**:
   ```bash
   cd ../../
   ```

2. **Instal dependencies Node.js**:
   ```bash
   npm install
   ```

3. **Jalankan server Next.js**:
   ```bash
   npm run dev
   ```
   Server Next.js akan berjalan di `http://localhost:3000/`.

## Konfigurasi `.env`

Buat file `.env` di root proyek dengan isi seperti berikut:

```plaintext
SECRET_KEY=your_secret_key
DATABASE_URL=your_database_url
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Gantilah `your_secret_key`, `your_database_url`, `your_supabase_url`, dan `your_supabase_anon_key` dengan nilai yang sesuai dari Supabase dan setup lokal.

## Versi yang Digunakan

- **SQLAlchemy**: 1.3.23
- **Flask-SQLAlchemy**: Versi yang kompatibel dengan SQLAlchemy 1.3.23
- **Werkzeug**: 2.0.3
- **Flask**: Versi terbaru yang kompatibel dengan dependensi di atas

## Masalah yang Mungkin Terjadi

Jika terjadi masalah terkait "rate limit" atau error lainnya, beberapa solusi yang bisa dicoba adalah:

- Menunggu beberapa saat sebelum mencoba lagi.
- Menggunakan akun email berbeda untuk pengujian.
- Memastikan bahwa semua dependensi sudah diinstal dengan versi yang benar.
