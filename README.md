# 🛍️ Quick E-Commerce Store

A modern **e-commerce storefront** and **admin dashboard** built with cutting-edge web tooling.  
Designed for small businesses seeking a fast, scalable, and user-friendly shopping experience.

---

## Project Overview

The **Quick E-Commerce Store** is a fully functional, customizable storefront paired with an **admin panel** to manage products, customers, and orders.

**Key Features**
- 🛒 **Storefront UI** — Seamless shopping experience for customers.
- **Admin Dashboard** — Manage inventory, products, and users.
- **Optimized Performance** — Built with **Vite** and **React** for blazing-fast loading.
- 🎨 **Beautiful UI** — Styled with **Tailwind CSS** + **shadcn/ui** components.
- **TypeScript Support** — Strongly typed and maintainable codebase.

---

## 🛠️ Tech Stack

- **Framework**: Vite + React
- **Language**: TypeScript
- **UI Library**: Tailwind CSS + shadcn-ui
- **Database**: Supabase
- **State Management**: React Context API
- **Build & Tooling**: ESLint, Prettier, Vite Plugins

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/quick-ecommerce-store.git
cd quick-ecommerce-store
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install

# Or using pnpm
pnpm install

# Or using bun
bun install
```

### 3. Start the Development Server

```bash
# Using npm
npm run dev

# Or yarn
yarn dev

# Or pnpm
pnpm dev

# Or bun
bun dev
```

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

---

## 📂 Project Structure

```
quick-ecommerce-store/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/           # React context providers
│   ├── integrations/
│   │   └── supabase/      # Supabase client & types
│   ├── pages/             # Storefront & admin pages
│   │   └── admin/         # Admin dashboard & auth flows
│   ├── services/          # API calls & business logic
│   ├── styles/            # Tailwind CSS config & global styles
│   ├── lib/               # Utility functions & helpers
│   └── main.tsx           # App entry point
├── .env.example           # Example environment variables
├── package.json
└── vite.config.ts
```

---

## 🎨 Brand Identity & Restrictions

This repository contains **customer-owned assets**.

- ✅ **Allowed**: You may **use, modify, and deploy** the source code for the storefront.
- ❌ **Restricted**: Logos, brand names, and color identities are **trademarked** and are not licensed for reuse. Do not reuse or distribute these brand assets without written permission.

See the `LICENSE` file for full terms.

---

## 📜 License

This project includes a `LICENSE` file. Summary:

- Code: permitted to use, modify, and distribute.
- Brand assets (logo, brand color names): not licensed for reuse without permission.

---

## 🔮 Roadmap

Next Release — v2.0 (planned)
- Integrated payment gateways
- Inventory management enhancements
- Sales analytics dashboard

---

## 🤝 Contributing

Contributions are welcome. Fork the repo, create a branch, and open a pull request.

---

## 📧 Support

For questions or support: support@quickstore.com
## Quick E‑Commerce Store

This repository contains the source code for a customer e-commerce storefront built with modern web tooling. The README below focuses on practical usage and constraints for the customer's project assets.

### Project at a glance

- Purpose: Frontend storefront and admin UI for a small e-commerce site.
- Stack: Vite, TypeScript, React, Tailwind CSS, shadcn-ui components.

### Local setup

1. Clone the repository to your machine.
2. Install dependencies using the project package manager.
3. Start the development server.

Typical commands (run from project root):

1) Install dependencies

2) Start dev server

Replace the package manager commands with the ones you use (npm, yarn, pnpm, bun).

### What you can do with this code

- Use, modify, and deploy the source code to run the storefront for the client.
- Inspect and extend components, pages, and services located under `src/`.

### Brand identity and restrictions

This is customer work. The source code is provided for use by the customer and third parties per the included license. However, the customer's brand identity — including the logo and any named color identities (brand color names) — is reserved and may not be used, reproduced, or claimed by third parties without explicit written permission from the client.

In short: you may use and modify the code, but you may not reuse the logo or present the brand identity (color names and logo) as your own or in third-party products without authorization.

### License (summary)

- The repository includes a project license that permits use, modification, and distribution of the source code for commercial and non-commercial purposes.
- The license explicitly reserves the client's trademark and brand assets (logo and brand color names). See the `LICENSE` file for full terms.

### Next version

The next planned version will include a payment integration. Implementation details and supported payment providers will be published with that update.

### Where to look in the code

- `src/` — application code (pages, components, contexts, services)
- `src/integrations/supabase` — Supabase client and types
- `src/pages/admin` — admin interface and auth flows

If you need additional documentation (API contracts, deployment scripts, or CI configuration), tell me which area to document next.
- Vite
