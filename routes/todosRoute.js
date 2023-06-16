const express = require("express");
const router = express.Router();

const todos = [{ id: 1, name: "Do something", completed: false }];

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
