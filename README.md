

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
   git clone https://github.com/AlvaroSeptra/backendgrouph.git
   ```
   Gantilah `username` dengan nama pengguna GitHub dan `repository-name` dengan nama repository.

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


## Instalasi dan Konfigurasi Supabase

Supabase digunakan untuk autentikasi pengguna dan manajemen data di aplikasi ini. Ikuti langkah-langkah berikut untuk menginstal dan mengonfigurasi Supabase.

### 1. **Buat Akun Supabase dan Proyek Baru**

Jika belum memiliki akun, buat akun di [Supabase](https://supabase.com/). Setelah itu, buat proyek baru dari dashboard Supabase.

### 2. **Dapatkan URL Supabase dan Anon Key**

Setelah membuat proyek, navigasi ke bagian "API" di dashboard Supabase. Di sana, akan ditemukan:

- **Supabase URL**: URL dasar untuk API Supabase.
- **Anon Key**: Kunci publik yang digunakan untuk autentikasi anonim di frontend.

### 3. **Tambahkan Kredensial Supabase ke `.env`**

Masukkan URL dan Anon Key ke dalam file `.env` yang telah dibuat sebelumnya.

Contoh `.env`:

```plaintext
SECRET_KEY=your_secret_key
DATABASE_URL=your_database_url
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Gantilah `your_supabase_url` dan `your_anon_key` dengan nilai yang sesuai dari dashboard Supabase.

### 4. **Instal Dependensi Supabase di Frontend**

Pastikan dependensi Supabase terinstal di frontend dengan perintah berikut:

```bash
npm install @supabase/supabase-js
```

### 5. **Konfigurasi Supabase di Frontend**

Pastikan telah mengonfigurasi Supabase di proyek Next.js. Contoh file `supabaseClient.js` atau `supabaseClient.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

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



