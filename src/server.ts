import { Request, Response } from "express";

const express = require("express");
const app = express();
const PORT = 3000;
// routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hi, im node-pi-server");
});

app.listen(PORT, () => {
  console.log(`App listening ${PORT}`);
});
