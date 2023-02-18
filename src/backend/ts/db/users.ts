const { Handle } = require('../../../types/Handle');

const handleItem: Handle = (item, status) => {
	console.log(`Item ${item} has status ${status}`);
};

const users = {
	data: [] as string[],
	listeners: [] as Handle[],

	add(item: string, status = true) {
		this.data.push(item);

		this.listeners.forEach((handler) => handler(item, status));
	},

	remove(item: string, status = false) {
		this.data = this.data.filter((user) => user !== item);

		this.listeners.forEach((handler) => handler(item, status));
	},

	listen(handler: (item: string, status: boolean) => void) {
		this.listeners.push(handler);
	}
};

export default users;
