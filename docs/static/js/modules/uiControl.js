import {site, modalControl, sesam, sesamCollapse, callerName } from './index.js';

const status = new callerName('uiControl');

export const uiControl = {
    initialize() {
        status.init();
        
        this.cache();
        this.curry();
    },
    
    cache() {
        status.add('cache');
    },
    
    curry() {
        status.add('curry');
        
        try {
            const bottle = document.querySelector('[data-label="curriculum"]');
            const apiData = site.apiData.curry.fields;
            apiData.forEach(i => {
                const div = document.createElement('div');
                div.classList.add('mb-5');
                div.innerHTML = `
                    <h3>${i.name}</h3>
                    ${this.getCurryCourses(i.courses)}
                `;
                bottle.appendChild(div);
            });
        } catch (error) {
            status.log(error)
        }
    },
    
    getCurryCourses(input) {
        status.add('getCurryCourses');
        
        let tempStr = '';
        input.forEach(i => {
            tempStr += `
                <p class="text-modern mb-1">${i.name} – ${i.credits} stp</p>
                <p class>${i.subject}</p>
            `;
        })
        return tempStr;
    }
}