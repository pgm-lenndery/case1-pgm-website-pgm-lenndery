import {fetchPage, routingControl, uiControl, modalControl} from './modules/index.js';
import {site} from './app.js';
import {sesamCollapse, sesam} from './modules/sesamCollapse.js';

export const main = {
    initialize() {
        this.cache();
        
        if (window.location.href != `${window.location.origin}/${this.SITE_PREFIX}/` && window.location.href.includes(`${this.SITE_PREFIX}/#`) == false) {
            let originalPage = document.querySelector('main');
            const indexed = originalPage.querySelectorAll('#mainContent h3, #mainContent h4, #mainContent h5');
            
            const originalPageTitle = originalPage.querySelector('.modal-title').innerHTML;
            (async () => {
                let response = await fetch(`${origin}/${main.SITE_PREFIX}/`);
                let page = response.text();
                
                document.body.innerHTML = await page;
                document.body.querySelectorAll('link, meta').forEach(i => {i.remove()})
                
                modalControl.cache();
                modalControl.$pageModalWrapper.innerHTML = `
                    <div class="modal-content-header d-none">
                        <img height="100%" width="100%" src="https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/images/cases/quiz/thumb.jpg" alt="">
                    </div>
                    <div class="modal-content-body">
                        ${originalPage.innerHTML}
                    </div>
                `;
                
                modalControl.$pageModalCrumbs.innerHTML = routingControl.breadCrumbs({
                    char: '❯',
                    pageTitle: originalPageTitle
                });
                
                // modalControl.cache();
                // document.querySelector('[data-sesam-target="page"] #pageIndex').innerHTML = uiControl.pageIndexing(indexed).outerHTML;
                
                sesamCollapse.initialize(), site.initialize(), site.start(), site.arrowButtons();;
                feather.replace();
                sesam({
                    target: 'page',
                    action: 'show',
                    modal: {
                        backdrop: true,
                        scrollBlock: true
                    }
                });
            })()          
        } else {
            sesamCollapse.initialize();
            site.initialize() && site.start();
        }
    },
    
    cache() {
        this.SITE_PREFIX = 'case1-pgm-website-pgm-lenndery';
    }
}

main.initialize();