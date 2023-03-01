-- Insert genres
INSERT INTO genres (name) VALUES
('Science Fiction'),
('Mystery'),
('Romance'),
('Horror'),
('Fantasy');

-- Insert addresses
INSERT INTO addresses (street_address, city, state, zip_code, country) VALUES
('123 Main St', 'Anytown', 'CA', '12345', 'USA'),
('456 Elm St', 'Somewhere', 'NY', '67890', 'USA'),
('789 Oak St', 'Nowhere', 'TX', '13579', 'USA');

-- Insert books
INSERT INTO books (title, author, publisher, publication_date, isbn, genre_id, price, stock_count, image_url) VALUES
('Dune', 'Frank Herbert', 'Ace Books', '1965-06-01', '9780441013593', 1, 19.99, 100, 'https://www.example.com/dune.jpg'),
('The Da Vinci Code', 'Dan Brown', 'Doubleday', '2003-03-18', '9780385504201', 2, 14.99, 50, 'https://www.example.com/davincicode.jpg'),
('Pride and Prejudice', 'Jane Austen', 'T. Egerton', '1813-01-28', '9781987654321', 3, 9.99, 75, 'https://www.example.com/prideandprejudice.jpg'),
('It', 'Stephen King', 'Viking Press', '1986-09-15', '9780670813025', 4, 12.99, 25, 'https://www.example.com/it.jpg'),
('The Lord of the Rings', 'J.R.R. Tolkien', 'George Allen & Unwin', '1954-07-29', '9780544003415', 5, 29.99, 150, 'https://www.example.com/lotr.jpg');

-- Insert customers
INSERT INTO customers (first_name, last_name, email, hashed_password, shipping_address_id, billing_address_id, phone_number) VALUES
('John', 'Doe', 'johndoe@example.com', 'password123', 1, 1, '555-555-1212'),
('Jane', 'Doe', 'janedoe@example.com', 'password123', 2, 2, '555-555-1212'),
('Bob', 'Smith', 'bobsmith@example.com', 'password123', 3, 3, '555-555-1212');

-- Insert orders
INSERT INTO orders (customer_id, total_price, status, shipping_address_id, billing_address_id) VALUES
(1, 49.97, 'shipped', 1, 1),
(2, 24.98, 'processing', 2, 2),
(3, 39.96, 'pending', 3, 3);

-- Insert order_items
INSERT INTO order_items (order_id, book_id, quantity, item_price) VALUES
(1, 1, 2, 19.99),
(1, 2, 1, 14.99),
(2, 3, 2, 9.99),
(3, 4, 1, 12.99),
(3, 5, 2, 29.99);