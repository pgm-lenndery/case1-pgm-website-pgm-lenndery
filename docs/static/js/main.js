import {callerName} from './common.js'

const status = new callerName('main');

const site = {
    initialize() {
        status.init();
        this.cache();
        
        this.fillMarquee();
        this.addFilterOptions();
        this.renderCases();
    },
    
    cache() {
        status.add('cache');
        this.marquee = document.querySelector('[data-label="marquee"]');
        this.casesHighlightFilter = document.querySelector('[data-label="filterCases"] .filter-section-options');
        this.casesHighlight = document.querySelector('[data-label="casesHighlight"] .salvatore-grid')
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
    
    renderCases() {
        status.add('renderCases');
        const cases = 10;
        
        for (let i = 0; i < cases; i++) {
            const caseEl = document.createElement('div');
            caseEl.classList.add('salvatore-grid-item','card','box-all','mt-6');
            caseEl.innerHTML = `
                <div class="card-header box-b d-flex align-items-center justify-content-between px-3">
                    <div class="font-rhode py-3"> 2 maanden geleden<span class="word-joint">・</span>webpgm</div><i data-feather="arrow-right"></i>
                </div>
                <div class="card-body filter-purple-rain">
                    <img class="w-100" src="https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/images/projecten/tronald%20dump/7Q8jYBD_irlqp9.png" alt="">
                </div>
            `;
            this.casesHighlight.appendChild(caseEl);
        }
    }
}

site.initialize();