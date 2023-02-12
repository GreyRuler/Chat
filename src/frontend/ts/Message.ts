import { IMessage } from '../../types/IMessage';
import App from './App';

export default class Message {
	private container: HTMLElement;

	private message: IMessage;

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

	constructor(container: HTMLElement, message: IMessage) {
		this.container = container;
		this.message = message;
	}

	bindToDOM() {
		if (this.message.from === App.user) {
			this.container.classList.add('ml-25');
		} else {
			this.container.classList.add('mr-25');
		}
		this.container.innerHTML = Message.markup;

		const date = this.container.querySelector(
			Message.selectorDate
		) as HTMLElement;
		const user = this.container.querySelector(
			Message.selectorUser
		) as HTMLElement;
		const text = this.container.querySelector(
			Message.selectorText
		) as HTMLElement;

		user.classList.add('current-user');

		date.textContent = this.message.date;
		user.textContent = this.message.from;
		text.textContent = this.message.text;
	}
}
