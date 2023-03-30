const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const Controller = require("./controllers/controller");
const { authentication, authorization } = require("./middlewares/auth");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/api/login", Controller.loginUser);
app.post("/api/users", Controller.addUser);

app.use(authentication);

app.get("/api/users", Controller.getAllUsers);
app.get("/api/users/current", Controller.getCurrentUser);
app.get("/api/users/:id", Controller.getUserById);

app.delete("/api/users/:id", authorization, Controller.deleteUser);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
