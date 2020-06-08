export class callerName {
    constructor(file) {
        this.file = file + '.js';
        this.pauseLogging = false;
    }
    
    pause() {
        this.pauseLogging = true
    }
    
    init() {
        if (this.pauseLogging == false) console.log(`\n%c[service] ${this.file} running! \n` + ' ', 'color: #00d400; font-weight: bold')
    }
    
    add(funct) {
        if (this.pauseLogging == false) console.log(`%c[service] ${this.file}:${funct}()`, 'font-weight: bold');
    }
    
    log(logged) {
        if (this.pauseLogging == false) console.log('\t' + logged);
    }
}

export const fetchAPI = async (url) => {
    try {
        let response = await fetch(url)
        let data = await response.json();
        return data
    }
    catch {
        throw new Error('nieje mut')
    }
}

export const fetchPage = async (url) => {
    try {
        let response = await fetch(url)
        let data = await response.text();
        return data
    }
    catch {
        throw new Error('nieje mut')
    }
}