import React from 'react';
import Button from './Button';

interface ChildrenProp {
	children: React.ReactNode;
}

interface BodyProp {
	title: string | JSX.Element;
	description?: string | JSX.Element;
}

interface CardProps {
	children: React.ReactNode
	className?: string
  }

export function Container({ children }: ChildrenProp): JSX.Element {
	return (
		<div className="p-6 grid lg:grid-cols-4 lg:gap-0 gap-y-4 grid-cols-1 items-center">
			{children}
		</div>
	);
}

export function Body({ title, description }: BodyProp): JSX.Element {
	return (
		<div className="col-span-3">
			<h6 className="text-white">{title}</h6>
			<p className="text-sm text-cove">{description}</p>
		</div>
	);
}

export function Action({ children, ...props }:
	ChildrenProp & React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
	return (
		<div className="flex justify-end items-center">
			<Button type="button" size="base" {...props} className="w-full lg:w-fit">{children}</Button>
		</div>
	);
}
export function Card({ children, className = '' }: CardProps) {
	return (
	  <div className={`bg-secondary rounded-lg shadow-md ${className}`}>
		{children}
	  </div>
	)
  }
  
  export function CardHeader({ children, className = '' }: CardProps) {
	return (
	  <div className={`px-6 py-4 border-b border-accent ${className}`}>
		{children}
	  </div>
	)
  }
  
  export function CardContent({ children, className = '' }: CardProps) {
	return (
	  <div className={`px-6 py-4 ${className}`}>
		{children}
	  </div>
	)
  }
  
  export function CardTitle({ children, className = '' }: CardProps) {
	return (
	  <h2 className={`text-2xl font-bold text-white ${className}`}>
		{children}
	  </h2>
	)
  }
  
  
  