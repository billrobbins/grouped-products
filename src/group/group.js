/**
 * Internal dependencies
 */
import { addToCart } from '.././utilities/dataStore';

// Filter list of sizes to remove duplicates.  When width is selected, use it to filter matching heights.
// Then once height is selected, pass ID that matches height + width to the cart.
export const Group = (props) => {
	const group = props.group;

	// const products = new Set();
	// products.add(group.products);
	// const widths = products.has('width');
	// const heights = products.has('height');
	// console.log( products );
	// console.log('widths and heights: ' + widths + heights);

	const widths = [...new Set(group.products.map((product) => product.width))];
	const heights = [
		...new Set(group.products.map((product) => product.height)),
	];
	console.log('widths: ' + widths + ' and heights: ' + heights);

	return (
		<div className="product-group">
			<div className="image-holder">
				<div className="image">
					{group.products[0].image && (
						<img
							src={group.products[0].image}
							alt={group.type}
							loading="lazy"
						/>
					)}
				</div>
			</div>
			<div className="group-data">
				<div className="group-title">
					<h2 className="group-type">{group.type}</h2>
				</div>
				<div className="width">
					<div className="width-name">
						<p>Width:</p>
					</div>
					<div className="widths">
						{widths.map((width) => (
							<label key={width} name={width} htmlFor={width}>
								<input
									type="radio"
									value={width}
									name={width}
									id={width}
								/>
								{width}
							</label>
						))}
					</div>
				</div>
				<div className="height">
					<div className="height-name">
						<p>Height:</p>
					</div>
					<div className="heights">
						{heights.map((height) => (
							<button className="attribute-select" key={height}>
								{height}
							</button>
						))}
					</div>
				</div>
			</div>
			<div className="group-actions">
				<div className="price">
					<h4>${group.products[0].price}</h4>
				</div>
				<div className="quantity">
					<select>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
						<option value="10">10</option>
					</select>
				</div>
				<div className="add-to-cart">
					<button
						className="group-cart"
						onClick={() => {
							addToCart(group.products[0].id);
						}}
					>
						Add to Cart
					</button>
				</div>
			</div>
		</div>

		// <div className="product-group">
		// 	<div className="group-image">
		// 		{group.products[0].image && (
		// 			<img
		// 				src={group.products[0].image}
		// 				alt={group.type}
		// 				loading="lazy"
		// 			/>
		// 		)}
		// 	</div>
		// 	<div className="data-column">
		// 		<div className="attribute-row title">
		// 			<h2 className="group-type">{group.type}</h2>
		// 		</div>
		// 		<div className="attribute-row widths">
		// 			<h4 className="attribute-type">Width:</h4>
		// 			<div className="attribute-list">
		// 				{group.products.map((product) => (
		// 					<button
		// 						className="attribute-select"
		// 						key={product.id}
		// 					>
		// 						{product.id}
		// 					</button>
		// 				))}
		// 			</div>
		// 		</div>
		// 		<div className="attribute-row heights">
		// 			<h4 className="attribute-type">Height:</h4>
		// 			<div className="attribute-list">
		// 				{group.products.map((product) => (
		// 					<button
		// 						className="attribute-select"
		// 						key={product.id}
		// 					>
		// 						{product.id}
		// 					</button>
		// 				))}
		// 			</div>
		// 		</div>
		// 		<div className="price-add-to-cart">
		// 			<h4 className="item-price">${group.products[0].price}</h4>
		// 			<button
		// 				className="add-to-cart"
		// 				onClick={() => {
		// 					addToCart(group.products[0].id);
		// 				}}
		// 			>
		// 				Add to Cart
		// 			</button>
		// 		</div>
		// 	</div>
		// </div>
	);
};
