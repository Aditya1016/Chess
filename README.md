# Chess Multiplayer Platform

A scalable, real-time chess platform enabling users to sign up, play live matches, and track ratings, built with a modern, modular architecture.

---

## Architecture Overview

- **Frontend:**  
  Built with **React** (TypeScript), providing a responsive UI for gameplay, matchmaking, and user management.

- **Backend:**  
  Developed in **Node.js** (TypeScript), exposing REST APIs for authentication, user management, and ratings.  
  Real-time gameplay is handled by a dedicated **WebSocket server** for low-latency move exchange.

- **Game State & Queue:**  
  **Redis** is used to queue and persist all moves, ensuring reliability and scalability for concurrent games.

- **Database:**  
  **PostgreSQL** stores user data, match history, and ratings.

- **Monorepo:**  
  Managed with Turborepo, enabling code sharing and streamlined development across frontend, backend, and native apps.

---

## Tech Stack

- React (TypeScript) – Frontend
- Node.js (TypeScript) – Backend
- WebSocket – Real-time gameplay
- Redis – Move queue & caching
- PostgreSQL – Persistent storage
- Turborepo – Monorepo management

---

## Scalability

- **Stateless backend**: Easily deployable across multiple instances.
- **WebSocket server**: Can be horizontally scaled; Redis ensures consistent game state.
- **Redis**: Centralized move queue supports high concurrency.
- **Modular monorepo**: Facilitates rapid development and deployment of new features.

---

## API & WebSocket Endpoints

### REST API (Backend)

- `POST /api/signup` – Register a new user
- `POST /api/login` – Authenticate user
- `GET /api/profile` – Get user profile & rating
- `GET /api/matches` – List user’s matches
- `GET /api/match/:id` – Get match details

### WebSocket Events

- **Client → Server**
  - `init_game` – Request to join/start a match
  - `move` – Send a chess move
  - `chat` – Send a chat message

- **Server → Client**
  - `init_game` – Game start notification
  - `move` – Opponent’s move
  - `chat` – Chat relay
  - `game_over` – Game result

---

## Running Locally

1. Clone the repo
2. Copy `.env.example` to `.env` in all apps and update credentials
3. Install dependencies:  
   `npm install`
4. Start services:
   - WebSocket server:  
     `cd apps/ws && npm run dev`
   - Backend:  
     `cd apps/backend && npm run dev`
   - Frontend:  
     `cd apps/frontend && npm run dev`

---

## License

MIT