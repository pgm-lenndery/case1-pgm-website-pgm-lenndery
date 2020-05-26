import {callerName, main, modalControl, fetchPage, site, uiControl} from './index.js';
import { sesam, sesamCollapse } from './sesamCollapse.js';

const status = new callerName('routingControl');
modalControl

export const routingControl = {
    initialize() {
        status.init();
        this.cache();
        this.getUrlOnScroll()
        if (window.location.hash.includes('#/') == true) this.scrollToUrl();
        
        this.replaceInternalLinks();
    },
    
    cache() {
        status.add('cache');
        const siteURL = window.location.origin;

        this.$internalLinks = document.querySelectorAll(`a[href*="${siteURL}"], a[href^="/"], a[href^="./"], a[href^="../"], a[href^="#"]`);
    },
    
    getUrlOnScroll() {
        status.add('observer');
        
        // source: https://medium.com/@filipvitas/lazy-load-images-with-zero-javascript-2c5bcb691274
        
        let hrefSections = document.querySelectorAll('[data-section-href]');

        const interactSettings = {
            threshold: 0.4
        }

        const onIntersection = (sections) => {
            sections.forEach(section => {
                if (section.isIntersecting) {
                    window.history.pushState({urlPath: ''}, '', `#/${section.target.dataset.sectionHref}`);
                }
            })
        }
        let observer = new IntersectionObserver(onIntersection, interactSettings)

        hrefSections.forEach(sections => {
            observer.observe(sections);
        })
    },
    
    scrollToUrl() {
        const section = document.querySelector(`[data-section-href="${window.location.hash.replace('#/','')}"]`);
        section.scrollIntoView();
    },
    
    breadCrumbs({char, pageTitle}) {
        status.add('breadCrumbs');
        
        char == undefined ? char = '・' : null;
        let location = window.location.pathname;
        location = location.replace(`/${main.SITE_PREFIX}`,'').split('/').filter(item => item);
        location.splice(1, 1, pageTitle);
        location.unshift('pgm.gent');
        location = location.join(`<span class="word-joint">${char}</span>`);
        return location;
    },
    
    replaceInternalLinks() {
        this.$internalLinks.forEach(i => {
            i.outerHTML = i.outerHTML.replace('href','data-href');
        });
    },
    
    openInternalLink(event) {
        status.add('openInternalLink');
        const requestedUrl = event.dataset.href;
        const currentUrl = site.removeTrailingSlash(window.location.pathname);
        
        if (requestedUrl == window.location.pathname) {
            // page is already fetched
            
            sesam({
                target: 'page',
                action: 'show',
                modal: {
                    backdrop: true,
                    scrollBlock: true
                }
            });
            modalControl.removeTab({sesamName: 'page'});
        } else {
            // page has to be fetched
            
            fetchPage(requestedUrl).then(content => {
                let page = document.createElement('template');
                page.innerHTML = content;
                return page.content.cloneNode(true).querySelector('main');
            }).then(page => {
                modalControl.$pageModal.innerHTML = `
                    <div class="modal-content-body">
                        ${page.innerHTML}
                    </div>
                `;
                
                window.history.pushState({urlPath: ''}, '', requestedUrl);
                uiControl.initialize();
                
                console.log(sesamCollapse.states.get('page'))
                modalControl.removeTab({sesamName: 'page'});
                // if (sesamCollapse.states.get('page') != 'hidden') {
                //     modalControl.removeTab({sesamName: 'page'});
                // }
                
                sesam({
                    target: 'page',
                    action: 'show',
                    modal: {
                        backdrop: true,
                        scrollBlock: true
                    }
                })
            }).catch(error => status.log(error));
        }  
    }
}