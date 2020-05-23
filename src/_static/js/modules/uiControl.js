import {site, modalControl, sesam, sesamCollapse, callerName } from './index.js';

const status = new callerName('uiControl');

export const uiControl = {
    initialize() {
        status.init();
        
        this.cache();
        this.homeNavCollapse();
    },
    
    cache() {
        status.add('cache');
        this.navbarNav = site.homeNav.querySelector('.navbar-nav');
    },
    
    homeNavCollapse() {
        // status.log(sesamCollapse.dimensions.get('homeNav'));
    }
}