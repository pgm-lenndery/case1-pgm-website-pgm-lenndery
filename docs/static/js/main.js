import {fetchPage} from './modules/index.js';
import {site} from './app.js';
import {sesamCollapse, sesam} from 'https://unpkg.com/sesam-collapse';

export const main = {
    initialize() {
        this.cache();
        
        if (window.location.href != `${window.location.origin}/${this.sitePrefix}/`) {
            console.log('is not');
            // modalControl.displayPageModalByUrl();
            
            fetch(`${origin}/${main.sitePrefix}/`)
            .then(response => response.text())
            .then(text => {
                document.open();
                document.write(text);
                document.close();
            })
            .then(async () => {
                sesamCollapse.initialize();
                const pageData = await fetchPage(`${origin}/${main.sitePrefix}${window.location.pathname.replace(main.sitePrefix,'')}`);
                
                document.querySelector('[data-sesam-target="page"] .modal-content-wrapper').innerHTML = `
                    <div class="modal-controls">
                        <div data-action="modalClose"><i data-feather="x"></i></div>
                        <div data-action="modalHide"><i data-feather="minus"></i></div>
                    </div>
                    <div class="modal-content-header d-none">
                        <img height="100%" width="100%" src="https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/images/cases/quiz/thumb.jpg" alt="">
                    </div>
                    <div class="modal-content-body">
                        ${pageData}
                    </div>
                `;
                
                feather.replace();
                
                await sesam({
                    target: 'page',
                    action: 'show',
                    modal: {
                        backdrop: true,
                        scrollBlock: true
                    }
                });
                
                site.start();
            });    
        } else {
            window.onload = site.initialize() && site.start();
        }
    },
    
    cache() {
        this.sitePrefix = 'case1-pgm-website-pgm-lenndery';
    }
}

main.initialize();