export default class UserApi {
	private readonly apiUrl: string = 'http://localhost:7070/';

	async list() {
		const request = fetch(`${this.apiUrl}users`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const result = await request;
		const json = await result.json();
		const { users } = json;
		return users;
	}

	async add(user: string) {
		const request = fetch(`${this.apiUrl}users/${user}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const result = await request;
		const json = await result.json();
		const { status } = json;
		return status;
	}
}
