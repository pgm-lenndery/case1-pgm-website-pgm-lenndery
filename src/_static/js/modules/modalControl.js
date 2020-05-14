import {callerName, fetchAPI} from '../common.js';
import {sesamCollapse, sesam} from './index.js';

const status = new callerName('modalControl');

export const modalControl = {
    initialize() {
        status.init();
        
        this.cache();
        this.listen();
    },
    
    cache() {
        status.add('cache');
        this.tabs = document.querySelector('[data-label="tabs"]')
    },
    
    listen() {
        status.add('listen');
        document.body.addEventListener('click', (event) => {
            const modalActions = event.target.closest('.modal .modal-controls > div');
            const tab = event.target.closest('[data-label="tabs"] .tab');
            
            if (modalActions != null && modalActions.dataset.action == 'modalClose') {
                sesam({
                    target: 'test',
                    collapse: true,
                })
            } else if (modalActions != null && modalActions.dataset.action == 'modalHide') {
                sesam({
                    target: 'test',
                    collapse: true,
                })
                this.createTab(event.target.closest('.modal').querySelector('.modal-title').innerText, event.target.closest('.modal').dataset.sesamTarget);
            }
            
            if (tab != null) {
                sesam({
                    target: tab.dataset.tabTrigger,
                    collapse: true,
                })
                tab.remove();
            }
        })
    },
    
    createTab(title, sesamName) {
        const checks = [];
        this.tabs.querySelectorAll('.tab').forEach(tab => {
            checks.push(tab.dataset.tabTrigger == sesamName)
        }); 
        
        if (checks.includes(true) == false) {
            const tab = document.createElement('div');
            tab.classList.add('tab','animated', 'slideInUp', 'faster');
            tab.setAttribute('data-tab-trigger','test');
            tab.innerHTML = `
                <i data-feather="plus"></i>
                <span class="tab-title">${title}</span>
            `;
            this.tabs.appendChild(tab);
            feather.replace();
        } else {
            const existingTab = this.tabs.querySelector(`[data-tab-trigger="${sesamName}"]`);
            existingTab.classList.remove('slideInUp', 'bounce');
            existingTab.classList.add('bounce');
            existingTab.addEventListener('animationend', () => {
                existingTab.classList.remove('bounce');
            })
        }
    }
}