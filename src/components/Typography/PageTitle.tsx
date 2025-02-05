import React from 'react';
import Button from '../Button';

interface ChildrenProp {
	children: React.ReactNode;
}

interface BodyProp {
	title: string | JSX.Element;
	description?: string | JSX.Element;
}

export function Container({ children }: ChildrenProp): JSX.Element {
	return <div className="grid grid-cols-3 pb-5">{children}</div>;
}

export function Body({ title, description }: BodyProp): JSX.Element {
	return (
		<div className="col-span-2">
			<h1 className="text-4xl font-normal text-white">{title}</h1>
			{description && <span className="text-cove text-sm">{description}</span>}
		</div>
	);
}

export function Action({ children, ...props }:
	ChildrenProp & React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
	return (
		<div className="flex justify-end items-center">
			<Button type="button" size="base" {...props}>{children}</Button>
		</div>
	);
}
