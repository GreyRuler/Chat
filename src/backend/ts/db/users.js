"use strict";
exports.__esModule = true;
var users = {
    data: [],
    listeners: [],
    add: function (item, status) {
        if (status === void 0) { status = true; }
        this.data.push(item);
        this.listeners.forEach(function (handler) { return handler(item, status); });
    },
    remove: function (item, status) {
        if (status === void 0) { status = false; }
        this.data = this.data.filter(function (user) { return user !== item; });
        this.listeners.forEach(function (handler) { return handler(item, status); });
    },
    listen: function (handler) {
        this.listeners.push(handler);
    }
};
exports["default"] = users;
