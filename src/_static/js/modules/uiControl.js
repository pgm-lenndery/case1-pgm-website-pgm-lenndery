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
        } catch (error) {null}
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
    },
    
    addIdTitles() {
        const indexed = document.body.querySelectorAll('#mainContent h3, #mainContent h4, #mainContent h5');
        indexed.forEach(i => {
            const indexItemId = i.innerHTML.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
            i.setAttribute('id', indexItemId);
        })
    },
    
    pageIndexing(indexed) {
        status.add('pageIndex');
        
        try {
            this.$mainContent = document.querySelector('#mainContent');
    
            const wrapper = document.createElement('div'), indexList = document.createElement('ul'), indexListTitle = document.createElement('div');
            indexList.className = 'pageindex-list';
            
            // add title
            indexListTitle.classList.add('pageindex-title', 'd-flex', 'align-items-center', 'justify-content-between', 'sesam', 'sesam-hidden', 'clickable', 'mb-3');
            indexListTitle.setAttribute('data-sesam-trigger', 'pageIndex');
            indexListTitle.innerHTML = `
                <h5 class="font-rhode my-0">Inhoudsopgave</h5>
                <i data-feather="chevron-down" class="d-lg-none"></i>
            `;
            wrapper.appendChild(indexListTitle);

            // create items
            indexed.forEach(i => {
                const indexItemId = i.innerHTML.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
                
                // add index list items to unordered list element
                const li = document.createElement('li');
                li.classList.add('pageindex-list-item', `tagname-${i.tagName}`);
                li.innerHTML = `<a href="#${indexItemId}">${i.innerHTML}</>`;
                indexList.appendChild(li);
            })
            wrapper.appendChild(indexList);
            
            return wrapper;
        } catch (err) {null}
    }
}