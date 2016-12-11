import { RequestHandler } from "express-serve-static-core";
import { Response, Request, NextFunction } from "express";

export function handleErrors(handler: RequestHandler): RequestHandler {
  return async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await handler(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}
