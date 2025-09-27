import express from 'express';
import v1Router from './router/v1';
import cors from 'cors';
import { initPassport } from './passport';
import authRoute from './router/auth';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { COOKIE_MAX_AGE } from './consts';

const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.COOKIE_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: COOKIE_MAX_AGE },
  }),
);

initPassport();
app.use(passport.initialize());
app.use(passport.authenticate('session'));

const allowedHosts = process.env.NODE_ENV === 'production'
  ? ['https://chess-frontend-pearl-one.vercel.app']
  : ['http://localhost:5173', 'https://chess-frontend-pearl-one.vercel.app'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedHosts.includes(origin)) return callback(null, true);
    callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/auth', authRoute);
app.use('/v1', v1Router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
