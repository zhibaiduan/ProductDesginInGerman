const fs = require('fs');
const vm = require('vm');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const styles = fs.readFileSync('styles.css', 'utf8');
const app = fs.readFileSync('app.js', 'utf8');
const pretest = fs.readFileSync('pretest.html', 'utf8');

const results = [];

function check(name, condition, detail = '') {
  if (!condition) {
    results.push({ name, ok: false, detail });
    return;
  }
  results.push({ name, ok: true });
}

function match(re, text) {
  return re.test(text);
}

check(
  'Mobile brand color is explicit',
  match(/\.product-brand\s*\{[\s\S]*?color\s*:\s*var\(--color-text-primary\)/, styles),
  'Top brand button must not fall back to mobile system blue.'
);

check(
  'Mobile nav fade overlay was removed',
  !match(/\.product-nav-inner::after\s*\{[\s\S]*?linear-gradient/, styles),
  'The old right-side gradient clipped Better Practice.'
);

check(
  'Mobile chapter swipe is disabled',
  !match(/touchstart|touchend|touchStartX/, app),
  'Chapters should change only by taps/clicks, not horizontal swipes.'
);

check(
  'Pretest modal is promoted above page stacking contexts',
  match(/document\.body\.appendChild\(modal\)/, app) &&
    match(/originalParent\?\.insertBefore\(modal,\s*originalNextSibling\)/, app),
  'Modal should move to body while open and return on close.'
);

check(
  'Pretest modal has dark backdrop and high z-index',
  match(/\.pretest-modal\s*\{[\s\S]*?z-index\s*:\s*1000/, styles) &&
    match(/\.pretest-modal-backdrop\s*\{[\s\S]*?rgba\(10,\s*7,\s*5,\s*0\.62\)/, styles),
  'Modal should cover sticky nav with visible black overlay.'
);

check(
  'Pretest dialog is constrained to viewport',
  match(/height\s*:\s*min\(760px,\s*calc\(100dvh/, styles) &&
    match(/max-height\s*:\s*calc\(100dvh/, styles),
  'Dialog must fit mobile viewport and scroll internally.'
);

check(
  'Pretest next button advances once and resets iframe scroll',
  match(/let cur=0,score=0,picked=false,isAdvancing=false;/, pretest) &&
    match(/function resetQuizScroll\(\)/, pretest) &&
    match(/if\(isAdvancing\)return;/, pretest) &&
    match(/nextButton\.disabled=true/, pretest),
  'Next question should not need a second tap.'
);

check(
  'Summary bar mobile spacing is protected',
  match(/\.summary-bar \.stat-n\s*\{[\s\S]*?line-height\s*:\s*1\.08[\s\S]*?margin-bottom\s*:\s*8px/, styles) &&
    match(/\.summary-bar \.stat-item \+ \.stat-item\s*\{[\s\S]*?padding-top\s*:\s*18px/, styles),
  'Mobile stat numbers and divider lines need breathing room.'
);

const summaryBars = [...indexHtml.matchAll(/<div class="summary-bar">/g)].length;
check(
  'Summary bar exists on all localized lesson pages',
  summaryBars === 6,
  `Expected 6 summary bars, found ${summaryBars}.`
);

const scriptMatch = pretest.match(/<script>([\s\S]*?)<\/script>/);
check('Pretest inline script exists', Boolean(scriptMatch));

if (scriptMatch) {
  const script = scriptMatch[1];
  const state = {
    body: { dataset: {} },
    documentElement: {},
    nodes: new Map(),
  };

  function node(id) {
    if (!state.nodes.has(id)) {
      state.nodes.set(id, {
        id,
        style: {},
        className: '',
        innerHTML: '',
        textContent: '',
        disabled: false,
        classList: {
          add() {},
          remove() {},
        },
      });
    }
    return state.nodes.get(id);
  }

  const context = {
    window: {
      location: { search: '?lang=en', origin: 'http://127.0.0.1:8012' },
      parent: { postMessage() {} },
      requestAnimationFrame: (fn) => fn(),
      scrollY: 0,
      scrollTo: ({ top }) => { context.window.scrollY = top; },
    },
    document: {
      body: state.body,
      documentElement: state.documentElement,
      scrollingElement: { scrollTo: ({ top }) => { context.window.scrollY = top; } },
      querySelector(selector) {
        if (selector === '.hdr-tag') return node('hdr-tag');
        if (selector === '.hdr-h') return node('hdr-h');
        if (selector === '.hdr-p') return node('hdr-p');
        return null;
      },
      getElementById(id) {
        return node(id);
      },
    },
    URLSearchParams,
    requestAnimationFrame: (fn) => fn(),
    console,
  };

  vm.createContext(context);
  vm.runInContext(script, context);

  check('Pretest starts at question 1', /Question 1 of 10/.test(node('qc').innerHTML));

  for (let i = 0; i < 10; i += 1) {
    context.pick(0);
    context.advance();
  }

  check('Pretest completes all 10 questions', /\/10/.test(node('res').innerHTML));
  check('Pretest renders recommended next steps', /Recommended next steps/.test(node('res').innerHTML));
}

const failed = results.filter((result) => !result.ok);
for (const result of results) {
  console.log(`${result.ok ? 'PASS' : 'FAIL'} ${result.name}${result.detail ? ` - ${result.detail}` : ''}`);
}

if (failed.length) {
  process.exitCode = 1;
}
