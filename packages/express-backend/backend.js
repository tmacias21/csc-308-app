import express from "express";

const app = express();
const port = 8000;

const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspiring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" },
  ],
};

app.use(express.json());

const findUserByName = (name) =>
  users.users_list.filter((user) => user.name === name);

const findUserById = (id) => users.users_list.find((user) => user.id === id);

const findUsersByNameAndJob = (name, job) =>
  users.users_list.filter((user) => user.name === name && user.job === job);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  if (name !== undefined && job !== undefined) {
    const result = findUsersByNameAndJob(name, job);
    res.send({ users_list: result });
  } else if (name !== undefined) {
    const result = findUserByName(name);
    res.send({ users_list: result });
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = findUserById(id);

  if (user === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(user);
  }
});

const addUser = (user) => {
  users.users_list.push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(200).send();
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const index = users.users_list.findIndex((user) => user.id === id);

  if (index === -1) {
    res.status(404).send("Resource not found.");
  } else {
    const deletedUser = users.users_list.splice(index, 1)[0];
    res.status(200).send(deletedUser);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
