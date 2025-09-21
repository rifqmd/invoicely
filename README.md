# Invoicely (Buat, Kelola, dan Kirim Faktor dalam Hitungan Detik)

Kelola penagihan Kamu dengan mudah bersama Invoicely! Aplikasi pembuat faktur yang dirancang khusus untuk UKM, freelancer, dan entrepreneur Indonesia agar terlihat profesional dan dibayar lebih cepat. Bayar lebih cepat, kerja lebih cerdas.

<p align="center">
   <img src="./public/Dashboard_page.png" alt="Tampilan Dashboard Invoicely" width="400" style=" box-shadow: 0 4px 24px rgba(0,0,0,0.12);" />
</p>
<p align="center">
   <em>Tampilan Dashboard Invoicely!</em>
</p>

## ✨ Fitur Utama

- 🚀 Pembuatan faktur profesional dengan template customizable
- 👥 Manajemen klien dan produk terintegrasi
- 📊 Dashboard analitik untuk melacak pendapatan dan invoice tertunda
- 🔐 Autentikasi aman dengan NextAuth.js
- 💾 Penyimpanan data dengan PostgreSQL (Neon)
- ✉️ Integrasi email dengan Mailtrap untuk pengiriman invoice
- 🎨 UI modern dengan Tailwind CSS dan shadcn/ui
- 📱 Responsif untuk semua perangkat

## 🛠️ Teknologi yang Digunakan

- **Framework:** Next.js 15.5.0 (App Router)
- **Database:** PostgreSQL dengan [Neon](https://neon.tech/)
- **ORM:** Prisma
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Authentication:** Auth.js (NextAuth)
- **Email Service:** Mailtrap
- **Development:** TypeScript

## 📦 Instalasi

1. Clone repositori ini:

```bash
git clone https://github.com/rifqmd/invoicely.git
cd invoicely
```

2. Install dependencies:

```bash
npm install
npm install --save-dev # Opsional untuk development
```

3. Setup environment variables:
   Buat file `.env` di root directory dan tambahkan konfigurasi berikut:

```env
# --- NextAuth ---
AUTH_SECRET="your_token"
NEXTAPI_URL='http://localhost:3000/api'
NEXT_URL='http://localhost:3000'

# --- Email (mailtrap) ---
EMAIL_SERVER_USER=smtp@mail.com #example
EMAIL_SERVER_PASSWORD=your_token
EMAIL_SERVER_HOST=live.smtp.mail.com #example
EMAIL_SERVER_PORT=587
EMAIL_FROM=mail@mail.com
MAILTRAP_TOKEN=your_token

# --- Database ---
DATABASE_URL=your_database_url

```

4. Setup database:

```bash
npx prisma generate
npx prisma db push
```

5. Jalankan aplikasi:

```bash
npm run dev]
```

Buka [http://localhost:3000](http://localhost:3000) di browser kamu untuk melihat hasilnya.

## 📧 Konfigurasi Email

Invoicely menggunakan Mailtrap untuk pengiriman email di lingkungan development. Untuk production, kamu dapat mengganti dengan service email seperti Resend, SendGrid, atau lainnya.

## 🤝 Berkontribusi

Kontribusi selalu diterima! Silakan lakukan:

1. Fork project ini
2. Buat branch untuk fitur kamu (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan kamu (`git commit -m 'feat: some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Distribusi di bawah lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.

## 💬 Dukungan

Jika kamu memiliki pertanyaan atau masalah, silakan buat issue di repository ini atau hubungi melalui email: rifqidev77@gmail.com

---

Dibuat dengan ❤️ untuk memudahkan proses invoicing di Indonesia.
