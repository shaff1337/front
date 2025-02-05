import React from 'react';

import Spinner from './Spinner';
import classNames from './classNames';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	size?: 'lg' | 'base' | 'icon';
	isSubmitting?: boolean;
	className?: string;
}

/* eslint-disable react/button-has-type */
function Button({
	children,
	size = 'base',
	isSubmitting = false,
	className,
	...props
}: Props): JSX.Element {
	const buttonSizes = {
		base: 'text-sm px-4',
		icon: 'p-2',
		lg: 'w-full text-base',
	};

	return (
		<button
			className={classNames(buttonSizes[size], className || '', 'py-2 text-black bg-blue-300 enabled:hover:bg-blue-400 font-nunito font-bold disabled:opacity-75')}
			disabled={isSubmitting}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}
		>
			{ isSubmitting ? <Spinner /> : children }
		</button>
	);
}

export default Button;
