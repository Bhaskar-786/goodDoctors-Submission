const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./Config/db");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use((req, res, next) => {
  console.log(req.method, req.path, req.ip);
  next();
});
app.use("/", require("./person.route"));
// app.post("/person", (req, res) => {
//   if (req.body.name && req.body.age && req.body.gender && req.body.mobile) {
//     persons.push({
//       id: id++,
//       name: req.body.name,
//       age: req.body.age,
//       gender: req.body.gender,
//       mobile: req.body.mobile,
//     });
//     res.status(201).json(persons[persons.length - 1]);
//   } else {
//     res.status(400).send("Invalid data");
//   }
// });

// app.delete("/person/:id", (req, res) => {
//   const index = persons.findIndex(
//     (person) => parseInt(person.id) === parseInt(req.params.id)
//   );
//   //if index is not found
//   if (index === -1) {
//     res.status(404).send("Person not found");
//   } else {
//     persons.splice(index, 1);
//     res.status(204).send("Person deleted");
//   }
// });

// app.put("/person/:id", (req, res) => {
//   const index = persons.findIndex(
//     (person) => parseInt(person.id) === parseInt(req.params.id)
//   );
//   if (index === -1) {
//     res.status(404).send("Person not found");
//   } else {
//     if (req.body.name) {
//       persons[index].name = req.body.name;
//     }
//     if (req.body.age) {
//       persons[index].age = req.body.age;
//     }
//     if (req.body.gender) {
//       persons[index].gender = req.body.gender;
//     }
//     if (req.body.mobile) {
//       persons[index].mobile = req.body.mobile;
//     }
//     res.status(200).json(persons[index]);
//   }
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
