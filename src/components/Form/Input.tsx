import React, { ClassAttributes, InputHTMLAttributes } from 'react';
import { FieldHookConfig, useField } from 'formik';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import classNames from '../../utils/classNames';

type SpreadProps = InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement> & FieldHookConfig<string>;

interface Props {
	label: string;
}

function Input({ label, ...props }: Props & SpreadProps): JSX.Element {
	const [field, meta] = useField(props);

	return (
		<div className="mb-2.5 bg-gray-800">
			<label htmlFor={props.name} className="flex justify-between block">
				<span className="text-sm font-medium text-white">{label}</span>
				{meta.error && meta.touched && <p className="mt-1 text-xs text-red-400">{meta.error}</p>}
			</label>
			<div className="mt-1 relative rounded-md shadow-sm">
				<input
					{...field}
					{...props}
					className={classNames(
						meta.error && meta.touched
							? 'border text-red-400 placeholder-red-400'
							: 'border border-accent text-cove placeholder-cove',
						'pl-2 pr-10 h-10 bg-transparent block w-full text-sm rounded-md focus:outline-none',
					)}
				/>
				{meta.error && meta.touched && (
					<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
						<ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
					</div>
				)}
			</div>
		</div>
	);
}

export default Input;
