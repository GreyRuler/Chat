import combineRouters from 'koa-combine-routers';
import users from './users';
import sse from './sse';

const router = combineRouters(
	// @ts-ignore
	users,
	sse
);

export default router;
