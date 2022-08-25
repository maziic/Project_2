import { Router } from "express";
import * as controllers from "../../controllers/orders.controllers";
import OrderModel from "../../models/order.model";
import authenticationMiddleware from "../../middleware/authentication.middleware";

const orderModel = new OrderModel();

const routes = Router();

routes.route("/").post(authenticationMiddleware, controllers.createOrder); // Create Order
routes.route("/:id").get(authenticationMiddleware, controllers.showAll); // Get all orders by user id and token
routes
  .route("/current/:id")
  .get(authenticationMiddleware, controllers.getCurrent); // Get current order by user id and token

export default routes;
