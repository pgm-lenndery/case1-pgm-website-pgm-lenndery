module.exports = (eleventyConfig) => { 
    eleventyConfig.setQuietMode(true);
    eleventyConfig.addWatchTarget("./src/");
    
    // Copy `img/` to `_site/img`
    eleventyConfig.addPassthroughCopy({ 
        'src/_static/images': 'static/images',
        'src/_static/fonts': 'static/fonts',
        'src/_static/css': 'static/css',
        'src/_static/js': 'static/js'
    });
      
    eleventyConfig.addLayoutAlias('page', 'page.liquid');
    eleventyConfig.addLayoutAlias('default', 'default.liquid');
    eleventyConfig.addLayoutAlias('modal', 'modal.liquid');
    
    eleventyConfig.addPairedShortcode('anker', (content, href, attr) => {
        // const {href = '#', target = '_self'} = options;
        return `
            <a href="${href}" class="btn-arrow" ${attr}>
                <i data-feather="chevron-right"></i>
                ${content}
                <i data-feather="chevron-right"></i>
            </a>
        `
    });
    
    return {
        pathPrefix: '/case1-pgm-website-pgm-lenndery/',
        dir: {
            output: 'docs',
            input: 'src/',
            data: '_data',
            pages: '_pages',
            includes: '_includes',
            layouts: '_layouts'
        },
        markdownTemplateEngine: 'liquid',
        htmlTemplateEngine: 'liquid',
    }
};