import UserApi from './UserApi';
// eslint-disable-next-line import/no-cycle
import App from './App';
import { IMessage } from '../../types/IMessage';
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

		const userApi = new UserApi();

		const usersChat = this.container.querySelector(
			Chat.selectorUsersChat
		) as HTMLElement;
		const messageChat = this.container.querySelector(
			Chat.selectorMessageChat
		) as HTMLInputElement;
		const chat = this.container.querySelector(
			Chat.selectorMessagesChat
		) as HTMLElement;

		const users = await userApi.list();
		users.forEach((user: string) => {
			const li = document.createElement('li');
			li.textContent = user;
			li.classList.add('list-group-item');
			if (user === App.user) li.classList.add('current-user');
			usersChat.appendChild(li);
		});

		const ws = new WebSocket('ws://localhost:7070/ws');
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

		ws.addEventListener('message', (e) => {
			const data = JSON.parse(e.data);
			const { chat: messages } = data;

			messages.forEach((item: IMessage) => {
				const messageEl = document.createElement('div');
				const message = new Message(messageEl, item);
				message.bindToDOM();
				chat.append(messageEl);
			});
		});

		const eventSource = new EventSource('http://localhost:7070/sse');

		eventSource.addEventListener('message', (e) => {
			const user = JSON.parse(e.data);
			const li = document.createElement('li');
			li.textContent = user;
			li.classList.add('list-group-item');
			usersChat.appendChild(li);
		});
	}
}
