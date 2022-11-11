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
	const [cart, updateCart] = useState();
	const [groupData, updateGroupData] = useState([]);
	const [message, setMessage] = useState('');
	const [showNotify, setShowNotify] = useState(false);

	useEffect(() => {
		const loadGroups = async () => {
			const response = await getGroups();
			try {
				updateGroupData(response);
			} catch (error) {
				console.log(error);
			}
		};
		const loadCart = async () => {
			const res = await getCart();
			try {
				window.localStorage.setItem(
					'wc_nonce',
					res.headers.get('Nonce')
				);
				window.localStorage.setItem(
					'wc_nonce_time',
					res.headers.get('Nonce-Timestamp')
				);
				updateCart(res);
			} catch (error) {
				console.log(error);
			}
		};
		// const expireNonce =
		// 	window.localStorage.getItem('wc_nonce_time') + 86400000;
		// if (Date.now() > expireNonce) {
		// 	loadCart();
		// }
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
				/>
			))}
		</div>
	);
};
