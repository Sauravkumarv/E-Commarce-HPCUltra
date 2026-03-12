import jwt from "jsonwebtoken";
import type { Response } from "express";
import type { Role } from "@hpc-ultra/types";
import { env } from "../config/env.js";

export type AuthPayload = {
  sub: string;
  email: string;
  role: Role;
};

export const signAccessToken = (payload: AuthPayload) =>
  jwt.sign(payload, env.jwtAccessSecret, { expiresIn: "15m" });

export const signRefreshToken = (payload: AuthPayload) =>
  jwt.sign(payload, env.jwtRefreshSecret, { expiresIn: "7d" });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, env.jwtAccessSecret) as AuthPayload;

export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  const secure = env.nodeEnv === "production";
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};
