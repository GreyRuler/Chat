import SignChat from './SignChat';

export default class App {
	private static app: HTMLElement;

	static user: string;

	static init() {
		this.app = document.querySelector('#app') as HTMLElement;
		const chat = new SignChat(this.app);
		chat.bindToDOM();
	}
}
