# AI Router with x402 Payment Protection

A professional Express.js server that provides unified access to multiple AI providers (OpenAI, Anthropic, DeepSeek) with Solana-based payment protection via x402.

## Features

- 🤖 Multi-provider AI routing (OpenAI, Anthropic, DeepSeek)
- 💰 Solana-based payment protection via x402
- 🔄 Streaming and non-streaming responses
- 📦 Clean, modular architecture
- 🐳 Docker support
- 🔒 Type-safe with TypeScript

## Project Structure

```
my-first-server/
├── src/
│   ├── config/          # Configuration and constants
│   ├── middleware/      # Express middleware (payment)
│   ├── routes/          # API route handlers
│   │   ├── completions.ts  # Unified chat endpoint
│   │   ├── gpt.ts          # OpenAI endpoint
│   │   ├── claude.ts       # Anthropic endpoint
│   │   ├── deepseek.ts     # DeepSeek endpoint
│   │   └── index.ts        # Route aggregator
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   └── index.ts         # Main server entry point
├── Dockerfile
├── .dockerignore
├── tsup.config.ts       # Build configuration
└── package.json
```

## Setup

### Prerequisites

- Node.js 20+
- npm or yarn
- API keys for AI providers (OpenAI, Anthropic, DeepSeek)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
DEEPSEEK_API_KEY=your_deepseek_key
```

## Development

```bash
npm run dev
```

Server runs on `http://localhost:4021`

## Production

### Build

```bash
npm run build
```

### Run

```bash
npm start
```

## Docker

### Build Image

```bash
docker build -t my-first-server .
```

### Run Container

```bash
docker run -p 4021:4021 --env-file .env my-first-server
```

Or with environment variables:

```bash
docker run -p 4021:4021 \
  -e OPENAI_API_KEY=your_key \
  -e ANTHROPIC_API_KEY=your_key \
  -e DEEPSEEK_API_KEY=your_key \
  my-first-server
```

## API Endpoints

### POST `/v1/chat/completions`

Unified endpoint that auto-routes based on model prefix.

**Request:**

```json
{
  "model": "gpt-4o-mini",
  "messages": [{ "role": "user", "content": "Hello!" }],
  "stream": false
}
```

**Supported model prefixes:**

- `gpt-*` or `openai/*` → OpenAI
- `claude-*` or `anthropic/*` → Anthropic
- `deepseek-*` or `deepseek/*` → DeepSeek

### POST `/v1/chat/gpt`

OpenAI-specific endpoint.

### POST `/v1/chat/claude`

Anthropic-specific endpoint.

### POST `/v1/chat/deepseek`

DeepSeek-specific endpoint.

## Payment Configuration

The server uses x402 middleware for Solana-based payments. Configure pricing in `src/config/index.ts`.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run lint` - Lint and fix code
- `npm run format` - Format code with Prettier

## License

Private

