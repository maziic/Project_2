import { Router } from "express";
import * as controllers from "../../controllers/users.controllers";
import UserModel from "../../models/user.model";
import app from "../../server";

const userModel = new UserModel();

const routes = Router();

routes.route("/").get(controllers.index).post(controllers.create);
routes.route("/:id").get(controllers.show).delete(controllers.del);

routes.route("/authenticate").post(controllers.authenticate);

export default routes;
