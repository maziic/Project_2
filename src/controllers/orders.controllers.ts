import { NextFunction, Request, Response } from "express";
import OrderModel from "../models/order.model";

const orderModel = new OrderModel();

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await orderModel.createOrder(req.body);
    res.json({
      data: { ...product },
      message: "Order Created successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const showAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await orderModel.showAll(
      req.params.id as unknown as string
    );
    res.json({
      data: products,
      message: "All Orders Retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const getCurrent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await orderModel.getCurrent(
      req.params.id as unknown as string
    );
    res.json({
      data: product,
      message: "Current Order Retrieved Successfully",
    });
  } catch (err) {
    next(err);
  }
};
