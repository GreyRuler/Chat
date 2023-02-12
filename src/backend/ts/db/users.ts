import { Handle } from '../../../types/Handle';

const users = {
	data: [] as string[],
	listeners: [] as Handle[],

	add(item: string) {
		this.data.push(item);

		this.listeners.forEach((handler) => handler(item));
	},

	listen(handler: (item: string) => void) {
		this.listeners.push(handler);
	}
};

export default users;
