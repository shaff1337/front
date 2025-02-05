import React from 'react';
import classNames from '../utils/classNames';

interface ChildrenProp {
	children: React.ReactNode;
}

interface ClassNameProp {
	className?: string;
}

export function Table({ children }: ChildrenProp): JSX.Element {
	return (
		<div className="overflow-x-auto">
			<div className="inline-block min-w-full">
				<div className="overflow-hidden">
					<table className="table-fixed min-w-full text-cove dark:bg-gray-800">{children}</table>
				</div>
			</div>
		</div>
	);
}

export function Tbody({ children }: ChildrenProp): JSX.Element {
	return (
		<tbody className="divide-y divide-accent bg-secondary border border-accent rounded-b-md dark:bg-gray-700">
			{children}
		</tbody>
	);
}

export function Td({ children, className }: ChildrenProp & ClassNameProp): JSX.Element {
	return (
		<td className={classNames(className || '', 'px-6 py-4 whitespace-nowrap text-sm dark:text-gray-200')}>
			{children}
		</td>
	);
}

export function Th({ children, className }: ChildrenProp & ClassNameProp): JSX.Element {
	return (
		<th
			scope="col"
			className={classNames(
				className || '',
				'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider dark:text-gray-300'
			)}
		>
			{children}
		</th>
	);
}

export function Thead({ children }: ChildrenProp): JSX.Element {
	return <thead className="bg-blue-dark border border-accent rounded-t-md dark:bg-gray-800">{children}</thead>;
}

export function Tr({ children }: ChildrenProp): JSX.Element {
	return <tr className="dark:bg-gray-700">{children}</tr>;
}
