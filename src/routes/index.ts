import { Router } from "express";
import usersRoutes from "./api/users.routes";
import productRoutes from "./api/products.routes";

const routes = Router();

routes.use("/users", usersRoutes);

routes.use("/products", productRoutes);

export default routes;
