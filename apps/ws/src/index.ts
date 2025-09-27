import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';
import url from 'url';
import { extractAuthUser } from './auth';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT) || 8080; // fallback for local dev
const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'https://chess-frontend-pearl-one.vercel.app',
  'https://chess-f69t.onrender.com'
];

const gameManager = new GameManager();

const wss = new WebSocketServer({
  port: PORT,
  verifyClient: (info, done) => {
    const origin = info.origin;
    if (ALLOWED_ORIGINS.includes(origin)) {
      done(true);
    } else {
      console.warn(`Blocked WS connection from origin: ${origin}`);
      done(false, 401, 'Unauthorized');
    }
  },
});

wss.on('connection', function connection(ws, req) {
  // Extract token from query
  const token = url.parse(req.url ?? '', true).query.token as string;
  if (!token) {
    ws.close(4001, 'No token provided');
    return;
  }

  try {
    const user = extractAuthUser(token, ws);
    gameManager.addUser(user);

    ws.on('close', () => {
      gameManager.removeUser(ws);
    });
  } catch (err) {
    console.error('Failed to authenticate WS user:', err);
    ws.close(4002, 'Invalid token');
  }
});

console.log('WebSocket server is running on ws://localhost:' + PORT);
