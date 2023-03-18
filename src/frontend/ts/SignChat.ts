import Chat from './Chat';
import App from './App';

export default class SignChat {
	private container: HTMLElement;

	private readonly apiUrl: string = 'http://localhost:7070';
	// private readonly apiUrl: string = 'https://chat-z5j3.onrender.com';

	static get selectorInput() {
		return 'input';
	}

	static get selectorValidInput() {
		return '.invalid-feedback';
	}

	static get selectorBtnNext() {
		return '.btn_signChat';
	}

	static get markup() {
		return `
			<div class="signChat">
				<div>Выберите псевдоним</div>
				<input class="form-control input_signChat" type="text">
				<div class="invalid-feedback">
				  Все хорошо!
				</div>
				<button class="btn btn-outline-secondary btn_signChat" type="button">
					Продолжить
				</button>
			</div>
		`;
	}

	constructor(container: HTMLElement) {
		this.container = container;
	}

	bindToDOM() {
		this.container.innerHTML = SignChat.markup;

		this.subscribe();
	}

	clear() {
		this.container.innerHTML = '';
	}

	subscribe() {
		const btnSubmit = this.container.querySelector(
			SignChat.selectorBtnNext
		) as HTMLElement;
		const input = this.container.querySelector(
			SignChat.selectorInput
		) as HTMLInputElement;
		const validFeedback = this.container.querySelector(
			SignChat.selectorValidInput
		) as HTMLInputElement;

		btnSubmit.addEventListener('click', async () => {
			const user = input.value;
			if (!user) return;
			btnSubmit.classList.add('block-event')
			const response = await fetch(`${this.apiUrl}/users/${user}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const { check } = await response.json();
			if (check) {
				App.user = user;
				this.clear();
				const chat = new Chat(
					document.querySelector('#app') as HTMLElement
				);
				await chat.bindToDOM();
			} else {
				input.classList.add('is-invalid');
				btnSubmit.classList.remove('block-event')
				validFeedback.textContent = 'Такой псевдоним уже занят';
			}
		});
	}
}
