import Joi from "@hapi/joi";
import db from "../../../services/db";
import rest from "../../../helpers/rest";
class OrderController {
  static async get(req, res, next) {
    try {
      const order = await db.getOrderByOrderId(req,res);
      return rest.response.status200(res,order);
    } catch (err) {
      next(err);
    }
  }
  static async getAll(req, res, next) {
    try {
      const orders = await db.getOrders(req,res);
      return rest.response.status200(res,orders);
    } catch (err) {
      next(err);
    }
  }
  static async create(req, res, next) {
    try {
      const {body} = req;
      OrderController.validateCreateOrder(body);
      const order = await db.createOrder(req,res);
      return rest.response.status201(res,order);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const {body} = req;
      OrderController.validateUpdateOrder(body);
      const order = await db.updateOrder(req,res);
      return rest.response.status200(res,order);
    } catch (err) {
      next(err);
    }
  }


  // ----------------------- ARG VALIDATION ------------------------
  static validateCreateOrder(args) {
    const createOrderSchema = Joi.object({
      customerId: Joi.number().required(),
      orderTotal: Joi.number().required(),
      bookList: Joi.array().min(1).items(Joi.object({
        bookId: Joi.number().required(),
        quantity: Joi.number().required()
      })).required(),
    });
    const validation = createOrderSchema.validate(args);
    if (validation.error) {
      throw new Error(validation.error);
    }
  }

  static validateUpdateOrder(args) {
    const updateOrderSchema = Joi.object({
      status: Joi.string().required(),
    });
    const validation = updateOrderSchema.validate(args);
    if (validation.error) {
      throw new Error(validation.error);
    }
  }
 
}

export default OrderController;
