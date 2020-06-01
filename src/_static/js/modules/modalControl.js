import {sesamCollapse, sesam, listeners, callerName, fetchAPI, fetchPage, routingControl} from './index.js';
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
        this.tabs = document.querySelector('[data-label="tabs"]');
        this.$pageModal = document.querySelector('[data-sesam-target="page"]');
        this.$pageModalWrapper = document.querySelector('[data-sesam-target="page"] .modal-content-wrapper');
        this.$pageModalCrumbs = document.querySelector('[data-sesam-target="page"] .modal-breadcrumbs');
    },

    createTab({title, sesamName}) {
        const currentPath = site.removeTrailingSlash(window.location.pathname);
        
        const checks = [];
        this.tabs.querySelectorAll('.tab').forEach(tab => {
            checks.push(tab.dataset.tabTrigger == sesamName)
        }); 
        
        if (checks.includes(true) == false) {
            const tab = document.createElement('div');
            tab.classList.add('tab','animated', 'slideInUp', 'lightspeed');
            tab.setAttribute('data-tab-trigger',sesamName);
            tab.setAttribute('data-tab-href',currentPath);
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
    },
    
    removeTab({sesamName}) {
        const tabToRemove = this.tabs.querySelector(`[data-tab-trigger="${sesamName}"]`);
        if (tabToRemove != null) {
            tabToRemove.classList.add('slideOutDown');
            tabToRemove.addEventListener('animationend', () => {tabToRemove.remove()});
        }
    },
    
    openTab({tabHref}) {
        window.history.pushState({urlPath: ''}, '', tabHref);
        console.log('tab opened', tabHref.replace(`/${main.SITE_PREFIX}`, ''));
    },
    
    modalClose({sesamTarget}) {
        status.add('modalClose');
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
        routingControl.homeUrlInAddressBar();
    },
    
    modalHide({sesamTarget, title}) {
        status.add('modalHide');
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
        routingControl.homeUrlInAddressBar();
    },
    
    renderModal({id}) {
        status.add('renderModal')

        function idMatch(input) {return input.id == id};
        
        const i = site.apiData.cases.cases.data.filter(idMatch)[0];
        status.log(i)
        document.querySelector('[data-sesam-target="project"] .modal-content-wrapper').innerHTML = `
            <div class="modal-content-header box-b">
                <img height="100%" width="100%" src="${i.img.tumbnail}" alt="">
            </div>
            <div class="modal-content-body">
                <div class="container-fluid py-7">
                    <div class="row">
                        <div class="col-12"><h2 class="modal-title font-rhode mb-5">${i.title}</h2></div>
                        <div class="col-12 col-md-6 col-lg-8">
                            <p class="text-modern">over deze opdracht</p>
                            <p>${i.about}</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae at accusamus sed impedit veritatis, dolorem quam. Distinctio, aliquam.</p>
                            <p>Saepe placeat fugit expedita delectus ea distinctio modi assumenda molestiae debitis, ut soluta eveniet enim perferendis nisi voluptatum ipsum aspernatur accusantium quaerat repudiandae iste quas dignissimos aperiam iusto. Quae, laborum ullam earum nulla iure corporis ex optio quos? Reiciendis eos ex facilis?</p>
                        </div>
                        <div class="col-12 col-md-6 col-lg-4">
                            <p>
                                <span class="text-modern">vak</span><br>
                                ${i.course}
                            </p>
                            <p>
                                <span class="text-modern">academiejaar</span><br>
                                ${new Date(i.date)}
                                <!-- if after september year +1 else -1 -->
                            </p>
                            <p>
                                <span class="text-modern">technologieën</span><br>
                                html, sass, javascript
                            </p>
                            <p>
                                <span class="text-modern">studenten</span><br>
                                Jaimy Van Gyseghem
                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-color-white text-color-black font-rhode container-fluid py-2">
                    ${i.tags.join('<span class="word-joint">・</span>')}
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="modal-gallery glide mt-6">
                            <div class="glide__track" data-glide-el="track">
                                <ul class="glide__slides box-offset-l">
                                    ${this.renderProjectGallery(i.img.gallery)}
                                </ul>
                            </div>
                            <div class="glide__arrows container-fluid pl-0 py-2 d-flex justify-content-between" data-glide-el="controls">
                                <button class="glide__arrow glide__arrow--left ml-2" data-glide-dir="<"><i data-feather="arrow-left"></i></button>
                                <button class="glide__arrow glide__arrow--right mr-2" data-glide-dir=">"><i data-feather="arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        feather.replace();
        sesam({
            target: 'project',
            action: 'show',
            modal: {
                backdrop: true,
                scrollBlock: true
            }
        });        
    },
    
    renderProjectGallery(input) {
        let tempStr = '';
        
        input.forEach(i => {
            tempStr += `
                <li class="glide__slide container-fluid pl-0">
                    <img class="box-all" src="${i.url}" width="100%" alt="afbeelding van project">
                </li>
            `;
        })
        
        return tempStr;
    },
    
    async renderModalFromVisitedUrl() {       
        fetch(`${origin}/${main.SITE_PREFIX}/`)
        .then(response => response.text())
        .then(text => {
            document.open();
            document.write(text);
            document.close();
        })
        .then(async () => {
            sesamCollapse.initialize();
            const pageData = await fetchPage(`${origin}/${main.SITE_PREFIX}${window.location.pathname.replace(main.SITE_PREFIX,'')}`);
            
            this.$pageModalWrapper.innerHTML = `
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
    },
}