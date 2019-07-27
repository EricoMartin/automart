    const createTables = `
    CREATE TABLE IF NOT EXISTS
        users(
            id SERIAL NOT NULL PRIMARY KEY,
            first_name VARCHAR(30) NOT NULL,
            last_name VARCHAR(30) NOT NULL,
            address VARCHAR(100) NOT NULL,
            is_admin BOOLEAN DEFAULT false
            email VARCHAR(60) NOT NULL UNIQUE,
            status VARCHAR(30) NOT NULL,
            password VARCHAR(180) NOT NULL
        );
    CREATE TABLE IF NOT EXISTS
        cars(
            car_id SERIAL PRIMARY KEY,
            manufacturer VARCHAR NOT NULL,
            model VARCHAR NOT NULL,
            price DECIMAL NOT NULL,
            state VARCHAR(4) NOT NULL,
            status VARCHAR NOT NULL DEFAULT 'available',
            body_type VARCHAR(30) NOT NULL,
            year DATE NOT NULL,
            created_on TIMESTAMP NOT NULL DEFAULT NOW(),
            owner INT REFERENCES users (id),
            image_url VARCHAR
        );
    CREATE TABLE IF NOT EXISTS
        orders(
            id SERIAL PRIMARY KEY,
            car_id INT REFERENCES cars (id) ON DELETE CASCADE,
            buyer_id INT REFERENCES users (id),
            owner_id INT REFERENCES users (id),
            email VARCHAR(60) UNIQUE,
            created_on TIMESTAMP NOT NULL DEFAULT NOW(),
            manufacturer VARCHAR NOT NULL,
            model VARCHAR NOT NULL,
            price DECIMAL NOT NULL,
            price_offered DECIMAL NOT NULL,
            status VARCHAR NOT NULL DEFAULT 'pending',
        );
    CREATE TABLE IF NOT EXISTS
        flags(
            id SERIAL PRIMARY KEY,
            car_id INT REFERENCES cars (id),
            created_on TIMESTAMP NOT NULL DEFAULT NOW(),
            reason VARCHAR NOT NULL,
            description VARCHAR NOT NULL,
            status VARCHAR(10) NOT NULL,
            flagger NUMERIC,
        );`;
    const dropTables = 'DROP TABLE IF EXISTS users, cars, orders, flags;';


    const users_seed = `INSERT INTO users (
    first_name, last_name, address, is_admin, email, status, password
    ) VALUES
    ('jason', 'trello', '321 upper crest park, New York, USA', true, 'jason@gmail.com','registered', '555SSS777'),
    ('dammy', 'Gonzalez', 'R280 wood west park, Milwaukee, USA', false, 'dammy@gmail.com','registered', '936379JUI'),
    ('sammy', 'Bongo', '3600 Pillhamton, Boston, USA', false, 'sammy@gmail.com','registered', '333SSSHHH'),
    ('Eric', 'Martin', '1, adress street, NGR', false, 'martinirex@yahoo.co.uk','registered', '11111111');`;

    const cars_seed = `INSERT INTO cars ( manufacturer, model, price, state, status, body_type, year, created_on, owner, img)
     VALUES( 'Honda', 'Acoord', '5000000', 'New', 'available', 'saloon', '2015-01-04', '2013-05-06', '1', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg'),
     ( 'BMW', 'I-8', '4500000', 'used', 'available', 'wagon', '2016-01-04', '2017-25-11', '2', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg'),
     ( 'Mercedes', 'E300', '7500000', 'used', 'available', 'saloon', '2014-01-01', '2008-09-07', '3', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg'),
     ( 'Peugot', '409', '2000000', 'New', 'available', 'saloon', '2009-01-01', '2015-06-13', '3', 'https://res.cloudinary.com/automart-app/image/upload/v1562580189/Honda_Accord_h4yg60.jpg')`;

     const flags_seed = `INSERT INTO flags ( car_id, created_on, reason, description, flagger)
     VALUES( '4', '2019-04-07', 'fake', 'fraudulent transaction details', 'reported', '3'),
     ( '2', '2019-07-18', 'deceptive tricks', 'bad car and tricky seller', 'reported', '2'),
     ( '2', '2019-07-23', 'fake car', 'bad market', 'reported', '2')`;

     const orders_seed = `INSERT INTO orders ( car_id, buyer_id, owner_id, email, created_on, manufacturer, model, price, price_offered, status )
     VALUES( '5', '6', '7', 'nackson@gmail.com', '2019-05-15', 'Honda',  'civic', '7500000', 'pending', 'used', 'sedan, '5500000),
     ( '4', '3', '1', 'jason@gmail.com', '2019-05-15', 'Toyota',  'rav-4', '3500000', 'pending', 'used', 'jeep, '3000000),
     ( '5', '3', '2', 'dammy@gmail.com', '2019-05-15', 'GAC',  'turbo', '6500000', 'accepted', 'New', 'saloon, '5000000)`;


     export default{
        createTables,
        dropTables,
        users_seed,
        cars_seed,
        flags_seed,
        orders_seed
     };