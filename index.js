import express from "express";
import "dotenv/config";
import db from "./config/db.js";
import cors from "cors";
// import { run } from "./migrations/createV1Product.js";
// run();

import v1Router from "./v1/router.js";
import { corsOptions, credentials } from "./mw.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("welcome to api mysql");
});

app.use("/v1", v1Router);

db.getConnection()
  .then(() => {
    app.listen(port, () => console.log(`Connect to ${process.env.DB_NAME} and running on http://localhost:${port}`));
  })
  .catch((err) => console.error("Error connecting to the database:", err.message));
