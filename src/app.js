/**
 * External dependencies
 */
import { useState, useEffect } from 'react';

/**
 * Internal dependencies
 */
import { getCart, getGroups } from './utilities/dataStore';
import { Group } from './group/group';
import { Notification } from './notifications/notification';

export const App = () => {
	const [groupData, updateGroupData] = useState([]);
	const [message, setMessage] = useState('');
	const [showNotify, setShowNotify] = useState(false);

	const loadGroups = async () => {
		try {
			const response = await getGroups();
			updateGroupData(response);
		} catch (e) {
			setMessage('We hit a snag!\nError: ' + e.message);
			setShowNotify(true);
		}
	};
	const loadCart = async () => {
		window.localStorage.removeItem('wp_nonce');
		try {
			const res = await getCart();
			window.localStorage.setItem('wc_nonce', res.headers.get('Nonce'));
		} catch (e) {
			setMessage('We hit a snag!\nError: ' + e.message);
			setShowNotify(true);
		}
	};
	useEffect(() => {
		loadCart();
		loadGroups();
	}, []);

	return (
		<div className="App">
			<Notification message={message} showNotify={showNotify} />
			{groupData.map((group) => (
				<Group
					key={group.term_id}
					group={group}
					setMessage={setMessage}
					setShowNotify={setShowNotify}
					loadCart={loadCart}
				/>
			))}
		</div>
	);
};
