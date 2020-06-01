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
            
            const indexList = document.createElement('ul'), indexListTitle = document.createElement('h5');
            indexList.className = 'pageindex-list';
            indexListTitle.className = 'font-rhode';
            indexListTitle.innerHTML = 'Inhoudsopgave';
            indexList.appendChild(indexListTitle);

            indexed.forEach(i => {
                const indexItemId = i.innerHTML.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
                
                // add index list items to unordered list element
                const li = document.createElement('li');
                li.classList.add('pageindex-list-item', `tagname-${i.tagName}`);
                li.innerHTML = `<a href="#${indexItemId}">${i.innerHTML}</>`;
                indexList.appendChild(li);
            })
            return indexList;
        } catch (err) {
            status.log(err);
        }
    }
}