export const Attribute = (props) => {
	return (
		<div className={props.slug}>
			<div className={props.slug + '-name'}>
				<p>{props.title}:</p>
			</div>
			<ul className={props.slug + 's'}>
				{props.items.map((width) => (
					<li key={width}>
						<input
							type="radio"
							value={width}
							name="width"
							id={width}
							onClick={(e) => props.action(e.target.value)}
						/>
						<label htmlFor={width}>{width}</label>
					</li>
				))}
			</ul>
		</div>
	);
};
