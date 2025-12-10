# Panrita Lontara

**Panrita Lontara** adalah aplikasi web edukatif interaktif yang dirancang untuk melestarikan dan memperkenalkan **Aksara Lontara** (Bugis-Makassar) kepada generasi muda melalui teknologi modern yang menyenangkan.

## 🚀 Fitur Utama

Aplikasi ini memiliki tiga fitur utama:

### 1. 📚 Materi (Learning Mode)
Belajar huruf Lontara dasar dan variasi vokalnya.
- **Kartu Interaktif**: Klik setiap huruf untuk melihat detailnya.
- **Variasi Vokal (Tanda Baca)**: Pelajari perubahan bunyi huruf dengan tanda baca (i, u, e, o, ae).
- **Text-to-Speech (Audio)**: Dengarkan cara pengucapan setiap huruf dan variasi vokalnya (Menggunakan teknologi **Puter.js**).

### 2. 🎲 Kuis 3D (Quiz Mode)
Uji pengetahuan Anda dengan cara yang seru!
- **Model 3D Interaktif**: Putar balok huruf Lontara 3D untuk melihat bentuknya dari segala sisi.
- **Tebak Huruf**: Jawab pertanyaan pilihan ganda berdasarkan huruf 3D yang ditampilkan.
- **Sistem Skor & Streak**: Kumpulkan poin dan pertahankan kemenangan beruntun Anda.

### 3. ✍️ Menggambar (Writing Mode)
Berlatih menulis aksara Lontara secara digital.
- **Kanvas Digital**: Tulis huruf menggunakan jari (layar sentuh) atau mouse.
- **Cheatsheet**: Referensi huruf tersedia di sisi layar untuk memudahkan latihan.
- **Simpan Karya**: Unduh hasil tulisan Anda sebagai gambar PNG.

## 🛠️ Detail Teknis & Arsitektur

### 1. **Core Framework: React & Vite**
Project ini dibangun dengan **React 18** menggunakan **Vite** sebagai build tool untuk performa pengembangan yang super cepat. Struktur komponen diatur secara modular untuk memudahkan pemeliharaan dan skalabilitas.

### 2. **3D Rendering Engine: React Three Fiber (R3F)**
Fitur "Kuis 3D" menggunakan **Three.js** melalui wrapper React Three Fiber.
- **Text3D**: Menggunakan `TextGeometry` dari Three.js untuk merender karakter Lontara dalam bentuk 3D yang tajam.
- **Typeface Loaded**: Font `Lontara.json` (format Typeface) dimuat secara asinkron untuk membentuk geometri huruf.
- **OrbitControls**: Memungkinkan interaksi pengguna (memutar, zoom) pada objek 3D.

### 3. **Text-to-Speech (AI): Puter.js**
Fitur audio pada "Menu Materi" menggunakan **Puter.js**, sebuah platform Cloud Computing berbasis browser.
- **Client-Side Generation**: Script Puter.js (`v2`) dimuat di `index.html`.
- **Fungsi**: `puter.ai.txt2speech()` digunakan untuk menghasilkan audio pengucapan huruf secara real-time tanpa memerlukan backend server yang berat.

### 4. **Styling: Tailwind CSS v4**
Desain antarmuka menggunakan **Tailwind CSS v4** (versi terbaru) untuk pendekatan utility-first.
- **Custom Fonts**: Integrasi font `Noto Sans Buginese` via Google Fonts.
- **Responsive**: Layout Grid dan Flexbox memastikan tampilan adaptif di Mobile dan Desktop.
- **Animations**: CSS animations untuk transisi modal dan hover effects.

### 5. **Audio Management**
- **Persistent Player**: Audio latar (`Layout.jsx`) diatur agar tetap berjalan saat navigasi antar halaman (SPA).
- **Volume Control**: Slider volume state-controlled untuk pengalaman pengguna yang nyaman.

## 🎵 Fitur Tambahan

- **Lontara Font**: Menggunakan font khusus *Noto Sans Buginese* untuk tampilan aksara yang otentik.
- **Backsound**: Musik latar yang menenangkan dengan kontrol **Volume** dan **Mute** di pojok kiri bawah.

## 📦 Cara Menjalankan Project

1.  **Clone Repository**
    ```bash
    git clone https://github.com/username/panrita-lontara.git
    cd panrita-lontara
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Jalankan Server Development**
    ```bash
    npm run dev
    ```

4.  **Buka di Browser**
    Buka alamat lokal yang muncul di terminal (biasanya `http://localhost:5173`).

---
*Dibuat dengan ❤️ untuk pelestarian budaya Sulawesi Selatan.*
