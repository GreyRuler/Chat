"use strict";
exports.__esModule = true;
var router_1 = require("@koa/router");
var users_1 = require("../../db/users");
var router = new router_1["default"]();
router.get('/users', function (ctx) {
    ctx.response.body = { users: users_1["default"].data };
});
router.post('/users/:user', function (ctx) {
    var user = ctx.params.user;
    if (users_1["default"].data.some(function (item) { return item === user; })) {
        ctx.response.body = { status: false };
        return;
    }
    users_1["default"].add(user);
    ctx.response.body = { status: true };
});
router["delete"]('/users/:user', function (ctx) {
    var user = ctx.params.user;
    users_1["default"].remove(user);
});
exports["default"] = router;
