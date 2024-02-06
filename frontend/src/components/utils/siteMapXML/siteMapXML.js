import fs from 'fs';

const languages = [
  'Java',
  'C%23',
  'JavaScript',
  'Python',
  'C%2B%2B'
]

const urlsBasic = [
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics&module=First%20Steps%20in%20Coding%20-%20Exercise',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics&module=First%20Steps%20in%20Coding%20-%20More%20Exercises',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics&module=Conditional%20Statements%20-%20Lab',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics&module=First%20Steps%20in%20Coding%20-%20Lab',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics&module=Conditional%20Statements%20-%20Exercise',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics&module=Conditional%20Statements%20-%20More%20Exercises',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics&module=Conditional%20Statements%20Advanced%20-%20Lab',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics&module=Conditional%20Statements%20Advanced%20-%20Exercise',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics&module=Conditional%20Statements%20Advanced%20-%20More%20Exercises',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics&module=For%20Loop%20-%20Lab',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics&module=For%20Loop%20-%20Exercise',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics&module=For-Loop%20-%20More%20Exercises',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics&module=While%20Loop%20-%20Lab',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics&module=While%20Loop%20-%20Exercise',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics&module=While-Loop%20-%20More%20Exercises',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics&module=Nested%20Loops%20-%20Lab',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics&module=Nested%20Loops%20-%20Exercise',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics&module=Nested%20Loops%20-%20More%20Exercises',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics&module=Drawing%20Figures%20with%20Loops%20-%20More%20Exercises',
];

function generateSitemap(urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  languages.forEach(l => {
    urls.forEach(url => {
      xml += '  <url>\n';
      xml += `    <loc>${url.replace('toChange', l).replace(/&/g, '&amp;')}</loc>\n`;
      xml += '    <lastmod>' + new Date().toISOString().split('T')[0] + '</lastmod>\n';
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>1</priority>\n';
      xml += '  </url>\n';
    });
  })


  xml += '</urlset>';
  return xml;
}

const sitemap = generateSitemap(urlsBasic);
fs.writeFileSync('sitemap.xml', sitemap, 'utf-8');
console.log(sitemap);
