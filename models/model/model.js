import {createUser, findEmail, allUsers} from '../users/users.js';

import {allCarAds, createCarAd, updateStatus, updateCarAdPrice} from'../cars/cars.js';

import {createOrder, updatePrice, allOrders} from '../orders/orders.js';

import {createFlag, allFlags} from '../flags/flags.js';

const model = {
	users: {createUser, findEmail, allUsers},
	cars: {allCarAds, createCarAd, updateStatus, updateCarAdPrice},
	orders: {createOrder, updatePrice, allOrders},
	flags: {createFlag, allFlags}
}

export default model;