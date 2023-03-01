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


  // ----------------------- ARG VALIDATION ------------------------
  static validateCreateOrder(args) {
    const createOrderSchema = Joi.object({
      customerId: Joi.number().required(),
      totalPrice: Joi.number().required(),
      status: Joi.string().required(),
    });
    const validation = createOrderSchema.validate(args);
    if (validation.error) {
      throw new Error(validation.error);
    }
  }
 
}

export default OrderController;
