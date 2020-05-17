export const main = {
    initialize() {
        this.cache();
        
        if (window.location.href != `${window.location.origin}/${this.sitePrefix}/`) {
            console.log('is not')
        }
    },
    
    cache() {
        this.sitePrefix = 'case1-pgm-website-pgm-lenndery';
    }
}

main.initialize();