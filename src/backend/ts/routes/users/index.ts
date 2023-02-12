import Koa from 'koa';
import Router from '@koa/router';
import users from '../../db/users';

const router = new Router();

router.post('/users/:user', (ctx: Koa.Context) => {
	const { user } = ctx.params;
	if (users.data.some((item) => item === user)) {
		ctx.response.body = { status: false };
		return;
	}
	users.add(user);
	ctx.response.body = { status: true };
});

router.get('/users', (ctx: Koa.Context) => {
	ctx.response.body = { users: users.data };
});

export default router;
