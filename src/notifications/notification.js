/**
 * External dependencies
 */
import { Transition } from 'transition-hook';

export const Notification = (props) => {
	const showNotify = props.showNotify;
	return (
		<Transition state={showNotify} timeout={500}>
			{(stage, shouldMount) =>
				shouldMount && (
					<aside
						className="category-notification"
						style={{
							transition: '.5s',
							opacity: stage === 'enter' ? 1 : 0,
						}}
					>
						<p>{props.message}</p>
					</aside>
				)
			}
		</Transition>
	);
};
