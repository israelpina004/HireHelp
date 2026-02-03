# AI Career Coach Platform

## Problem
Early-career professionals struggle to pass resume screenings and perform well in behavioral interviews. Existing tools solve these problems in isolation, leaving users without a cohesive feedback loop.

## Solution
We are building an AI-powered platform that provides resume optimization, ATS screening simulations, and mock behavioral interviews tailored to specific job descriptions.

## Tech Stack
- Frontend: Next.js (TypeScript, TailwindCSS)
- Backend: Flask (Python)
- Authentication & Database: Supabase
- Caching: Redis (planned)
- AI/ML: Sentence Transformers, LLM-based feedback generation

## Architecture Overview
- Next.js frontend handles user interaction and visualization
- Flask backend exposes APIs for parsing, scoring, and interview logic
- Supabase manages authentication and persistent storage
- AI services are modularized for independent iteration

## Team
- Amit Howlader  
- Israel Pina  
- Mehedi Hasan  
- Raeesah Iram