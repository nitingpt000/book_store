import {Pool} from "pg";
import bcrypt from "bcrypt";
import {DATABASE_HOST,DATABASE_NAME,DATABASE_PASSWORD,DATABASE_PORT,DATABASE_USER} from "../config";
import rest from "../helpers/rest";
import {StatusCodes} from "http-status-codes";
import JwtHelper from "../helpers/JwtHelper";
const pool = new Pool({
    user:DATABASE_USER,
    host:DATABASE_HOST,
    database:DATABASE_NAME,
    password:DATABASE_PASSWORD,
    port:DATABASE_PORT
})


async function getOrders(req,res){
    const client = await pool.connect();
    try{
        const {rows} = await pool.query('SELECT * FROM orders');
        return rows;
    }catch(error){
        throw new rest.RestError(StatusCodes.NOT_FOUND,"Error while fetching the orders",{
            message:error.message
        })
    }finally{
        client.release();
    }
}

async function getGenres(req,res){
    const client = await pool.connect();
    try{
        const {rows} = await pool.query('SELECT * FROM genres');
        return rows;
    }catch(error){
        throw new rest.RestError(StatusCodes.NOT_FOUND,"Error while fetching the genres",{
            message:error.message
        })
    }finally{
        client.release();
    }
}

async function getBooks(req,res){
    const client = await pool.connect();
    try{
        const {rows} = await pool.query('SELECT * FROM genres');
        return rows;
    }catch(error){
        throw new rest.RestError(StatusCodes.NOT_FOUND,"Error while fetching the genres",{
            message:error.message
        })
    }finally{
        client.release();
    }
}

async function getCustomers(req,res){
    const client = await pool.connect();
    try{
        const {rows} = await pool.query('SELECT * FROM customers');
        return rows;
    }catch(error){
        throw new rest.RestError(StatusCodes.NOT_FOUND,"Error while fetching the customers",{
            message:error.message
        })
    }finally{
        client.release();
    }
}

async function getOrders(req,res){
    const client = await pool.connect();
    try{
        const {rows} = await pool.query('SELECT * FROM orders');
        return rows;
    }catch(error){
        throw new rest.RestError(StatusCodes.NOT_FOUND,"Error while fetching the orders",{
            message:error.message
        })
    }finally{
        client.release();
    }
}

async function getBookByBookId(req, res) {
    const client = await pool.connect();
    try {
      const { bookId } = req.params;
      const { rows } = await pool.query('SELECT * FROM books WHERE id=$1', [bookId]);
      if (rows.length === 0) {
        throw new rest.RestError(StatusCodes.NOT_FOUND, "Book not found", {
          message: `No book found with id ${bookId}`,
        });
      }
      return rows[0];
    } catch (error) {
      throw new rest.RestError(StatusCodes.INTERNAL_SERVER_ERROR, "Error while fetching the book", {
        message: error.message,
      });
    } finally {
      client.release();
    }
  }

async function getCustomerByCustomerId(req,res){
    const client = await pool.connect();
    try {
      const { customerId } = req.params;
      const { rows } = await pool.query('SELECT * FROM customers WHERE id=$1', [customerId]);
      if (rows.length === 0) {
        throw new rest.RestError(StatusCodes.NOT_FOUND, "Customer not found", {
          message: `No book found with id ${bookId}`,
        });
      }
      return rows[0];
    } catch (error) {
      throw new rest.RestError(StatusCodes.INTERNAL_SERVER_ERROR, "Error while fetching the Customer detail", {
        message: error.message,
      });
    } finally {
      client.release();
    }
  }
  


async function createUser(req,res) {
    const client = await pool.connect();
    try {
     const {firstName,lastName,email,password}=req.body;
     const hashedPassword =await bcrypt.hash(password,10);

      await client.query('BEGIN');
      const queryText = 'INSERT INTO customers (first_name,last_name,email,hashed_password) VALUES ($1, $2, $3,$4)';
      const queryValues = [firstName, lastName, email,hashedPassword];
      await client.query(queryText, queryValues);
      await client.query('COMMIT');
      const access_token = JwtHelper.sign({customerId:34});
      return { access_token };
    } catch (error) {
      await client.query('ROLLBACK');
      throw new Error('Error while creating user: ' + error.message);
    } finally {
      client.release();
    }
  }





export default {
    getGenres,
    getOrders,
    getGenres,
    getBooks,
    getCustomers,
    getBookByBookId,
    getCustomerByCustomerId,
    createUser
}