const fs = require('fs');
const path = require('path');

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

  const orange = rewriteChapterMarkup(
    extractFragment(
      'german_market_orange_lines_handbook.html',
      /<div class="handbook">[\s\S]*?<\/div>\s*<script>/,
      'orange handbook'
    ).replace(/\s*<script>[\s\S]*$/, ''),
    'orange'
  );

  const green = rewriteChapterMarkup(
    extractFragment(
      'german_market_green_lines_handbook.html',
      /<div class="handbook">[\s\S]*?<\/div>\s*<script>/,
      'green handbook'
    ).replace(/\s*<script>[\s\S]*$/, ''),
    'green'
  );

  const quiz = extractFragment(
    'germany_product_compliance_quiz.html',
    /<div class="quiz">[\s\S]*<\/div>\s*<script>/,
    'quiz'
  ).replace(/\s*<script>[\s\S]*$/, '');

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
        <button class="product-brand" type="button" data-book-jump="cover">Germany Digital Product Handbook</button>
        <nav class="product-links" aria-label="Handbook sections">
          <button class="product-link is-active" type="button" data-book-jump="cover">Cover</button>
          <button class="product-link" type="button" data-book-jump="red">Red lines</button>
          <button class="product-link" type="button" data-book-jump="orange">Orange lines</button>
          <button class="product-link" type="button" data-book-jump="green">Green lines</button>
          <button class="product-link" type="button" data-book-jump="quiz">Quiz</button>
        </nav>
      </div>
    </header>

    <div class="book-frame">
      <button class="book-arrow book-arrow-prev" type="button" data-book-prev aria-label="Previous page">
        <span class="book-arrow-label">Previous</span>
      </button>

      <main class="book-viewport">
        <section id="cover" class="product-section book-page is-active" data-book-page="cover" data-book-title="Cover" data-book-index="1">
          ${cover}
        </section>

        <section id="red" class="product-section book-page" data-book-page="red" data-book-title="Red lines" data-book-index="2">
          <div class="section-kicker">Chapter 1</div>
          ${red}
        </section>

        <section id="orange" class="product-section book-page" data-book-page="orange" data-book-title="Orange lines" data-book-index="3">
          <div class="section-kicker">Chapter 2</div>
          ${orange}
        </section>

        <section id="green" class="product-section book-page" data-book-page="green" data-book-title="Green lines" data-book-index="4">
          <div class="section-kicker">Chapter 3</div>
          ${green}
        </section>

        <section id="quiz" class="product-section book-page" data-book-page="quiz" data-book-title="Quiz" data-book-index="5">
          <div class="section-kicker">Chapter 4</div>
          ${quiz}
        </section>
      </main>

      <button class="book-arrow book-arrow-next" type="button" data-book-next aria-label="Next page">
        <span class="book-arrow-label">Next</span>
      </button>
    </div>

    <footer class="book-footer" aria-label="Page navigation">
      <div class="book-footer-meta">
        <div class="book-page-count"><span data-book-current>1</span> / <span data-book-total>5</span></div>
        <div class="book-page-title" data-book-current-title>Cover</div>
      </div>
      <div class="book-dots">
        <button class="book-dot is-active" type="button" data-book-jump="cover" aria-label="Go to cover"></button>
        <button class="book-dot" type="button" data-book-jump="red" aria-label="Go to red lines"></button>
        <button class="book-dot" type="button" data-book-jump="orange" aria-label="Go to orange lines"></button>
        <button class="book-dot" type="button" data-book-jump="green" aria-label="Go to green lines"></button>
        <button class="book-dot" type="button" data-book-jump="quiz" aria-label="Go to quiz"></button>
      </div>
    </footer>
  </div>

  <script src="germany_handbook_app.js"></script>
</body>
</html>
`;

  fs.writeFileSync(OUTPUT_FILE, html);
  console.log(`Built ${path.basename(OUTPUT_FILE)}`);
}

build();
