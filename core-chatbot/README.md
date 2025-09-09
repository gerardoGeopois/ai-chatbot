# Simple AI Chatbot

A basic AI chatbot built with Next.js and the AI SDK.

## Features

- Simple chat interface
- Streaming AI responses
- Responsive design
- No authentication required
- No database required

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Configure your AI provider in `app/api/chat/route.ts`:

```typescript
// Example with OpenAI:
import { openai } from '@ai-sdk/openai';

const result = streamText({
  model: openai('gpt-3.5-turbo'),
  messages,
});
```

3. Set up environment variables (if using a paid AI service):

```bash
# .env.local
OPENAI_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## File Structure

```
├── app/
│   ├── api/chat/route.ts       # Chat API endpoint
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page
├── components/
│   ├── ui/                     # Basic UI components
│   ├── chat.tsx                # Main chat component
│   ├── messages.tsx            # Messages display
│   ├── message.tsx             # Individual message
│   ├── multimodal-input.tsx    # Chat input
│   ├── greeting.tsx            # Welcome message
│   └── icons.tsx               # Simple SVG icons
└── lib/
    ├── types.ts                # TypeScript types
    └── utils.ts                # Utility functions
```

## Customization

- Modify styling in the component files (using Tailwind CSS)
- Change the AI provider in `app/api/chat/route.ts`
- Update the greeting message in `components/greeting.tsx`
- Add new features by extending the existing components

## AI Provider Setup

Currently includes a mock response. To use a real AI provider:

1. Install the provider SDK (e.g., `@ai-sdk/openai`)
2. Update the API route with your provider configuration
3. Add necessary environment variables

Example providers:

- OpenAI: `@ai-sdk/openai`
- Anthropic: `@ai-sdk/anthropic`
- Google: `@ai-sdk/google`
- Other providers supported by Vercel AI SDK
