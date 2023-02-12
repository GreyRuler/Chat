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
import Chat from './Chat';
// eslint-disable-next-line import/no-cycle
import App from './App';
var SignChat = /** @class */ (function () {
    function SignChat(container) {
        this.container = container;
    }
    Object.defineProperty(SignChat, "selectorInput", {
        get: function () {
            return 'input';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignChat, "selectorValidInput", {
        get: function () {
            return '.invalid-feedback';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignChat, "selectorBtnNext", {
        get: function () {
            return '.btn_signChat';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignChat, "markup", {
        get: function () {
            return "\n\t\t\t<div class=\"signChat\">\n\t\t\t\t<div>\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0441\u0435\u0432\u0434\u043E\u043D\u0438\u043C</div>\n\t\t\t\t<input class=\"form-control input_signChat\" type=\"text\">\n\t\t\t\t<div class=\"invalid-feedback\">\n\t\t\t\t  \u0412\u0441\u0435 \u0445\u043E\u0440\u043E\u0448\u043E!\n\t\t\t\t</div>\n\t\t\t\t<button class=\"btn btn-outline-secondary btn_signChat\" type=\"button\">\n\t\t\t\t\t\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t";
        },
        enumerable: false,
        configurable: true
    });
    SignChat.prototype.bindToDOM = function () {
        var _this = this;
        this.container.innerHTML = SignChat.markup;
        var btnSubmit = this.container.querySelector(SignChat.selectorBtnNext);
        var input = this.container.querySelector(SignChat.selectorInput);
        var validFeedback = this.container.querySelector(SignChat.selectorValidInput);
        var api = new UserApi();
        btnSubmit.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
            var user, response, chat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = input.value;
                        if (!user)
                            return [2 /*return*/];
                        return [4 /*yield*/, api.add(user)];
                    case 1:
                        response = _a.sent();
                        if (!response) return [3 /*break*/, 3];
                        window.addEventListener('beforeunload', function () {
                            api.remove(user);
                        });
                        App.user = user;
                        this.clear();
                        chat = new Chat(document.querySelector('#app'));
                        return [4 /*yield*/, chat.bindToDOM()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        input.classList.add('is-invalid');
                        validFeedback.textContent = 'Такой псевдоним уже занят';
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    SignChat.prototype.clear = function () {
        this.container.innerHTML = '';
    };
    return SignChat;
}());
export default SignChat;
//# sourceMappingURL=SignChat.js.map