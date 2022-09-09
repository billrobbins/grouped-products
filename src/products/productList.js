/**
 * Internal dependencies
 */
import { ProductListItem } from './productListItem';

export const ProductList = (props) => {
	const productData = props.productData;
	return (
		<ul className="product-grid">
			{productData.map((item) => (
				<ProductListItem key={item.id} item={item} />
			))}
		</ul>
	);
};
