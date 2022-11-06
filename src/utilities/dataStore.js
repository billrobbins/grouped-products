/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';

const getGroups = async () => {
	const path = window.location.pathname;
	const last = path.split('/');
	const slug = last[last.length - 2];
	const groups = await apiFetch({
		path: `/grouped-products/v1/group?cat=${slug}`,
		method: 'GET',
	});

	return groups;
};

const getCart = async () => {
	const cart = await apiFetch({
		path: '/wc/store/v1/cart',
		method: 'GET',
		mode: 'cors',
		parse: false,
	});
	return cart;
};

const addToCart = (id, quantity) => {
	const nonce = window.localStorage.getItem('wc_nonce');
	return apiFetch({
		path: `wc/store/v1/cart/add-item`,
		method: 'POST',
		data: {
			id,
			quantity,
		},
		headers: {
			nonce,
		},
	});
};

export { addToCart, getCart, getGroups };
