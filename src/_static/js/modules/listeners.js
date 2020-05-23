import { modalControl, sesam, sesamCollapse, callerName, uiControl } from './index.js';

const status = new callerName('listeners');

export const listeners = {
    cache() {
        status.init();
        this.tabsContainer = document.querySelector('[data-label="tabs"]')
        this.casesHighlightFilter = document.querySelector('[data-label="filterCases"] .filter-section-options');
        this.casesHighlight = document.querySelector('[data-label="casesHighlight"] .salvatore');
        this.caseCardHoverTarget = '[data-label="casesHighlight"] .salvatore .card:hover';
        this.studentsHighlight = document.querySelector('[data-label="studentsHighlight"] .collection');
        this.cursor = document.querySelector('#cursor');
        
    },
    
    calculations() {
        this.cursorDimensions = parseFloat(getComputedStyle(this.cursor).getPropertyValue('--d').replace('px', ''));
    },
    
    initialize() {     
        this.cache();  
        this.calculations();
        
        document.body.addEventListener('click', (event) => {
            const modalActions = event.target.closest('.modal .modal-controls > div');      
            const tab = event.target.closest('[data-label="tabs"] .tab');
            const casesHighlightCard = event.target.closest('[data-label="casesHighlight"] .card');
            const homeNav = event.target.closest('[data-label="homeNav"] .navbar-label');
            
            if (casesHighlightCard != null) {
                // show case modal
                modalControl.renderModal({ id: casesHighlightCard.dataset.id});
                
                // remove current case tab
                if (modalControl.tabs.querySelector(`[data-tab-trigger="test"]`) != null) {
                    modalControl.removeTab({
                        sesamName: 'test'
                    })
                }
            };
            
            // show or hide modals, and show or hide tabs
            if (modalActions != null && modalActions.dataset.action == 'modalClose') {
                modalControl.modalClose({
                    sesamTarget: event.target.closest('.modal').dataset.sesamTarget
                })
            } else if (modalActions != null && modalActions.dataset.action == 'modalHide') {  
                modalControl.modalHide({
                    sesamTarget: event.target.closest('.modal').dataset.sesamTarget,
                    title: event.target.closest('.modal').querySelector('.modal-title').innerText
                })
            }
            
            // show modal when clicked on tab
            if (tab != null) {
                sesam({
                    target: tab.dataset.tabTrigger,
                    action: 'show',
                    modal: {
                        backdrop: true,
                        scrollBlock: true
                    }
                });
                modalControl.removeTab({
                    sesamName: tab.dataset.tabTrigger
                })
                
                // modalControl.openTab({sesamName}) // replace functions above
                
                const openedModal = document.querySelector(`[data-sesam-target].sesam-show`);
                if (openedModal != null) {
                    console.log('other modal is showed', openedModal.dataset.sesamTarget);
                    modalControl.modalHide({
                        sesamTarget: openedModal.dataset.sesamTarget,
                        title: openedModal.querySelector('.modal-title').innerHTML
                    })
                    sesam({
                        target: tab.dataset.tabTrigger,
                        action: 'show',
                        modal: {
                            backdrop: true,
                            scrollBlock: true
                        }
                    });
                }
            }
            
            // console.log(homeNav);
            // if (homeNav != null) {
            //     const state = sesamCollapse.states.get('homeNav');
            //     console.log(sesamCollapse.states.get('homeNav'))
            //     console.log(sesamCollapse.dimensions.get('homeNav'));
            //     if (state == 'hidden') {
            //         sesam({
            //             target: 'homeNav',
            //             action: 'show',
            //         });
            //         uiControl.navbarNav.style.height = `${sesamCollapse.dimensions.get('homeNav')}px`;
            //     } else if (state == 'show') {
            //         sesam({
            //             target: 'homeNav',
            //             action: 'hide',
            //         });
            //         uiControl.navbarNav.style.height = '0px';
            //     }
            // }           
        })
        
        document.body.addEventListener('mouseover', (event) => {
            if (this.caseCardHoverTarget != null && event.target.closest(this.caseCardHoverTarget) != null) {
                this.casesHighlight.classList.add('hovering');
            } else if (this.casesHighlight != null) {
                this.casesHighlight.classList.remove('hovering');
            }
        });
        
        document.body.addEventListener('focusout', () => {
            this.casesHighlight.classList.remove('hovering');
        });
        
        document.body.addEventListener('scroll', (event) => {
            status.log(event);
        })
        
        document.addEventListener('mousemove', (event) => {
            if (!this.cursor.classList.contains('moved')) this.cursor.classList.add('moved');
            this.cursor.style.left = `${event.clientX - (this.cursorDimensions/2)}px`;
            this.cursor.style.top = `${event.clientY - (this.cursorDimensions/2)}px`;
        })
    }
};