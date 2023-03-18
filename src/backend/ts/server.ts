import * as WS from 'ws';
import * as http from 'http';
import Koa from 'koa';
import cors from '@koa/cors';
import { Message } from '../../types/Message';
import router from './routes/users';
import users from './db/users';

const app = new Koa();
const port = 7070;

app.use(cors());
app.use(router.routes());

const chat: Message[] = [];

const server = http.createServer(app.callback()).listen(port);
const wsServer = new WS.Server({
	server
});

function sendAllUsers(data: string) {
	Array.from(wsServer.clients)
		.filter((client) => client.readyState === WS.OPEN)
		.forEach((client) => client.send(data));
}

wsServer.on('connection', (ws) => {
	ws.on('message', (rawData: string) => {
		const data = JSON.parse(rawData);
		const { request, user } = data;
		switch (request) {
			case 'NEW_USER': {
				users.set(ws, user);
				const eventData = JSON.stringify({
					users: Array.from(users.values()),
					request: 'USERS'
				});
				sendAllUsers(eventData);
				break;
			}
			default: {
				const date = new Date();
				const currentDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
				const message = {
					from: user,
					date: currentDate,
					text: data.message
				};
				chat.push(message);
				const eventData = JSON.stringify({
					chat: [message]
				});
				sendAllUsers(eventData);
				break;
			}
		}
	});

	ws.on('close', () => {
		users.delete(ws);
		const eventData = JSON.stringify({
			users: Array.from(users.values()),
			request: 'USERS'
		});
		sendAllUsers(eventData);
	});

	ws.send(JSON.stringify({ chat }));
});
