const express = require("express");
const { register, login, allUser, deleteUser } = require("../components/userComponent");
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/users", allUser);
userRouter.delete('/delete/:id', deleteUser);

module.exports = userRouter;
