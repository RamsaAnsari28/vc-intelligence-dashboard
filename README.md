# VC Intelligence Dashboard

A lightweight VC Intelligence web application built using Next.js (App Router), TypeScript, and Tailwind CSS.

This project allows users to explore companies, view detailed profiles, save companies into lists, add notes, and enrich company data using **website content analysis**.

---

## 🚀 Live Features

### 🧭 App Shell
- Persistent sidebar navigation
- Clean layout using Tailwind CSS
- Structured routing using Next.js App Router

### 🏢 Companies Page
- Displays a list of companies
- Clickable company rows
- Dynamic routing (`/companies/[id]`)

### 📄 Company Profile Page
- Displays detailed company information
- Add and save personal notes (stored in localStorage)
- Save companies to a custom list
- **Enrichment button** for structured insights from company websites

### 📋 Lists Page
- View saved companies
- Remove companies from list
- Persistent storage using localStorage

### 🧩 Website Content Enrichment
- Server-side API route (`/api/enrich`)
- Fetches company website content
- Cleans and parses HTML to extract:
  - Summary
  - What They Do (first meaningful sentence)
  - Keywords (top frequent words)
  - Business Signals (contact info, product mentions, company info)
- Displays enrichment results with:
  - Source URL
  - Timestamp
  - Loading state
  - Error handling
- Graceful fallback if website fetch fails

---

## 🛠 Tech Stack

- Next.js (App Router)  
- TypeScript  
- Tailwind CSS  
- LocalStorage (for persistence)  
- Vercel (for deployment)  

---

## 🧠 Architecture Overview

1. UI built with Next.js App Router  
2. Company data stored as a static dataset  
3. Enrichment handled via a server API route  
4. Lists and Notes stored in localStorage  
5. Website parsing performed server-side, no external AI services  
6. Graceful error handling for failed website fetches  

---

## 🧪 Running Locally

Install dependencies:

```bash
npm install
Run development server:

npm run dev

Open in browser:

http://localhost:3000
🌍 Deployment

The application is deployed using Vercel.
No external API keys are required.

📌 Notes

Company dataset is currently static (mock data)

Website scraping may fail for some domains due to bot protection

The application handles such failures gracefully without crashing

This project demonstrates full-stack architecture, server-side HTML parsing, and structured UI design

📎 Author

Built as part of a VC Intelligence dashboard assignment.
