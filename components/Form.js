import Input from '@/components/Input';
import { useEffect, useState } from 'react';

export default function Form() {
	const [beforeText, setBeforeText] = useState('My name is Maedah and my CC is 5105105105105100');
	const [redactedText, setRedactedText] = useState();

	useEffect(() => {
		(async () => {
			const opts = {
				method: 'POST',
				headers: {
					Authorization: `Bearer pts_6u46rb3n22grfsfht4w4i3i7t45iho3i`, // should in env
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					text: beforeText,
					rules: ['CREDIT_CARD', 'PERSON', 'PROFANITY'],
				}),
			};

			const res = await fetch('https://redact.aws.us.pangea.cloud/v1/redact', opts);
			const resJson = await res.json();
			if (resJson.status === 'Success') {
				setRedactedText(resJson.result.redacted_text);
			} else {
				setRedactedText('API Failed!');
			}
		})();
	}, [beforeText]);

	function handleSubmit(e) {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());
		setBeforeText(formJson.inputText);
	}
	return (
		<div className="flex flex-col min-w-full z-50">
			<form onSubmit={handleSubmit}>
				<Input beforeText={beforeText} />
			</form>

			<p className="pt-5">
				<span className="bg-cyan-600 rounded-xl px-3 py-2 uppercase">REDACTED</span> {redactedText}
			</p>
		</div>
	);
}
