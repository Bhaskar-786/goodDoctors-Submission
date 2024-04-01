const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} = require("./person.controller");

router.get("/person", getUsers);
router.post("/person", createUser);
router.delete("/person/:id", deleteUser);
router.put("/person/:id", updateUser);

module.exports = router;
