export const AddToCartButton = (props) => {
	const loading = props.loading;
	const action = props.action;
	return (
		<div className={'add-to-cart ' + loading}>
			<button
				className="group-cart button"
				onClick={() => {
					action();
				}}
			>
				{loading.length > 0 ? 'Adding...' : 'Add to Cart'}
			</button>
		</div>
	);
};
