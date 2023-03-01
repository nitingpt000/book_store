-- create enum for order_status
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered');


-- Create the genres table
CREATE TABLE genres (
  genre_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- Create the addresses table
CREATE TABLE addresses (
  address_id SERIAL PRIMARY KEY,
  street_address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  zip_code VARCHAR(20) NOT NULL,
  country VARCHAR(100) NOT NULL
);

-- Create the books table
CREATE TABLE books (
  book_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(100) NOT NULL,
  publisher VARCHAR(100) NOT NULL,
  publication_date DATE NOT NULL,
  isbn VARCHAR(20) NOT NULL,
  genre_id INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_count INT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
);

-- Create the customers table
CREATE TABLE customers (
  customer_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  hashed_password VARCHAR(255) NOT NULL,
  shipping_address_id INT,
  billing_address_id INT,
  phone_number VARCHAR(20),
  FOREIGN KEY (shipping_address_id) REFERENCES addresses(address_id),
  FOREIGN KEY (billing_address_id) REFERENCES addresses(address_id)
);


-- Create the orders table
CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL,
  order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  total_price DECIMAL(10,2) NOT NULL,
  status order_status NOT NULL,
  shipping_address_id INT NOT NULL,
  billing_address_id INT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
  FOREIGN KEY (shipping_address_id) REFERENCES addresses(address_id),
  FOREIGN KEY (billing_address_id) REFERENCES addresses(address_id)
);

-- Create the order_items table
CREATE TABLE order_items (
  order_item_id SERIAL PRIMARY KEY,
  order_id INT NOT NULL,
  book_id INT NOT NULL,
  quantity INT NOT NULL,
  item_price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (book_id) REFERENCES books(book_id)
);
