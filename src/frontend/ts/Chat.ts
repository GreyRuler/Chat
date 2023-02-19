// eslint-disable-next-line import/no-cycle
import App from './App';
import { IMessage } from '../../types/IMessage';
// eslint-disable-next-line import/no-cycle
import Message from './Message';

export default class Chat {
	private container: HTMLElement;

	static get selectorUsersChat() {
		return '.users_chat';
	}

	static get selectorMessagesChat() {
		return '.messages_chat';
	}

	static get selectorMessageChat() {
		return '.message_chat';
	}

	static get markup() {
		return `
			<div class="chat">
				<ul class="users_chat col-4 mb-0 list-group"></ul>
				<div class="info_chat col-8">
					<div class="messages_chat"></div>
					<input class="message_chat form-control">
				</div>
			</div>
		`;
	}

	constructor(container: HTMLElement) {
		this.container = container;
	}

	async bindToDOM() {
		this.container.innerHTML = Chat.markup;

		const usersChat = this.container.querySelector(
			Chat.selectorUsersChat
		) as HTMLElement;
		const messageChat = this.container.querySelector(
			Chat.selectorMessageChat
		) as HTMLInputElement;
		const chat = this.container.querySelector(
			Chat.selectorMessagesChat
		) as HTMLElement;

		const ws = new WebSocket('ws://localhost:7070/ws');
		// const ws = new WebSocket('wss://test-t7m0.onrender.com/ws');
		messageChat.addEventListener('keyup', (event) => {
			if (event.key === 'Enter') {
				const message = messageChat.value;

				if (!message) return;

				const data = JSON.stringify({
					user: App.user,
					message
				});

				ws.send(data);

				messageChat.value = '';
			}
		});

		ws.addEventListener('open', () => {
			const data = JSON.stringify({
				request: 'NEW_USER',
				user: App.user
			});
			ws.send(data);
		});

		ws.addEventListener('message', (e) => {
			const data = JSON.parse(e.data);
			const { request } = data;
			switch (request) {
				case 'USERS': {
					const { users } = data;
					usersChat.innerHTML = '';
					users.forEach((item: string) => {
						const li = document.createElement('li');
						li.classList.add('list-group-item');
						if (item === App.user) {
							li.textContent = 'Вы';
							li.classList.add('current-user');
						} else {
							li.textContent = item;
						}
						usersChat.appendChild(li);
					});
					break;
				}
				default: {
					const { chat: messages } = data;

					messages.forEach((item: IMessage) => {
						const messageEl = document.createElement('div');
						const message = new Message(messageEl, item);
						message.bindToDOM();
						chat.append(messageEl);
					});
				}
			}
		});
	}
}
