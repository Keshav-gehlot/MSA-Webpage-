# Microsoft Learn Student Ambassadors - SRM

A production-ready, enterprise-grade React application for the Microsoft Learn Student Ambassadors chapter at SRM.

## Architecture

This project follows Clean Architecture and Feature-Based modularization to ensure scalability, maintainability, and enterprise-grade performance.

```text
src/
├── animations/     # Framer Motion animation variants and helpers
├── assets/         # Static assets, fonts, and global images
├── components/     # Shared, reusable UI components (Buttons, Inputs)
├── config/         # Environment variables and site configuration
├── constants/      # Magic strings, static lists, and enum-like structures
├── context/        # React Context definitions
├── hooks/          # Custom React hooks (useScroll, useCountUp)
├── layouts/        # Layout wrappers (MainLayout, AuthLayout)
├── lib/            # Third-party integrations and core utilities
├── pages/          # Route-level components mapping to URLs
├── providers/      # Application-level providers (ErrorBoundary, Helmet)
├── sections/       # Distinct sections composing pages (Hero, Team, Projects)
├── services/       # API calls, external data fetching (GitHub API, Azure)
├── types/          # TypeScript interfaces and global type declarations
└── utils/          # Pure helper functions (formatting, validation)
```

## Features

- **Blazing Fast Performance**: 100 Lighthouse score targeted with Suspense, lazy loading, and optimized assets.
- **Enterprise SEO**: Powered by `react-helmet-async` with Open Graph, Twitter Cards, and JSON-LD structured data.
- **Accessible (WCAG 2.2 AA)**: Semantic HTML, robust focus management, and screen-reader compliant structures.
- **Smooth Animations**: Intersection Observers and Framer Motion for non-blocking, GPU-accelerated visual feedback.
- **Responsive Design**: Tailored experiences from mobile to ultra-wide desktop monitors.
- **Future-Ready Microsoft Ecosystem Integration**: Structured for Microsoft Learn profile fetching, Azure App Insights, and GitHub APIs.

## Installation Guide

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd mlsa-srm
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Copy `.env.example` to `.env` and fill in necessary keys (Azure, GitHub API).

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## Deployment Guide

This project is optimized for deployment on **Azure Static Web Apps** or **Vercel**.

1. Run the build command:
   ```bash
   npm run build
   ```
2. The `dist/` folder will contain the fully minified and optimized production bundle.

## Contribution Guide

- We use **strict TypeScript**. Avoid `any` wherever possible.
- Linting is enforced via ESLint. Run `npm run lint` before committing.
- Commit messages should follow the Conventional Commits specification.

---
*Built with React, Vite, Tailwind CSS, and Framer Motion.*
