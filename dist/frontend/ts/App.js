// eslint-disable-next-line import/no-cycle
import SignChat from './SignChat';
var App = /** @class */ (function () {
    function App() {
    }
    App.init = function () {
        this.app = document.querySelector('#app');
        var chat = new SignChat(this.app);
        chat.bindToDOM();
    };
    return App;
}());
export default App;
//# sourceMappingURL=App.js.map