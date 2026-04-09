# ✈️ Class Pilot

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Framework: Next.js](https://img.shields.io/badge/Framework-Next.js-black?logo=next.js)](https://nextjs.org/)
[![Runtime: Bun](https://img.shields.io/badge/Runtime-Bun-fbf0df?logo=bun)](https://bun.sh/)
[![Style: Tailwind v4](https://img.shields.io/badge/Style-Tailwind--v4-38b2ac?logo=tailwindcss)](https://tailwindcss.com/)

**Class Pilot** is a high-performance, unified academic management system designed to streamline the educational experience for teachers, students, and administrators. Built with a "premium-first" mindset, it transforms complex school operations—like quiz management, financial tracking, and attendance—into simple, actionable insights.

![Class Pilot Hero](public/hero-dashboard.png)

---

## ✨ Key Features

### 👨‍🏫 Teacher Workspace
*   **Financial Ledger**: Track collections, receivables, and fee collection in real-time.
*   **Automated Reporting**: Generate comprehensive batch reports and attendance summaries.
*   **Actionable Analytics**: Identify "At-Risk" students using growth charts and performance tracking.
*   **Smart Quiz Engine**: Create complex assessments with full **LaTeX (KaTeX)** support for math/science.

### 🎓 Student Portal
*   **Personalized Dashboard**: View assigned quizzes, upcoming fees, and personal attendance trends at a glance.
*   **Quiz Workflow**: A seamless "Submission Engine" for taking assessments and reviewing results immediately.
*   **Performance Tracking**: Visualize academic growth over time with interactive charts.
*   **Financial Overview**: Keep track of monthly dues and past payment history.

### ⚙️ Admin Control
*   **User Management**: Robust system for registering and managing teacher and student accounts.
*   **Global Overviews**: Monitor system health and institutional performance.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | [Next.js](https://nextjs.org/) (App Router), [React](https://react.dev/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/) |
| **State Management** | [TanStack Query](https://tanstack.com/query) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Math Rendering** | [KaTeX](https://katex.org/) |
| **Runtime** | [Bun](https://bun.sh/) |

---

## 🚀 Getting Started

### Prerequisites
*   [Bun](https://bun.sh/) installed on your machine.
*   Node.js (for compatibility, though Bun is preferred).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tanmayislam2006/class-pilot-client.git
   cd class-pilot-client
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file and add your backend API URL:
   ```env
   NEXT_PUBLIC_BASE_API=http://localhost:5000/api/v1
   ```

4. **Run the development server:**
   ```bash
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## 🗺️ Roadmap

We are constantly evolving. Check out our detailed roadmaps for future enhancements:
*   [Student Roadmap](STUDENT_ROADMAP.md)
*   [Teacher Roadmap](TEACHER_ROADMAP.md)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ for the future of education.
</p>
