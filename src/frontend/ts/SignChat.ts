import UserApi from './UserApi';
// eslint-disable-next-line import/no-cycle
import Chat from './Chat';
// eslint-disable-next-line import/no-cycle
import App from './App';

export default class SignChat {
	private container: HTMLElement;

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
		const btnSubmit = this.container.querySelector(
			SignChat.selectorBtnNext
		) as HTMLElement;
		const input = this.container.querySelector(
			SignChat.selectorInput
		) as HTMLInputElement;
		const validFeedback = this.container.querySelector(
			SignChat.selectorValidInput
		) as HTMLInputElement;

		const api = new UserApi();

		btnSubmit.addEventListener('click', async () => {
			const user = input.value;
			if (!user) return;
			const response = await api.add(user);
			if (response) {
				window.addEventListener('beforeunload', () => {
					api.remove(user);
				});
				App.user = user;
				this.clear();
				const chat = new Chat(
					document.querySelector('#app') as HTMLElement
				);
				await chat.bindToDOM();
			} else {
				input.classList.add('is-invalid');
				validFeedback.textContent = 'Такой псевдоним уже занят';
			}
		});
	}

	clear() {
		this.container.innerHTML = '';
	}
}
