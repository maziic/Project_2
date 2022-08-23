import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";

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
