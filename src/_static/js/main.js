import {fetchPage, routingControl} from './modules/index.js';
import {site} from './app.js';
import {sesamCollapse, sesam} from './modules/sesamCollapse.js';

export const main = {
    initialize() {
        this.cache();
        
        if (window.location.href != `${window.location.origin}/${this.SITE_PREFIX}/` && window.location.href.includes(`${this.SITE_PREFIX}/#`) == false) {
            const originalPage = document.querySelector('main').innerHTML;
            let originalPageTitle = document.createElement('template');
            originalPageTitle.innerHTML = originalPage;
            originalPageTitle = originalPageTitle.content.cloneNode(true).querySelector('.modal-title').innerHTML;
            
            (async () => {
                let response = await fetch(`${origin}/${main.SITE_PREFIX}/`);
                let page = response.text();

                document.body.innerHTML = await page;
                document.body.querySelectorAll('link, meta').forEach(i => {i.remove()})
                
                document.querySelector('[data-sesam-target="page"] .modal-content-wrapper').innerHTML = `
                    <div class="modal-content-header d-none">
                        <img height="100%" width="100%" src="https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/images/cases/quiz/thumb.jpg" alt="">
                    </div>
                    <div class="modal-content-body">
                        ${originalPage}
                    </div>
                `;
                document.querySelector('[data-sesam-target="page"] .modal-breadcrumbs').innerHTML = routingControl.breadCrumbs({
                    char: '❯',
                    pageTitle: originalPageTitle
                });
                
                sesamCollapse.initialize(), site.initialize(), site.start();
                feather.replace();
                sesam({
                    target: 'page',
                    action: 'show',
                    modal: {
                        backdrop: true,
                        scrollBlock: true
                    }
                });
                site.arrowButtons();
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