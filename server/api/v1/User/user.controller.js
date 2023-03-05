import Joi from "@hapi/joi";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import rest from "../../../helpers/rest";
import db from "../../../services/db";
class UserController {
  static async get(req, res, next) {
    try {
      const { orderId } = req.params;
      const order = await UserService.get(orderId);
      return res.json(order);
    } catch (err) {
      next(err);
    }
  }
  static async getAll(req, res, next) {
    try {
      const users = await db.getUsers(req,res);
      return res.json(users);
    } catch (err) {
      next(err);
    }
  }
  static async create(req, res, next) {
    try {
      const { body } = req;
      UserController.validateCreate(body);
      const {access_token:accessToken} = await db.createUser(req,res);
      const result = {accessToken,email:body.email}
      return rest.response.status201(res, result);
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { body } = req;
      UserController.validateLogin(body);
      const accessToken = await db.userLogin(req,res);
      const result = {accessToken,email:body.email}
      return rest.response.status201(res, result);
    } catch (err) {
      next(err);
    }
  }

  static async me(req, res, next) {
    try {
      const accessToken = await db.me(req,res);
      const result = {accessToken,email:body.email}
      return rest.response.status201(res, result);
    } catch (err) {
      next(err);
    }
  }


  static async update(req, res, next) {
    try {
      const { orderId } = req.params;
      const order = await UserService.update(orderId, req.body);
      return res.json(order);
    } catch (err) {
      next(err);
    }
  }

  // ----------------------- ARG VALIDATION ------------------------
  static validateCreate(args) {
    const createUserSchema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      repeatPassword: Joi.ref("password"),
    });
    const validation = createUserSchema.validate(args);
    if (validation.error) {
      throw new rest.RestError(
        StatusCodes.BAD_REQUEST,
        "Create User Argument Validation Error",
        {
          message: `Missing args or bad format: ${validation.error.message}`,
        }
      );
    }
  }
  static validateLogin(args) {
    const loginUserSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required()
    });
    const validation = loginUserSchema.validate(args);
    if (validation.error) {
      throw new rest.RestError(
        StatusCodes.BAD_REQUEST,
        "User login Argument Validation Error",
        {
          message: `Missing args or bad format: ${validation.error.message}`,
        }
      );
    }
  }
  static validateUpdate(args) {
    const updateUserSchema = Joi.object({});
    const validation = updateUserSchema.validate(args);
    if (validation.error) {
      return next(validation.error);
    }
  }
}

export default UserController;
