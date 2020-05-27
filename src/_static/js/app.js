import {callerName, modalControl, sesamCollapse, sesam, listeners, fetchAPI, fetchPage, uiControl, routingControl} from './modules/index.js'

const status = new callerName('main');

export const site = {
    async initialize() {
        status.init();
        this.cache();
        
        modalControl.initialize();
    },
    
    start() {
        status.add('start');
        modalControl.cache();
        this.cache();
        this.fillMarquee();
        this.fillMarquee();
        this.fillMarquee();
        this.arrowButtons();
        this.addFilterOptions()
        listeners.initialize();
        this.getApidata();
        uiControl.initialize();
        sesamCollapse.collectInitialProperties();
        routingControl.initialize();
    },
    
    cache() {
        status.add('cache');
        this.marquee = document.querySelector('[data-label="marquee"] .marquee-content');
        this.casesHighlightFilter = document.querySelector('[data-label="filterCases"] .filter-section-options');
        this.casesHighlight = document.querySelector('[data-label="casesHighlight"] .salvatore');
        this.homeNav = document.querySelector('[data-label="homeNav"]');
    },
    
    fillMarquee() {
        status.add('fillMarquee');
        const words = ['javascript','html','animation','webpack','Adobe Illustrator','react','typescript','wordpress','svg','git','sass','firebase','bootstrap','indexedDB','Adobe XD']
        if (this.marquee != null) {
            words.forEach(word => {
                const span = document.createElement('span');
                span.classList.add('d-inline');
                span.innerHTML = `
                    ${word}<span class="word-joint">・</span>
                `;
                this.marquee.appendChild(span);
            });
        };
    },
    
    addFilterOptions() {
        status.add('addFilterOptions');
        const options = ['all','design','animation','protoyping'];
        options.forEach((i, index) => {
            const option = document.createElement('div');
            option.className = 'options-el';
            option.innerHTML = `
                <input type="radio" id="filterOption${index}" ${index == 0 ? 'checked' : ''} name="type" value="${i}">
                <label for="filterOption${index}">${i}</label>
                <span class="word-joint">・</span>
            `;
            this.casesHighlightFilter.appendChild(option);
        })
    },
    
    async renderCases() {
        status.add('renderCases');
        const cases = 10;
        
        salvattore.registerGrid(this.casesHighlight);
        // salvattore.recreateColumns();
        
        if (listeners.casesHighlight != null) {
            const apiData = await fetchAPI('https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/data/cases.json');
            await apiData.cases.data.forEach((i, index) => {
                const card = document.createElement('div');
                card.classList.add('salvatore-grid-item','card','box-all','mt-6','box-lazy');
                card.setAttribute('data-id', i.id);
                card.setAttribute('data-href', 'cases');
                card.innerHTML = `
                    <div class="card-header box-b d-flex align-items-center justify-content-between px-3">
                        <div class="font-rhode py-3"> 2 maanden geleden<span class="word-joint">・</span>webpgm</div><i data-feather="arrow-right"></i>
                    </div>
                    <div class="card-body">
                        <div class="card-body-overlay px-4">
                            <h2 class="card-title font-rhode">${i.title}</h2>
                            <p>
                                ${i.about}
                            </p>
                        </div>
                        <div class="filter-purple-rain">
                            <img class="w-100" src="${i.img.tumbnail}" alt="">
                        </div>
                    </div>
                `;
                salvattore.appendElements(this.casesHighlight, [card]);
            })
            
            feather.replace();
            this.lazyLoadingBoxes();
        }
        
    },
    
    async renderStudents() {
        status.add('renderStudents');
        const students = 10;
        
        if (listeners.studentsHighlight != null) {
            await this.apiData.students.records.forEach((i, index) => {
                i = i.fields;
                if (students >= index+1) {
                    const card = document.createElement('div');
                    card.classList.add('collection-item');
                    card.innerHTML = `
                        ${index == 0 ? '<div class="card-joint box-lazy lightspeed" style="animation-delay: ${0.1*index}s;"></div>' : ''}
                        <div class="card box-lazy lightspeed" style="animation-delay: ${0.07*index}s;">
                            <div class="card-header p-4">
                                <p class="font-rhode mb-0">${i.name_first}</p>
                                <p class="text-modern small mb-0">${i.name_last}</p>
                            </div>
                            <div class="card-img filter-purple-rain">
                                <img src="${i.img[0].thumbnails.large.url}" alt="">
                            </div>
                        </div>
                        <div class="card-joint box-lazy lightspeed" style="animation-delay: ${0.07*index}s;"></div>
                    `;
                    listeners.studentsHighlight.appendChild(card);
                }
            });
        }
        
        
        this.lazyLoadingBoxes();
    },
    
    lazyLoadingBoxes() {
        status.add('lazyLoading');
        
        // source: https://medium.com/@filipvitas/lazy-load-images-with-zero-javascript-2c5bcb691274
        
        let lazyBoxes = document.querySelectorAll('.box-lazy');

        const interactSettings = {
            threshold: 0.1
        }

        const onIntersection = (boxes) => {
            boxes.forEach(box => {
                if (box.isIntersecting) {
                    observer.unobserve(box.target);
                    
                    let animation;
                    box.target.dataset.lazyAnimation != undefined ? animation = box.target.dataset.lazyAnimation : animation = 'zoomIn';
                    box.target.classList.add('box-lazy-ready', animation);
                    // box.target.src = box.target.dataset.src;
                    // box.target.onload = () => box.target.classList.add('loaded');
                }
            })
        }
        let observer = new IntersectionObserver(onIntersection, interactSettings)

        lazyBoxes.forEach(box => {
            box.classList.add('animated', 'lightspeed');
            observer.observe(box);
        })
    },
    
    async getApidata() {
        status.add('getApidata');
        
        this.apiData = {
            cases: await fetchAPI('https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/data/cases.json'),
            students: await fetchAPI('https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/data/students.json'),
            curry: await fetchAPI('https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/data/curry.json')
        }
        this.renderDomElements();
        this.lazyLoadingBoxes();
        uiControl.curry()
    },
    
    renderDomElements() {
        status.add('renderDomElements');
        
        listeners.cache();
        this.renderCases();
        this.renderStudents();
    },
    
    arrowButtons() {
        status.add('arrowButtons');
        
        const btnArrow = document.querySelectorAll('.btn-arrow');
        const btnArrowLink = document.querySelectorAll('.btn-arrow-link');
        const arrow = '<i data-feather="chevron-right"></i>';
        
        btnArrow.forEach(btn => {
            if (btn.innerHTML.includes('svg') == false) {
                btn.innerHTML += arrow;
                btn.innerHTML += arrow;
            }
        });
        
        btnArrowLink.forEach(btn => {
            !btn.innerHTML.includes('svg') ? btn.innerHTML += arrow : null
        });
        
        feather.replace();
    },
    
    removeTrailingSlash(url) {
        if (url.endsWith('/')) {return url.replace(/\/$/, '')}
        else return url
    }
}