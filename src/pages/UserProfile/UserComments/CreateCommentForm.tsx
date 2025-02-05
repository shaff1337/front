import React, { useState } from 'react';
import { createComment } from '../../../api/panel';
import Button from '../../../components/Button';

function CreateCommentForm({ username, setReload }: any): JSX.Element {
	const [text, setText] = useState('');

	const addCommentHandler = (): void => {
		createComment({ comment: text, commentedUser: username }, setReload);
	};

	return (
		<div>
			<p className="block text-sm font-medium">
				Add your comment
			</p>
			<div className="mt-1 flex">
				<textarea
					rows={3}
					name="comment"
					className="form-textarea bg-secondary caret-red-300 block sm:text-sm border-accent rounded-md flex-1 mr-2"
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
	);
}

export default CreateCommentForm;
