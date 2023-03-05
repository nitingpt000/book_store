import express from "express";
import UserController from "./user.controller";
import { User } from "../endpoints";
import auth from "../../middlewares/authHandler";

const router = express.Router();

router.get(User.getAll, UserController.getAll);
// router.get(User.get, UserController.get);
router.post(User.create, UserController.create);
router.post(User.login, UserController.login);
router.get(User.me,auth, UserController.me);
// router.put(User.update, UserController.update);

export default router;
