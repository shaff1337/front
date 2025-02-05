import React, { ClassAttributes, InputHTMLAttributes } from 'react';
import { FieldHookConfig, useField } from 'formik';
import { CheckIcon } from '@heroicons/react/solid';
import classNames from '../../utils/classNames';

// eslint-disable-next-line max-len
type SpreadProps = InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement> & FieldHookConfig<string>;

/* eslint-disable react/jsx-props-no-spreading */
function Checkbox({ children, ...props }: SpreadProps): JSX.Element {
	const [field, meta] = useField(props);
	const error = meta.error && meta.touched ? 'border-red-400 focus:border-red-400' : 'border-accent';

	return (
		<div className="py-2 flex items-center">
			<input
				{...field}
				{...props}
				type="checkbox"
				className={classNames(
					error,
					'form-checkbox h-4 w-4 focus:ring-offset-transparent focus:ring-transparent text-blue-300 bg-transparent border-2 rounded'
				)}
			/>

			<label htmlFor={props.name} className="ml-2 block text-sm text-cove inline-block align-middle">
				{children}
			</label>

			{meta.value && <CheckIcon className="ml-2 h-5 w-5 text-indigo-600" aria-hidden="true" />}
		</div>
	);
}

export default Checkbox;
