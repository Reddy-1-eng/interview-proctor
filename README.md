# Interview Proctor

A Next.js-based online examination platform with AI-powered proctoring features to ensure exam integrity.

## Features

- **Secure Authentication**: User authentication system with Better Auth
- **Exam Management**: Create, start, and end exams with time limits
- **Real-time Proctoring**: 
  - Fullscreen enforcement
  - Tab switching detection
  - Violation tracking and reporting
- **Exam Sessions**: Track individual exam attempts with session management
- **Dashboard**: View exam results and analytics
- **Database**: SQLite with Prisma ORM

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: SQLite with Prisma
- **Authentication**: Better Auth
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui

## Project Structure

```
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── (auth)/            # Authentication pages
│   │   ├── api/               # API routes
│   │   │   ├── exam/          # Exam management endpoints
│   │   │   └── proctor/       # Proctoring endpoints
│   │   ├── attempt/           # Exam attempt pages
│   │   ├── dashboard/         # Dashboard pages
│   │   └── exam/              # Active exam pages
│   ├── components/            # React components
│   │   ├── fullscreen-enforcer.tsx
│   │   ├── proctor-manager.tsx
│   │   └── timer.tsx
│   └── lib/                   # Utility functions
│       ├── auth.ts
│       ├── auth-client.ts
│       ├── prisma.ts
│       └── utils.ts
└── public/                    # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Reddy-1-eng/interview-proctor.git
cd interview-proctor
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with necessary configuration.

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Exam Management
- `POST /api/exam/create` - Create a new exam
- `POST /api/exam/start` - Start an exam session
- `POST /api/exam/end` - End an exam session
- `GET /api/exam/session/[sessionId]` - Get exam session details

### Proctoring
- `POST /api/proctor/violation` - Report a proctoring violation

## Features in Detail

### Proctoring System
The application monitors exam integrity through:
- Fullscreen mode enforcement
- Tab switching detection
- Multiple violation tracking
- Real-time violation reporting

### Exam Flow
1. User signs in
2. Selects an exam from dashboard
3. Starts exam session
4. Takes exam with proctoring active
5. Submits exam
6. Views results

## License

MIT

## Author

Reddy
