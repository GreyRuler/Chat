import { Message } from '../../types/Message';
import App from './App';

export default class MessageUser {
	private container: HTMLElement;

	private message: Message;

	static get selectorDate() {
		return '.date_message';
	}

	static get selectorUser() {
		return '.user_message';
	}

	static get selectorText() {
		return '.text_message';
	}

	static get markup() {
		return `
			<div class="message">
				<div class="title_message">
					<div class="user_message"></div>
					<div class="date_message"></div>
				</div>
				<div class="text_message"></div>
			</div>
		`;
	}

	constructor(container: HTMLElement, message: Message) {
		this.container = container;
		this.message = message;
	}

	bindToDOM() {
		if (this.message.from === App.user) {
			this.container.classList.add('ml-25');
		} else {
			this.container.classList.add('mr-25');
		}
		this.container.innerHTML = MessageUser.markup;

		const date = this.container.querySelector(
			MessageUser.selectorDate
		) as HTMLElement;
		const user = this.container.querySelector(
			MessageUser.selectorUser
		) as HTMLElement;
		const text = this.container.querySelector(
			MessageUser.selectorText
		) as HTMLElement;

		user.classList.add('current-user');

		date.textContent = this.message.date;
		text.textContent = this.message.text;

		if (this.message.from === App.user) {
			user.textContent = 'Вы';
		} else {
			user.textContent = this.message.from;
		}
	}
}
