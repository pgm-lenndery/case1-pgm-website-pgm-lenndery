import {fetchPage} from './modules/index.js';
import {site} from './app.js';
import {sesamCollapse, sesam} from './modules/sesamCollapse.js';

export const main = {
    initialize() {
        this.cache();
        
        if (window.location.href != `${window.location.origin}/${this.sitePrefix}/`) {
            const originalPage = document.querySelector('main').innerHTML;
            (async () => {
                let response = await fetch(`${origin}/${main.sitePrefix}/`);
                let page = response.text();
                // const temp = document.createElement('template');
                // temp.innerHTML = page;
                // document.body.appendChild(temp);
                document.body.innerHTML = await page;
                document.body.querySelectorAll('link, meta').forEach(i => {
                    i.remove();
                })
                site.initialize();
                site.start();
                
                document.querySelector('[data-sesam-target="page"] .modal-content-wrapper').innerHTML = `
                    <div class="modal-controls">
                        <div data-action="modalClose"><i data-feather="x"></i></div>
                        <div data-action="modalHide"><i data-feather="minus"></i></div>
                    </div>
                    <div class="modal-content-header d-none">
                        <img height="100%" width="100%" src="https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/images/cases/quiz/thumb.jpg" alt="">
                    </div>
                    <div class="modal-content-body">
                        ${originalPage}
                    </div>
                `;
                
                feather.replace();
                sesamCollapse.initialize();
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
        this.sitePrefix = 'case1-pgm-website-pgm-lenndery';
    }
}

main.initialize();