# EVH Legal - AI Document Intelligence Dashboard

A Next.js frontend for legal document analysis and entity compliance management, designed to reverse proxy to a Phoenix backend.

## Features

- **AI Document Chat**: Upload and analyze legal documents with AI-powered insights
- **Risk Dashboard**: Operational intelligence with vector data lake integration
- **Compliance Management**: Transform vague requirements into sharp obligations
- **Entity Management**: Comprehensive view of entities, cap tables, insurance, and filings
- **User Personas**: DISC-based personality profiles for team interaction

## Local Development

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file with:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Run development server:**
   ```bash
   pnpm dev
   ```

4. **Build for production:**
   ```bash
   pnpm build
   ```

## Deployment on Vercel

### Prerequisites
- OpenAI API key for document analysis features
- Vercel account

### Steps

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard:**
   - `OPENAI_API_KEY`: Your OpenAI API key

3. **Deploy:**
   - Vercel will automatically detect Next.js and build
   - The `vercel.json` config handles API route timeouts

### Common Deployment Issues

**404 Errors:**
- Ensure all static assets exist in `/public`
- Check that API routes are properly exported
- Verify environment variables are set

**Build Failures:**
- TypeScript/ESLint errors are ignored via `next.config.mjs`
- SSR issues with client-only components are handled with dynamic imports

## Architecture

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with Radix UI components
- **AI Integration**: Vercel AI SDK with OpenAI
- **State Management**: React hooks and context
- **Backend Integration**: Designed for Phoenix reverse proxy

## API Routes

- `/api/analyze-document`: PDF analysis with AI extraction
- `/api/chat-document`: Streaming chat about analyzed documents

## Components

- **UI Components**: Reusable Radix UI components in `/components/ui`
- **Business Components**: Domain-specific components in `/components`
- **Pages**: App Router pages in `/app`

## Contributing

1. Follow the existing code style
2. Add new UI components to `/components/ui`
3. Business logic components go in `/components`
4. Use TypeScript for all new code
