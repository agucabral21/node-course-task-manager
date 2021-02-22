require("../src/db/mongoose");
const Task = require("../src/models/task");
const { findByIdAndDelete } = require("../src/models/user");
const User = require("../src/models/user");

//6033c16219e96e9140cf013b
/*
Task.findByIdAndDelete("6033c3cba7c396932a003a93")
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
*/

const deleteTaskAndCount = async (id) => {
  const deleteTask = await Task.findByIdAndDelete(id);
  const count = await Task.count({ completed: false });
  return count;
};

deleteTaskAndCount("6033b97688ca9e8949429512")
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
