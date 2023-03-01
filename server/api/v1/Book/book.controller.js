import Joi from "@hapi/joi";
import db from "../../../services/db";
import rest from "../../../helpers/rest";

class BookController {
  static async get(req, res, next) {
    try {
      const { bookId } = req.params;
      const book = await db.getBookByBookId(req,res);
      return rest.response.status200(res,book);
    } catch (err) {
      next(err);
    }
  }
  static async getAll(req, res, next) {
    try {
      const books = await db.getBooks(req,res);
      return rest.response.status200(res,books);
    } catch (err) {
      next(err);
    }
  }
  static async create(req, res, next) {
    try {
      const {body} = req;
      BookController.validateCreateBook(body);
      const book = await db.createBook(req,res);
      return rest.response.status201(res,book);
    } catch (err) {
      next(err);
    }
  }
  static async update(req, res, next) {
    try {
      const { body } = req;
      BookController.validateUpdateBook(req,res);
      const book = await db.updateBook(req,res);
      return rest.response.status200(res,book);
    } catch (err) {
      next(err);
    }
  }

  // ----------------------- ARG VALIDATION ------------------------
  static validateCreateBook(args) {
    const createBookSchema = Joi.object({
      title:Joi.string().required(),
      author:Joi.string().required(),
      publisher:Joi.string().required(),
      publicationDate:Joi.string().allow(''),
      isbn:Joi.string().required(),
      genreId:Joi.number().required(),
      price:Joi.number().required(),
      quantity:Joi.number().integer().required(),
      image:Joi.string().base64().required()
    });
    const validation = createBookSchema.validate(args);
    if (validation.error) {
      throw new Error(validation.error);
    }
  }
  static validateUpdateBook(args) {
    const updateBookSchema = Joi.object({
      title: Joi.string(),
      author: Joi.string(),
      publisher: Joi.string(),
      publicationDate: Joi.string().allow(''),
      isbn: Joi.string(),
      genreId: Joi.number(),
      price: Joi.number(),
      quantity: Joi.number().integer(),
      image: Joi.string().base64(),
    }).min(1); // At least one field must be present
  
    const validation = updateBookSchema.validate(args);
    if (validation.error) {
      throw new Error(validation.error.details[0].message);
    }
  }
}

export default BookController;
