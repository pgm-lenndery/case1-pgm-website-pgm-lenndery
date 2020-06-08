import { modalControl, sesam, sesamCollapse, callerName, uiControl, routingControl } from './index.js';

const status = new callerName('listeners');
status.pause();

export const listeners = {
    cache() {
        status.init();
        this.tabsContainer = document.querySelector('[data-label="tabs"]')
        this.casesHighlightFilter = document.querySelector('[data-label="filterCases"] .filter-section-options');
        this.casesHighlight = document.querySelector('[data-label="casesHighlight"] .salvatore');
        this.caseCardHoverTarget = '[data-label="casesHighlight"] .salvatore .card:hover, .cases-preview .salvatore .card:hover';
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
            const
                modalActions = event.target.closest('.modal .modal-controls > div'),      
                tab = event.target.closest('[data-label="tabs"] .tab'),
                casesHighlightCard = event.target.closest('[data-label="casesHighlight"] .card'),
                homeNav = event.target.closest('[data-label="homeNav"] .navbar-label'),
                filterCasesHighlighted = event.target.closest('[data-label="casesHighlight"] [data-label="filterCases"] input[name="type"]'),
                filterCases = event.target.closest('[data-label="filterAllCases"] input[name="type"]'),
                internalLink = event.target.closest(`a`);

            const siteURL = window.location.origin;

            if (filterCasesHighlighted != null) uiControl.filterHighlightedCases(filterCasesHighlighted.value);
            if (filterCases != null) uiControl.filterCases(filterCases.value);
            
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
                const openedModal = document.querySelector(`[data-sesam-target].sesam-show`);
                if (openedModal != null) {
                    console.log('other modal is showed:', openedModal.dataset.sesamTarget);
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
                    modalControl.openTab({
                        tabHref: tab.dataset.tabHref
                    });
                }
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
                modalControl.openTab({
                    tabHref: tab.dataset.tabHref
                });
                
                // modalControl.openTab({sesamName}) // replace functions above
            }
            
            if (internalLink != null) {
                status.log(event)
                event.preventDefault();
                routingControl.openClickedAnker(internalLink);
            };
        })
        
        document.body.addEventListener('mouseover', (event) => {
            const
                casesWrapper = event.target.closest('.cases-preview'),
                casesWrapperHovered = document.querySelector('.cases-preview.hovering'),
                hoverCard = event.target.closest('.cases-preview .card:hover'),
                glider = event.target.closest('.glide');
            
            if (hoverCard != null) casesWrapper.classList.add('hovering');
            else if (casesWrapperHovered != null) casesWrapperHovered.classList.remove('hovering');
            
            if (glider != null) {
                uiControl.glideInit();
            }
        });
        
        document.body.addEventListener('focusout', () => {
            this.casesHighlight.classList.remove('hovering');
        });
        
        document.body.addEventListener('scroll', (event) => {
            status.log(event);
        });
        
        document.addEventListener('mousemove', (event) => {
            if (!this.cursor.classList.contains('moved')) this.cursor.classList.add('moved');
            this.cursor.style.left = `${event.clientX - (this.cursorDimensions/2)}px`;
            this.cursor.style.top = `${event.clientY - (this.cursorDimensions/2)}px`;
        });
        
        window.addEventListener('resize', (event) => {
            console.log('resize')
            uiControl.salvattoreInit();
            // uiControl.salvattoreGrids.forEach(i => {
            //     salvattore.recreateColumns(i);
            // })
        });
    }
};