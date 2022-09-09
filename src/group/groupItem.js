/**
 * Internal dependencies
 */
import { addToCart } from '../utilities/dataStore';

export const GroupItem = (props) => {
	const item = props.item;
	return (
		<div className="product-item">
			{/* {item.images.length && (
                 <img src={item.images[0].src} alt={item.name} />
             )} */}
			<h2>{item.name}</h2>
			<p dangerouslySetInnerHTML={{ __html: item.price }}></p>
			<button
				className="button"
				onClick={() => addToCart(item.id)}
			>
				Select
			</button>
		</div>
	);
};
