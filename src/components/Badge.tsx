import React from 'react';

interface BadgeProp {
	children: React.ReactNode;
	color: string;
}

function Badge({ color, children }: BadgeProp): JSX.Element {
	return (
		<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" style={{ backgroundColor: (color + '41'), color }}>
			{children}
		</span>
	);
}

export default Badge;
