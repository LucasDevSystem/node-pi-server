import { routes } from "./routes";
const { mediaPlayerComm } = require("./services/MediaPlayerComm");

const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const PORT = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(routes);

io.on("connection", (socket: any) => {
  console.log("a user connected");

  mediaPlayerComm(socket, io);
});

server.listen(PORT, () => {
  console.log(`App listening ${PORT}`);
});
