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
							id={item}
							onClick={(e) => props.action(e.target.value)}
						/>
						<label htmlFor={item}>{item}</label>
					</li>
				))}
			</ul>
		</div>
	);
};
