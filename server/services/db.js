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


// async function getOrders(req,res){
//     const client = await pool.connect();
//     try{
//         const {rows} = await pool.query('SELECT * FROM orders');
//         return rows;
//     }catch(error){
//         throw new rest.RestError(StatusCodes.NOT_FOUND,"Error while fetching the orders",{
//             message:error.message
//         })
//     }finally{
//         client.release();
//     }
// }

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
        const {rows} = await pool.query('SELECT books.*, genres.name AS genre_name FROM books JOIN genres ON books.genre_id = genres.genre_id');
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
        const {rows} = await pool.query('SELECT * FROM orders where customer_id=$1',[2]);
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
      const { rows } = await pool.query('SELECT * FROM books WHERE book_id=$1', [bookId]);
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
      const access_token = JwtHelper.sign({firstName,lastName,email});
      return { access_token };
    } catch (error) {
      await client.query('ROLLBACK');
      throw new Error('Error while creating user: ' + error.message);
    } finally {
      client.release();
    }
  }

  async function userLogin(req,res) {
    const client = await pool.connect();
    try {
     const {email,password}=req.body;
     const { rows } = await pool.query('SELECT * FROM customers WHERE email=$1', [email]);
     const user = rows[0];
     const {firstName,lastName}=user;
     const match = await bcrypt.compare(password,user.hashed_password);
     if(!match){
       throw rest.RestError(403,"password is incorrect")
      }
      const access_token = JwtHelper.sign({firstName,lastName,email});
      return access_token;
    } catch (error) {
      throw new Error('Error while login user: ' + error.message);
    } finally {
      client.release();
    }
  }

  async function me(req,res) {
    const client = await pool.connect();
    try {
     const token=req.headers.authorization;
    const authToken = token.split(' ')[1]

     if(!authToken){
      throw new rest.RestError(401,"user is not authroized")
     }
  
    } catch (error) {
      throw new Error('Error while login user: ' + error.message);
    } finally {
      client.release();
    }
  }

  async function createBook(req, res) {
    const client = await pool.connect();
    try {
      // Extract validated request body fields
      const {
        title,
        author,
        publisher,
        publicationDate,
        isbn,
        genreId,
        price,
        quantity
      } = req.body;
  
      // Store uploaded image to disk
      const imagePath = req.file.path
  
      // Start database transaction
      await client.query('BEGIN');
  
      // Insert new book record into database
      const queryText =
        'INSERT INTO books (title, author, publisher, publication_date, isbn, genre_id, price, stock_count, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
      const queryValues = [
        title,
        author,
        publisher,
        publicationDate,
        isbn,
        genreId,
        price,
        quantity,
        imagePath,
      ];
      const result = await client.query(queryText, queryValues);
      const book = result.rows[0];
  
      // Commit database transaction
      await client.query('COMMIT');
  
      return book;
    } catch (error) {
      // Rollback database transaction on error
      await client.query('ROLLBACK');
      console.error(error);
      res.status(500).json({ error: error.message });
    } finally {
      client.release();
    }
  }


  async function createOrder(req,res) {
    const client = await pool.connect();
    try {
     const {customerId,orderTotal,bookList}=req.body;

      await client.query('BEGIN');
      const queryText = 'INSERT INTO orders(customer_id,total_price,status) values($1,$2,$3)';
      const queryValues = [customerId, orderTotal,"pending"];
      const result = await client.query(queryText, queryValues);
      const order = result.rows[0];
      // Commit database transaction
      await client.query('COMMIT');
  
      return order;
    } catch (error) {
      await client.query('ROLLBACK');
      throw new Error('Error while creating order: ' + error.message);
    } finally {
      client.release();
    }
  }

  async function updateOrder(req, res) {
    const client = await pool.connect();
    try {
      const { orderId } = req.params;
      const status = req.body.status;
      // Begin database transaction
      await client.query('BEGIN');
  
      // Update order status to "cancel"
      const queryText = 'UPDATE orders SET status=$1 WHERE order_id=$2';
      const queryValues = [status, orderId];
      const order = await client.query(queryText, queryValues);
  
      // Commit database transaction
      await client.query('COMMIT');
  
      // Return success response
      return order[0];
    } catch (error) {
      // Rollback transaction on error
      await client.query('ROLLBACK');
      throw new Error('Error while updating order: ' + error.message);
    } finally {
      // Release database connection back to the pool
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
    createUser,
    userLogin,
    me,
    createBook,
    createOrder,
    updateOrder
}