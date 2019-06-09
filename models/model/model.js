import {createUser, findEmail, allUsers} form '../users/users';

import {allCarAds, createCarAd, updateStatus, updateCarAdPrice} from'../cars/cars';

import {createOrder, updatePrice, allOrders} from '../orders/orders';

import {createFlag, allFlags} from '../flags/flags';

const model = {
	users: {createUser, findEmail, allUsers},
	cars: {allCarAds, createCarAd, updateStatus, updateCarAdPrice},
	orders: {createOrder, updatePrice, allOrders},
	flags: {createFlag, allFlags}
}

export default model;