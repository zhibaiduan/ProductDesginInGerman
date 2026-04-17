const fs = require('fs');
const path = require('path');
const { buildOrangeZh, buildGreenZh } = require('./germany_handbook_localized_content');

const ROOT = __dirname;
const OUTPUT_FILE = path.join(ROOT, 'germany_digital_product_handbook.html');

function read(fileName) {
  return fs.readFileSync(path.join(ROOT, fileName), 'utf8');
}

function extractFragment(fileName, pattern, label) {
  const source = read(fileName);
  const match = source.match(pattern);
  if (!match) {
    throw new Error(`Could not extract ${label} from ${fileName}`);
  }
  return match[0].trim();
}

function rewriteChapterMarkup(fragment, prefix) {
  let output = fragment;

  output = output.replace(
    /<div class="handbook">/,
    `<div class="handbook chapter-handbook" data-tabs data-chapter="${prefix}">`
  );

  output = output.replace(
    /<div class="pill([^"]*)" onclick="showSection\('([^']+)'\)">/g,
    '<div class="pill$1" role="button" tabindex="0" data-tab-button="$2">'
  );

  output = output.replace(
    /<div id="([^"]+)" class="section([^"]*)">/g,
    '<div class="section$2" data-tab-panel="$1">'
  );

  return output;
}

function build() {
  const cover = extractFragment(
    'germany_handbook_cover.html',
    /<div class="cover">[\s\S]*<\/div>\s*$/,
    'cover'
  );

  const red = rewriteChapterMarkup(
    extractFragment(
      'german_market_red_lines_handbook.html',
      /<div class="handbook">[\s\S]*?<\/div>\s*<script>/,
      'red handbook'
    ).replace(/\s*<script>[\s\S]*$/, ''),
    'red'
  );

  const redZh = rewriteChapterMarkup(
    extractFragment(
      'german_market_red_lines_handbook_zh.html',
      /<div class="handbook">[\s\S]*?<\/div>\s*<script>/,
      'Chinese red handbook'
    ).replace(/\s*<script>[\s\S]*$/, ''),
    'red'
  );

  const orange = rewriteChapterMarkup(
    extractFragment(
      'german_market_orange_lines_handbook.html',
      /<div class="handbook">[\s\S]*?<\/div>\s*<script>/,
      'orange handbook'
    ).replace(/\s*<script>[\s\S]*$/, ''),
    'orange'
  );

  const orangeZh = buildOrangeZh();

  const green = rewriteChapterMarkup(
    extractFragment(
      'german_market_green_lines_handbook.html',
      /<div class="handbook">[\s\S]*?<\/div>\s*<script>/,
      'green handbook'
    ).replace(/\s*<script>[\s\S]*$/, ''),
    'green'
  );

  const greenZh = buildGreenZh();

  const quiz = extractFragment(
    'germany_product_compliance_quiz.html',
    /<div class="quiz">[\s\S]*<\/div>\s*<script\b[^>]*>/,
    'quiz'
  ).replace(/\s*<script\b[\s\S]*$/, '');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Germany Digital Product Handbook</title>
  <link rel="stylesheet" href="germany_handbook_shared.css">
</head>
<body>
  <div class="product-shell page-product" data-book>
    <header class="product-nav">
      <div class="product-nav-inner">
        <button class="product-brand" type="button" data-book-jump="cover" data-i18n="brand">Germany Digital Product Handbook</button>
        <div class="product-nav-actions">
          <nav class="product-links" aria-label="Handbook sections" data-i18n-aria-label="navAria">
            <button class="product-link is-active" type="button" data-book-jump="cover" data-i18n="nav.cover">Cover</button>
            <button class="product-link" type="button" data-book-jump="red" data-i18n="nav.red">Prohibited</button>
            <button class="product-link" type="button" data-book-jump="orange" data-i18n="nav.orange">Grey area</button>
            <button class="product-link" type="button" data-book-jump="green" data-i18n="nav.green">Recommend</button>
            <button class="product-link" type="button" data-book-jump="quiz" data-i18n="nav.quiz">Quiz</button>
          </nav>
          <label class="language-picker" aria-label="Language" data-i18n-aria-label="languageAria">
            <select class="language-select" data-language-select aria-label="Language" data-i18n-aria-label="languageAria">
              <option value="en">🇬🇧</option>
              <option value="zh">🇨🇳</option>
            </select>
          </label>
        </div>
      </div>
    </header>

    <div class="book-frame">
      <main class="book-viewport">
        <section id="cover" class="product-section book-page is-active" data-book-page="cover" data-book-title="Cover" data-book-title-key="nav.cover" data-book-index="1">
          ${cover}
        </section>

        <section id="red" class="product-section book-page" data-book-page="red" data-book-title="Prohibited" data-book-title-key="nav.red" data-book-index="2">
          <div class="section-kicker" data-i18n="chapter.1">Chapter 1</div>
          <div data-localized-content="en">
            ${red}
          </div>
          <div data-localized-content="zh" hidden>
            ${redZh}
          </div>
        </section>

        <section id="orange" class="product-section book-page" data-book-page="orange" data-book-title="Grey area" data-book-title-key="nav.orange" data-book-index="3">
          <div class="section-kicker" data-i18n="chapter.2">Chapter 2</div>
          <div data-localized-content="en">
            ${orange}
          </div>
          <div data-localized-content="zh" hidden>
            ${orangeZh}
          </div>
        </section>

        <section id="green" class="product-section book-page" data-book-page="green" data-book-title="Recommend" data-book-title-key="nav.green" data-book-index="4">
          <div class="section-kicker" data-i18n="chapter.3">Chapter 3</div>
          <div data-localized-content="en">
            ${green}
          </div>
          <div data-localized-content="zh" hidden>
            ${greenZh}
          </div>
        </section>

        <section id="quiz" class="product-section book-page" data-book-page="quiz" data-book-title="Quiz" data-book-title-key="nav.quiz" data-book-index="5">
          <div class="section-kicker" data-i18n="chapter.4">Chapter 4</div>
          ${quiz}
        </section>
      </main>
    </div>
  </div>

  <script src="germany_handbook_app.js"></script>
</body>
</html>
`;

  fs.writeFileSync(OUTPUT_FILE, html);
  console.log(`Built ${path.basename(OUTPUT_FILE)}`);
}

build();
