import { Router } from "express";
import * as controllers from "../../controllers/products.controllers";
import productModel from "../../models/product.model";
import authenticationMiddleware from "../../middleware/authentication.middleware";
import app from "../../server";

const prouctModel = new productModel();

const routes = Router();

routes
  .route("/")
  .get(controllers.index)
  .post(authenticationMiddleware, controllers.create);
routes.route("/:id").get(controllers.show);

// routes.route("/authenticate").post(controllers.authenticate);

export default routes;
