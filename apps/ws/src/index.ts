import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';
import url from 'url';
import { extractAuthUser } from './auth';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT) || 8080; // fallback for local dev
const wss = new WebSocketServer({ port: PORT });

const gameManager = new GameManager();

wss.on('connection', function connection(ws, req) {
  //@ts-ignore
  const token: string = url.parse(req.url, true).query.token;
  const user = extractAuthUser(token, ws);
  gameManager.addUser(user);

  ws.on('close', () => {
    gameManager.removeUser(ws);
  });
});

console.log('WebSocket server is running on ws://localhost:' + PORT);
