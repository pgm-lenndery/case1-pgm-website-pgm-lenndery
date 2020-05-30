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
        
        // this.replaceInternalLinks();
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
        
        let location = site.removeTrailingSlash(window.location.pathname);
        
        // remove site prefix from path and remove empty array values
        location = location.replace(`/${main.SITE_PREFIX}`,'').split('/').filter(item => item);
        location.splice(1, 1, pageTitle);
        location.unshift('pgm.gent');
        let dom = location.map((i, index) => {
            i = i.toLowerCase();
            return `<a href="/${main.SITE_PREFIX}/${location.slice(1, index+1).join('/')}" class="font-rhode">${i}</a>`
        });
        dom = dom.join(`<span class="word-joint">${char}</span>`);
        return dom;
    },
    
    openInternalLink(event) {
        status.add('openInternalLink');
        const requestedUrl = site.removeTrailingSlash(event.href);
        const currentUrl = site.removeTrailingSlash(window.location.pathname);
        
        if (requestedUrl == currentUrl) {
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
        } else if (requestedUrl.endsWith(`${window.location.origin}/${main.SITE_PREFIX}`) == true) {
            window.history.pushState({urlPath: ''}, '', `${window.location.origin}/${main.SITE_PREFIX}/`);
            sesam({
                target: 'page',
                action: 'hide',
                modal: {
                    backdrop: false,
                    scrollBlock: false
                }
            });
        } else {
            // page has to be fetched
            fetchPage(requestedUrl).then(content => {
                let page = document.createElement('template');
                page.innerHTML = content;
                return {
                    pageContent: page.content.cloneNode(true).querySelector('main').innerHTML,
                    pageTitle: page.content.cloneNode(true).querySelector('.modal-title').innerHTML
                };
            }).then(page => {
                modalControl.$pageModal.innerHTML = `
                    <div class="modal-content-body">
                        ${page.pageContent}
                    </div>
                `;
                
                window.history.pushState({urlPath: ''}, '', requestedUrl);
                document.querySelector('[data-sesam-target="page"] .modal-breadcrumbs').innerHTML = this.breadCrumbs({char: '❯', pageTitle: page.pageTitle});
                uiControl.initialize();
                
                modalControl.removeTab({sesamName: 'page'});
                sesam({
                    target: 'page',
                    action: 'show',
                    modal: {
                        backdrop: true,
                        scrollBlock: true
                    }
                });
            }).then(() => {
                this.replaceInternalLinks();
            }).catch(error => status.log(error));
        }  
    }
}