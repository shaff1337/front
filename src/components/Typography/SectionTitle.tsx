import React from 'react';

interface Prop {
	title: string | JSX.Element;
	description?: string | JSX.Element;
}

function SectionTitle({ title, description }: Prop): JSX.Element {
	return (
		<div className="pb-2.5">
			<h5 className="mb-0 text-xl text-white">{ title }</h5>
			{description && <p className="text-cove text-sm w-full">{description}</p>}
		</div>
	);
}

export default SectionTitle;
