/*!
 * Sesam - https://github.com/lennertderyck/sesam
 * Licensed under the GNU GPLv3 license - https://choosealicense.com/licenses/gpl-3.0/#
 *
 * Copyright (c) 2020 Lennert De Ryck
 */

const sesamCollapse = {
    initialize() {
        console.log('\n' + `%c[service] sesam.js initialize() running! \n` + ' ', 'color: #00d400; font-weight: bold');
        console.log(`%c[service] initialize()`, 'font-weight: bold');
        this.cached();
        this.addBackdrop();

        this.sesamTrigger.length !== 0 ? console.log(`\sesam triggers available`) : console.log(`\tno collapse triggers`);
        this.sesamTrigger.forEach((trigger) => {
            trigger.addEventListener("click", (() => {this.collapseDo(trigger.dataset.sesamTrigger)}));
            
            if (trigger.classList.contains('sesam-hidden') == false && trigger.classList.contains('sesam-show') == false) trigger.classList.add('sesam-hidden');
            if (trigger.classList.contains('sesam') == false) trigger.classList.add('sesam');
        });

        this.sesamTarget.forEach((target) => {
            if (target.classList.contains('sesam-hidden') == false && target.classList.contains('sesam-show') == false) target.classList.add('sesam-hidden');
            if (target.classList.contains('sesam') == false) target.classList.add('sesam');
        })
    },

    cached() {
        console.log(`%c[service] cached()`, 'font-weight: bold');

        // Put cache elements here
        this.sesamTrigger = document.querySelectorAll('[data-sesam-trigger]');
        this.sesamTarget = document.querySelectorAll('[data-sesam-target]');
        this.parent = '';
        this.targetName = '';
        this.trigger;
    },

    collapseDo(target) {
        console.log(`%c[service] collapseDo(${target})`, 'font-weight: bold');

        this.targetName = target;
        target = document.querySelector(`[data-sesam-target='${target}']`);
        
        this.parent = target.dataset.sesamParent;
        this.parent = document.querySelectorAll(`[data-sesam-group="${this.parent}"] .sesam`);
        this.trigger = document.querySelector(`[data-sesam-trigger="${this.targetName}"]`);
        
        let targetConfig = target.dataset.sesam.replace(/(\')/g, '"');
        targetConfig = JSON.parse(targetConfig);
        
        // COLLAPSE TRIGGER
        if (this.trigger.classList.contains('sesam-show') == false) {
            this.itemShow(this.trigger);
            
            // HIDE ALSO OTHER ELEMENTS
            this.parent.forEach((item) => {
                if (item.dataset.sesamTrigger !== this.targetName) this.itemHide(item);
            });
        } else this.itemHide(this.trigger);
        
        // COLLAPSE TARGET
        if (target.classList.contains('sesam-show') == false) {
            this.itemShow(target);
            if (target.dataset.sesamBackdrop == 'true') this.itemShow(this.backdrop);
            if (target.dataset.sesamScrollblock == 'true') this.scrollBlock({ block: true });
            
            sesam({
                target: this.targetName,
                classes: {
                    add: [targetConfig.animate.in],
                    remove: [targetConfig.animate.out]
                },
                modal: {
                    backdrop: targetConfig.modal.backdrop,
                    scrollBlock: targetConfig.modal.scrollblock,
                }
            })
        } else {
            this.itemHide(target);
            if (target.dataset.sesamBackdrop == 'true') this.itemHide(this.backdrop);
            if (target.dataset.sesamScrollblock == 'true') this.scrollBlock({ block: false });
            
            sesam({
                target: this.targetName,
                classes: {
                    add: [targetConfig.animate.out],
                    remove: [targetConfig.animate.in]
                },
                modal: {
                    backdrop: false,
                    scrollBlock: false,
                }
            })
            
            // HIDE ALSO OTHER ELEMENTS
            this.parent.forEach((item) => {if (item.dataset.sesamTarget !== this.targetName) this.itemHide(item)});
        }
    },

    itemHide(el) {
        el.classList.remove('sesam-show');
        el.classList.add('sesam-hidden');
    },

    itemShow(el) {
        el.classList.add('sesam-show');
        el.classList.remove('sesam-hidden');
    },

    hideChildren(input) {
        // input = the dataset for trigger or target
        this.parent.forEach((item) => {
            if (item.datatset.input !== this.targetName) this.itemHide(item);
        });
    },

    ifClassFalseAddClass(itemToApply = item, checkThisClass) {
        if (itemToApply.classList.contains(checkThisClass) == false) itemToApply.classList.add(checkThisClass);
    },
    
    switchClasses(el, classArray) {
        if (el.classList.contains(classArray[0])) {
            el.classList.toggle(classArray[0])
            el.classList.toggle(classArray[1])
        }
        
        // if (el.classList.includes(classArray[1])) {
        //     el.classList.toggle(classArray[0])
        //     el.classList.toggle(classArray[1])
        // }
    },
    
    addBackdrop() {
        this.backdrop = document.createElement('div');
        this.backdrop.setAttribute('data-label','sesamBackdrop');
        this.backdrop.classList.add('sesam','sesam-hidden', 'sesam-backdrop');
        document.body.appendChild(this.backdrop);
    },
    
    scrollBlock({ block }) {
        if (block == true) document.body.classList.add('sesam-scrollBlock');
        else document.body.classList.remove('sesam-scrollBlock');
    }
}, sesam = ({action, collapse, execute, classes, target, modal}) => {
    const targetElement = document.querySelector(`[data-sesam-target='${target}']`);
    
    if (action !== undefined) {
        if (action == 'show') sesamCollapse.itemShow(targetElement);
        if (action == 'hide') sesamCollapse.itemHide(targetElement);
    }
    
    if (collapse !== undefined && collapse == true) sesamCollapse.collapseDo(target);
    if (execute !== undefined) execute;
    if (classes != undefined && classes.add !== undefined) classes.add.forEach(i => {targetElement.classList.add(i)});
    if (classes != undefined && classes.remove !== undefined) classes.remove.forEach(i => {targetElement.classList.remove(i)});
    if (modal != undefined && modal.backdrop !== undefined) {
        if (modal.backdrop == true) sesamCollapse.itemShow(sesamCollapse.backdrop);
        if (modal.backdrop == false) sesamCollapse.itemHide(sesamCollapse.backdrop);
    }
    if (modal != undefined && modal.scrollBlock !== undefined) {
        if (modal.scrollBlock == true) sesamCollapse.scrollBlock({ block: true })
        if (modal.scrollBlock == false) sesamCollapse.scrollBlock({ block: false })
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