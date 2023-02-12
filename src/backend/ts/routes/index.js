"use strict";
exports.__esModule = true;
var koa_combine_routers_1 = require("koa-combine-routers");
var users_1 = require("./users");
var sse_1 = require("./sse");
var router = (0, koa_combine_routers_1["default"])(
// @ts-ignore
users_1["default"], sse_1["default"]);
exports["default"] = router;
