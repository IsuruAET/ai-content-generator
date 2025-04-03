# AI Content Generator

A Next.js application that uses Google's Generative AI (Gemini) to generate content based on user prompts.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/pages/index.tsx`. The page auto-updates as you edit the file.

## Features

- AI-powered content generation using Google's Gemini AI
- Modern, responsive UI built with Material-UI
- Markdown support for generated content
- Copy-to-clipboard functionality
- Real-time error handling and loading states

## Environment Variables

Create a `.env.local` file in the root directory and add your Gemini API key:

```
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn-pages-router)
- [Google Generative AI Documentation](https://ai.google.dev/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
