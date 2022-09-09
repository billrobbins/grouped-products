/**
 * External dependencies
 */
import React from 'react';
import { render } from 'react-dom';

/**
 * Internal dependencies
 */
import './index.scss';
import { App } from './app';

const RootComponent = () => {
	return (
		<>
			<App />
		</>
	);
};
const domContainer = document.querySelector('.product-cat-react-hook');
render(<RootComponent />, domContainer);
