import Koa from 'koa';
import Router from '@koa/router';
import users from '../../db/users';

const router = new Router();

router.post('/users/:user', async (ctx: Koa.Context) => {
	const { user } = ctx.params;
	if (Array.from(users.values()).some((item) => item === user)) {
		ctx.response.body = { check: false };
		return;
	}
	ctx.response.body = { check: true };
});

export default router;
