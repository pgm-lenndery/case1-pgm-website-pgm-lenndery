import {site, modalControl, sesam, sesamCollapse, callerName } from './index.js';

const status = new callerName('uiControl');

export const uiControl = {
    initialize() {
        status.init();
        
        this.cache();
    },
    
    cache() {
        status.add('cache');

    },
}