import {site, modalControl, sesam, sesamCollapse, callerName, fetchAPI } from './index.js';

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
    },
    
    filterCases(value) {
        status.add('filterCases');
        
        // remove existing cards
        site.casesHighlight.querySelectorAll('.column .card').forEach(i => i.remove());
        
        // if value is all, show all cards, else only append cards that match value
        site.casesHighlightCards.forEach(i => {
            if (value == 'all') salvattore.appendElements(site.casesHighlight, [i])
            else if (i.dataset.filter.includes(value)) salvattore.appendElements(site.casesHighlight, [i]);
        });
    },
    
    async showStudentDetails(name) {
        status.add('showStudentDetails');
        
        const data = await fetchAPI('https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/data/students.json');
        const student = await data.students[0].class.find(item=>item.url==name)
        
        function nl2br (str) {
            return str.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '<br>');
        }
        
        modalControl.$pageModalBody.innerHTML = `
            <section>
                <div class="container-fluid pr-0 py-5 box-b">
                    <div class="row">
                        <div class="col-8 col-md-8">
                            <h3 class="font-rhode modal-title mb-4">${student.fields.name_first} ${student.fields.name_last}</h3>
                            <p class="text-modern">Over ${student.fields.name_first}</p>
                            <div class="text-box">${nl2br(student.fields.about)}</div>
                        </div>
                        <div class="col-4">
                            <div class="filter-purple-rain">
                                <img class="fit-to-wrapper h-100" style="max-height: 300px" src="${student.fields.img[0].thumbnails.large.url}">
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
            <section>
        `;
        sesam({
            target: 'page',
            action: 'show',
            modal: {
                backdrop: true,
                scrollBlock: true
            }
        });
    }
}