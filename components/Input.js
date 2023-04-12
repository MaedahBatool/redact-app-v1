export default function Input({ beforeText }) {
	return (
		<div className="relative">
			<label htmlFor="email" className="sr-only">
				Fill in the data to redact important text.
			</label>
			<input
				defaultValue={beforeText}
				type="text"
				name="inputText"
				className="block w-full min-w-full rounded-md border-0 px-3 py-5.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
				placeholder="Enter text to redact"
			/>
		</div>
	);
}
