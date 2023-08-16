const User = require("../../models/User");

const userCreate = async () => {
  const userBody = {
    firstName: "Angel",
    lastName: "Figuera",
    email: "angel@angel.com",
    password: "angel1234",
    phone: "+4321",
  };

  await User.create(userBody);
};

module.exports = userCreate;
