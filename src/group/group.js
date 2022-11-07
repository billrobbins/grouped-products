/**
 * External dependencies
 */
import { useState, useEffect } from 'react';
/**
 * Internal dependencies
 */
import { addToCart } from '.././utilities/dataStore';
import { AddToCartButton } from './addToCartButton';
import { Attribute } from './groupAttribute';
import { Select } from './select';

// Todo: display error messages to customers.  Prompt to select height and width.
export const Group = (props) => {
	const [selectedWidth, setSelectedWidth] = useState(null);
	const [selectedHeight, setSelectedHeight] = useState(null);
	const [selectedProduct, setSelectedProduct] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [loading, setLoading] = useState('');

	const group = props.group;

	/**
	 * Fired by clicking the add to cart button.  It sets the loading state, sends the product id and quantity to the cart, removes the loading state and triggers a refresh of the mini cart.
	 * It needs to give user feedback on errors like not picking width/height and so on.
	 */
	const getSelectedProduct = async () => {
		setLoading('loading');
		await addToCart(selectedProduct.id, quantity);
		setLoading('');
		jQuery(document.body).trigger('wc_fragment_refresh');
	};

	// Monitors for selection of the height/width to determine the product ID.
	useEffect(() => {
		// Determines the product id from the selected height and width
		if (selectedHeight !== null && selectedWidth !== null) {
			const productToAdd = group.products.filter(
				(product) =>
					product.height === selectedHeight &&
					product.width === selectedWidth
			);
			setSelectedProduct(productToAdd[0], quantity);
		}
	}, [selectedWidth, selectedHeight, group.products, quantity]);

	return (
		<div className="product-group" id={'group-' + group.slug}>
			<div className="image-holder">
				<div className="image">
					<img
						src={
							selectedProduct !== 0
								? selectedProduct.image
								: group.products[0].image
						}
						alt={group.type}
						loading="lazy"
					/>
				</div>
			</div>
			<div className="group-data">
				<div className="group-title">
					<h4 className="group-type">{group.type}</h4>
					<p className="product-details">
						{selectedProduct !== 0 ? selectedProduct.name : ''}
					</p>
				</div>
				<Attribute
					slug="width"
					title="Width"
					items={group.widths}
					action={setSelectedWidth}
				/>
				<Attribute
					slug="height"
					title="Height"
					items={group.heights}
					action={setSelectedHeight}
				/>
			</div>
			<div className="group-actions">
				<div className="price">
					<h4>
						{selectedProduct !== 0
							? '$' + selectedProduct.price
							: 'From $' + group.products[0].price}
					</h4>
				</div>
				<div className="quantity">
					<Select quantity={quantity} setQuantity={setQuantity} />
				</div>
				<AddToCartButton
					loading={loading}
					action={getSelectedProduct}
				/>
			</div>
		</div>
	);
};
