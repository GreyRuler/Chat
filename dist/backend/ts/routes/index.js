import combineRouters from 'koa-combine-routers';
import users from './users';
import sse from './sse';
var router = combineRouters(
// @ts-ignore
users, sse);
export default router;
//# sourceMappingURL=index.js.map