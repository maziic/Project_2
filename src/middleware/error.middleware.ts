import { Response, Request, NextFunction } from "express";
import Error from "../interfaces/error.interface";

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const messsage = error.message || "Error! Something is wrong";
  res.status(status).json({ status, messsage });
};

export default errorMiddleware;
