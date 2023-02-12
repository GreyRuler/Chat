import { streamEvents } from 'http-event-stream';
import { v4 } from 'uuid';
import Router from '@koa/router';
import users from '../../db/users';

const router = new Router();

router.get('/sse', async (ctx) => {
	await streamEvents(ctx.req, ctx.res, {
		async fetch() {
			return [];
		},
		stream(sse) {
			users.listen((item, status) => {
				sse.sendEvent({
					id: v4(), // id
					data: JSON.stringify({
						item,
						status
					})
				});
			});

			return () => {};
		}
	});

	ctx.respond = false;
});

export default router;
