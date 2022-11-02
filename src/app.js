/**
 * External dependencies
 */
import { useState, useEffect } from 'react';

/**
 * Internal dependencies
 */
import { getCart, getGroups } from './utilities/dataStore';
import { Group } from './group/group';

export const App = () => {
	const [cart, updateCart] = useState();
	const [groupData, updateGroupData] = useState([]);

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
		const expireNonce =
			window.localStorage.getItem('wc_nonce_time') + 86400000;
		if (Date.now() > expireNonce) {
			loadCart();
		}
		loadGroups();
	}, []);

	return (
		<div className="App">
			{groupData.map((group) => (
				<Group key={group.term_id} group={group} />
			))}
		</div>
	);
};
