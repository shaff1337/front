import React from 'react';
import { UserCircleIcon } from '@heroicons/react/solid';
import classNames from '../utils/classNames';

interface Prop {
	children: React.ReactNode;
	isLoading: boolean;
	type?: 'text' | 'image';
	className?: string
}

// eslint-disable react/jsx-no-useless-fragment
function Skeleton({ children, isLoading, type = 'text', className }: Prop): JSX.Element {
	return isLoading ? (
		<div className="animate-pulse w-full justify-center align-center">
			{type === 'text'
				? (<div className="bg-[#213243] text-transparent rounded-md select-none w-full">Loading</div>)
				: (<UserCircleIcon className={classNames(className || '', 'text-[#213243]')} />
				)}
		</div>
	) : (
		<>{children}</>
	);
}

export default Skeleton;
