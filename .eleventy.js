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
      
    eleventyConfig.addLayoutAlias('page', 'page.html');
    eleventyConfig.addLayoutAlias('default', 'default.html');
    
    return {
        pathPrefix: '/case1-pgm-website-pgm-lenndery',
        dir: {
            output: 'docs',
            input: 'src/',
            data: '_data',
            includes: '_includes',
            layouts: '_layouts'
        },
        markdownTemplateEngine: 'liquid',
        htmlTemplateEngine: 'liquid',
    }
};