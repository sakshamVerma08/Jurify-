<div align="center">

# ⚖️ Jurify

### Legal Networking & AI-Powered Legal Assistant Platform

**��� Winner — LexConnect 1.0 Hackathon, Bennett University**

[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=flat-square)](https://github.com)
[![Hackathon Winner](https://img.shields.io/badge/LexConnect%201.0-Winner%20���-gold?style=flat-square)](https://github.com)
[![RAG Powered](https://img.shields.io/badge/AI-RAG%20Powered-blueviolet?style=flat-square)](https://github.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

*Breaking legal barriers — one document at a time.*

</div>

---

## ��� Overview

**Jurify** is a full-stack legal-tech platform that serves two distinct audiences:

- **Lawyers & Legal Professionals** — A LinkedIn-style networking space where lawyers can build their profiles, connect with peers, gain early-career experience, and take up ProBono cases to give back to society.
- **Non-Legal Users** — An AI-powered legal document assistant that helps everyday people — farmers, daily wage workers, small business owners — understand complex legal jargon in plain, simple language, completely **free of cost**.

> *The legal system is for everyone. Jurify makes sure everyone can actually understand it.*

---

## ��� Core Features

### For Lawyers
- ��� **Professional Networking** — Connect with fellow advocates, find mentors, and collaborate across practice areas.
- ��� **ProBono Case Listings** — Senior lawyers can list and take up ProBono cases, building reputation while serving the underserved.
- ��� **Early Career Opportunities** — Junior lawyers can find mentorship, internships, and case experience from experienced advocates.
- ���️ **Rich Profiles** — Showcase practice areas, bar registration, case history, and achievements.

### For Non-Legal Users (The AI Assistant)
- ��� **Legal Document Upload** — Users can upload any legal document (contracts, land records, court notices, FIRs, etc.).
- ��� **AI-Powered Explanation** — The assistant reads the document and explains legal terms in plain, easy-to-understand language.
- ��� **RAG-Based Contextual Answers** — Powered by Retrieval Augmented Generation (RAG) so answers are always grounded in the actual document, not hallucinated.
- ��� **Free & Accessible** — No lawyer needed. No fees. Built for users with no legal background.

---

## ��� AI Architecture — How the Legal Assistant Works

The AI document assistant is the technical centrepiece of Jurify. Here's how it works under the hood:

```
User Uploads Document
        │
        ▼
┌─────────────────────┐
│  Document Parsing   │  ← PDF / DOCX extraction
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│  Text Chunking      │  ← Split into semantic chunks
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│  Embedding Model    │  ← Generate vector embeddings
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│  Vector Database    │  ← Store embeddings (Pinecone / ChromaDB)
└─────────────────────┘
        │
   User asks question
        │
        ▼
┌─────────────────────┐
│  Semantic Search    │  ← Retrieve top-k relevant chunks
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│  LLM + RAG Prompt   │  ← Inject context + user query
└─────────────────────┘
        │
        ▼
   Plain-Language Answer
```

### Why RAG?

A vanilla LLM would answer from its training data — which is dangerous for legal queries. With RAG:

- Responses are **strictly anchored** to the uploaded document.
- **Hallucination risk is minimised** — critical for legal accuracy.
- The model explains *your specific document*, not generic legal theory.
- Works across **multiple Indian legal domains** — property law, labour law, consumer protection, criminal law, etc.

---

## ���️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js / React |
| Backend | Node.js / Express |
| Authentication | JWT / OAuth |
| AI / LLM | Anthropic Claude API / OpenAI API |
| Embeddings | OpenAI `text-embedding-ada-002` |
| Vector Store | Pinecone / ChromaDB |
| Document Parsing | LangChain document loaders |
| Database | PostgreSQL / MongoDB |
| Storage | AWS S3 / Cloudinary |

---

## ��� Getting Started

### Prerequisites

- Node.js >= 18
- Python >= 3.10 (for embedding pipeline)
- API keys: Anthropic or OpenAI, Pinecone

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/jurify.git
cd jurify

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Environment Variables

```env
# LLM
ANTHROPIC_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here

# Vector DB
PINECONE_API_KEY=your_key_here
PINECONE_ENVIRONMENT=your_env

# App
DATABASE_URL=your_db_url
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Run Locally

```bash
# Development server
npm run dev

# Build for production
npm run build
npm start
```

---

## ��� Project Structure

```
jurify/
├── app/                    # Next.js app directory
│   ├── (auth)/             # Login, Register
│   ├── dashboard/          # Lawyer dashboard
│   ├── legal-assistant/    # AI assistant interface
│   └── probono/            # ProBono case listings
├── components/             # Reusable UI components
├── lib/
│   ├── ai/
│   │   ├── embeddings.js   # Embedding generation
│   │   ├── rag.js          # RAG pipeline
│   │   └── llm.js          # LLM call handler
│   ├── db/                 # Database clients
│   └── vectorstore/        # Pinecone / ChromaDB client
├── api/                    # API routes
├── public/                 # Static assets
└── README.md
```

---

## ��� Hackathon — LexConnect 1.0

Jurify won **1st place** at **LexConnect 1.0**, a legal-tech hackathon hosted at **Bennett University**.

The project was recognised for:
- **Social impact** — directly addressing legal accessibility for underserved communities.
- **Technical depth** — production-grade RAG implementation for a domain-specific use case.
- **Product thinking** — dual-sided platform serving both legal professionals and non-legal users.

---

## ��� Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a Pull Request
```

---

## ��� License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

Built with purpose — to make the law accessible to everyone. ⚖️

</div>

