# MediPulse Pro - Clinical Command Center

[cloudflarebutton]

MediPulse Pro is a next-generation Electronic Health Record (EHR) and physician dashboard designed for speed, clarity, and visual elegance. It transforms the chaotic information flow of a medical practice into a streamlined, calm, and information-dense command center.

The application serves as the primary workspace for doctors and nurses, offering real-time patient monitoring, queue management, and rapid access to medical history. The UI emphasizes "Clinical Calm"—using whitespace, subtle shadows, and a refined palette to reduce cognitive load while maintaining high data density.

## Key Features

- **The Command Dashboard**: A high-level overview of the clinic's pulse—patient volume, critical alerts, and daily schedule.
- **Live Vitals Monitor**: Interactive, animated charts visualizing heart rate, blood pressure, and O2 saturation trends using Recharts.
- **Patient Management System**: A robust, filterable roster of patients with status indicators (Waiting, In-Consultation, Discharged).
- **Clinical Notes & History**: A clean, readable interface for reviewing past visits and documenting current observations.
- **Real-time Architecture**: Built on Cloudflare Durable Objects to handle transactional patient data and state management.

## Technology Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS, Shadcn UI
- **Visualization**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Zustand

### Backend & Infrastructure
- **Runtime**: Cloudflare Workers
- **Framework**: Hono
- **Storage & State**: Cloudflare Durable Objects (Single Global Binding)
- **Language**: TypeScript (Shared types between frontend and backend)

## Architecture

The application follows a modern edge architecture:
`Client -> Hono Worker (Edge) -> Durable Object (Storage & State) -> Client`

- **Read-Heavy Pattern**: The dashboard polls for updates to ensure near real-time visibility.
- **Transactional Writes**: Critical operations like admitting a patient or updating vitals are handled transactionally via Durable Objects.
- **Entities**: The backend uses an Entity pattern (`UserEntity`, `PatientEntity`) wrapped around a single `GlobalDurableObject` to manage data persistence.

## Prerequisites

- **Node.js**: v18 or higher
- **Bun**: v1.0 or higher (Required package manager)
- **Cloudflare Account**: For deployment

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd medipulse-pro
```

### 2. Install dependencies

```bash
bun install
```

### 3. Start the development server

This command starts both the Vite frontend and the Cloudflare Worker proxy locally.

```bash
bun run dev
```

Open your browser to `http://localhost:3000` (or the port shown in your terminal).

## Project Structure

- **`src/`**: Frontend React application.
  - **`components/`**: Reusable UI components (Shadcn/Tailwind).
  - **`pages/`**: Application views (Dashboard, Patient Details).
  - **`lib/`**: Utilities and API clients.
- **`worker/`**: Cloudflare Worker backend.
  - **`index.ts`**: Worker entry point.
  - **`user-routes.ts`**: API route definitions.
  - **`entities.ts`**: Business logic and data models.
- **`shared/`**: TypeScript types shared between frontend and backend.

## Deployment

[cloudflarebutton]

You can deploy this application to Cloudflare Workers using Wrangler.

### Manual Deployment

1. Login to Cloudflare:
   ```bash
   npx wrangler login
   ```

2. Deploy the application:
   ```bash
   bun run deploy
   ```

This will build the frontend assets and deploy the Worker with the static assets.

## Development Notes

- **Durable Objects**: This project uses a single `GlobalDurableObject` binding. Do not modify `wrangler.jsonc` to add new bindings. Use the Entity pattern provided in `worker/core-utils.ts` to create logical separation of data.
- **Styling**: Use Tailwind utility classes for layout and spacing. Use Shadcn UI components for interactive elements.
- **Type Safety**: Always define shared types in `shared/types.ts` to ensure contract safety between the frontend and the worker.

## License

This project is licensed under the MIT License.