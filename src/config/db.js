const mongoose = require("mongoose");
let User;

const connectDatabase = async () => {
  try {
    if (!user) {
      User = mongoose.model("User", require("..models/userModel").Schema);
    }

    await mongoose
      .connect("")
      .then(() => console.log("MongoDB connected"))
      .catch((error) => console.log(error));

    await initializeData();
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

const initializeData = async () => {
  try {
    await User.deleteMany();

    const usersData = [
      {
        name: "Juan",
        email: "juan@gmail.com",
        password: "londres",
      },
      {
        name: "Adriana",
        email: "adriana@gmail.com",
        password: "paris",
      },
    ];

    await User.insertMany(usersData);
    console.log("Data succesfully initialized");
  } catch (error) {
    console.error("Data initialized error: ", error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
