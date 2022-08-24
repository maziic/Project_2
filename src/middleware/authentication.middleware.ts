import { NextFunction, Request, Response } from "express";
import config from "../config";
import jwt from "jsonwebtoken";
import Error from "../interfaces/error.interface";
import { compareSync } from "bcrypt";

const handleUnauthrizedError = (next: NextFunction) => {
  const error: Error = new Error("login Failed");
  error.status = 401;
  next(error);
};

const validateTokenMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.get("Authorization");
    if (authHeader) {
      const bearer = authHeader.split(" ")[0].toLowerCase();
      const token = authHeader.split(" ")[1];
      if (token && bearer === "bearer") {
        const decode = jwt.verify(token, config.token as unknown as string);
        if (decode) {
          next();
        } else {
          // failed to authenticate user
          handleUnauthrizedError(next);
        }
      } else {
        // token type not bearer
        handleUnauthrizedError(next);
      }
    } else {
      // no token provided
      handleUnauthrizedError(next);
    }
  } catch (error) {
    handleUnauthrizedError(next);
  }
};

export default validateTokenMiddleware;
