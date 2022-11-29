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
import { Clear } from './clear';
import { Price } from './price';
import { ProductDetails } from './productDetails';

// Todo: display error messages to customers.  Prompt to select height and width.
export const Group = (props) => {
	const [selectedWidth, setSelectedWidth] = useState(null);
	const [selectedHeight, setSelectedHeight] = useState(null);
	const [selectedProduct, setSelectedProduct] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [loading, setLoading] = useState('');
	const [availableHeights, setAvailableHeights] = useState([]);
	const [availableWidths, setAvailableWidths] = useState([]);

	const group = props.group;
	const setMessage = props.setMessage;
	const setShowNotify = props.setShowNotify;

	/**
	 * Fired by clicking the add to cart button.  It sets the loading state, sends the product id and quantity to the cart, removes the loading state and triggers a refresh of the mini cart.
	 * It needs to give user feedback on errors like not picking width/height and so on.
	 */
	const getSelectedProduct = async () => {
		if (typeof selectedProduct.id === 'undefined') {
			setMessage('Please select a width and height');
			return;
		}
		setLoading('loading');
		await addToCart(selectedProduct.id, quantity);
		setShowNotify(true);
		setMessage('Added ' + selectedProduct.name);
		setLoading('');
		jQuery(document.body).trigger('wc_fragment_refresh');
		clearSelection();
		setTimeout(() => {
			setShowNotify(false);
		}, 2500);
	};

	const getProductImage = () => {
		if (selectedProduct !== 0) {
			if (typeof selectedProduct.image !== 'undefined') {
				return selectedProduct.image;
			}
		}
		return group.products[0].image;
	};

	const clearSelection = () => {
		setSelectedWidth(null);
		setSelectedHeight(null);
		setSelectedProduct(0);
		setAvailableWidths(group.widths);
		setAvailableHeights(group.heights);
	};

	useEffect(() => {
		setAvailableWidths(group.widths);
		setAvailableHeights(group.heights);
	}, [group.widths, group.heights]);

	// Monitors for selection of the height/width to determine the product ID.
	useEffect(() => {
		// Takes selected width and filters lists of heights for only possible combinations.
		if (selectedWidth !== null && selectedHeight === null) {
			const available = group.products.filter(
				(product) => product.width === selectedWidth
			);
			const unique = [...new Set(available.map((item) => item.height))];
			setAvailableHeights(unique.sort());
		}
		if (selectedHeight !== null && selectedWidth === null) {
			const available = group.products.filter(
				(product) => product.height === selectedHeight
			);
			const unique = [...new Set(available.map((item) => item.width))];
			setAvailableWidths(unique.sort());
		}
		// Determines the product id from the selected height and width
		if (selectedHeight !== null && selectedWidth !== null) {
			const productToAdd = group.products.filter(
				(product) =>
					product.height === selectedHeight &&
					product.width === selectedWidth
			);
			if (productToAdd.length > 0) {
				setShowNotify(false);
				setSelectedProduct(productToAdd[0], quantity);
			} else {
				// This indicates that the width and height combination doesn't exit.
				setShowNotify(true);
				setMessage(
					"Sorry, this combination does't exit. \nPlease select again."
				);
				clearSelection();
				setTimeout(() => {
					setShowNotify(false);
				}, 3500);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		selectedWidth,
		selectedHeight,
		group.products,
		quantity,
		setMessage,
		setShowNotify,
	]);

	return (
		<div className="product-group" id={'group-' + group.slug}>
			<div className="image-holder">
				<img src={getProductImage()} alt={group.type} loading="lazy" />
			</div>
			<div className="group-title">
				<h4 className="group-type">
					{group.type}
					<ProductDetails selectedProduct={selectedProduct} />
				</h4>
			</div>
			{availableWidths && (
				<Attribute
					group={group.slug}
					slug="width"
					title="Width"
					selected={group.slug + selectedWidth}
					items={availableWidths}
					action={setSelectedWidth}
				/>
			)}
			{availableHeights && (
				<Attribute
					group={group.slug}
					slug="height"
					title="Height"
					selected={group.slug + selectedHeight}
					items={availableHeights}
					action={setSelectedHeight}
				/>
			)}
			<Price selectedProduct={selectedProduct} group={group} />
			<div className="quantity">
				{selectedProduct !== 0 && (
					<Clear clearSelection={clearSelection} />
				)}
				<Select quantity={quantity} setQuantity={setQuantity} />
			</div>
			<AddToCartButton loading={loading} action={getSelectedProduct} />
		</div>
	);
};
