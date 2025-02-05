import React from 'react';

interface ChildrenProp {
	children: React.ReactNode;
}

export function Container({ children }: ChildrenProp): JSX.Element {
	return (
		<div className="px-4 py-5 text-cove text-sm grid grid-cols-2 lg:grid-cols-3">
			{children}
		</div>
	);
}

export function Dd({ children }: ChildrenProp): JSX.Element {
	return <dd>{children}</dd>;
}

export function Dl({ children }: ChildrenProp): JSX.Element {
	return (
		<div className="section">
			<dl className="divide-y divide-accent">
				{children}
			</dl>
		</div>
	);
}

export function Dt({ children, ...props }: ChildrenProp): JSX.Element {
	return <dt className="font-medium" {...props}>{children}</dt>;
}
