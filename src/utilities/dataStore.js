/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';

const getGroup = () => {
	const path = window.location.pathname;
	const last = path.split('/');
	const slug = last[last.length - 2];
	return apiFetch({
		path: `/grouped-products/v1/group?cat=${slug}`,
		method: 'GET',
	});
};

const getCart = () => {
	const cart = apiFetch({
		path: '/wc/store/v1/cart',
		method: 'GET',
		mode: 'cors',
		parse: false,
	});
	return cart;
};

const addToCart = (id) => {
	const nonce = window.localStorage.getItem('wc_nonce');
	return apiFetch({
		path: `wc/store/v1/cart/add-item`,
		method: 'POST',
		data: {
			id,
			quantity: 1,
		},
		headers: {
			nonce,
		},
	});
};

export { addToCart, getCart, getGroup };
