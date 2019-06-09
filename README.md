# AutoMart-App
Project Overview

Auto Mart is an online marketplace for automobiles of diverse makes, model or body type. With Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers
Required Features

    User can sign up.
    User can sign in.
    User (seller) can post a car sale advertisement.
    User (buyer) can make a purchase order.
    User (buyer) can update the price of his/her purchase order.
    User (seller) can mark his/her posted AD as sold.
    User (seller) can update the price of his/her posted AD.
    User can view a specific car.
    User can view all unsold cars.
    User can view all unsold cars within a price range.
    Admin can delete a posted AD record.
    Admin can view all posted ads whether sold or unsold.

Optional features

    User can reset password.
    User can view all cars of a specific body type.
    User can add multiple pictures to a posted ad.
    User can flag/report a posted AD as fraudulent.
    User can view all unsold cars of a specific make (manufacturer).
    User can view all used unsold cars.
    User can view all new unsold cars

Technologies

    Node js
    Express
    Mocha, chai, babel, eslint

API URL

https://automart1.herokuapp.com/api/v1
API Endpoints
Verb 	Endpoint 	Action
POST 	/api/v1/auth/signup 	Create a user
POST 	/api/v1/auth/admin/signup 	Create a user (Admin)
POST 	/api/v1/auth/signin 	Sign a user in
POST 	/api/v1/car 	Create a car AD
GET 	/api/v1/car 	View all posted ADs whether sold or available
GET 	/api/v1/car/<:id> 	View a specific car AD
GET 	/api/v1/car?status=available 	View all unsold cars
GET 	/api/v1/car?body_type=bodyType 	View all cars of a specific body type.
GET 	/api/v1/car?status=available&state=new 	View all unsold cars of a specific state (new)
GET 	/api/v1/car?status=available&state=used 	View all unsold cars of a specific state (used)
GET 	/api/v1/car?status=available&manufacturer=XXXValue 	View all unsold cars of a specific make (manufacturer)
GET 	/api/v1/car?status=available&min_price=XXXValue&max_price=XXXValue 	View all unsold cars within a price range
PATCH 	/api/v1/car/<:id>/price 	Update a specific car AD price
PATCH 	/api/v1/car/<:id>/status 	Update a specific car AD status (sold)
DELETE 	/api/v1/car/<:id>/ 	Delete a specific car AD (only Admin)
POST 	/api/v1/order 	Create an order
POST 	/api/v1/order/<:id>/price 	Update price of an order
POST 	/api/v1/flag/report 	Create a flag/report a posted AD as fraudulent
Setting up locally

    Clone this repository to your local machine
    Cd into directory cd into develop
    Create .env file.
    Use the format in .env-sample file to configure the API
    Run npm install to install dependencies
    Start app with npm start

Documentation

https://automart1.docs.apiary.io/
Author
Ibu Omenka Eric

