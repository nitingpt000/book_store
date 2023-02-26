import express from "express";
import UserController from "./user.controller";
import { User } from "../endpoints";

const router = express.Router();

// router.get(User.getAll, UserController.getAll);
// router.get(User.get, UserController.get);
router.post(User.create, UserController.create);
// router.put(User.update, UserController.update);

export default router;
