const fs = require("fs");
const moment = require('moment');
moment().format();
moment.locale('nl-be'); 

module.exports = (eleventyConfig) => {     
    eleventyConfig.setQuietMode(true);
    eleventyConfig.addWatchTarget("./src/");
    
    eleventyConfig.setFrontMatterParsingOptions({
      excerpt: true,
      // Optional, default is "---"
      excerpt_separator: "<!-- excerpt -->",
      excerpt_alias: '<!-- excerpt -->'
    });
    
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
          ready: (err, bs) => {
            bs.addMiddleware("*", (req, res) => {
              const content_404 = fs.readFileSync('docs/404/index.html');
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
      'src/_static': 'static/',
      'src/robots.txt': 'robots.txt'
    });
      
    eleventyConfig.addLayoutAlias('no-modal', 'no-modal.liquid');
    eleventyConfig.addLayoutAlias('default', 'default.liquid');
    eleventyConfig.addLayoutAlias('page', 'page.liquid');
    eleventyConfig.addLayoutAlias('page-galery', 'page-galery.liquid');
    eleventyConfig.addLayoutAlias('page-wide', 'page-wide.liquid');
    eleventyConfig.addLayoutAlias('page-empty', 'page-empty.liquid');
    eleventyConfig.addLayoutAlias('page-fluid', 'page-fluid.liquid');
    
    eleventyConfig.addPairedShortcode("momentify", (content) => {
      return moment(new Date(content)).fromNow();
    });
    
    eleventyConfig.addPairedShortcode("momentifyUnix", (content) => {
      content = parseFloat(content);
      return moment(content).utc().fromNow();
    });
    
    eleventyConfig.addPairedShortcode("academicPeriod", (content) => {
      let date = new Date(content);
      date = {
          month: date.getMonth(),
          year: date.getFullYear(),
      };
      return date.month >= 8 && date.month >= 11 ? `${date.year} - ${date.year + 1}` : `${date.year - 1} - ${date.year}`
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