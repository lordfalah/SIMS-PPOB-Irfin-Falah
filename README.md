# 🚀 SIMS PPOB - Online Payment Platform

A web-based Online Payment and Point of Sale (PPOB) application built for the **Front End Programmer Assignment**. This project demonstrates advanced implementation of **React**, **Redux Toolkit Query (RTK Query)**, and **TypeScript** with a focus on state management, secure routing, and clean UI/UX.

---

## ✨ Features

* **🔒 Secure Authentication**: Login and Registration with persistent session management using LocalStorage and Redux state.
* **📡 Real-time Data Sync**: Integrated with RTK Query for efficient data fetching, caching, and automatic cache invalidation (`resetApiState`) during account switching.
* **💳 Transaction Management**:
    * Dynamic Balance Inquiry dengan fitur *show/hide toggle*.
    * Fungsionalitas Top Up dengan pembaruan saldo instan.
    * Pembayaran layanan (PLN, Pulsa, dll.) dilengkapi dengan dialog konfirmasi dan status sukses/gagal.
    * Riwayat transaksi mendetail dengan logika *infinite scroll* / penggabungan cache.
* **👤 Profile Management**: Melihat dan mengubah profil pengguna, termasuk integrasi *image preview* untuk pembaruan foto avatar.
* **🛡️ Advanced Routing**: Mengimplementasikan logika **React Router Middleware** untuk menangani proteksi rute (*Private & Guest routes*).
* **📱 Responsive Design**: UI yang sepenuhnya responsif menggunakan **Tailwind CSS** dan **Shadcn UI**.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 18** | UI Library |
| **TypeScript** | Static Typing & Code Reliability |
| **Redux Toolkit** | State Management |
| **RTK Query** | Data Fetching & Cache Management |
| **React Router** | Routing & Middleware logic |
| **Tailwind CSS** | Styling |
| **Shadcn UI** | Accessible UI Components |
| **Zod + React Hook Form** | Schema Validation & Form Handling |

---

## 🏗️ Project Architecture

Proyek ini mengikuti struktur folder modular untuk kemudahan pemeliharaan (*maintainability*):

```text
src/
├── app/            # Redux store configuration
├── components/     # Reusable UI & Layout components
├── features/       # RTK Query slices (split by domain: profile, transaction, etc.)
├── hooks/          # Custom React hooks
├── layout/         # Route layouts (AuthLayout, DashboardLayout)
├── lib/            # Utility functions (formatters, auth-store)
├── pages/          # Page components
├── routes/         # Router configuration & Middleware
└── validation/     # Zod schemas untuk form validation
```

## 🚀 Getting Started

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek di lingkungan lokal Anda.

### 1. Prasyarat (Prerequisites)

Pastikan perangkat Anda sudah terinstall komponen berikut:
* **Node.js**: Versi v18 atau yang terbaru.
* **Package Manager**: Bisa menggunakan **Bun** (direkomendasikan untuk kecepatan) atau **NPM**.

### 2. Instalasi (Installation)

```bash
# Clone repository ini
git clone [https://github.com/username-anda/sims-ppob-irfin-falah.git](https://github.com/username-anda/sims-ppob-irfin-falah.git)

# Masuk ke folder proyek
cd sims-ppob-irfin-falah

# Install semua dependencies
bun install
# atau jika menggunakan npm:
npm install
```
### 3. Konfigurasi Environment
Buat file bernama .env di root folder proyek dan masukkan API URL:

```bash
VITE_API_URL=[https://take-home-test-api.nutech-integrasi.com](https://take-home-test-api.nutech-integrasi.com)
```

### 4. Menjalankan Aplikasi

```bash
# Jalankan mode development
bun run dev
# atau
npm run dev
```

---

## 👤 Author

* **Irfin Falah** - *Front End Developer*
* **GitHub**: [@irfinfalah](https://github.com/lordfalah)
* **LinkedIn**: [Irfin Falah](https://www.linkedin.com/in/irfinfalah/) 
* **Deployment**: [🚀 SIMS PPOB Live App](https://sims-ppob-irfin-falah.vercel.app/)

---


