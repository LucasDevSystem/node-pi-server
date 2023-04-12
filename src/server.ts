import { Request, Response } from "express";

const systemInfo = require('./controllers/SystemStatusController');

const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;
// routes
app.get("/", function (req: Request, res: Response) {
  res.sendFile(__dirname + "/view/home/index.html");
});

app.get("/api/systeminfo", systemInfo.get);

app.listen(PORT, () => {
  console.log(`App listening ${PORT}`);
});
