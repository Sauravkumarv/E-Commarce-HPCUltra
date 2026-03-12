import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../lib/auth.js";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization?.replace("Bearer ", "");
  const token = req.cookies.accessToken ?? bearer;

  if (!token) {
    res.status(401).json({ error: "Unauthorized", requestId: req.requestId });
    return;
  }

  try {
    req.auth = verifyAccessToken(token);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token", requestId: req.requestId });
  }
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.auth?.role !== "admin") {
    res.status(403).json({ error: "Forbidden", requestId: req.requestId });
    return;
  }
  next();
};
