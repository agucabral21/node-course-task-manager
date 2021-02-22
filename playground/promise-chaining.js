require("../src/db/mongoose");
const User = require("../src/models/user");

//6033c16219e96e9140cf013b
/*
User.findByIdAndUpdate("6033c16219e96e9140cf013b", { age: 2 })
  .then((user) => {
    console.log(user);
    return User.countDocuments({ age: 1 });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });*/

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("6033c16219e96e9140cf013b", 3)
  .then((count) => {
    console.log(count);
  })
  .catch((error) => console.log(error));
