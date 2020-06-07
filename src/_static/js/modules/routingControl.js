import {callerName, main, modalControl, fetchPage, site, uiControl, listeners} from './index.js';
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
    
    getUrlParams(parameter) {
        const url = new URL(window.location.href);
        return url.searchParams.get(parameter);
    },
    
    homeUrlInAddressBar() {
        status.log('homeUrlInAddressBar');
        const currentDomain = site.removeTrailingSlash(window.location.origin);
        window.history.pushState({urlPath: ''}, '', `${currentDomain}/${main.SITE_PREFIX}/`);
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
        
        // remove last item and add pagetitle
        location.pop();
        location.push(pageTitle.toLowerCase());
        location.unshift('pgm.gent');
        let dom = location.map((i, index) => {
            i = i.toLowerCase();
            return `<a href="/${main.SITE_PREFIX}/${location.slice(1, index+1).join('/').replace(/[^a-zA-Z0-9]/g, '-')}" class="font-rhode">${i.replace(/-/, ' ')}</a>`
        });
        dom = dom.join(`<span class="word-joint">${char}</span>`);
        return dom;
    },    
    
    openClickedAnker(event) {
        status.add('openClickedAnker');
        
        const 
            currentPath = site.removeTrailingSlash(window.location.pathname),
            currentDomain = site.removeTrailingSlash(window.location.origin),
            requestedUrl = site.removeTrailingSlash(event.href),
            requestedPath = site.removeTrailingSlash(event.href).replace(currentDomain, ''),
            requestedHash = requestedUrl.split('/').slice(-1)[0].split('#')[1],
            paramIs = routingControl.getUrlParams('is');

        if (requestedUrl.startsWith(currentDomain) == false) {
            // external url
            window.open(requestedUrl, "_blank")
        } else if (requestedUrl.startsWith(currentDomain) == true && requestedHash != undefined) {
            // scroll to id
            document.querySelector(`#${requestedHash}`).scrollIntoView({
                behavior: 'smooth'
            });
        } else if (requestedUrl == currentPath) {
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
        } else if (requestedUrl.endsWith(`${currentDomain}/${main.SITE_PREFIX}`) == true) {
            // hide modal if clicked link is home
            this.homeUrlInAddressBar();
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
                const page = document.createElement('template');
                page.innerHTML = content;
                
                return {
                    pageContent: page.content.cloneNode(true).querySelector('main'),
                    pageTitle: page.content.cloneNode(true).querySelector('.modal-title').innerHTML
                };
            }).then(page => {
                // pageindexing
                // const indexed = page.pageContent.querySelectorAll('#mainContent h3, #mainContent h4, #mainContent h5');
                // page.pageContent.querySelector('#pageIndex').appendChild(uiControl.pageIndexing(indexed));
                // uiControl.addIdTitles();

                // filling page
                modalControl.$pageModalWrapper.innerHTML = `
                    <div class="modal-content-body">
                        ${page.pageContent.innerHTML}
                    </div>
                `;
                
                window.history.pushState({urlPath: ''}, '', requestedUrl);
                modalControl.$pageModal.setAttribute('data-modal-href', requestedPath);
                modalControl.$pageModalCrumbs.innerHTML = this.breadCrumbs({
                    char: '❯', 
                    pageTitle: page.pageTitle
                });
                modalControl.removeTab({sesamName: 'page'});
                sesamCollapse.initialize();
                uiControl.initialize();
            }).then(() => {
                sesam({
                    target: 'page',
                    action: 'show',
                    modal: {
                        backdrop: true,
                        scrollBlock: true
                    }
                });
                site.lazyLoadingBoxes();
            }).catch(error => {
                window.open(`/${main.SITE_PREFIX}/404`, "_self")
            });
        }  
    }
}