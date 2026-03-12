import type { NextFunction, Request, Response } from "express";

export const errorHandler = (error: Error, req: Request, res: Response, _next: NextFunction) => {
  res.status(400).json({
    error: error.message || "Unexpected error",
    requestId: req.requestId
  });
};
