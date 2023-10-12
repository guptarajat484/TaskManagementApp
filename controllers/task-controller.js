const Task = require("../models/task-model");

async function addtask(req, res, next) {
  const { taskName, taskDescription, priority, userId, email } = req.body;
  try {
    const task = new Task({
      taskName,
      taskDescription,
      priority,
      userId,
    });

    const addedTask = await task.save();
    res
      .status(201)
      .json({ task: addedTask, message: "task is created succesfully" });
  } catch (err) {
    next(err);
  }
}

async function viewtask(req, res, next) {
  const { userId } = req.body;
  try {
    const task = await Task.find({ userId }).populate("userId", 'name email');
    res.status(200).json({ task });
  } catch (err) {
    next(err);
  }
}

async function updatetask(req, res, next) {
  const { id } = req.params;
  try {
    const { taskName, taskDescription, priority } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        taskName,
        taskDescription,
        priority,
      }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "task not found" });
    }

    res
      .status(201)
      .json({ task: updatedTask, message: "task is updated succesfully" });
  } catch (err) {
    next(err);
  }
}
async function deletetask(req, res, next) {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndRemove({
      _id: id,
    });

    if (!deletedTask) {
      return res.status(404).json({ error: "task not found" });
    }
    res.status(200).json({ message: "task is succesfully deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addtask,
  viewtask,
  updatetask,
  deletetask,
};
