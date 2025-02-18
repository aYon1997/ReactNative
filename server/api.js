const express = require("express");
const cors = require("cors");

const data = require("./data");

const app = express();

const router = express.Router();

app.use(cors());

router.get("/api/list", (req, res) => {
  res.json({ data });
});

app.use(router);

app.listen(3000, () => {
  console.log("app strating in 3010");
});
