import {callerName, main} from './index.js';

const status = new callerName('routingControl');

export const routingControl = {
    initialize() {
        status.init();
        
        this.getUrlOnScroll()
        if (window.location.hash.includes('#/') == true) this.scrollToUrl();
        this.breadCrumbs();
    },
    
    getUrlOnScroll() {
        status.add('observer');
        
        // source: https://medium.com/@filipvitas/lazy-load-images-with-zero-javascript-2c5bcb691274
        
        let hrefSections = document.querySelectorAll('[data-href]');

        const interactSettings = {
            threshold: 0.4
        }

        const onIntersection = (sections) => {
            sections.forEach(section => {
                if (section.isIntersecting) {
                    console.log(section.target.dataset.href)
                    window.history.pushState({urlPath: ''}, '', `#/${section.target.dataset.href}`);
                }
            })
        }
        let observer = new IntersectionObserver(onIntersection, interactSettings)

        hrefSections.forEach(sections => {
            observer.observe(sections);
        })
    },
    
    scrollToUrl() {
        const section = document.querySelector(`[data-href="${window.location.hash.replace('#/','')}"]`);
        section.scrollIntoView();
    },
    
    breadCrumbs() {
        status.add('breadCrumbs');
        let location = window.location.pathname;
        location = location.replace(`/${main.SITE_PREFIX}`,'');
        location = location.split('/').filter(item => item);
    }
}