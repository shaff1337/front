import React from 'react';
import { Toaster } from 'react-hot-toast';

function ToasterWrapper(): JSX.Element {
	return (
		<Toaster
			position="bottom-right"
			reverseOrder={false}
			toastOptions={{
				success: {
					iconTheme: {
						primary: '#03543f',
						secondary: '#bcf0da',
					},
				},
				error: {
					iconTheme: {
						primary: '#9b1c1c',
						secondary: '#fbd5d5',
					},
				},
				style: {
					borderRadius: '10px',
					background: '#1f2937',
					color: '#9ca3af',
				},
			}}
		/>
	);
}

export default ToasterWrapper;
