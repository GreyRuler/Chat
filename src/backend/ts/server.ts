import * as WS from 'ws';
import * as http from 'http';
import Koa from 'koa';
import cors from '@koa/cors';
import { IMessage } from '../../types/IMessage';
import router from './routes';

const app = new Koa();
const port = 7070;

app.use(cors());
app.use(router());

const server = http.createServer(app.callback()).listen(port);

const chat: IMessage[] = [];
const wsServer = new WS.Server({
	server
});
wsServer.on('connection', (ws) => {
	ws.on('message', (rawData: string) => {
		const data = JSON.parse(rawData);
		const date = new Date();
		const currentDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
		const message = {
			from: data.user,
			date: currentDate,
			text: data.message
		};
		chat.push(message);

		const eventData = JSON.stringify({ chat: [message] });

		Array.from(wsServer.clients)
			.filter((client) => client.readyState === WS.OPEN)
			.forEach((client) => client.send(eventData));
	});

	ws.send(JSON.stringify({ chat }));
});
