

# Backend untuk Aplikasi Web Market

Ini adalah backend untuk aplikasi Web Market, dibangun menggunakan Flask. Backend ini mengelola berbagai fungsi seperti autentikasi pengguna, pengelolaan produk, keranjang belanja, dan voucher.

## Fitur

- **Autentikasi Pengguna**: Registrasi, login, dan manajemen profil.
- **Manajemen Produk**: Menambah, mengubah, dan menghapus produk oleh penjual.
- **Manajemen Keranjang**: Menambahkan produk ke keranjang, melihat keranjang, dan checkout.
- **Manajemen Voucher**: Menambah, melihat, dan menghapus voucher oleh penjual.

## Dokumentasi API

Dokumentasi lengkap API backend ini dapat diakses melalui Postman dengan mengunjungi tautan berikut:

[Dokumentasi API di Postman](https://documenter.getpostman.com/view/35996327/2sA3s3JC3j#8a5cd7f8-fb93-41e7-acab-f4e5e85592fc)

## Persyaratan Sistem

- Python 3.10 atau lebih baru
- PostgreSQL untuk basis data

## Instalasi

1. **Clone repositori ini:**

   ```bash
   git clone https://github.com/AlvaroSeptra/backendgrouph.git
   cd backendgrouph
   ```

2. **Buat dan aktifkan virtual environment (opsional, tetapi direkomendasikan):**

   ```bash
   python -m venv env
   source env/bin/activate  # Mac
   env\Scripts\activate  #  Windows
   ```

3. **Instal semua dependensi yang diperlukan:**

   Pastikan untuk menginstal semua paket yang diperlukan dengan menjalankan:

   ```bash
   pip install -r requirements.txt
   ```

## Konfigurasi

1. **Buat file `.env`** di direktori `src/backend/` dan tambahkan variabel lingkungan berikut:

   ```
   SECRET_KEY=your_secret_key
   DATABASE_URL=
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   ```

2. **Konfigurasi Database**:

   Buat dan inisialisasi database di PostgreSQL. Anda bisa menggunakan skrip SQL yang disediakan untuk membuat tabel-tabel yang diperlukan.

   Untuk membersihkan dan membuat ulang tabel dengan UUID sebagai primary key:

   ```sql
   -- Drop existing tables and types
   DROP TABLE IF EXISTS cart, vouchers, products, users CASCADE;
   DROP TYPE IF EXISTS product_category;

   -- Create product_category ENUM
   CREATE TYPE product_category AS ENUM ('ecofriendly', 'organic');

   -- Create users table
   CREATE TABLE users (
       id UUID PRIMARY KEY,
       username VARCHAR(80) UNIQUE NOT NULL,
       email VARCHAR(120) UNIQUE NOT NULL,
       password VARCHAR(120) NOT NULL,
       location VARCHAR(50) NOT NULL,
       role VARCHAR(20) NOT NULL
   );

   -- Create products table
   CREATE TABLE products (
       id UUID PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       description TEXT NOT NULL,
       price FLOAT NOT NULL,
       quantity INT NOT NULL,
       category product_category NOT NULL,
       seller_id UUID REFERENCES users(id) ON DELETE CASCADE
   );

   -- Create vouchers table
   CREATE TABLE vouchers (
       id UUID PRIMARY KEY,
       code VARCHAR(20) UNIQUE NOT NULL,
       discount FLOAT NOT NULL,
       seller_id UUID REFERENCES users(id) ON DELETE CASCADE
   );

   -- Create cart table
   CREATE TABLE cart (
       id UUID PRIMARY KEY,
       customer_id UUID REFERENCES users(id) ON DELETE CASCADE,
       product_id UUID REFERENCES products(id) ON DELETE CASCADE,
       quantity INT NOT NULL
   );
   ```

## Menjalankan Aplikasi

Untuk menjalankan aplikasi backend secara lokal:

1. Pastikan virtual environment aktif.
2. Jalankan perintah berikut:

   ```bash
   flask run
   ```

Aplikasi akan berjalan di `http://127.0.0.1:5000/` secara default.

## Testing API dengan Postman

API ini dapat diuji menggunakan Postman atau alat serupa. Pastikan untuk menambahkan token Bearer di header untuk endpoint yang memerlukan autentikasi.

**Contoh Endpoint:**

- **Registrasi**: `POST /register`
- **Login**: `POST /login`
- **Tambah Produk**: `POST /products`
- **Lihat Voucher**: `GET /vouchers`
- **Checkout**: `POST /cart/checkout`

Untuk detail lebih lanjut, lihat dokumentasi API di Postman di tautan berikut:

[Dokumentasi API di Postman](https://documenter.getpostman.com/view/35996327/2sA3s3JC3j#8a5cd7f8-fb93-41e7-acab-f4e5e85592fc)

## Dependensi

Pastikan file `requirements.txt` mencakup dependensi berikut:

```txt
Flask
Flask-JWT-Extended
Flask-CORS
psycopg2
Werkzeug
python-dotenv
```


