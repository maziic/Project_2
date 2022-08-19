import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import errorMiddleware from "./middleware/error.middleware";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("'Hello World!");
});

app.post("/", function (req: Request, res: Response) {
  res.json({
    message: "Hello Post World!",
    data: req.body,
  });
});

app.use(errorMiddleware);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: "What you are looking for does not exist.",
  });
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
