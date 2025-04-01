Here’s the updated README with PostgreSQL multi-schema support explicitly mentioned:

---

# **React Inertia Laravel Tailwind (RILT) SaaS Starter Kit**

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-blue?logo=github)](https://github.com/IsaacHatilima/multi-tenancy)

## 🚀 Project Status: **Active Development**

## 📌 About the Project

This starter kit streamlines the development of multi-tenant SaS web applications using **Laravel, React, Inertia.js,
and
Tailwind CSS**. It provides **authentication and multi-tenancy out of the box**, leveraging the **Tenancy for Laravel**
package with a **PostgreSQL multi-schema setup** for tenant database isolation. Payments are handled by Laravel Cashier(
Stripe)

### ✨ **Key Features**

✅ **Multi-Tenancy (PostgreSQL Multi-Schema Setup)** – Each tenant has its own isolated database schema for enhanced
security and scalability.  
✅ **Authentication Included** – Pre-configured authentication system for tenants.  
✅ **Actions-Based Architecture** – Business logic is encapsulated in action classes, ensuring clean and maintainable
controllers.  
✅ **Full-Stack SPA Experience** – Powered by **React & Inertia.js** for smooth, client-server interactions.  
✅ **Modern UI** – Styled with **Tailwind CSS & Mantine UI** for fast and responsive UI development.  
✅ **Scalable & Extensible** – Easily add new features without breaking core functionality.
✅ **Laravel Cashier(Stripe)** - Using the cashier package to process subscription payments for client licenses.

---

## 🛠 **Tech Stack**

| Technology                                                | Description                                                                |
|-----------------------------------------------------------|----------------------------------------------------------------------------|
| **[React](https://react.dev/)**                           | Component-based UI library for dynamic interfaces.                         |
| **[Inertia.js](https://inertiajs.com/)**                  | Enables Laravel to serve SPAs without requiring an API.                    |
| **[Laravel](https://laravel.com/)**                       | Robust PHP framework with elegant syntax.                                  |
| **[Tailwind CSS](https://tailwindui.com/)**               | Utility-first CSS framework for responsive styling.                        |
| **[Mantine UI](https://mantine.dev/)**                    | Pre-built React components for fast UI development.                        |
| **[Tenancy for Laravel](https://tenancyforlaravel.com/)** | Multi-tenancy package for Laravel, supporting multi-database architecture. |
| **[PostgreSQL](https://www.postgresql.org/)**             | Used for multi-schema tenant database separation.                          |

---

## 📥 **Installation Guide**

Follow these steps to set up the project locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/IsaacHatilima/multi-tenancy.git
cd multi-tenancy
```

### 2️⃣ Install Dependencies

```bash
composer install
npm install
```

### 3️⃣ Configure Environment

Copy `.env.example` to `.env` and update your database credentials:

```bash
cp .env.example .env
```

### 4️⃣ Run Migrations & Seed the Database

```bash
php artisan migrate --seed
```

### 5️⃣ Start the Development Server

```bash
php artisan serve
npm run dev
```

Visit **[http://localhost:8000](http://localhost:8000)** to access the application.

---

## 🏗 **Architecture Decisions**

### 📌 **Actions-Based Controllers**

All business logic is encapsulated in **action classes**, ensuring clean, single-responsibility controllers.

### 📌 **Inertia.js + React for a Full-Stack SPA**

Combines Laravel's power with React's reactivity while keeping server-side routing and controller integration intuitive.

### 📌 **Tailwind + Mantine UI for Rapid UI Development**

- **Tailwind CSS**: Utility-first styling approach for easy customization.
- **Mantine UI**: Pre-styled, accessible React components for seamless UI design.

### 📌 **Multi-Tenancy with PostgreSQL Multi-Schema**

This project uses **PostgreSQL's multi-schema** capability to isolate tenant data while maintaining a single database
instance. The **Tenancy for Laravel** package:

- Automatically switches to the correct tenant schema based on the domain (e.g., `ten1.app.com`).
- Prevents unauthorized tenant access using middleware.
- Simplifies data management and backups while maintaining strong isolation.

---

## 📌 **Next Steps & Future Enhancements**

🔹 Improve documentation with screenshots and a demo link.  
🔹 Add testing strategies to ensure tenant isolation works as expected.  
🔹 Consider adding optional API support for tenant-based API access.

---

## 🛡 **License**

This project is open-source and licensed under the [MIT License](LICENSE).

---

### 🚀 **Contributions & Support**

Found a bug or have suggestions? Feel free to submit a PR or open an issue
on [GitHub](https://github.com/IsaacHatilima/multi-tenancy).

---

### 🔗 **Follow My Work**

📌 GitHub: [IsaacHatilima](https://github.com/IsaacHatilima)

---
