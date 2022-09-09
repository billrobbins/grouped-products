/**
 * External dependencies
 */
import { useEffect, useState } from 'react';

/**
 * Internal dependencies
 */
import { addToCart } from '../utilities/dataStore';

export const ProductListItem = (props) => {
	const item = props.item;
	return (
		<li className="product-item">
			{item.images.length && (
				<img src={item.images[0].src} alt={item.name} />
			)}
			<h2>{item.name}</h2>
			<p dangerouslySetInnerHTML={{ __html: item.price_html }}></p>
			<button
				className="button add-to-cart"
				onClick={() => addToCart(item.id)}
			>
				Add to Cart
			</button>
		</li>
	);
};
