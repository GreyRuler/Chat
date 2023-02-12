import Router from '@koa/router';
import users from '../../db/users';
var router = new Router();
router.get('/users', function (ctx) {
    ctx.response.body = { users: users.data };
});
router.post('/users/:user', function (ctx) {
    var user = ctx.params.user;
    if (users.data.some(function (item) { return item === user; })) {
        ctx.response.body = { status: false };
        return;
    }
    users.add(user);
    ctx.response.body = { status: true };
});
router.delete('/users/:user', function (ctx) {
    var user = ctx.params.user;
    users.remove(user);
});
export default router;
//# sourceMappingURL=index.js.map