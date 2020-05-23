import {callerName} from './index.js';

const status = new callerName('routingControl');

const routingControl = {
    initialize() {
        status.init();
        
        // window.history.pushState("object or string", "Title", "/new-url");
    }
}