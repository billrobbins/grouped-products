export const RadioButton = ({ label, value, onClick }) => {
	return (
		<label htmlFor={label}>
			<input
				type="radio"
				name={label}
                value={label}
				onChange={onClick}
			/>
			{label}
		</label>
	);
};
