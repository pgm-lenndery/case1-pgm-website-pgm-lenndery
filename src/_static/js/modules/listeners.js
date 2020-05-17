import { modalControl, sesam, sesamCollapse } from './index.js';

export const listeners = {
    cache() {
        this.casesHighlightFilter = document.querySelector('[data-label="filterCases"] .filter-section-options');
        this.casesHighlight = document.querySelector('[data-label="casesHighlight"] .salvatore');
        this.caseCardHoverTarget = '[data-label="casesHighlight"] .salvatore .card:hover';
        this.studentsHighlight = document.querySelector('[data-label="studentsHighlight"] .collection');
    },
    
    initialize() {       
        document.body.addEventListener('click', (event) => {
            const modalActions = event.target.closest('.modal .modal-controls > div');
            const tab = event.target.closest('[data-label="tabs"] .tab');
            const casesHighlightCard = event.target.closest('[data-label="casesHighlight"] .card');
            
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
                    collapse: true,
                });
                modalControl.removeTab({
                    sesamName: tab.dataset.tabTrigger
                })
            }        
        })
        
        document.body.addEventListener('mouseover', (event) => {
            if (event.target.closest(this.caseCardHoverTarget) != null) {
                this.casesHighlight.classList.add('hovering');
            } else {
                this.casesHighlight.classList.remove('hovering');
            }
        });
        
        document.body.addEventListener('focusout', () => {
            this.casesHighlight.classList.remove('hovering');
        });
    }
};

listeners.cache();
listeners.initialize();