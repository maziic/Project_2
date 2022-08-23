import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import errorMiddleware from "./middleware/error.middleware";
import config from "./config";
// import db from "./database";
// import { Client } from "pg";

const app: express.Application = express();
const address: string = "0.0.0.0:" + (config.port || 3000);

app.use(bodyParser.json());

// get request

app.get("/", function (req: Request, res: Response) {
  res.send("'Hello World!");
});

// post request

app.post("/", function (req: Request, res: Response) {
  res.json({
    message: "Hello Post World!",
    data: req.body,
  });
});

// //db test
// db.connect().then((client) => {
//   return client
//     .query("SELECT NOW()")
//     .then((res) => {
//       client.release;
//       console.log(res.rows);
//     })
//     .catch((err) => {
//       client.release;
//       console.log(err.stack);
//     });
// });

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
