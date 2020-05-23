const fs = require("fs");

module.exports = (eleventyConfig) => { 
    
    eleventyConfig.setQuietMode(true);
    eleventyConfig.addWatchTarget("./src/");
    
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
          ready: (err, bs) => {
    
            bs.addMiddleware("*", (req, res) => {
              const content_404 = fs.readFileSync('_pages/404.html');
              // Provides the 404 content without redirect.
              res.write(content_404);
              // Add 404 http status code in request header.
              res.writeHead(404, { "Content-Type": "text/html" });
              // res.writeHead(404);
              res.end();
            });
          }
        }
      });
    
    // Copy `img/` to `_site/img`
    eleventyConfig.addPassthroughCopy({ 
      'src/_static': 'static/'
    });
      
    eleventyConfig.addLayoutAlias('page', 'page.liquid');
    eleventyConfig.addLayoutAlias('default', 'default.liquid');
    eleventyConfig.addLayoutAlias('modal', 'modal.liquid');
    eleventyConfig.addLayoutAlias('modal-galery', 'modal-galery.liquid');
    
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