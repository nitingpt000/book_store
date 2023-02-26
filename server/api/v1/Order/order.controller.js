import Joi from "@hapi/joi";

class OrderController {
  static async get(req, res, next) {
    try {
      const { orderId } = req.params;
      const order = await OrderService.get(orderId);
      return res.json(order);
    } catch (err) {
      next(err);
    }
  }
  static async getAll(req, res, next) {
    try {
      const orders = await OrderService.getAll();
      return res.json(orders);
    } catch (err) {
      next(err);
    }
  }
  static async create(req, res, next) {
    try {
      const order = await OrderService.create(req.body);
      return res.json(order);
    } catch (err) {
      next(err);
    }
  }
  static async update(req, res, next) {
    try {
      const { orderId } = req.params;
      const order = await OrderService.update(orderId, req.body);
      return res.json(order);
    } catch (err) {
      next(err);
    }
  }

  // ----------------------- ARG VALIDATION ------------------------
  static validateCreate(args) {
    const createOrderSchema = Joi.object({
      userId: Joi.string().required(),
      bookId: Joi.string().required(),
      quantity: Joi.number().required(),
    });
    const validation = createOrderSchema.validate(args);
    if (validation.error) {
      throw new Error(validation.error);
    }
  }
  static validateUpdate(args) {
    const updateOrderSchema = Joi.object({
      userId: Joi.string(),
      bookId: Joi.string(),
      quantity: Joi.number(),
    });
    const validation = updateOrderSchema.validate(args);
    if (validation.error) {
      throw new Error(validation.error);
    }
  }
}

export default OrderController;
