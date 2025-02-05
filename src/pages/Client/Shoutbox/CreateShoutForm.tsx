import React, { useState } from 'react';
import { createShout } from '../../../api/client';
import Button from '../../../components/Button';

function CreateShoutForm({ setReload }: any): JSX.Element {
	document.title = 'User Panel';
	const [text, setText] = useState('');

	const addCommentHandler = (): void => {
		createShout({ message: text }, setReload);
	};

	return (
		<div className="h-28 items-center flex">
			<div className="flex-1">
				<div className="flex">
					<textarea
						rows={3}
						name="comment"
						placeholder="Add your comment"
						className="form-textarea bg-secondary caret-red-300 block sm:text-sm border-accent rounded-md flex-1 mr-2 resize-none"
						value={text}
						onChange={(event) => {
							setText(event.target.value);
						}}
					/>
					<Button onClick={addCommentHandler} size="base">
						Add comment
					</Button>
				</div>
			</div>
		</div>
	);
}

export default CreateShoutForm;