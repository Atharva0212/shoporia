# 🛍️ Shoporia — Full-Stack E-Commerce Platform

Shoporia is a full-stack, production-style e-commerce platform built with modern web technologies. It features custom authentication, product variants, reviews, Stripe payments, and scalable state management.

This project demonstrates real-world full-stack engineering across frontend, backend, database design, and third-party service integrations.

## 🌐 Live Demo

🔗 [https://shoporia-6qbp.vercel.app/](https://shoporia-6qbp.vercel.app/)

---

## 🚀 Features

### 🔐 Authentication

* Email OTP-based authentication
* Google OAuth login
* JWT-based session management (Jose)
* Secure user onboarding with pending user workflow
* Profile completion flow

### 🛒 E-Commerce Core

* Product catalog with categories & subcategories
* Advanced product variants (multiple prices/options)
* Multiple product images
* Product search & discovery
* Pagination for product listings
* Featured products section

### ⭐ Reviews & Ratings

* Star rating system (0–5)
* Product reviews with nested replies
* Rating aggregation & distribution
* Review count tracking

### 🛍 Shopping Experience

* Shopping cart with Redux Toolkit
* Persistent cart state
* Cart drawer UI
* Real-time cart updates

### 💳 Payments

* Stripe payment gateway integration
* Secure checkout session creation
* Server-side payment handling

### 🎨 UI/UX System

* Custom modal system with animations
* Toast notification system
* Hero carousel for promotions
* Responsive navbar with search
* Reusable component library
* Fully responsive design

---

## 🧱 Tech Stack

### Frontend

* **Next.js 16** (App Router, SSR/SSG)
* **React 19**
* **TypeScript 5.9**
* **Tailwind CSS 4**
* **Redux Toolkit** (global state)
* **Axios** (API communication)

### Backend

* **Next.js API Routes**
* **MongoDB + Mongoose**
* **Stripe** (payments)
* **Mailjet** (OTP & email notifications)
* **JWT (Jose)** for authentication

### Tooling

* ESLint v9
* Strict TypeScript
* PostCSS
* Vercel deployment

---

## 🗄️ Database Models

* **User** — email, name, avatar customization
* **PendingUser** — OTP-based registration flow
* **Product** — product info, ratings, reviews
* **ProductVariant** — pricing & option variants
* **ProductImage** — image metadata
* **Review** — product reviews with nested replies

---

## 🏗 Architecture Highlights

### State Management

* Redux Toolkit for:

  * Shopping cart
  * User authentication state
* React Context for:

  * Modals
  * Toast notifications
* Custom hooks for reusable logic

### Authentication Flow

* Email OTP send/verify flow
* Google OAuth integration
* JWT token creation & verification using Jose
* Protected API routes

### Database & Connections

* Mongoose connection pooling
* Global cached DB connection
* Efficient connection lifecycle handling

### API Design

* RESTful API endpoints
* Type-safe request/response handling
* Centralized error handling utilities
* Auth-protected routes

---

## 🧪 Scalability & Best Practices

* Type safety across frontend & backend
* Modular component architecture
* Separation of concerns (API, UI, utils)
* Reusable UI component system
* Optimized image handling with Next.js Image
* SEO optimization using Next.js Metadata API

---

## 📌 Future Improvements

* Stripe webhooks for payment status syncing
* Admin dashboard for product & order management
* Automated testing (Playwright/Jest)
* Role-based access control (admin/user)
* Inventory management
* Order history & invoices

---

## 👨‍💻 Author

**Atharva**
Full-Stack Developer
GitHub: [https://github.com/Atharva0212](https://github.com/Atharva0212)

---
