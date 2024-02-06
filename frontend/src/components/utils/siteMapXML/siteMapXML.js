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
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics%20Exams&module=Programming%20Basics%20Online%20Exam%20-%2018%20and%2019%20July%202020',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics%20Exams&module=Programming%20Basics%20Online%20Exam%20-%2028%20and%2029%20March%202020',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics%20Exams&module=Programming%20Basics%20Online%20Exam%20-%206%20and%207%20July%202019',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics%20Exams&module=Programming%20Basics%20Online%20Exam%20-%2015%20and%2016%20June%202019',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics%20Exams&module=Programming%20Basics%20Online%20Retake%20Exam%20-%202%20and%203%20May%202019',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics%20Exams&module=Programming%20Basics%20Online%20Exam%20-%2020%20and%2021%20April%202019',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics%20Exams&module=Programming%20Basics%20Online%20Exam%20-%206%20and%207%20April%202019',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Basics%20Exams&module=Programming%20Basics%20Online%20Exam%20-%209%20and%2010%20March%202019',
];

const urlsFundamentals = [
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Fundamentals%20Exams&module=01.%20Programming%20Fundamentals%20Mid%20Exam%20Retake',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Fundamentals%20Exams&module=01.%20Programming%20Fundamentals%20Final%20Exam%20Retake',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Fundamentals%20Exams&module=02.%20Programming%20Fundamentals%20Mid%20Exam',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Fundamentals%20Exams&module=02.%20Programming%20Fundamentals%20Final%20Exam',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Fundamentals%20Exams&module=03.%20Programming%20Fundamentals%20Mid%20Exam%20Retake',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Fundamentals%20Exams&module=03.%20Programming%20Fundamentals%20Final%20Exam%20Retake',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Fundamentals%20Exams&module=04.%20Programming%20Fundamentals%20Mid%20Exam',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Fundamentals%20Exams&module=04.%20Programming%20Fundamentals%20Final%20Exam',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Fundamentals%20Exams&module=05.%20Programming%20Fundamentals%20Mid%20Exam',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Fundamentals%20Exams&module=05.%20Programming%20Fundamentals%20Final%20Exam',
  'https://icode-example.ceo-py.eu/menu?language=toChange&course=Fundamentals%20Exams&module=06.%20Programming%20Fundamentals%20Mid%20Exam%20Retake',

]

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

const sitemap = generateSitemap([...urlsBasic, ...urlsFundamentals]);
fs.writeFileSync('sitemap.xml', sitemap, 'utf-8');
console.log(sitemap);
