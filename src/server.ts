import { routes } from "./routes";

const express = require("express");
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening ${PORT}`);
});
