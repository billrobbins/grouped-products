/**
 * Internal dependencies
 */
import { GroupItem } from './groupItem';

export const Group = (props) => {
	const groupData = props.groupData;
	return (
		<div className="product-grid">
			{groupData.map((item) => (
				<GroupItem key={item.id} item={item} />
			))}
		</div>
	);
};
