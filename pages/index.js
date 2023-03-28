import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
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
		<div className={styles.container}>
			<Head>
				<title>Pangea Redactor</title>
				<meta name="description" content="Redact important text." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href="https://pangea.cloud/docs/api/redact#redact">Pangea Redact API!</a>
				</h1>

				<p className={styles.description}>Fill in the data to redact important text.</p>

				<div className={styles.grid}>
					<form action="post" onSubmit={handleSubmit}>
						<input type="text" name="inputText" defaultValue={beforeText} className={styles.input} />
					</form>

					<p>
						<b>Redacted Result</b>: {redactedText}
					</p>
				</div>
			</main>

			<footer className={styles.footer}>
				<a href="https://pangea.cloud/docs/api/redact/?focus=redact" target="_blank" rel="noopener noreferrer">
					Powered by Pangea Cloud
				</a>
			</footer>
		</div>
	);
}
