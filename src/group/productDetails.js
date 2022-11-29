export const ProductDetails = (props) => {
	return (
		<span className="product-details">
			{props.selectedProduct !== 0 &&
				props.selectedProduct.sku + ' - ' + props.selectedProduct.name}
		</span>
	);
};
