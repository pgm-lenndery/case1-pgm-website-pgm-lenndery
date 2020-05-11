import {callerName, fetchAPI} from './common.js'

const status = new callerName('main');

const site = {
    initialize() {
        status.init();
        this.cache();
        
        this.fillMarquee();
        this.addFilterOptions();
        this.renderCases();
        this.lazyLoadingBoxes();
    },
    
    cache() {
        status.add('cache');
        this.marquee = document.querySelector('[data-label="marquee"]');
        this.casesHighlightFilter = document.querySelector('[data-label="filterCases"] .filter-section-options');
        this.casesHighlight = document.querySelector('[data-label="casesHighlight"] .salvatore')
    },
    
    fillMarquee() {
        status.add('fillMarquee');
        const words = ['javascript','html','animation','webpack','Adobe Illustrator','react','typescript','wordpress','svg','git','sass','firebase','bootstrap','indexedDB','Adobe XD']
        this.marquee.innerHTML = words.join('<span class="word-joint">・</span>')
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
        
        const apiData = await fetchAPI('https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/data/cases.json');
        console.log(await apiData.cases);
        
        await apiData.cases.forEach(i => {
            const caseEl = document.createElement('div');
            caseEl.classList.add('salvatore-grid-item','card','box-all','mt-6','box-lazy');
            caseEl.innerHTML = `
                <div class="card-header box-b d-flex align-items-center justify-content-between px-3">
                    <div class="font-rhode py-3"> 2 maanden geleden<span class="word-joint">・</span>webpgm</div><i data-feather="arrow-right"></i>
                </div>
                <div class="card-body">
                    <div class="card-body-overlay px-4">
                        <h2 class="card-title font-rhode">${i.title}</h2>
                    </div>
                    <div class="filter-purple-rain">
                        <img class="w-100" src="${i.img.tumbnail}" alt="">
                    </div>
                </div>
            `;
            // this.casesHighlight.appendChild(caseEl);
            salvattore.appendElements(this.casesHighlight, [caseEl]);
        })
        
        feather.replace();
        this.lazyLoadingBoxes();
    },
    
    lazyLoadingBoxes() {
        status.add('lazyLoading');
        
        // source: https://medium.com/@filipvitas/lazy-load-images-with-zero-javascript-2c5bcb691274
        
        let lazyBoxes = [...document.querySelectorAll('.box-lazy')]

        const interactSettings = {
            // root: document.querySelector('.center'),
            // rootMargin: '0px 200px 200px 0px',
            threshold: 0.1
        }

        const onIntersection = (boxes) => {
            boxes.forEach(box => {
                console.log(box)
                if (box.isIntersecting) {
                    observer.unobserve(box.target);
                    box.target.classList.add('box-lazy-ready','zoomIn');
                    // box.target.src = box.target.dataset.src;
                    // box.target.onload = () => box.target.classList.add('loaded');
                }
            })
        }
        let observer = new IntersectionObserver(onIntersection, interactSettings)

        lazyBoxes.forEach(box => {
            box.classList.add('animated', 'lightspeed')
            observer.observe(box)
        })
    }
}

site.initialize();