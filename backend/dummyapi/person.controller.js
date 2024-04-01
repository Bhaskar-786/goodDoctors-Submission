const User = require("./Models/User");
const Temp = require("./Models/Temp");

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const temp = await Temp.findOne();
    let id = 1;
    if (temp) {
      temp.num = parseInt(temp.num) + 1;
      await temp.save();
      id = temp.num;
    } else {
      const newTemp = new Temp({
        num: 1,
      });
      await newTemp.save();
      id = newTemp.num;
    }
    const user = new User({
      id,
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      mobile: req.body.mobile,
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await User.findOneAndDelete({ id: req.params.id });
    res.status(204).send("User deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (user) {
      if (req.body.name) {
        user.name = req.body.name;
      }
      if (req.body.age) {
        user.age = req.body.age;
      }
      if (req.body.gender) {
        user.gender = req.body.gender;
      }
      if (req.body.mobile) {
        user.mobile = req.body.mobile;
      }
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
