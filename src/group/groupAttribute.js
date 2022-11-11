// Todo: set "checked" value and have it clear upon adding to cart.
export const Attribute = (props) => {
	return (
		<div className={props.slug}>
			<div className={props.slug + '-name'}>
				<p>{props.title}:</p>
			</div>
			<ul className={props.slug + 's'}>
				{props.items.map((item) => (
					<li key={item}>
						<input
							type="radio"
							value={item}
							name={props.slug}
							id={props.group + props.slug + item}
							checked={item === props.selected}
							onChange={(e) => props.action(e.target.value)}
						/>
						<label htmlFor={props.group + props.slug + item}>
							{item}
						</label>
					</li>
				))}
			</ul>
		</div>
	);
};
