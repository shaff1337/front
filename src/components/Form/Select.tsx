import React, {
	ClassAttributes,
	Fragment,
	SelectHTMLAttributes,
	useState,
} from 'react';
import { FieldHookConfig, useField } from 'formik';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import classNames from '../../utils/classNames';

// eslint-disable-next-line max-len
type spread = SelectHTMLAttributes<HTMLSelectElement> & ClassAttributes<HTMLSelectElement> & FieldHookConfig<string>

interface Prop {
	label: string;
}

/* eslint-disable react/jsx-props-no-spreading */
function Select({ children, label, ...props }: Prop & spread): JSX.Element {
	const [field, meta] = useField(props);

	return (
		<div className="mb-2.5">
			<label htmlFor={props.name} className="flex justify-between block">
				<span className="text-sm font-medium text-white">{label}</span>
				{meta.error && meta.touched && (<p className="mt-1 text-xs text-red-400">{meta.error}</p>)}
			</label>

			<select
				{...field}
				{...props}
				className={classNames(
					meta.error && meta.touched
						? 'shadow-Errors text-red-400 placeholder-red-400 border-none'
						: 'border border-accent focus:border-accent text-cove placeholder-cove',
					'form-select mt-1 pl-2 pr-10 h-10 bg-transparent block w-full text-sm rounded-md focus:ring-transparent focus:ring-offset-transparent',
				)}
			>
				{children}
			</select>
		</div>
	);
}

export default Select;
