import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";
import config from "../config";
import jwt from "jsonwebtoken";

const userModel = new UserModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.create(req.body);
    res.json({
      data: { ...user },
      message: "User Created successfully",
    });
  } catch {}
};

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.index();
    res.json({
      data: users,
      message: "Users retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.show(req.params.id as unknown as string);
    res.json({
      data: user,
      message: "User retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const del = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.delete(req.params.id as unknown as string);
    res.json({
      data: user,
      message: "User removed successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_name, password } = req.body;
    const user = await userModel.authenticate(user_name, password);
    const token = jwt.sign({ user }, config.token as unknown as string);
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "the username and password do not match",
      });
    }
    return res.json({
      status: "success",
      data: { ...user, token },
      message: "user authenticated successfully",
    });
  } catch (err) {
    return next(err);
  }
};
