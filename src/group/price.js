export const Price = (props) => {
	if (props.selectedProduct !== 0) {
		return (
			<div className="price">
				<h4>
					<span className="sale-price">
						${props.selectedProduct.regular_price}
					</span>
					${props.selectedProduct.price}
				</h4>
			</div>
		);
	}
	return (
		<div className="price">
			<h4>From ${props.group.products[0].price}</h4>
		</div>
	);
};
