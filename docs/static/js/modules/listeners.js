import { modalControl, sesam, sesamCollapse } from './index.js';

export const initializeListeners = () => {
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
};

initializeListeners();
