# 🔐 Security Policy

Thank you for helping us keep **AspirePath AI** secure for all users! Security is a top priority in our project, which is designed to support developers, learners, and contributors across the globe.

---

## 📣 About AspirePath AI

**AspirePath AI** is a full-stack open-source platform built with:

* 🌐 Frontend: React, TypeScript, Shadcn UI, Tailwind CSS
* 🔐 Backend: Node.js, Express, JWT Auth, MongoDB Atlas
* 🤖 Features: AI Chatbot (OpenAI/Gemini), Resume Analyzer, Learning Tracker, Admin Dashboards, Stripe Payments (upcoming)

---

## 🐞 Reporting a Vulnerability

If you find a **security issue** in AspirePath AI, we kindly ask that you follow **responsible disclosure** practices:

### 🚨 Do NOT:

* Do *not* open a GitHub issue describing the vulnerability publicly.

### ✅ Instead:

* **Email us directly and privately** at:
  📧 `officialAspirePath AI@gmail.com`

* Please include:

  * Clear description of the vulnerability
  * Steps to reproduce
  * Any proof-of-concept (PoC) code or screenshots
  * Recommendations (optional)

We aim to respond within **6–12 hours**, and patch critical issues ASAP (usually within 24 hours).

---

## 🛡️ Supported Versions

| Branch / Version | Status          | Notes                                 |
| ---------------- | --------------- | ------------------------------------- |
| `main`           | ✅ Supported     | Actively maintained & deployed        |
| Other branches   | ❌ Not Supported | Dev/test branches only, no guarantees |

If you're using a forked or older version, we **strongly recommend** syncing with the `main` branch regularly to receive security patches.

---

## 🔒 Data Protection Practices

* **Authentication**: All user/admin login routes are secured using **JWT + Bcrypt hashing**
* **Authorization**: Middleware protections (e.g., `authorize("admin")`) are in place for sensitive routes
* **Input Validation**: APIs are protected using **Zod-based schema validation**
* **Rate Limiting (upcoming)**: To prevent brute-force or abuse attacks
* **Environment Secrets**: All credentials and API keys are stored securely via `.env` and Vercel Secrets
* **Emails & Passwords**: Stored securely using **MongoDB Atlas**, not exposed in logs

---

## 🧪 Reporting Flow

1. Vulnerability reported privately
2. Internal validation & patch implementation
3. Security hotfix release deployed to `main` and production (Vercel)
4. Optional public advisory, if required

---

## 🤝 Thanks for Your Contribution

We value and appreciate all contributors who help us make AspirePath AI better and more secure. 🛡️

Let’s build safer, smarter, and more inclusive software—together.

---

**Project Maintainer:**
📧 [Gmail](mailto:officialAspirePath AI@gmail.com)
🔗 [Github](https://github.com/abhisek2004/Dev-Elevate)
