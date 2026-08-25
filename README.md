# ⚡ QuickGrocery — 10-Minute Grocery Delivery Web App

A clean, responsive, feature-complete **Blinkit-inspired Grocery Delivery Web Application** built with **React 18**, **Bootstrap 5**, and **Context API**.

Designed as a **fresher student's practice project** — clean code architecture, practical styling, and natural component structure that is easy to explain in technical interviews.

---

## ✨ Features

- 🛒 **Home Page & Categories**: Banners, category pills (*Vegetables, Dairy, Snacks, Drinks, Instant Food, Staples, Household*), and trending product sections.
- 📦 **Blinkit-Style Product Cards**: Delivery badges (10 mins), weight/unit, discount tags, and interactive `ADD` buttons that transform into `[- 1 +]` counters.
- 🔎 **Instant Search & Filter**: Search products by name/category with sorting (Price, Rating, Popularity).
- ➕ **Cart Drawer & Bill Breakdown**:
  - Live item total, discount savings, delivery fee rules (Free over ₹199, else ₹25), handling charges.
  - Promo coupons (`WELCOME50`, `FRESH10`).
  - Delivery partner tip selector.
- 📍 **Address Selection**: Modal with delivery location selector and 1-click test fill presets (*Noida, Delhi, Bengaluru*).
- 💳 **Checkout Page**: UPI / Cash on Delivery / Card payment selection with confetti animation 🎉.
- 📋 **My Orders History**: Order timeline with status updates, item list, total paid, and 1-click **Reorder** button.
- ❤️ **Wishlist**: Save favorite items for quick shopping.
- 🌙 **Light & Dark Mode**: Persistent theme toggle.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 (Vite)
- **Styling & Icons**: Bootstrap 5, Bootstrap Icons, Lucide React, Custom CSS
- **State Management**: React Context API (`ShopContext.jsx`)
- **Data Persistence**: `localStorage` (Cart, Wishlist, Orders, Address, Theme)

---

## 🚀 Getting Started

1. **Clone Repository**:
   ```bash
   git clone https://github.com/srrahulchauhan/QuickGrocery.git
   cd QuickGrocery
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Local Server**:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173/` in your browser.
