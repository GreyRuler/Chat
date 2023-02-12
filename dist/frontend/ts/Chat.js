var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import UserApi from './UserApi';
// eslint-disable-next-line import/no-cycle
import App from './App';
// eslint-disable-next-line import/no-cycle
import Message from './Message';
var Chat = /** @class */ (function () {
    function Chat(container) {
        this.container = container;
    }
    Object.defineProperty(Chat, "selectorUsersChat", {
        get: function () {
            return '.users_chat';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Chat, "selectorUserChat", {
        get: function () {
            return '.users_chat li';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Chat, "selectorMessagesChat", {
        get: function () {
            return '.messages_chat';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Chat, "selectorMessageChat", {
        get: function () {
            return '.message_chat';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Chat, "markup", {
        get: function () {
            return "\n\t\t\t<div class=\"chat\">\n\t\t\t\t<ul class=\"users_chat col-4 mb-0 list-group\"></ul>\n\t\t\t\t<div class=\"info_chat col-8\">\n\t\t\t\t\t<div class=\"messages_chat\"></div>\n\t\t\t\t\t<input class=\"message_chat form-control\">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t";
        },
        enumerable: false,
        configurable: true
    });
    Chat.prototype.bindToDOM = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userApi, usersChat, messageChat, chat, users, ws, eventSource;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.container.innerHTML = Chat.markup;
                        userApi = new UserApi();
                        usersChat = this.container.querySelector(Chat.selectorUsersChat);
                        messageChat = this.container.querySelector(Chat.selectorMessageChat);
                        chat = this.container.querySelector(Chat.selectorMessagesChat);
                        return [4 /*yield*/, userApi.list()];
                    case 1:
                        users = _a.sent();
                        users.forEach(function (user) {
                            var li = document.createElement('li');
                            li.classList.add('list-group-item');
                            if (user === App.user) {
                                li.textContent = 'Вы';
                                li.classList.add('current-user');
                            }
                            else {
                                li.textContent = user;
                            }
                            usersChat.appendChild(li);
                        });
                        ws = new WebSocket('ws://localhost:7070/ws');
                        messageChat.addEventListener('keyup', function (event) {
                            if (event.key === 'Enter') {
                                var message = messageChat.value;
                                if (!message)
                                    return;
                                var data = JSON.stringify({
                                    user: App.user,
                                    message: message
                                });
                                ws.send(data);
                                messageChat.value = '';
                            }
                        });
                        ws.addEventListener('message', function (e) {
                            var data = JSON.parse(e.data);
                            var messages = data.chat;
                            messages.forEach(function (item) {
                                var messageEl = document.createElement('div');
                                var message = new Message(messageEl, item);
                                message.bindToDOM();
                                chat.append(messageEl);
                            });
                        });
                        eventSource = new EventSource('http://localhost:7070/sse');
                        eventSource.addEventListener('message', function (e) {
                            var _a = JSON.parse(e.data), user = _a.item, status = _a.status;
                            if (status) {
                                var li = document.createElement('li');
                                li.textContent = user;
                                li.classList.add('list-group-item');
                                usersChat.appendChild(li);
                            }
                            else {
                                var usersEl = usersChat.querySelectorAll(Chat.selectorUserChat);
                                _this.removeUserFromList(user, Array.from(usersEl));
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    // eslint-disable-next-line class-methods-use-this
    Chat.prototype.removeUserFromList = function (user, users) {
        var _a;
        (_a = users.find(function (item) { return item.textContent === user; })) === null || _a === void 0 ? void 0 : _a.remove();
    };
    return Chat;
}());
export default Chat;
//# sourceMappingURL=Chat.js.map