import fetch from 'isomorphic-unfetch';
import React from 'react';

class LogTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			logs: [],
			loading: true,
			error: null,
		};
	}

	componentDidMount() {
		// Make a request to the API
		const auditApiUrl = 'https://api.pangeacloud.com/v1/audit';
		const apiKey = '47b20e2c2397550a716ed5a1eb1cf6dcbcdb01365252110ab950c666e25e23f3';

		fetch(`${auditApiUrl}/logs`, {
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Failed to retrieve logs');
				}
			})
			.then((data) => {
				this.setState({ logs: data.logs, loading: false });
			})
			.catch((error) => {
				this.setState({ error: error.message, loading: false });
			});
	}

	render() {
		if (this.state.loading) {
			return <p>Loading...</p>;
		} else if (this.state.error) {
			return <p>Error: {this.state.error}</p>;
		} else {
			return (
				<table>
					<thead>
						<tr>
							<th>Timestamp</th>
							<th>Resource</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{this.state.logs.map((log) => (
							<tr key={log.id}>
								<td>{log.timestamp}</td>
								<td>{log.resource_name}</td>
								<td>{log.action}</td>
							</tr>
						))}
					</tbody>
				</table>
			);
		}
	}
}

export default LogTable;
