const express = require("express");
const createError = require("http-errors");
const router = express.Router();

const todos = [{ id: 1, name: "Do something", completed: false }];

router.get("/", function (req, res, next) {
  res.json(todos);
});

router.get("/:id", function (req, res, next) {
  const foundTodo = todos.find((todo) => todo.id === Number(req.params.id));

  if (!foundTodo) {
    return next(createError(404, "Not Found"));
  }

  res.json(foundTodo);
});

router.post("/", function (req, res, next) {
  const { body } = req;

  if (typeof body.name !== "string") {
    return next(createError(422, "Validation Error"));
  }

  const newTodo = {
    id: todos.length + 1,
    name: body.name,
    completed: false,
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

router.patch("/:id", function (req, res, next) {
  let foundTodo = todos.find((todo) => todo.id === Number(req.params.id));

  if (!foundTodo) {
    return next(createError(404, "Not Found"));
  }

  if (typeof req.body.name !== "string") {
    return next(createError(422, "Validation Error"));
  }

  foundTodo["name"] = req.body.name;

  const updatedTodo = foundTodo;

  res.status(200).json(updatedTodo);
});

router.delete("/:id", function (req, res, next) {
  let foundTodo = todos.find((todo) => todo.id === Number(req.params.id));

  if (!foundTodo) {
    return next(createError(404, "Not Found"));
  }

  const index = todos.indexOf(foundTodo);
  todos.splice(index, 1);

  res.status(204);
});

module.exports = router;
