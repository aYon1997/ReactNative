const express = require("express");
const cors = require("cors");

const data = require("./data");
const city = require("./city");

const app = express();

const router = express.Router();

app.use(cors());

router.get("/api/list", (req, res) => {
  res.json({ data });
});

router.get("/api/city", (req, res) => {
  res.json({ data: city });
});

app.use(router);

app.listen(3000, () => {
  console.log("app strating in 3010");
});
