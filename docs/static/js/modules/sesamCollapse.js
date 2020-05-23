const sesamCollapse = {
    initialize() {
        console.log('\n' + `%c[service] sesam.js initialize() running! \n` + ' ', 'color: #00d400; font-weight: bold');
        console.log(`%c[service] initialize()`, 'font-weight: bold');
        
        this.states = new Map();
        this.dimensions = new Map();
        
        this.cache();
        this.listen();
        
        this.setInitialClasses(this.triggers);
        this.setInitialClasses(this.targets);
        
        if (this.backdrop == null) this.addBackdrop();
    },
    
    listen() {
        document.body.addEventListener('click', (event) => {
            const trigger = event.target.closest('[data-sesam-trigger]');
            
            if (trigger != null) {
                this.collapse(trigger);
                const targets = document.querySelectorAll(`[data-sesam-target="${trigger.dataset.sesamTrigger}"]`);
                targets.forEach(i => {this.collapse(i)});
            }
        });
    },

    cache() {
        this.triggers = document.querySelectorAll('[data-sesam-trigger]');
        this.targets = document.querySelectorAll('[data-sesam-target]');
        this.backdrop = document.querySelector('[data-label="sesamBackdrop"]');
    },

    setInitialClasses(elements) {
        try {
            elements.forEach(i => {
                i = i.classList;
                if (!i.contains('sesam')) i.add('sesam');
                if (!i.contains('sesam-hidden') && !i.contains('sesam-show')) i.add('sesam-hidden');
            });
        } catch (error) {
            console.log(error)
        }
    },
    
    collectInitialProperties() {
        try {
            this.targets.forEach(element => {
                this.getCollapseDimensions(element);
                this.setState(element)
                this.initializeCleanCollapse(element)
            });
        } catch (error) {
            console.log(error);
        }
    },
        
    collapse(element) {
        const itemState = this.itemState(element);
        if (itemState == true) this.itemShow(element);
        else this.itemHide(element);
                
        // execute if collapse element is target
        if (element.dataset.sesamTarget != undefined && itemState == true) {
            element.dataset.sesamBackdrop == 'true' ? this.itemShow(this.backdrop) : null;
            element.dataset.sesamScrollblock == 'true' ? this.scrollBlock({ block: true }) : null;
            element.dataset.sesamParent != undefined ? this.hideOtherChildren(element) : null;
            
            if (element.dataset.sesamOptions != undefined) {
                this.targetOptions(element);
                this.optionsMap.get('backdrop') == 'true' ? this.itemShow(this.backdrop) : null;
                this.optionsMap.get('scrollBlock') == 'true' ? this.scrollBlock({ block: true }) : null;
                this.optionsMap.get('collapseClean') == 'true' ? this.cleanCollapse(element) : null;
                // this.optionsMap.has('parent') == true ? this.hideOtherChildren(this.optionsMap.get('parent')) : null;
            }
        } else if (element.dataset.sesamTarget != undefined && itemState == false) {
            this.itemHide(this.backdrop);
            this.scrollBlock({ block: false });
            this.cleanCollapse(element);
        }
    },
    
    itemState(element) {
        return element.classList.contains('sesam-hidden');
    },
    
    targetOptions(element) {
        const options = element.dataset.sesamOptions.split(',');
        this.optionsMap = new Map();
        
        options.forEach(i => {
            i = i.split(':');
            this.optionsMap.set(i[0].replace(' ',''), i[1]);
        });
    },
    
    hideOtherChildren(element) {
        const otherChildren = document.querySelectorAll(`[data-sesam-group="${element.dataset.sesamParent}"] .sesam:not([data-sesam-target="${element.dataset.sesamTarget}"]):not([data-sesam-trigger="${element.dataset.sesamTarget}"])`);
        otherChildren.forEach(i => {
            this.itemHide(i);
        })
    },
    
    itemHide(element) {
        element.classList.remove('sesam-show');
        element.classList.add('sesam-hidden');
        sesamCollapse.setState(element);
    },
    
    itemShow(element) {
        element.classList.add('sesam-show');
        element.classList.remove('sesam-hidden');
        sesamCollapse.setState(element);
    },
    
    addBackdrop() {
        this.backdrop = document.createElement('div');
        this.backdrop.setAttribute('data-label','sesamBackdrop');
        this.backdrop.classList.add('sesam','sesam-hidden','sesam-backdrop');
        document.body.appendChild(this.backdrop);
    },
    
    scrollBlock({ block }) {
        if (block == true) document.body.classList.add('sesam-scrollBlock');
        else document.body.classList.remove('sesam-scrollBlock');
    },
    
    getCollapseDimensions(element) {
        this.dimensions.set(element.dataset.sesamTarget, element.offsetHeight);
    },
    
    setState(element) {
        let state = element.classList.contains('sesam-show');
        state == false ? state = 'hidden' : state = 'show';
        this.states.set(element.dataset.sesamTarget, state);
    },
    
    initializeCleanCollapse(element) {
        const targetName = element.dataset.sesamTarget
        // if (element.dataset.sesamOptions.includes('collapseClean:true')) element.style.height = `${this.dimensions.get(targetName)}px`
        if (element.dataset.sesamOptions.includes('collapseClean:true')) element.style.height = '0px'
    },
    
    cleanCollapse(element) {
        const targetName = element.dataset.sesamTarget;
        const state = sesamCollapse.states.get(targetName);
        
        if (state == 'show') element.style.height = `${sesamCollapse.dimensions.get(targetName)}px`;
        else if (state == 'hidden') element.style.height = '0px';
    }
}, sesam = ({action, collapse, execute, classes, target, modal}) => {
    target = document.querySelector(`[data-sesam-target='${target}']`);
    action != undefined && action == 'show' ? sesamCollapse.itemShow(target) : null;
    action != undefined && action == 'hide' ? sesamCollapse.itemHide(target) : null;
    if (collapse != undefined && collapse == true) {
        sesamCollapse.collapse(target);
        sesamCollapse.setState(element);
    } 
    // else if (collapse != undefined && collapse.clean != undefined) {
        
    // }
    
    execute != undefined ? execute : null;
    if (modal != undefined && modal.backdrop !== undefined) {
        modal.backdrop == true ? sesamCollapse.itemShow(sesamCollapse.backdrop) : null;
        modal.backdrop == false ? sesamCollapse.itemHide(sesamCollapse.backdrop) : null;
    }
    if (modal!= undefined && modal.scrollBlock !== undefined) {
        modal.scrollBlock == true ? sesamCollapse.scrollBlock({ block: true }) : null;
        modal.scrollBlock == false ? sesamCollapse.scrollBlock({ block: false }) : null;
    }
};

export {sesamCollapse, sesam};

/*
sesam({
    target: 'example', //doet dit: document.querySelector(`[data-sesam-target='${example}']`)
    collapse: true, // gaat gewoon kijken wat de huidige state is van een target en die veranderen
    action: 'show', // of 'hide', niet gebruiken in combinatie met collapse argument
    execute: (() => { // voer extra javascript uit
        console.log('this works!')
    })(), 
    classes: {
        add: ['add','some','classes'],
        remove: ['remove','some','classes']
    },
    modal: {
        backdrop: true, // voegt sesam-hidden/sesam-show classe toe aan het backdrop element, 
                        //backdrop element wordt automatisch gemaakt bij het initialiseren
        scrollBlock: true // blokkeert het scrollen door de pagina wanneer deze modal getoont wordt
    }
})
*/