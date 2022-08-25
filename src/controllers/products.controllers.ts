import { NextFunction, Request, Response } from "express";
import ProductModel from "../models/product.model";

const productModel = new ProductModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productModel.create(req.body);
    res.json({
      data: { ...product },
      message: "Product Created successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productModel.index();
    res.json({
      data: products,
      message: "Products retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.show(req.params.id as unknown as string);
    res.json({
      data: product,
      message: "product retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
};
