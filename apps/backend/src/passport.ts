import passport from "passport";
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from "passport-google-oauth20";
import { Strategy as GithubStrategy, Profile as GithubProfile } from "passport-github2";
import dotenv from "dotenv";
import { db } from "./db";

import { AuthProvider } from '@prisma/client';

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;

interface GithubEmailRes {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: "private" | "public";
}

export function initPassport() {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    throw new Error("Missing environment variables for authentication providers");
  }

  // ✅ Google OAuth Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/google/callback", // FULL URL for localhost
      },
      async function (accessToken, refreshToken, profile: GoogleProfile, done) {
        try {
          const user = await db.user.upsert({
            create: {
              email: profile.emails?.[0].value || `${profile.id}@google-oauth.com`,
              name: profile.displayName,
              provider: "GOOGLE",
            },
            update: {
              name: profile.displayName,
            },
            where: {
              email: profile.emails?.[0].value || `${profile.id}@google-oauth.com`,
            },
          });

          return done(null, user);
        } catch (err) {
          return done(err, undefined);
        }
      }
    )
  );

  // ✅ GitHub OAuth Strategy
  interface GithubStrategyConfig {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
  }

  interface GithubUser {
    id: string;
    name: string | null;
    email: string;
    provider: AuthProvider;
  }

  type DoneCallback = (error: any, user?: GithubUser) => void;

  passport.use(
    new GithubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/github/callback",
      } as GithubStrategyConfig,
      async function (
        accessToken: string, 
        refreshToken: string, 
        profile: GithubProfile, 
        done: DoneCallback
      ) {
        try {
          const res = await fetch("https://api.github.com/user/emails", {
            headers: { Authorization: `token ${accessToken}` },
          });
          const data: GithubEmailRes[] = await res.json();
          const primaryEmail = data.find((item) => item.primary);

          const user = await db.user.upsert({
            create: {
              email: primaryEmail?.email || `${profile.id}@github-oauth.com`,
              name: profile.displayName || profile.username || "GitHub User",
              provider: "GITHUB",
            },
            update: {
              name: profile.displayName || profile.username || "GitHub User",
            },
            where: {
              email: primaryEmail?.email || `${profile.id}@github-oauth.com`,
            },
          });

          return done(null, user);
        } catch (err) {
          return done(err, undefined);
        }
      }
    )
  );

  // ✅ Serialize / Deserialize
  passport.serializeUser((user: any, cb) => {
    process.nextTick(() => cb(null, { id: user.id, name: user.name }));
  });

  passport.deserializeUser((user: any, cb) => {
    process.nextTick(() => cb(null, user));
  });
}
