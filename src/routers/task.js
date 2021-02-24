const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");

const router = new express.Router();

//GET /tasks?completed=true ----------> Filtrado por completas
//GET /tasks?limit=10&skip=2  --------> Paginado
//GET /tasks?sortBy=createdAt:desc ---> Orden segun campos

router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();

    res.status(200).send(req.user.tasks);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/tasks", auth, async (req, res) => {
  //agrego owner a task
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    const runSave = await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["completed", "description"];
  const isValidOp = updates.every((key) => allowedUpdates.includes(key));

  if (!isValidOp) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send();
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const delTask = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!delTask) {
      return res.status(404).send();
    }
    res.send(delTask);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
