import {site, modalControl, sesam, sesamCollapse, callerName, fetchAPI, routingControl } from './index.js';

const status = new callerName('uiControl');
status.pause();

export const uiControl = {
    initialize() {
        status.init();
        
        this.cache();
        feather.replace();
        this.salvattoreInit();
        this.glideInit();
        this.balanceText();
    },
    
    cache() {
        status.add('cache');
        this.casesHighlightCards = document.querySelectorAll('[data-label="casesHighlight"] .salvatore-grid .card');
        this.casesCards = document.querySelectorAll('[data-label="allCases"] .salvatore-grid .card');
        this.casesAll = document.querySelector('[data-label="allCases"] .salvatore');
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
    
    balanceText() {
        status.add('balanceText');
        const balancedItems = document.querySelectorAll('.balance-text')
        balanceText(balancedItems, {watch: true});
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
            indexList.classList.add('pageindex-list', 'sesam', 'sesam-hidden');
            indexList.setAttribute('data-sesam-target', 'pageIndex');
            
            // add title
            indexListTitle.classList.add('pageindex-title', 'd-flex', 'align-items-center', 'justify-content-between', 'sesam', 'sesam-hidden', 'clickable', 'mb-3', 'd-md-none');
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
    
    filterHighlightedCases(value) {
        status.add('filterHighlightedCases');
        value = value.toLowerCase();
        
        // remove existing cards
        site.casesHighlight.querySelectorAll('.column .card').forEach(i => i.remove());
        
        // if value is all, show all cards, else only append cards that match value
        this.casesHighlightCards.forEach(i => {
            const filterElement = i.querySelector('[data-filter]');
            if (value == 'all') salvattore.appendElements(site.casesHighlight, [i])
            else if (filterElement.dataset.filter.includes(value)) salvattore.appendElements(site.casesHighlight, [i]);
        });
    },
    
    filterCases(value) {
        status.add('filterCases');
        value = value.toLowerCase();
        
        console.log(value)
        
        // remove existing cards
        this.casesAll.querySelectorAll('.column .card').forEach(i => i.remove());
        
        // if value is all, show all cards, else only append cards that match value
        this.casesCards.forEach(i => {
            if (value == 'all') salvattore.appendElements(this.casesAll, [i])
            else if (i.dataset.filter.includes(value)) salvattore.appendElements(this.casesAll, [i]);
        });
    },
    
    async showStudentDetails(name) {
        status.add('showStudentDetails');
        
        const data = await fetchAPI('https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/data/students.json');
        const student = await data.students[0].class.find(item=>item.url==name)
        
        function nl2br (str) {
            return str.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '<br>');
        };
        
        modalControl.$studentModalBody.innerHTML = `
            <section>
                <div class="container-fluid pr-0">
                    <div class="row">
                        <div class="col py-6">
                            <h3 class="font-rhode modal-title mb-4">${student.fields.name_first} ${student.fields.name_last}</h3>
                            <p class="text-modern">Over ${student.fields.name_first}</p>
                            <div class="text-box">${nl2br(student.fields.about)}</div>
                        </div>
                        <div class="col-4">
                            <div class="filter-purple-rain h-100 box-l">
                                <img class="fit-to-wrapper h-100" src="${student.fields.img[0].thumbnails.large.url}">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-color-white text-color-black font-rhode container-fluid py-2">
                    ${student.fields.interests.split(',').join('<span class="word-joint">・</span>')}
                </div>
            </section>
        `;
        modalControl.$studentModalCrumbs.innerHTML = routingControl.breadCrumbs({
            char: '❯', 
            pageTitle: 'studenten'
        });
        sesam({
            target: 'page',
            action: 'hide',
            modal: {
                backdrop: false,
                scrollBlock: false
            }
        });
        sesam({
            target: 'studentDetail',
            action: 'show',
            modal: {
                backdrop: true,
                scrollBlock: true
            }
        });
    },
    
    glideInit() {
        status.add('glideInit');
        try {
            const caseGlide = new Glide('.modal-gallery', {
                type: 'slider',
                startAt: 0,
                perView: 1,
                gap: 0
            })
            caseGlide.mount();
        } catch {null}
        
        try {
            const homePostsGlide = new Glide('.glide-posts', {
                type: 'carousel',
                startAt: 0,
                perView: 1,
                autoplay: 5000,
                breakpoints: {
                    576: {
                        perView: 1,
                    },
                    768: {
                        perView: 1,
                    },
                    992: {
                        perView: 1,
                    },
                    1200: {
                        perView: 1,
                    },
                    3000: {
                        perView: 2,
                    }
                }
            })
            homePostsGlide.mount();
        } catch (err) {console.log(err)}
    },
    
    salvattoreInit() {
        salvattore.rescanMediaQueries();
        const salvattoreGrids = document.querySelectorAll('.salvatore-grid');
        salvattoreGrids.forEach(grid => {
            const cards = grid.querySelectorAll('.salvatore-grid-item');
            try {
                cards.forEach(card => {card.remove()});
                salvattore.registerGrid(grid);
                salvattore.appendElements(grid, cards);
            } catch (err) {status.log(err)};
        })
    }
}