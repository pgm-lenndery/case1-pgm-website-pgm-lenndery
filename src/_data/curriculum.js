const fetch = require("node-fetch");
global.Headers = fetch.Headers;

module.exports = async () => {
    const response = await fetch('https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/data/curry.json');
    const data = await response.json();
    return data.fields;
};