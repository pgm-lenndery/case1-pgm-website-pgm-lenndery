import {sesamCollapse, sesam, listeners, callerName, fetchAPI, fetchPage} from './index.js';
import {site} from '../app.js'
import {main} from '../main.js'

const status = new callerName('modalControl');

export const modalControl = {
    initialize() {
        status.init();
        
        this.cache();
    },
    
    cache() {
        status.add('cache');
        this.tabs = document.querySelector('[data-label="tabs"]')
    },

    createTab({title, sesamName}) {
        const checks = [];
        this.tabs.querySelectorAll('.tab').forEach(tab => {
            checks.push(tab.dataset.tabTrigger == sesamName)
        }); 
        
        if (checks.includes(true) == false) {
            const tab = document.createElement('div');
            tab.classList.add('tab','animated', 'slideInUp', 'faster');
            tab.setAttribute('data-tab-trigger',sesamName);
            tab.innerHTML = `
                <i data-feather="plus"></i>
                <span class="tab-title">${title}</span>
            `;
            tab.title = title;
            this.tabs.appendChild(tab);
            feather.replace();
        } else {
            const existingTab = this.tabs.querySelector(`[data-tab-trigger="${sesamName}"]`);
            existingTab.classList.remove('slideInUp', 'bounce');
            existingTab.classList.add('bounce');
            existingTab.addEventListener('animationend', () => {
                existingTab.classList.remove('bounce');
            })
        }
        
        // const tab = document.createElement('div');
        // tab.classList.add('tab','animated', 'slideInUp', 'faster');
        // tab.setAttribute('data-tab-trigger',sesamName);
        // tab.innerHTML = `
        //     <i data-feather="plus"></i>
        //     <span class="tab-title">${title}</span>
        // `;
        // this.tabs.appendChild(tab);
        // feather.replace();
    },
    
    removeTab({sesamName}) {
        const tabToRemove = this.tabs.querySelector(`[data-tab-trigger="${sesamName}"]`);
        if (tabToRemove != null) {
            tabToRemove.classList.add('slideOutDown');
            tabToRemove.addEventListener('animationend', () => {tabToRemove.remove()});
        }
    },
    
    modalClose({sesamTarget}) {
        sesam({
            target: sesamTarget,
            action: 'hide',
            modal: {
                backdrop: false,
                scrollBlock: false
            }
        });
        modalControl.removeTab({
            sesamName: sesamTarget
        });
    },
    
    modalHide({sesamTarget, title}) {
        sesam({
            target: sesamTarget,
            action: 'hide',
            modal: {
                backdrop: false,
                scrollBlock: false
            }
        })
        modalControl.createTab({
            title: title, 
            sesamName: sesamTarget
        })
    },
    
    renderModal({id}) {
        function idMatch(input) {
            return input.id == id;
        }
        
        const i = site.apiData.cases.cases.data.filter(idMatch)[0];
        document.querySelector('[data-sesam-target="test"] .modal-content-wrapper').innerHTML = `
            <div class="modal-controls">
                <div data-action="modalClose"><i data-feather="x"></i></div>
                <div data-action="modalHide"><i data-feather="minus"></i></div>
            </div>
            <div class="modal-content-header d-none">
                <img height="100%" width="100%" src="https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/images/cases/quiz/thumb.jpg" alt="">
            </div>
            <div class="modal-content-body">
                <div class="row p-7">
                    <div class="col-12 col-md-8">
                        <h2 class="modal-title font-rhode mb-5">${i.title}</h2>
                        <p class="text-modern">over deze opdracht</p>
                        <p>${i.about}</p>
                    </div>
                </div>
                <div class="bg-color-white text-color-black font-rhode px-7 py-2">
                    ${i.tags.join('<span class="word-joint">・</span>')}
                </div>
                <div class="row mx-0 box-b">
                    <div class="col-auto px-7 py-7">
                        <p class="text-modern">vak</p>
                        <p>web programming</p>
                        <p class="text-modern">academiejaar</p>
                        <p>${new Date(i.date)}</p>
                        <!-- if after september year +1 else -1 -->
                    </div>
                    <div class="col-auto pl-0 pr-7 py-7">
                        <p class="text-modern">technologieën</p>
                        <p>html, sass, javascript</p>
                        <p class="text-modern">studenten</p>
                        <p>Jaimy Van Gyseghem</p>
                    </div>
                    <div class="d-none d-lg-block col-3 pr-0 ml-auto">
                        <div class="box-l h-100">
                            <div class="filter-purple-rain position-relative">
                                <img class="h-100" style="max-width: 100%; max-height: 300px;" src="https://dl.airtable.com/.attachmentThumbnails/9e0a4860a1d429c55a0957a6a5cea48b/8a322593" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        feather.replace();
        
        sesam({
            target: 'test',
            action: 'show',
            modal: {
                backdrop: true,
                scrollBlock: true
            }
        });        
    },
    
    async displayPageModalByUrl() {       
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
    }
}