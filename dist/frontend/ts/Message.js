// eslint-disable-next-line import/no-cycle
import App from './App';
var Message = /** @class */ (function () {
    function Message(container, message) {
        this.container = container;
        this.message = message;
    }
    Object.defineProperty(Message, "selectorDate", {
        get: function () {
            return '.date_message';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Message, "selectorUser", {
        get: function () {
            return '.user_message';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Message, "selectorText", {
        get: function () {
            return '.text_message';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Message, "markup", {
        get: function () {
            return "\n\t\t\t<div class=\"message\">\n\t\t\t\t<div class=\"title_message\">\n\t\t\t\t\t<div class=\"user_message\"></div>\n\t\t\t\t\t<div class=\"date_message\"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"text_message\"></div>\n\t\t\t</div>\n\t\t";
        },
        enumerable: false,
        configurable: true
    });
    Message.prototype.bindToDOM = function () {
        if (this.message.from === App.user) {
            this.container.classList.add('ml-25');
        }
        else {
            this.container.classList.add('mr-25');
        }
        this.container.innerHTML = Message.markup;
        var date = this.container.querySelector(Message.selectorDate);
        var user = this.container.querySelector(Message.selectorUser);
        var text = this.container.querySelector(Message.selectorText);
        user.classList.add('current-user');
        date.textContent = this.message.date;
        text.textContent = this.message.text;
        if (this.message.from === App.user) {
            user.textContent = 'Вы';
        }
        else {
            user.textContent = this.message.from;
        }
    };
    return Message;
}());
export default Message;
//# sourceMappingURL=Message.js.map