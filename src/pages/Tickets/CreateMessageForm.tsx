import React, { useState } from 'react';
import { createShout } from '../../api/client';
import Button from '../../components/Button';

function CreateMessageForm({ setReload }: any): JSX.Element {
	const [text, setText] = useState('');

	const addCommentHandler = (): void => {
		// createShout({ message: text }, setReload);
		console.log(`message sent: ${text}`);
	};

	return (
		<div className="h-28 items-center flex">
			<div className="flex-1">
				<div className="mt-1 flex">
					<textarea
						rows={3}
						name="comment"
						placeholder="Send a message"
						className="form-textarea bg-secondary caret-red-300 block sm:text-sm border-accent rounded-md flex-1 mr-2 resize-none"
						value={text}
						onChange={(event) => {
							setText(event.target.value);
						}}
					/>
					<Button onClick={addCommentHandler} size="base">
						Send
					</Button>
				</div>
			</div>
		</div>
	);
}

export default CreateMessageForm;
