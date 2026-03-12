import type { NextFunction, Request, Response } from "express";
import { nanoid } from "nanoid";

declare global {
  namespace Express {
    interface Request {
      requestId: string;
      auth?: {
        sub: string;
        email: string;
        role: "customer" | "admin";
      };
    }
  }
}

export const requestId = (req: Request, res: Response, next: NextFunction) => {
  req.requestId = nanoid();
  res.setHeader("x-request-id", req.requestId);
  next();
};
