// Compose projects.yaml into index.html id="projects" section
const yaml = require('js-yaml');
const fs = require('fs');

const indexPath = '../index.html';


try {

  // Clear out innerHTML of <section id="projects"></section>
  let index = fs.readFileSync(indexPath, 'utf-8');
  const sectionStart = index.search('<section id="projects">') + 23;
  const sectionEnd = sectionStart + index.substring(sectionStart, index.length).search('</section>');

  let articles = '';
  const doc = yaml.load(fs.readFileSync('../projects.yaml', 'utf8'));
  for (key in doc) 
    articles += add(key, doc[key].description, doc[key].duration, doc[key].image.src, doc[key].image.alt);

  index = index.substring(0, sectionStart) + '\n' + articles + '\t\t' + index.substring(sectionEnd, index.length);

  fs.writeFileSync(indexPath, index, 'utf-8');
}
catch(e) { console.log(e) }


function add(title, desc, duration, src, alt) {
  let article = '<article class="showcase">\n';
  article += '\t<div>\n';
  article += `\t\t<h1>${ title }</h1>\n`;
  article += `\t\t<h2>${ duration }</h2>\n`;
  article += `\t\t<span>${ desc }</span>\n`;
  article += '\t</div>\n';
  if (src) article += `\t<img loading="lazy" alt="${ alt }" src="${ src }"</img>\n`;
  article += '</article>\n';
  return article;
}
