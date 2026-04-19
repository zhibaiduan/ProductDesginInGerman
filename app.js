const SUPPORTED_LANGUAGES = ['en', 'zh'];
const DEFAULT_LANGUAGE = 'en';

let currentLanguage = DEFAULT_LANGUAGE;

const UI_COPY = {
  en: {
    brand: 'Germany Workplace Compliance',
    navAria: 'Handbook sections',
    languageAria: 'Language',
    languageLabel: 'Language',
    nav: {
      cover: 'Cover',
      red: 'Hard Stops',
      orange: 'Grey Areas',
      green: 'Better Practice',
      quiz: 'Score Check'
    },
    chapter: {
      1: 'Chapter 1',
      2: 'Chapter 2',
      3: 'Chapter 3',
      4: 'Chapter 4'
    },
    quizRuntime: {
      questionMeta: (current, total) => `QUESTION ${current} OF ${total}`,
      progress: (current, total) => `${current} / ${total}`,
      correctPrefix: 'Correct.',
      wrongPrefix: 'Not quite.',
      checkAnswer: 'Check answer',
      nextQuestion: 'Next question',
      seeResults: 'See my results',
      resultLabel: (pct) => `${pct}% correct`,
      redLines: 'Red lines',
      orangeLines: 'Orange lines',
      greenLines: 'Green lines',
      nextSteps: 'Suggested next steps'
    }
  },
  zh: {
    brand: '德国职场合规',
    navAria: '手册章节',
    languageAria: '语言',
    languageLabel: '语言',
    nav: {
      cover: '封面',
      red: '必须停下',
      orange: '灰区判断',
      green: '更专业做法',
      quiz: '测一测'
    },
    chapter: {
      1: '第 1 章',
      2: '第 2 章',
      3: '第 3 章',
      4: '第 4 章'
    },
    quizRuntime: {
      questionMeta: (current, total) => `第 ${current} 题 / 共 ${total} 题`,
      progress: (current, total) => `${current} / ${total}`,
      correctPrefix: '正确。',
      wrongPrefix: '这一步容易踩坑。',
      checkAnswer: '检查答案',
      nextQuestion: '下一题',
      seeResults: '查看结果',
      resultLabel: (pct) => `正确率 ${pct}%`,
      redLines: '硬红线',
      orangeLines: '待判断灰区',
      greenLines: '加分项',
      nextSteps: '建议下一步'
    }
  }
};

const TRANSLATED_CONTENT = [
  { selector: '.masthead-title', key: 'cover.mastheadTitle' },
  { selector: '.masthead-meta', key: 'cover.mastheadMeta' },
  { selector: '.cover-title', key: 'cover.title' },
  { selector: '.hero-headline', key: 'cover.headline', html: true },
  { selector: '.hero-deck', key: 'cover.deck' },
  { selector: '.stat-box:nth-child(1) .stat-desc', key: 'cover.stats.1' },
  { selector: '.stat-box:nth-child(2) .stat-desc', key: 'cover.stats.2' },
  { selector: '.stat-box:nth-child(3) .stat-desc', key: 'cover.stats.3' },
  { selector: '.stat-box:nth-child(4) .stat-desc', key: 'cover.stats.4' },
  { selector: '.quote-text', key: 'cover.quote' },
  { selector: '.quote-attr', key: 'cover.quoteAttr' },
  { selector: '.pretest-title', key: 'cover.pretest.title' },
  { selector: '.pretest-sub', key: 'cover.pretest.sub' },
  { selector: '.pretest-button', key: 'cover.pretest.button' },
  { selector: '.for-you-section .section-label', key: 'cover.forYouLabel' },
  { selector: '.persona-role', key: 'cover.personaRole' },
  { selector: '.persona-pain', key: 'cover.personaPain' },
  { selector: '.persona-card .compact-list li:nth-child(1)', key: 'cover.personaList.1' },
  { selector: '.persona-card .compact-list li:nth-child(2)', key: 'cover.personaList.2' },
  { selector: '.persona-card .compact-list li:nth-child(3)', key: 'cover.personaList.3' },
  { selector: '.contents-section .section-label', key: 'cover.contentsLabel' },
  { selector: '.contents-item:nth-child(1) .contents-chapter', key: 'cover.contents.1.chapter' },
  { selector: '.contents-item:nth-child(1) .contents-name', key: 'cover.contents.1.name' },
  { selector: '.contents-item:nth-child(1) li:nth-child(1)', key: 'cover.contents.1.items.1' },
  { selector: '.contents-item:nth-child(1) li:nth-child(2)', key: 'cover.contents.1.items.2' },
  { selector: '.contents-item:nth-child(1) li:nth-child(3)', key: 'cover.contents.1.items.3' },
  { selector: '.contents-item:nth-child(1) li:nth-child(4)', key: 'cover.contents.1.items.4' },
  { selector: '.contents-item:nth-child(2) .contents-chapter', key: 'cover.contents.2.chapter' },
  { selector: '.contents-item:nth-child(2) .contents-name', key: 'cover.contents.2.name' },
  { selector: '.contents-item:nth-child(2) li:nth-child(1)', key: 'cover.contents.2.items.1' },
  { selector: '.contents-item:nth-child(2) li:nth-child(2)', key: 'cover.contents.2.items.2' },
  { selector: '.contents-item:nth-child(2) li:nth-child(3)', key: 'cover.contents.2.items.3' },
  { selector: '.contents-item:nth-child(2) li:nth-child(4)', key: 'cover.contents.2.items.4' },
  { selector: '.why-section .section-label', key: 'cover.whyLabel' },
  { selector: '.why-item:nth-child(1) .why-item-title', key: 'cover.why.1.title' },
  { selector: '.why-item:nth-child(1) .why-item-desc', key: 'cover.why.1.desc' },
  { selector: '.why-item:nth-child(2) .why-item-title', key: 'cover.why.2.title' },
  { selector: '.why-item:nth-child(2) .why-item-desc', key: 'cover.why.2.desc' },
  { selector: '.footer-left', key: 'cover.footerLeft', html: true },
  { selector: '.footer-disclaimer', key: 'cover.footerDisclaimer', html: true },
  { selector: '.quiz .header-label', key: 'quizIntro.label' },
  { selector: '.quiz .header-title', key: 'quizIntro.title', html: true },
  { selector: '.quiz .header-sub', key: 'quizIntro.sub' },
  { selector: '.restart-btn', key: 'quizIntro.restart' }
];

const LOCALIZED_PAGE_COPY = {
  en: {
    cover: {
      mastheadTitle: 'The Germany Workplace Compliance Handbook',
      mastheadMeta: '2026 Edition · For People Entering German Workplaces',
      title: 'In German workplaces, compliance is not background knowledge',
      headline: 'Know when<br>to <em>stop</em>,<br>where to be<br><em class="orange-em">careful</em>,<br>and what counts as<br><span class="green-em">sound judgment.</span>',
      deck: 'In many markets, compliance is a final check. In Germany and Europe, it often shapes work from the start: data, AI, privacy, employee information, and product flows. Use the questions first to feel what is different.',
      stats: {
        1: 'Germany\'s largest GDPR fine in 2025 shows how data, process, and responsibility chains become compliance issues',
        2: 'EU AI Act prohibitions took effect, making some AI uses more than ordinary efficiency choices',
        3: 'Independent German data protection authorities make enforcement local, active, and hard to ignore',
        4: 'Court rulings on cancellation buttons show how ordinary UX details can become compliance questions'
      },
      quote: '"You do not need to become a lawyer. You do need to notice when an ordinary work decision has a compliance edge."',
      quoteAttr: 'Data · AI · privacy · employee information · product flows',
      pretest: {
        title: 'How much would you get right as a beginner?',
        sub: '10 quick questions to feel where German and European compliance differ from other markets.',
        button: 'Check my score →'
      },
      forYouLabel: 'Who this is for',
      personaRole: 'People preparing to work in German or European teams.',
      personaPain: 'If your work touches data, AI, privacy, or product flows, build a first sense for:',
      personaList: {
        1: 'Which actions are clearly unsafe or prohibited',
        2: 'Which choices depend on context and boundaries',
        3: 'Which habits make your work feel more reliable'
      },
      contentsLabel: 'What you will learn',
      contents: {
        1: {
          chapter: 'Judgment map',
          name: 'Three levels for work decisions',
          items: {
            1: 'Stop: clearly high-risk or prohibited',
            2: 'Be careful: context and boundaries matter',
            3: 'Better practice: more trusted ways to work',
            4: 'Start with questions to build an overall feel'
          }
        },
        2: {
          chapter: 'Compliance areas',
          name: 'Where the questions come from',
          items: {
            1: 'Data privacy, cookies, and tracking',
            2: 'AI tools, automation, and content labelling',
            3: 'Employee information and workplace data',
            4: 'Product flows, accounts, cancellation, and export'
          }
        }
      },
      whyLabel: 'Why this matters',
      why: {
        1: {
          title: 'Many markets treat compliance as a late check.',
          desc: 'In Germany and Europe, it often shapes how work should begin.'
        },
        2: {
          title: 'The goal is not perfect legal expertise.',
          desc: 'The goal is noticing the compliance boundary earlier.'
        }
      },
      next: {
        label: 'Next step',
        title: 'Want a quick sense of where mistakes usually happen first?',
        support: 'Start with the clearest situations before moving into grey areas.',
        button: 'Go to Hard Stops'
      },
      footerLeft: 'Based on enforcement data through April 2026<br>GDPR · EU AI Act · KWG · MPDG · BetrVG · BFSG · GWB · TDDDG',
      footerDisclaimer: 'For workplace compliance learning and judgment training. Not legal advice.<br>Consult qualified counsel for specific decisions.'
    },
    red: {
      next: {
        label: 'Next step',
        title: 'Now that the clear red lines are visible, the harder part is judgment.',
        support: 'Some cases are not obviously illegal, but still should not be decided alone.',
        button: 'Continue to Grey Areas'
      }
    },
    orange: {
      next: {
        label: 'Next step',
        title: 'You have seen where caution is needed. Next, learn what a stronger professional answer looks like.',
        support: 'This is where compliance becomes part of credibility at work.',
        button: 'Continue to Better Practice'
      }
    },
    green: {
      next: {
        label: 'Next step',
        title: 'Ready to check what you can recognize after the lesson?',
        support: 'Use it to see which judgments already feel clear, and which ones are still worth reviewing.',
        button: 'Take the Score Check'
      }
    },
    feedback: {
      lesson: {
        label: 'Quick feedback',
        title: 'Was this lesson helpful for understanding compliance expectations in a German workplace?'
      },
      quiz: {
        label: 'Quick feedback',
        title: 'Was this score check helpful for reviewing what you learned?'
      },
      options: {
        yes: 'Yes, it helped',
        somewhat: 'Somewhat',
        notReally: 'Not really'
      },
      thanks: 'Thank you. Your feedback helps improve this learning path.'
    },
    quizIntro: {
      label: 'Germany · Workplace Compliance · Knowledge Check',
      title: 'How many German compliance calls can you get right?',
      sub: '15 practical questions using product, SaaS, AI, data, and workplace examples because this is where German compliance becomes visible in daily work.',
      restart: 'Retake the quiz'
    }
  },
  zh: {
    cover: {
      mastheadTitle: '德国职场合规手册',
      mastheadMeta: '2026 版 · 给进入德国职场的人',
      title: '在德国职场，合规不是背景知识',
      headline: '知道什么时候<br><em>必须停下</em>，<br>哪里需要<br><em class="orange-em">更谨慎</em>，<br>以及什么才算<br><span class="green-em">专业判断。</span>',
      deck: '在很多市场，合规可能是最后检查的一步；但在德国和欧洲，它常常从一开始就影响数据、AI、隐私、员工信息和产品流程。这本手册用题目和案例帮你先建立总体感觉。',
      stats: {
        1: '2025 年德国最大 GDPR 罚单提醒你：数据、流程和责任链都可能成为合规问题',
        2: '欧盟 AI 法案禁止条款已生效，一些 AI 用法不只是效率选择',
        3: '德国有 17 个独立数据保护监管机构，执法更本地、更活跃',
        4: '取消按钮这类 UX 细节也会被法院反复审查'
      },
      quote: '“你不需要成为律师，但需要知道什么时候一个普通工作决定已经触碰合规边界。”',
      quoteAttr: '数据 · AI · 隐私 · 员工信息 · 产品流程',
      pretest: {
        title: '作为新手，你能答对多少？',
        sub: '10 道快速题，先感受德国/欧洲合规和其他市场哪里不一样。',
        button: '测一测我能答对多少 →'
      },
      forYouLabel: '适合谁读',
      personaRole: '准备进入德国或欧洲团队工作的人。',
      personaPain: '如果你未来工作会接触数据、AI、隐私或产品流程，先建立这些判断：',
      personaList: {
        1: '哪些事情明显高风险或不能做',
        2: '哪些事情需要看上下文和边界',
        3: '哪些做法会显得更稳、更专业'
      },
      contentsLabel: '你会学到什么',
      contents: {
        1: {
          chapter: '判断地图',
          name: '三类工作判断',
          items: {
            1: '必须停下：明确高风险或被禁止',
            2: '谨慎判断：不是所有情况都一样',
            3: '更专业做法：更可信的处理方式',
            4: '先用题目测一测，建立总体感觉'
          }
        },
        2: {
          chapter: '合规主题',
          name: '题目覆盖哪里',
          items: {
            1: '数据隐私、Cookie 与 tracking',
            2: 'AI 工具、自动化和内容标注',
            3: '员工信息、HR 和工作场所数据',
            4: '产品流程、账户、取消和导出体验'
          }
        }
      },
      whyLabel: '为什么重要',
      why: {
        1: {
          title: '很多市场把合规放在最后检查。',
          desc: '在德国和欧洲，它经常从一开始就影响工作方式和产品判断。'
        },
        2: {
          title: '目标不是变成法律专家。',
          desc: '目标是更早看出一个普通任务背后的合规边界。'
        }
      },
      next: {
        label: '下一步',
        title: '想先快速看看德国职场里最容易出错的地方吗？',
        support: '从最清楚的红线开始，再进入更难判断的灰区。',
        button: '先看必须停下的情况'
      },
      footerLeft: '基于截至 2026 年 4 月的执法数据<br>GDPR · EU AI Act · KWG · MPDG · BetrVG · BFSG · GWB · TDDDG',
      footerDisclaimer: '用于德国职场合规学习和判断训练，不构成法律意见。<br>具体上线、合同和合规决策请咨询德国/欧盟律师。'
    },
    red: {
      next: {
        label: '下一步',
        title: '看清红线之后，更难的是灰区判断。',
        support: '有些情况不一定明显违法，但也不应该自己直接拍板。',
        button: '继续看灰区情况'
      }
    },
    orange: {
      next: {
        label: '下一步',
        title: '你已经看到哪些情况需要谨慎。接下来看看更稳妥、更专业的做法。',
        support: '这部分会帮助你把合规判断变成职场可信度的一部分。',
        button: '继续看更专业做法'
      }
    },
    green: {
      next: {
        label: '下一步',
        title: '想检验一下学完之后，你能识别哪些判断了吗？',
        support: '看看哪些判断已经清楚，哪些地方还值得再回看。',
        button: '进入学习检测'
      }
    },
    feedback: {
      lesson: {
        label: '快速反馈',
        title: '这些内容对你理解德国职场的合规要求有帮助吗？'
      },
      quiz: {
        label: '快速反馈',
        title: '这个检测对你回顾刚才学到的内容有帮助吗？'
      },
      options: {
        yes: '有帮助',
        somewhat: '有一点帮助',
        notReally: '帮助不大'
      },
      thanks: '谢谢反馈。这会帮助我们把内容做得更适合准备进入德国职场的人。'
    },
    quizIntro: {
      label: '德国 · 职场合规 · 判断题',
      title: '这些德国合规判断，<em>你能答对多少？</em>',
      sub: '15 道实用判断题，用产品、SaaS、AI、数据和职场流程做例子，因为德国合规最常在这些具体工作决策里出现。',
      restart: '再测一次'
    }
  }
};

function getCopyValue(source, key) {
  return key.split('.').reduce((value, part) => value?.[part], source);
}

function getLocalizedValue(key) {
  return getCopyValue(LOCALIZED_PAGE_COPY[currentLanguage], key) ?? getCopyValue(LOCALIZED_PAGE_COPY.en, key);
}

function getUiValue(key) {
  return getCopyValue(UI_COPY[currentLanguage], key) ?? getCopyValue(UI_COPY.en, key);
}

function normalizeLanguage(language) {
  return SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
}

function getInitialLanguage() {
  const params = new URLSearchParams(window.location.search);
  const urlLanguage = params.get('lang');
  if (SUPPORTED_LANGUAGES.includes(urlLanguage)) return urlLanguage;

  return DEFAULT_LANGUAGE;
}

function updateLanguageUrl(language) {
  const url = new URL(window.location.href);
  if (language === DEFAULT_LANGUAGE) {
    url.searchParams.delete('lang');
  } else {
    url.searchParams.set('lang', language);
  }
  history.replaceState(null, '', url.pathname + url.search + url.hash);
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en';
  document.body.dataset.language = currentLanguage;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = getUiValue(element.dataset.i18n);
    if (value !== undefined) element.textContent = value;
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
    const value = getUiValue(element.dataset.i18nAriaLabel);
    if (value !== undefined) element.setAttribute('aria-label', value);
  });

  document.querySelectorAll('[data-book-title-key]').forEach((element) => {
    const value = getUiValue(element.dataset.bookTitleKey);
    if (value !== undefined) element.dataset.bookTitle = value;
  });

  TRANSLATED_CONTENT.forEach(({ selector, key, html }) => {
    const element = document.querySelector(selector);
    const value = getLocalizedValue(key);
    if (!element || value === undefined) return;
    if (html) element.innerHTML = value;
    else element.textContent = value;
  });

  document.querySelectorAll('[data-localized-copy]').forEach((element) => {
    const value = getLocalizedValue(element.dataset.localizedCopy);
    if (value === undefined) return;
    if (element.dataset.localizedHtml === 'true') element.innerHTML = value;
    else element.textContent = value;
  });

  document.querySelectorAll('[data-localized-content]').forEach((element) => {
    element.hidden = element.dataset.localizedContent !== currentLanguage;
  });

  document.querySelectorAll('[data-lang-option]').forEach((button) => {
    const isActive = button.dataset.langOption === currentLanguage;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  document.querySelectorAll('[data-language-select]').forEach((select) => {
    select.value = currentLanguage;
  });

  const activePage = document.querySelector('[data-book-page].is-active');
  const titleElement = document.querySelector('[data-book-current-title]');
  if (activePage && titleElement) {
    titleElement.textContent = activePage.dataset.bookTitle || '';
  }
}

function resetQuizState() {
  current = 0;
  score = 0;
  answered = false;
  selectedOptions = new Set();
  redCorrect = 0;
  orangeCorrect = 0;
  greenCorrect = 0;
  redTotal = 0;
  orangeTotal = 0;
  greenTotal = 0;
  document.getElementById('result-card')?.classList.remove('show');
  document.querySelectorAll('.quiz-next-steps').forEach((element) => element.remove());
  const quizFeedback = document.querySelector('[data-feedback-module="quiz"]');
  if (quizFeedback) resetFeedbackModule(quizFeedback);
}

function setLanguage(language, options = {}) {
  currentLanguage = normalizeLanguage(language);
  applyTranslations();

  if (options.updateUrl !== false) {
    updateLanguageUrl(currentLanguage);
  }

  if (options.resetQuiz && document.getElementById('q-container')) {
    resetQuizState();
    renderQuiz();
  }

  syncPretestFrameLanguage();
}

function initLanguageSwitch() {
  document.querySelectorAll('[data-language-select]').forEach((select) => {
    select.addEventListener('change', () => {
      setLanguage(select.value, { resetQuiz: true });
    });
  });

  document.querySelectorAll('[data-lang-option]').forEach((button) => {
    button.addEventListener('click', () => {
      setLanguage(button.dataset.langOption, { resetQuiz: true });
    });
  });

  setLanguage(getInitialLanguage(), { updateUrl: false, resetQuiz: false });
}

function activateTab(container, panelName) {
  const buttons = container.querySelectorAll('[data-tab-button]');
  const panels = container.querySelectorAll('[data-tab-panel]');
  let activeButton = null;

  buttons.forEach((button) => {
    const isActive = button.dataset.tabButton === panelName;
    button.classList.toggle('active', isActive);
    if (isActive) activeButton = button;
  });

  panels.forEach((panel) => {
    panel.classList.toggle('visible', panel.dataset.tabPanel === panelName);
  });

  if (activeButton && window.innerWidth <= 900) {
    activeButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}

function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach((container) => {
    const buttons = container.querySelectorAll('[data-tab-button]');
    if (!buttons.length) return;

    buttons.forEach((button) => {
      button.addEventListener('click', () => activateTab(container, button.dataset.tabButton));
      button.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          activateTab(container, button.dataset.tabButton);
        }
      });
    });

    const active = container.querySelector('[data-tab-button].active') || buttons[0];
    activateTab(container, active.dataset.tabButton);
  });
}

const WORKPLACE_TAKEAWAYS = {
  en: {
    red: {
      title: 'Workplace takeaway',
      text: 'If this appears in your work, treat it as a hard stop. The risk is not just a preference, shortcut, or workflow detail.'
    },
    orange: {
      title: 'Workplace takeaway',
      text: 'Pause before treating this as routine. The answer depends on context, boundaries, evidence, and how the system is actually used.'
    },
    green: {
      title: 'Workplace takeaway',
      text: 'Notice this as a trust signal. You may not own procurement, but recognizing the evidence helps you understand why German teams ask for it.'
    }
  },
  zh: {
    red: {
      title: '职场判断',
      text: '如果工作中遇到这种模式，先把它当成必须停下的边界。它不是偏好、效率或流程细节。'
    },
    orange: {
      title: '职场判断',
      text: '不要把它当作普通操作直接推进。答案取决于上下文、边界、证据，以及系统实际怎么被使用。'
    },
    green: {
      title: '职场判断',
      text: '把它看成信任信号。你不一定负责采购，但理解这些证据，会帮你知道德国团队为什么反复要求它。'
    }
  }
};

function initWorkplaceTakeaways() {
  document.querySelectorAll('.chapter-handbook .card-body').forEach((body) => {
    if (body.querySelector('.workplace-takeaway')) return;
    const chapter = body.closest('[data-chapter]')?.dataset.chapter;
    const language = body.closest('[data-localized-content]')?.dataset.localizedContent || 'en';
    const copy = WORKPLACE_TAKEAWAYS[language]?.[chapter] || WORKPLACE_TAKEAWAYS.en[chapter];
    if (!copy) return;

    const takeaway = document.createElement('div');
    takeaway.className = `workplace-takeaway takeaway-${chapter}`;
    takeaway.innerHTML = `<div class="workplace-takeaway-title">${copy.title}</div><div class="workplace-takeaway-text">${copy.text}</div>`;
    body.appendChild(takeaway);
  });
}

function storeFeedback(payload) {
  const key = 'germanyWorkplaceComplianceFeedback';
  try {
    const currentItems = JSON.parse(localStorage.getItem(key) || '[]');
    currentItems.push(payload);
    localStorage.setItem(key, JSON.stringify(currentItems.slice(-50)));
  } catch (error) {
    try {
      localStorage.setItem(key, JSON.stringify([payload]));
    } catch (storageError) {
      // Feedback still gets acknowledged in the UI even when local storage is unavailable.
    }
  }
}

function getActiveBookPageName() {
  return document.querySelector('[data-book-page].is-active')?.dataset.bookPage || '';
}

function getFeedbackSource(source) {
  return source === 'quiz' ? 'quiz_end' : 'lesson_end';
}

function getFeedbackScore(source) {
  if (source !== 'quiz') return '';

  const total = getQuizQuestions().length;
  if (!total) return '';

  const pct = Math.round((score / total) * 100);
  return `${score}/${total} (${pct}%)`;
}

function submitFeedbackToGoogleForm(payload) {
  const body = new FormData();
  body.append(FEEDBACK_FORM.fields.source, payload.source);
  body.append(FEEDBACK_FORM.fields.answer, payload.answer);
  body.append(FEEDBACK_FORM.fields.language, payload.language);
  body.append(FEEDBACK_FORM.fields.page, payload.page);
  body.append(FEEDBACK_FORM.fields.score, payload.score || '');
  body.append(FEEDBACK_FORM.fields.createdAt, payload.createdAt);

  return fetch(FEEDBACK_FORM.endpoint, {
    method: 'POST',
    mode: 'no-cors',
    body
  });
}

function resetFeedbackModule(module) {
  module.classList.remove('is-submitted');
  module.querySelectorAll('[data-feedback-answer]').forEach((button) => {
    button.classList.remove('is-selected');
    button.setAttribute('aria-pressed', 'false');
  });
}

function initFeedbackModules() {
  document.querySelectorAll('[data-feedback-module]').forEach((module) => {
    module.querySelectorAll('[data-feedback-answer]').forEach((button) => {
      button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => {
        module.querySelectorAll('[data-feedback-answer]').forEach((item) => {
          const isSelected = item === button;
          item.classList.toggle('is-selected', isSelected);
          item.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
        });

        const source = module.dataset.feedbackModule;
        const payload = {
          source: getFeedbackSource(source),
          answer: button.dataset.feedbackAnswer,
          language: currentLanguage,
          page: getActiveBookPageName(),
          score: getFeedbackScore(source),
          createdAt: new Date().toISOString()
        };

        storeFeedback(payload);
        submitFeedbackToGoogleForm(payload).catch(() => {});

        module.classList.add('is-submitted');
      });
    });
  });
}

function initBook() {
  const book = document.querySelector('[data-book]');
  if (!book) return;

  const pages = Array.from(book.querySelectorAll('[data-book-page]'));
  if (!pages.length) return;

  const prevButton = book.querySelector('[data-book-prev]');
  const nextButton = book.querySelector('[data-book-next]');
  const currentEl = book.querySelector('[data-book-current]');
  const totalEl = book.querySelector('[data-book-total]');
  const titleEl = book.querySelector('[data-book-current-title]');
  let activeIndex = 0;
  let touchStartX = null;

  if (totalEl) totalEl.textContent = String(pages.length);

  function updateBookUI(index, direction, options = {}) {
    const page = pages[index];
    if (!page) return;

    activeIndex = index;
    book.dataset.bookDirection = direction || 'none';

    pages.forEach((item, itemIndex) => {
      item.classList.toggle('is-active', itemIndex === index);
    });

    book.querySelectorAll('[data-book-jump]').forEach((control) => {
      const isActive = control.dataset.bookJump === page.dataset.bookPage;
      control.classList.toggle('is-active', isActive);
      control.setAttribute('aria-current', isActive ? 'page' : 'false');
      if (isActive && window.innerWidth <= 900 && control.classList.contains('product-link')) {
        control.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });

    if (currentEl) currentEl.textContent = String(index + 1);
    if (titleEl) titleEl.textContent = page.dataset.bookTitle || '';
    if (prevButton) prevButton.disabled = index === 0;
    if (nextButton) nextButton.disabled = index === pages.length - 1;

    if (options.updateHash !== false) {
      history.replaceState(null, '', `#${page.dataset.bookPage}`);
    }

    if (!options.preserveScroll) {
      window.scrollTo({ top: 0, behavior: options.instant ? 'auto' : 'smooth' });
    }
  }

  function jumpToPage(name, options = {}) {
    const nextIndex = pages.findIndex((page) => page.dataset.bookPage === name);
    if (nextIndex === -1 || nextIndex === activeIndex) return;
    const direction = nextIndex > activeIndex ? 'forward' : 'backward';
    updateBookUI(nextIndex, direction, options);
  }

  function stepPage(offset) {
    const nextIndex = activeIndex + offset;
    if (nextIndex < 0 || nextIndex >= pages.length) return;
    updateBookUI(nextIndex, offset > 0 ? 'forward' : 'backward');
  }

  book.querySelectorAll('[data-book-jump]').forEach((control) => {
    control.addEventListener('click', () => jumpToPage(control.dataset.bookJump));
  });

  if (prevButton) prevButton.addEventListener('click', () => stepPage(-1));
  if (nextButton) nextButton.addEventListener('click', () => stepPage(1));

  document.addEventListener('keydown', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (document.body.classList.contains('pretest-modal-open')) return;
    if (event.key === 'ArrowLeft') stepPage(-1);
    if (event.key === 'ArrowRight') stepPage(1);
  });

  const viewport = book.querySelector('.book-viewport');
  if (viewport) {
    viewport.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0]?.clientX ?? null;
    }, { passive: true });

    viewport.addEventListener('touchend', (event) => {
      const endX = event.changedTouches[0]?.clientX ?? null;
      if (touchStartX === null || endX === null) return;
      const delta = endX - touchStartX;
      if (Math.abs(delta) > 60) {
        stepPage(delta < 0 ? 1 : -1);
      }
      touchStartX = null;
    }, { passive: true });
  }

  window.addEventListener('hashchange', () => {
    const name = window.location.hash.replace('#', '');
    if (name) jumpToPage(name, { updateHash: false, preserveScroll: true, instant: true });
  });

  const initialName = window.location.hash.replace('#', '');
  const initialIndex = pages.findIndex((page) => page.dataset.bookPage === initialName);
  updateBookUI(initialIndex >= 0 ? initialIndex : 0, 'none', {
    updateHash: initialIndex >= 0,
    preserveScroll: true,
    instant: true
  });
}

function initPretestModal() {
  const modal = document.querySelector('[data-pretest-modal]');
  if (!modal) return;

  const frame = modal.querySelector('[data-pretest-frame]');
  const openButtons = document.querySelectorAll('[data-pretest-open]');
  const closeButtons = modal.querySelectorAll('[data-pretest-close]');
  let activeTrigger = null;

  function openModal(trigger) {
    activeTrigger = trigger;
    syncPretestFrameLanguage({ forceLoad: true });
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('pretest-modal-open');
    modal.querySelector('.pretest-close')?.focus();
  }

  function closeModal() {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('pretest-modal-open');
    activeTrigger?.focus();
  }

  openButtons.forEach((button) => {
    button.addEventListener('click', () => openModal(button));
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });

  window.addEventListener('message', (event) => {
    if (event.origin !== window.location.origin) return;
    if (event.data?.type !== 'pretest-jump') return;
    const target = event.data.target;
    if (!['red', 'orange', 'green', 'quiz'].includes(target)) return;
    closeModal();
    document.querySelector(`.product-link[data-book-jump="${target}"]`)?.click();
  });
}

function getPretestFrameUrl(frame) {
  const source = frame?.dataset.src || 'pretest.html';
  const url = new URL(source, window.location.href);
  url.searchParams.set('lang', currentLanguage);
  return url.href;
}

function syncPretestFrameLanguage(options = {}) {
  const frame = document.querySelector('[data-pretest-frame]');
  if (!frame) return;

  const nextSrc = getPretestFrameUrl(frame);
  const currentSrc = frame.getAttribute('src');
  if (!options.forceLoad && !currentSrc) return;

  const resolvedCurrentSrc = currentSrc ? new URL(currentSrc, window.location.href).href : '';
  if (resolvedCurrentSrc !== nextSrc) {
    frame.setAttribute('src', nextSrc);
  }
}

window.toggleCard = function toggleCard(card) {
  const cardsRoot = card.closest('.cards');
  if (!cardsRoot) return;

  const body = card.querySelector('.card-body');
  if (!body) return;

  const isOpen = body.classList.contains('open');
  const cardTopBefore = card.getBoundingClientRect().top;
  cardsRoot.querySelectorAll('.card-body').forEach((item) => item.classList.remove('open'));
  cardsRoot.querySelectorAll('.card').forEach((item) => item.classList.remove('open'));

  if (!isOpen) {
    body.classList.add('open');
    card.classList.add('open');
  }

  const cardTopAfter = card.getBoundingClientRect().top;
  const topDelta = cardTopAfter - cardTopBefore;
  if (topDelta !== 0) {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollBy(0, topDelta);
    requestAnimationFrame(() => {
      root.style.scrollBehavior = previousScrollBehavior;
    });
  }
};

const questions = [
  {
    domain: "red", domainLabel: "Red line",
    scenario: "Your new HR SaaS just landed its first German enterprise client. During onboarding, they ask you to integrate an AI module that reads employee webcam feeds during video calls to measure 'engagement levels' and flag low-attention moments.",
    question: "What do you do?",
    options: [
      "Build it — German companies can consent to anything internally",
      "Decline immediately — this is an absolute prohibition under EU AI Act Art. 5(1)(f)",
      "Build it but only with Betriebsrat approval",
      "Build it if the employee gives individual consent"
    ],
    correct: 1,
    feedback: {
      correct: "Correct. EU AI Act Art. 5(1)(f) prohibits AI emotion recognition in workplaces, full stop. It's an absolute prohibition — not subject to consent, not subject to Betriebsrat approval, not subject to any internal agreement. The fine is up to €35M or 7% of global revenue. No exceptions.",
      wrong: "EU AI Act Art. 5(1)(f) makes this an absolute prohibition in workplaces. No consent, no Betriebsrat approval, no internal agreement can make it legal. This is a red line, not a grey zone. Fine: up to €35M or 7% of global revenue."
    }
  },
  {
    type: "multi",
    domain: "red", domainLabel: "Red line",
    scenario: "Your leadership team wants a quick pre-launch screen for Germany: which proposed features must not ship as designed?",
    question: "Select all hard red-line launch blockers.",
    options: [
      "Workplace webcam or voice analysis that infers employee emotional state",
      "Untargeted scraping of public facial images to build a recognition database",
      "A wellness app claiming it can detect early signs of depression without CE medical-device certification",
      "A branded pay-later or credit feature where you control the customer relationship but have no BaFin authorisation",
      "GA4 loaded only after explicit opt-in, with transfer safeguards documented",
      "A self-hosted deployment option for enterprise customers"
    ],
    correct: [0, 1, 2, 3],
    feedback: {
      correct: "Correct. Those four are hard blockers: workplace emotion recognition and untargeted facial scraping are AI Act Art. 5 prohibitions; diagnostic health claims without CE certification trigger medical-device enforcement; and controlling a credit/payment product without authorisation is BaFin territory. Post-consent analytics is still a risk area, not an absolute blocker. Self-hosting is encouraged.",
      wrong: "The red-line blockers are: workplace emotion recognition, untargeted facial scraping for recognition databases, diagnostic medical claims without CE certification, and unlicensed control of credit/payment products. GA4 after consent remains legally sensitive but not automatically forbidden, while self-hosting is a positive trust signal."
    }
  },
  {
    domain: "green", domainLabel: "Green line",
    scenario: "You're pitching your B2B SaaS to a German Mittelstand company. The procurement team includes the IT-Leiter, the Datenschutzbeauftragter (DPO), and the CFO. The DPO asks for your AVV (data processing agreement).",
    question: "What's the ideal response?",
    options: [
      "Send your standard English-language DPA governed by Irish law",
      "Say you'll have legal prepare a custom agreement — allow 4–6 weeks",
      "Send a link to your self-service AVV page — German law, downloadable, DocuSign-ready",
      "Explain that the GDPR is the same across the EU so no separate document is needed"
    ],
    correct: 2,
    feedback: {
      correct: "Correct. In Germany, the AVV is not a back-office legal document — it's a frontline sales asset. A German-law, German-language, self-service AVV page signals operational readiness and dramatically shortens procurement. Personio, Nextcloud, and other German SaaS leaders all operationalised this. It tells the DPO: we've done this before.",
      wrong: "German procurement teams treat the AVV as a trust test. A slow, custom, English-only or foreign-law agreement creates friction and signals you're not operationally ready for the market. The highest-trust response is a self-service AVV page: German law, downloadable immediately, signature-ready."
    }
  },
  {
    domain: "orange", domainLabel: "Orange line",
    scenario: "Your AI product screens CVs for German employers. The model ranks applicants and claims it only 'prepares a shortlist' because a recruiter still clicks the final hire button.",
    question: "What's the safest product classification assumption?",
    options: [
      "Not high-risk because a human makes the final decision",
      "Not high-risk if the AI output is called a recommendation",
      "Treat it as high-risk AI and prepare conformity, human oversight, logging, and documentation",
      "Wait for final EC guidance before doing any compliance work"
    ],
    correct: 2,
    feedback: {
      correct: "Correct. HR and personnel-selection AI sits in the EU AI Act's high-risk territory, and the Art. 6(3) exemption path is narrow. If the output materially drives a decision, especially through profiling, the safe product move is to treat high-risk obligations as real now.",
      wrong: "The 'human clicks last' argument is weak when the AI ranking is determinative in practice. For HR screening, assume high-risk until counsel has documented otherwise, and build human oversight, logs, documentation, and override paths into the product."
    }
  },
  {
    domain: "orange", domainLabel: "Orange line",
    scenario: "You run a German-facing SaaS website. Marketing wants GTM, GA4, Meta Pixel, and server-side tagging. They promise everything will be 'EU configured' and behind a cookie banner.",
    question: "What's the best product posture?",
    options: [
      "Load GTM immediately, because the banner covers downstream tags",
      "Use a certified CMP and load GTM/GA4/Pixel only after explicit opt-in; prefer self-hosted cookieless analytics where possible",
      "Use server-side tagging to avoid consent entirely",
      "Rely on the DPF and treat US analytics transfers as settled"
    ],
    correct: 1,
    feedback: {
      correct: "Correct. German analytics posture is consent-first. GTM itself should load only after opt-in, Meta Pixel needs explicit consent, GA4 remains contested despite the DPF, and server-side tagging reduces exposure without eliminating consent analysis.",
      wrong: "The risky moves are loading GTM before consent, treating DPF as permanent settlement, or assuming server-side tagging removes consent duties. In Germany, the safer stack is post-consent loading through a compliant CMP, with cookieless self-hosted analytics where possible."
    }
  },
  {
    domain: "green", domainLabel: "Green line",
    scenario: "You're selling workflow software to German public sector buyers. The product is technically competitive, but procurement keeps stalling after security review.",
    question: "What strategic move is most likely to unlock the market?",
    options: [
      "Lower the price and offer a pilot",
      "Lead with SOC 2 reports — that's the international gold standard",
      "Invest in BSI C5 Type 2 and make the attestation central to your GTM",
      "Emphasise your US enterprise customer logos"
    ],
    correct: 2,
    feedback: {
      correct: "Correct. For German public sector and increasingly for healthcare and regulated enterprise, BSI C5 Type 2 is not just a trust signal — it's often a procurement gate. Making it central to your GTM changes the conversation from 'can we trust you?' to 'how soon can we deploy?'",
      wrong: "Price and pilots help only after trust is cleared. In Germany's public sector, BSI C5 Type 2 often determines whether you even make it past initial security review. SOC 2 and US customer logos don't carry the same procurement weight in this context."
    }
  },
  {
    domain: "red", domainLabel: "Red line",
    scenario: "Your consumer subscription app offers a monthly plan in Germany. The team wants to place the cancellation button behind account login and a mandatory retention screen before the user can confirm cancellation.",
    question: "What's the risk?",
    options: [
      "No issue — as long as cancellation is technically possible somewhere",
      "Illegal — German law requires a directly accessible cancellation button without extra friction",
      "Fine if the retention screen offers a discount",
      "Fine if users agreed to the retention flow in the terms"
    ],
    correct: 1,
    feedback: {
      correct: "Correct. Under BGB §312k and the 2025 OLG Köln ruling, the cancellation flow must be permanently visible and directly accessible. Mandatory login barriers and extra friction before the actual cancellation path are exactly what German courts have been striking down.",
      wrong: "Germany treats cancellation UX as a hard legal requirement, not a product preference. Courts have repeatedly ruled against extra friction such as mandatory login or pre-cancellation retention steps that block direct access to the Kündigungsbutton."
    }
  },
  {
    domain: "orange", domainLabel: "Orange line",
    scenario: "Your startup uses an AI writing assistant in its CMS. A human editor reviews every draft and usually rewrites around 20% before publication. The team asks whether all content needs AI-generated disclosure under EU AI Act Art. 50.",
    question: "What's the most defensible answer today?",
    options: [
      "No disclosure is ever needed if a human touched the output",
      "Yes, every AI-assisted edit requires disclosure",
      "The boundary is still unsettled — document your editorial-control standard and treat heavily AI-originated output more cautiously",
      "Only chatbot responses require disclosure, not published content"
    ],
    correct: 2,
    feedback: {
      correct: "Correct. This is exactly one of the unsettled orange-zone issues. The transparency framework is still moving, and the distinction between AI-assisted and AI-generated remains underdefined. The safest practice is to document an editorial standard and apply disclosure conservatively when AI is doing the substantive generation.",
      wrong: "The current problem is not that the answer is obvious — it's that the boundary is underdefined. The safest approach is not a blanket 'never' or 'always,' but a documented internal rule that distinguishes lightly assisted editing from substantively AI-generated publication."
    }
  },
  {
    domain: "orange", domainLabel: "Orange line",
    scenario: "A German enterprise prospect discovers that your US support vendor can access customer logs containing personal data. The vendor is DPF-certified, and your team says that should settle the transfer issue.",
    question: "What's the most defensible answer to the prospect?",
    options: [
      "DPF certification is enough; no further documentation is needed",
      "The transfer is forbidden in all cases because the vendor is American",
      "DPF is currently valid, but you should document SCC fallback, minimise or pseudonymise logs, and maintain an exit plan for critical US services",
      "Move the privacy explanation into the contract appendix and avoid discussing it in sales"
    ],
    correct: 2,
    feedback: {
      correct: "Correct. The DPF is valid today, but it is contested and German DPAs have encouraged exit strategies from US cloud dependency. The defensible posture is layered: DPF plus SCC fallback, data minimisation or pseudonymisation, clear access controls, and a practical migration plan.",
      wrong: "DPF helps, but it is not a permanent all-clear. German buyers will ask what happens if the framework is challenged again. The stronger answer is DPF plus SCC fallback, minimised logs, tight access controls, and a documented exit strategy for critical US services."
    }
  },
  {
    domain: "green", domainLabel: "Green line",
    scenario: "You're entering Germany as a US SaaS company. Prospects keep asking where data lives, who controls hosting, and what happens if geopolitical conditions change.",
    question: "What move most increases trust fastest?",
    options: [
      "Say your US cloud provider is already secure and GDPR-compliant",
      "Offer an EU region and, ideally, a self-hosted or on-premise option even if few customers choose it",
      "Avoid the topic unless the customer explicitly escalates it",
      "Focus on product velocity instead — German buyers eventually adapt"
    ],
    correct: 1,
    feedback: {
      correct: "Correct. In Germany, the availability of self-hosting or strong deployment control signals more than infrastructure flexibility — it signals sovereignty. Even if almost nobody chooses self-hosting, offering it can materially improve enterprise trust and shorten sales cycles.",
      wrong: "German buyers often assess software through the lens of architectural dependency and sovereignty. Simply saying 'we are secure' is weaker than showing structural options like EU-region control, customer-selected residency, or self-hosting."
    }
  },
  {
    domain: "red", domainLabel: "Red line",
    scenario: "Your wellness app marketing page says it can 'detect early signs of anxiety and depression from voice patterns' and prompt users to seek help. Internally, the team says it's 'just a wellness feature.'",
    question: "What's the real legal classification risk?",
    options: [
      "None — wellness products are outside medical regulation",
      "Likely a medical device under MDR Rule 11, triggering CE certification requirements before launch",
      "You just need a strong disclaimer saying 'not a medical device'",
      "Only a problem if you charge money for the feature"
    ],
    correct: 1,
    feedback: {
      correct: "Correct. Under MDR Rule 11, software that claims to diagnose, detect, or predict medical conditions is a medical device — minimum Class IIa. The intended purpose is determined by what you communicate, not what you call the app internally. 'Detect early signs of anxiety and depression' is a diagnostic claim. Without CE certification, this is MPDG §92 territory — up to 10 years imprisonment for commercial violations. A disclaimer doesn't fix an intended purpose claim.",
      wrong: "Under MDR Rule 11, the intended purpose of software is determined by what you communicate to users — not what you call it internally or what disclaimers you add. 'Detect early signs of anxiety and depression' is a diagnostic claim that triggers medical device classification (minimum Class IIa). A disclaimer saying 'not a medical device' while your marketing claims detection capability is legally contradictory and won't protect you. MPDG §92 carries up to 10 years imprisonment."
    }
  },
  {
    type: "multi",
    domain: "orange", domainLabel: "Orange line",
    scenario: "The product roadmap has several ideas that are not always absolute bans, but should be treated as serious German-market risk before launch.",
    question: "Select all orange-zone items that need legal/product review before shipping.",
    options: [
      "GA4 loaded after opt-in, with EU settings and DPF reliance",
      "AI-generated marketing copy that humans lightly edit before publication",
      "A people-analytics dashboard whose output is aggregated but whose raw inputs are individual employee activity logs",
      "A BNPL flow branded as yours while a licensed partner sits behind it",
      "A public Trust Center with certifications, sub-processors, AVV, and incident process",
      "A specific German datacenter location named on the security page"
    ],
    correct: [0, 1, 2, 3],
    feedback: {
      correct: "Correct. Those four are orange-zone calls: defensible in some designs, risky in others, and sensitive to documentation, sequencing, or emerging guidance. A Trust Center and precise German datacenter disclosure are encouraged trust moves, not risk items.",
      wrong: "The orange-zone items are post-consent GA4, AI-assisted vs AI-generated content boundaries, aggregated employee analytics with individual raw data, and branded BNPL/embedded finance. A Trust Center and exact datacenter disclosure are green-line procurement signals."
    }
  },
  {
    domain: "green", domainLabel: "Green line",
    scenario: "You're the PM for a new enterprise SaaS product targeting German manufacturing companies. You've just achieved ISO 27001 certification from a US-based auditor.",
    question: "How should you approach the German market?",
    options: [
      "ISO 27001 is ISO 27001 — the auditor's origin doesn't matter",
      "Consider getting re-certified by TÜV SÜD or TÜV Rheinland — German-institution certificates carry additional credibility in German enterprise procurement",
      "ISO 27001 is overkill for manufacturing — TISAX is what matters",
      "Skip the certification question — German Mittelstand only cares about price"
    ],
    correct: 1,
    feedback: {
      correct: "Correct on two levels. First, getting certified by a German institution (TÜV SÜD, TÜV Rheinland, DQS) does carry additional trust weight with German procurement teams — they recognise and actively prefer these bodies. Second, if you're targeting automotive manufacturing, TISAX (not just ISO 27001) is the entry requirement for OEM supplier relationships. Both certifications serve different but complementary purposes.",
      wrong: "The auditor does matter in Germany. TÜV SÜD, TÜV Rheinland, and DQS are the most recognised certification bodies in German enterprise procurement — specifically because they're German institutions with established reputations. Additionally, if your target is automotive manufacturing (BMW, VW, Mercedes), TISAX certification — not just ISO 27001 — is the entry requirement for OEM supplier data sharing. The question of which cert matters depends on which industry you're targeting."
    }
  },
  {
    domain: "red", domainLabel: "Red line",
    scenario: "Your software company (50 employees, €3M revenue) provides project management tools to a German DAX-30 company. An employee at that company files a GDPR complaint saying you processed their data without a valid legal basis. The DPA investigates and finds you guilty.",
    question: "What's the worst-case fine scenario after the Deutsche Wohnen ECJ ruling?",
    options: [
      "Capped at €20M — that's the GDPR maximum",
      "Capped at 4% of your own company's revenue — about €120K",
      "Could be based on the DAX-30 client's group-wide global revenue if you're considered part of their processing operation — potentially hundreds of millions",
      "GDPR fines only apply to the data controller, not processors like you"
    ],
    correct: 2,
    feedback: {
      correct: "Correct — and this is one of the most misunderstood aspects of post-Deutsche Wohnen GDPR enforcement. The ECJ's C-807/21 ruling confirmed that fines can be calculated based on the undertaking's group-wide global revenue. If your processing is tightly integrated with a large enterprise's operations, regulators may consider the combined turnover. This is why data processor contracts and clear liability allocation matter so much in German enterprise SaaS.",
      wrong: "The ECJ's Deutsche Wohnen ruling (C-807/21) changed the calculus significantly. Fines can be based on group-wide global revenue, and the 'undertaking' concept from EU competition law applies. As a data processor deeply integrated with a large enterprise's operations, the revenue base for fine calculation may not be limited to your own €3M. This is exactly why German enterprise contracts include specific DPA liability caps — because the uncapped exposure is potentially massive."
    }
  },
  {
    type: "multi",
    domain: "green", domainLabel: "Green line",
    scenario: "You're packaging a US-built SaaS product for German Mittelstand and public-sector procurement. The feature set is good, but the buyer's DPO and IT-Leiter need trust evidence.",
    question: "Which moves are actively encouraged in the German market?",
    options: [
      "Publish a German-law AVV that the DPO can download and sign without sales involvement",
      "Name exact primary and backup datacenter locations, not just 'EU hosted'",
      "Keep a public sub-processor list with purpose, data category, country, transfer mechanism, and changelog",
      "Offer data export and termination-return terms prominently rather than hiding them in support",
      "Lead with SOC 2 only and assume German buyers will map it to ISO 27001 themselves",
      "Hide security documentation behind a lead form so sales can control the process"
    ],
    correct: [0, 1, 2, 3],
    feedback: {
      correct: "Correct. German procurement rewards operational proof: self-service AVV, exact data residency, transparent sub-processors, and credible data portability. These reduce DPO friction and make the product feel lower-risk before the first demo.",
      wrong: "The encouraged moves are self-service AVV, exact datacenter disclosure, transparent sub-processors, and prominent data export. SOC 2 alone is weaker than ISO 27001/TÜV/C5 in Germany, and gating security documentation slows down the very review you need to pass."
    }
  }
];

const LOCALIZED_QUESTIONS = {
  en: questions,
  zh: [
    {
      domain: "red", domainLabel: "硬红线",
      scenario: "你的中国 HR SaaS 准备进入德国，刚拿下第一个企业试点。客户希望把国内版本里的“视频会议专注度识别”也打开：读取员工摄像头画面，评估参与度，并标记注意力低的时刻。",
      question: "你应该怎么做？",
      options: [
        "直接做，德国公司内部可以同意任何事情",
        "立刻拒绝，这是欧盟 AI 法案第 5(1)(f) 条下的绝对禁止事项",
        "可以做，但必须先得到 Betriebsrat 批准",
        "只要员工个人同意就可以做"
      ],
      correct: 1,
      feedback: {
        correct: "欧盟 AI 法案第 5(1)(f) 条禁止在工作场所使用 AI 做情绪识别。这是绝对禁止，不因同意、Betriebsrat 批准或内部协议而变合法。罚款最高可达 3500 万欧元或全球营收 7%。",
        wrong: "这是工作场所 AI 情绪识别，属于欧盟 AI 法案第 5(1)(f) 条的绝对禁止事项。同意、Betriebsrat 批准或内部协议都不能让它变合法。"
      }
    },
    {
      type: "multi",
      domain: "red", domainLabel: "硬红线",
      scenario: "管理层想在德国上线前做一次快速筛查：哪些方案不能按现在的设计上线？",
      question: "请选择所有硬红线级别的上线阻断项。",
      options: [
        "用摄像头或声音分析员工情绪、参与度、压力状态",
        "无目标抓取公开人脸图片，建立人脸识别数据库",
        "健康类 app 声称能发现抑郁早期迹象，但没有医疗器械 CE 认证",
        "以自己品牌提供 pay-later 或信用产品，并控制客户关系，但没有 BaFin 授权",
        "GA4 只在用户明确同意后加载，并已记录传输保障措施",
        "给企业客户提供自托管或本地部署选项"
      ],
      correct: [0, 1, 2, 3],
      feedback: {
        correct: "这四项都是硬阻断：工作场所情绪识别和无目标人脸抓取属于欧盟 AI 法案禁止项；诊断性健康主张会触发医疗器械监管；控制信用/支付产品但无授权会进入 BaFin 风险。后同意 GA4 是风险项，自托管是加分项。",
        wrong: "硬红线是：员工情绪识别、无目标人脸抓取、无 CE 的诊断性健康主张，以及无授权控制信用/支付产品。后同意 GA4 属于需谨慎的灰区，自托管是德国采购中的信任信号。"
      }
    },
    {
      domain: "green", domainLabel: "加分项",
      scenario: "你正在向一家德国 Mittelstand 企业销售 B2B SaaS。对方采购流程里有 IT 负责人、数据保护官和 CFO。DPO 第一轮就问：能不能提供 AVV（Auftragsverarbeitungsvertrag，数据处理协议）？",
      question: "最理想的回应是什么？",
      options: [
        "发送标准英文 DPA，并适用爱尔兰法律",
        "说法务会准备定制协议，需要 4 到 6 周",
        "发一个自助 AVV 页面链接：德国法、可下载、可 DocuSign",
        "解释 GDPR 在欧盟都一样，所以不需要单独文件"
      ],
      correct: 2,
      feedback: {
        correct: "在德国，AVV 不是后台法律文件，而是销售前线资产。德国法、德文、自助下载、可签署的 AVV 会显著缩短采购流程。",
        wrong: "德国采购会把 AVV 当作信任测试。英文、外国法或定制等待都会增加摩擦；最高信任的做法是自助式德国 AVV 页面。"
      }
    },
    {
      domain: "orange", domainLabel: "待判断灰区",
      scenario: "你的 AI 产品为德国雇主筛选简历。模型给候选人排序，团队说它只是“准备 shortlist”，因为最终仍由招聘人员点击录用。",
      question: "最稳妥的产品分类假设是什么？",
      options: [
        "不是高风险，因为最终决定由人类做出",
        "只要叫做推荐系统，就不是高风险",
        "按高风险 AI 处理，提前准备 conformity、人工监督、日志和文档",
        "等欧盟委员会最终指南出来以后再做任何合规工作"
      ],
      correct: 2,
      feedback: {
        correct: "HR 和人员筛选 AI 属于欧盟 AI 法案高风险区域，Art. 6(3) 豁免路径很窄。如果输出实质影响决策，尤其涉及 profiling，产品上应先按高风险义务准备。",
        wrong: "“最后由人点击”并不稳。如果 AI 排名在实践中决定结果，就不能靠 human-in-the-loop 轻松脱身。HR 筛选应先按高风险准备监督、日志、文档和人工 override。"
      }
    },
    {
      domain: "orange", domainLabel: "待判断灰区",
      scenario: "你运营一个面向德国的 SaaS 网站。增长团队想用 GTM、GA4、Meta Pixel 和 server-side tagging，并说都会放在 Cookie 横幅后面，配置也会选 EU。",
      question: "最稳妥的产品姿态是什么？",
      options: [
        "先加载 GTM，因为横幅会覆盖它后面触发的所有标签",
        "通过合规 CMP，在明确 opt-in 后才加载 GTM/GA4/Pixel；可行时优先使用自托管、无 cookie 分析",
        "用 server-side tagging 就可以完全绕过同意要求",
        "依赖 DPF，把美国分析工具的数据传输视为已经稳定解决"
      ],
      correct: 1,
      feedback: {
        correct: "德国分析工具的基本姿态是 consent-first。GTM 本身也应在 opt-in 后加载，Meta Pixel 需要明确同意，GA4 即使有 DPF 仍有争议，server-side tagging 只能降低暴露，不能自动消除同意分析。",
        wrong: "高风险做法包括：同意前加载 GTM、把 DPF 当作永久安全、认为 server-side tagging 可以免同意。更稳妥的是合规 CMP 后加载，并尽量使用自托管、无 cookie 分析。"
      }
    },
    {
      domain: "green", domainLabel: "加分项",
      scenario: "你向德国公共部门卖工作流软件。功能演示很顺，但每次进入安全审查后，项目就开始沉默。",
      question: "最可能打开市场的战略动作是什么？",
      options: [
        "降价并提供试点",
        "主打 SOC 2 报告，这是国际金标准",
        "投资 BSI C5 Type 2，并把认证作为 GTM 核心资产",
        "强调美国企业客户 Logo"
      ],
      correct: 2,
      feedback: {
        correct: "对德国公共部门，以及越来越多医疗和受监管企业来说，BSI C5 Type 2 往往不只是信任信号，而是采购门槛。",
        wrong: "价格和试点只有在信任问题过关后才有效。德国公共部门常把 BSI C5 Type 2 作为安全审查入口。"
      }
    },
    {
      domain: "red", domainLabel: "硬红线",
      scenario: "你的消费者订阅应用准备上德国月付。增长团队想沿用现有留存策略：取消入口放在登录后，最终取消前必须先经过一个挽留页面。",
      question: "风险是什么？",
      options: [
        "没问题，只要技术上某处能取消",
        "违法，德国法要求取消按钮直接可访问，不能增加额外摩擦",
        "如果挽留页给折扣就可以",
        "只要用户在条款里同意过该流程就可以"
      ],
      correct: 1,
      feedback: {
        correct: "BGB §312k 和 2025 年 OLG Köln 判决要求取消流程持续可见、直接可访问。强制登录或挽留屏障正是法院反复否定的摩擦。",
        wrong: "德国把取消 UX 当成硬性法律要求，而不是产品偏好。额外摩擦、登录障碍或预先挽留流程都高度危险。"
      }
    },
    {
      domain: "orange", domainLabel: "待判断灰区",
      scenario: "你的内容产品里有 AI 写作助手。运营编辑会审每一稿，通常改掉约 20% 后发布。团队问：在德国/欧盟，这算 AI 辅助，还是需要按 AI 生成内容披露？",
      question: "今天最稳妥的回答是什么？",
      options: [
        "只要人类碰过输出，就永远不需要披露",
        "所有 AI 辅助编辑都必须披露",
        "边界仍未完全明确，应记录编辑控制标准，并对高度 AI 生成内容更谨慎",
        "只有聊天机器人回复需要披露，发布内容不用"
      ],
      correct: 2,
      feedback: {
        correct: "AI 辅助和 AI 生成之间的边界仍在移动。稳妥做法是建立并记录编辑控制标准，对 AI 做实质生成的内容保守披露。",
        wrong: "这里的问题不是答案显而易见，而是边界尚未稳定。 一刀切地永不披露或总是披露都不是最稳妥做法。"
      }
    },
    {
      domain: "orange", domainLabel: "待判断灰区",
      scenario: "一家德国企业客户发现，你们的美国客服供应商可以访问包含个人数据的客户日志。该供应商有 DPF 认证，团队认为这已经足够解释跨境传输问题。",
      question: "面对客户，最稳妥的回答是什么？",
      options: [
        "DPF 认证已经足够，不需要额外文档",
        "只要供应商是美国公司，传输就一律禁止",
        "DPF 目前有效，但应记录 SCC 备用方案、最小化或假名化日志，并为关键美国服务准备退出计划",
        "把隐私说明放进合同附件，销售时尽量不主动讨论"
      ],
      correct: 2,
      feedback: {
        correct: "DPF 目前仍有效，但它正被挑战，德国监管机构也建议企业准备摆脱美国云依赖的 exit strategy。更稳妥的姿态是多层防御：DPF、SCC 备用、数据最小化/假名化、访问控制和迁移预案。",
        wrong: "DPF 有帮助，但不是永久绿灯。德国客户会追问：如果框架再次被挑战怎么办？更强的回答是 DPF 加 SCC 备用、最小化日志、严格访问控制，并准备关键美国服务的退出策略。"
      }
    },
    {
      domain: "green", domainLabel: "加分项",
      scenario: "你的 SaaS 准备进入德国。客户反复问：数据到底放在哪里？谁能访问？如果未来跨境传输规则变化，你们有没有 EU-only 或自托管方案？",
      question: "什么动作最快增加信任？",
      options: [
        "说明美国云服务商已经安全且符合 GDPR",
        "提供 EU 区域，并尽量提供自托管或本地部署选项，即使很少有客户选择",
        "除非客户明确升级，否则避开这个话题",
        "专注产品速度，德国买家迟早会适应"
      ],
      correct: 1,
      feedback: {
        correct: "在德国，自托管或强部署控制不仅代表架构灵活性，也代表主权。即使很少被实际选择，它也能明显提升企业信任。",
        wrong: "德国买家常从架构依赖和主权角度评估软件。只说“我们很安全”弱于给出 EU 区域、数据驻留或自托管选择。"
      }
    },
    {
      domain: "red", domainLabel: "硬红线",
      scenario: "你的健康类应用想在德国上线。营销页写着可以“通过声音模式发现焦虑和抑郁早期迹象”，内部团队认为这只是 wellness 功能，不是医疗产品。",
      question: "真正的法律分类风险是什么？",
      options: [
        "没有，wellness 产品不受医疗监管",
        "很可能根据 MDR Rule 11 成为医疗器械，上线前需要 CE 认证",
        "只需要加一句“非医疗器械”的强免责声明",
        "只有收费时才有问题"
      ],
      correct: 1,
      feedback: {
        correct: "软件一旦声称诊断、检测或预测医疗状况，就可能落入 MDR Rule 11。意图用途由对外表达决定，不由内部标签决定。",
        wrong: "免责声明不能抵消诊断性营销主张。“检测焦虑和抑郁早期迹象”会触发医疗器械分类风险。"
      }
    },
    {
      type: "multi",
      domain: "orange", domainLabel: "待判断灰区",
      scenario: "产品路线图里有几项德国市场方案：不一定都是绝对禁止，但上线前必须做法律和产品判断。",
      question: "请选择所有需要在上线前重点审查的灰区项。",
      options: [
        "用户明确 opt-in 后加载 GA4，并采用 EU 设置和 DPF 依据",
        "AI 生成营销文案，人类只做轻度编辑后发布",
        "People Analytics 看板只展示团队均值，但底层采集个人活动日志",
        "以自己品牌提供 BNPL，但背后有持牌合作方",
        "公开 Trust Center，包含认证、子处理方、AVV 和事故响应流程",
        "在安全页明确写出德国数据中心的具体城市/地点"
      ],
      correct: [0, 1, 2, 3],
      feedback: {
        correct: "这四项都是灰区：有些设计可防御，有些会很危险，关键取决于文档、流程、同意、人工监督和监管解释。Trust Center 和具体德国数据中心披露是加分项。",
        wrong: "灰区项是：后同意 GA4、AI 辅助/AI 生成边界、底层有个人数据的员工分析，以及 branded BNPL/embedded finance。Trust Center 和具体数据中心披露属于采购信任信号。"
      }
    },
    {
      domain: "green", domainLabel: "加分项",
      scenario: "你负责一个面向德国制造业的企业 SaaS。产品刚拿到一家美国审计机构出具的 ISO 27001 证书，销售准备拿它主打德国市场。",
      question: "你应该如何进入德国市场？",
      options: [
        "ISO 27001 就是 ISO 27001，审计机构来源不重要",
        "考虑由 TÜV SÜD 或 TÜV Rheinland 重新认证，德国机构证书在德国采购中更有信任权重",
        "制造业不需要 ISO 27001，只有 TISAX 重要",
        "跳过认证问题，德国 Mittelstand 只看价格"
      ],
      correct: 1,
      feedback: {
        correct: "TÜV SÜD、TÜV Rheinland、DQS 等德国机构在德国企业采购中有额外识别度和信任权重。若目标是汽车制造，TISAX 也可能是入口要求。",
        wrong: "审计机构来源在德国常常有信任差异。德国认证机构更容易被采购和安全团队识别，也更贴近本地采购心理。"
      }
    },
    {
      domain: "red", domainLabel: "硬红线",
      scenario: "你的软件公司规模不大，正在给一家德国 DAX-30 集团提供项目管理工具。该集团员工投诉你们无合法依据处理其数据，监管调查后认定违规。",
      question: "Deutsche Wohnen 欧盟法院判决后，最坏罚款情景是什么？",
      options: [
        "封顶 2000 万欧元，这就是 GDPR 最高额",
        "封顶为你自己公司营收的 4%，约 12 万欧元",
        "如果你被视为客户处理活动的一部分，罚款基数可能按 DAX-30 客户集团全球营收计算，可能达到数亿",
        "GDPR 罚款只适用于控制者，不适用于你这样的处理者"
      ],
      correct: 2,
      feedback: {
        correct: "C-807/21 确认罚款可按 undertaking 的集团全球营收计算。深度嵌入大型企业处理活动时，风险基数可能不只限于你自己的营收。",
        wrong: "Deutsche Wohnen 判决改变了罚款计算逻辑。集团全球营收和 EU competition law 的 undertaking 概念会抬高风险上限。"
      }
    },
    {
      type: "multi",
      domain: "green", domainLabel: "加分项",
      scenario: "你正在把一个美国 SaaS 包装成适合德国 Mittelstand 和公共部门采购的版本。功能没问题，但买方的 DPO 和 IT 负责人需要信任证据。",
      question: "哪些做法在德国市场是明确加分项？",
      options: [
        "发布德国法 AVV，让 DPO 可以不经过销售直接下载和签署",
        "写清主数据中心和备份数据中心的具体地点，而不是只写 EU hosted",
        "公开子处理方列表，包含用途、数据类别、国家、传输机制和变更记录",
        "把数据导出和合同终止后的数据返还写成显眼功能，而不是藏在客服流程里",
        "只主打 SOC 2，并默认德国买方会自己把它映射成 ISO 27001",
        "把安全文档放在表单后面，方便销售控制流程"
      ],
      correct: [0, 1, 2, 3],
      feedback: {
        correct: "德国采购奖励可验证的运营证据：自助 AVV、精确数据驻留、透明子处理方和可用的数据可携带性。这些会在 demo 前就降低 DPO 摩擦。",
        wrong: "加分项是自助 AVV、具体数据中心披露、透明子处理方和显眼的数据导出。SOC 2 alone 在德国弱于 ISO 27001/TÜV/C5，把安全文档藏在表单后面会拖慢审查。"
      }
    }
  ]
};

const QUIZ_RESULTS = {
  en: [
    {
      min: 90,
      title: 'Workplace-ready judgment',
      sub: "You already notice many German and European compliance boundaries early. You can use the handbook to sharpen the details, especially where commercial trust and product responsibility overlap.",
      color: '#1D9E75'
    },
    {
      min: 70,
      title: 'Solid first judgment',
      sub: 'You recognize the major hard stops. The remaining gaps are mostly grey areas and better-practice moves, where small choices can affect trust, review speed, or business opportunity.',
      color: '#854F0B'
    },
    {
      min: 50,
      title: 'Awareness started',
      sub: 'You can feel that Germany and Europe work differently, but the details are still fuzzy. Revisit the hard stops first, then use the grey areas to train your boundary sense.',
      color: '#BA7517'
    },
    {
      min: 0,
      title: 'Start with the boundaries',
      sub: 'Several choices that may look normal elsewhere are serious compliance issues in Germany. Start with the hard stops, then retake the score check to see what changed.',
      color: '#A32D2D'
    }
  ],
  zh: [
    {
      min: 90,
      title: '已经有较强职场判断力',
      sub: '你已经能较早看出德国/欧洲合规边界。接下来可以用手册补细节，尤其是合规证据、商业信任和产品责任交叉的地方。',
      color: '#1D9E75'
    },
    {
      min: 70,
      title: '已有基本判断力',
      sub: '你能识别大多数硬边界。剩下的盲点多在灰区和更专业做法里：这些小选择会影响信任、审查速度和合作机会。',
      color: '#854F0B'
    },
    {
      min: 50,
      title: '合规敏感度已经开始建立',
      sub: '你已经感觉到德国和欧洲不太一样，但细节还不稳定。建议先看必须停下的部分，再用灰区训练边界感。',
      color: '#BA7517'
    },
    {
      min: 0,
      title: '先从边界开始',
      sub: '一些在其他市场看起来普通的做法，在德国可能是严重合规问题。先看必须停下的部分，再回来测一次。',
      color: '#A32D2D'
    }
  ]
};

let current = 0;
let score = 0;
let answered = false;
let selectedOptions = new Set();
let redCorrect = 0;
let orangeCorrect = 0;
let greenCorrect = 0;
let redTotal = 0;
let orangeTotal = 0;
let greenTotal = 0;

const FEEDBACK_FORM = {
  endpoint: 'https://docs.google.com/forms/d/e/1FAIpQLSdbCch91KH5c0TXQt07pw4bU19m2UjOeqE0IbsoHI_VWTIYxg/formResponse',
  fields: {
    source: 'entry.626914651',
    answer: 'entry.1943976917',
    language: 'entry.1548424263',
    page: 'entry.405741631',
    score: 'entry.1875785695',
    createdAt: 'entry.110663308'
  }
};

function getQuizQuestions() {
  return LOCALIZED_QUESTIONS[currentLanguage] || LOCALIZED_QUESTIONS.en;
}

function getQuizRuntimeCopy() {
  return getUiValue('quizRuntime');
}

function renderQuiz() {
  const container = document.getElementById('q-container');
  if (!container) return;

  const activeQuestions = getQuizQuestions();
  const q = activeQuestions[current];
  const runtimeCopy = getQuizRuntimeCopy();
  const isMulti = q.type === 'multi';
  const pct = Math.round((current / activeQuestions.length) * 100);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-text').textContent = runtimeCopy.progress(current, activeQuestions.length);

  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  selectedOptions = new Set();
  const optionsMarkup = q.options.map((option, index) => `
    <button class="opt-btn" onclick="${isMulti ? `toggleMultiOption(${index})` : `answer(${index})`}" id="opt-${index}"${isMulti ? ' aria-pressed="false"' : ''}>
      <span class="opt-letter">${letters[index]}</span>
      <span>${option}</span>
    </button>
  `).join('');

  container.innerHTML = `
    <div class="q-card">
      <div class="q-meta">
        <span class="q-num">${runtimeCopy.questionMeta(current + 1, activeQuestions.length)}</span>
      </div>
      <div class="q-scenario">${q.scenario}</div>
      <div class="q-text">${q.question}</div>
      <div class="options">${optionsMarkup}</div>
      <div class="feedback" id="feedback"></div>
    </div>
    ${isMulti ? `<button class="next-btn show" id="multi-submit-btn" onclick="submitMultiAnswer()" disabled>${runtimeCopy.checkAnswer}</button>` : ''}
    <button class="next-btn" id="next-btn" onclick="next()">${current === activeQuestions.length - 1 ? runtimeCopy.seeResults : runtimeCopy.nextQuestion} &rarr;</button>
  `;

  answered = false;
}

function updateDomainTotals(domain) {
  if (domain === 'red') redTotal += 1;
  else if (domain === 'orange') orangeTotal += 1;
  else greenTotal += 1;
}

function updateDomainCorrect(domain) {
  if (domain === 'red') redCorrect += 1;
  else if (domain === 'orange') orangeCorrect += 1;
  else greenCorrect += 1;
}

function arraysMatch(a, b) {
  if (a.length !== b.length) return false;
  const first = [...a].sort((left, right) => left - right);
  const second = [...b].sort((left, right) => left - right);
  return first.every((value, index) => value === second[index]);
}

window.answer = function answer(index) {
  if (answered) return;
  answered = true;

  const q = getQuizQuestions()[current];
  const isCorrect = index === q.correct;
  const feedback = document.getElementById('feedback');

  updateDomainTotals(q.domain);

  q.options.forEach((_, optionIndex) => {
    const button = document.getElementById('opt-' + optionIndex);
    button.disabled = true;
    if (optionIndex === q.correct) {
      button.classList.add(index === q.correct ? 'correct' : 'missed');
    }
    if (optionIndex === index && !isCorrect) {
      button.classList.add('wrong');
    }
  });

  if (isCorrect) {
    score += 1;
    updateDomainCorrect(q.domain);
    feedback.className = 'feedback correct-fb show';
    feedback.innerHTML = `<strong>${getQuizRuntimeCopy().correctPrefix}</strong> ${q.feedback.correct}`;
  } else {
    feedback.className = 'feedback wrong-fb show';
    feedback.innerHTML = `<strong>${getQuizRuntimeCopy().wrongPrefix}</strong> ${q.feedback.wrong}`;
  }

  document.getElementById('next-btn').classList.add('show');
};

window.toggleMultiOption = function toggleMultiOption(index) {
  if (answered) return;
  const button = document.getElementById('opt-' + index);
  if (!button) return;

  if (selectedOptions.has(index)) {
    selectedOptions.delete(index);
    button.classList.remove('selected');
    button.setAttribute('aria-pressed', 'false');
  } else {
    selectedOptions.add(index);
    button.classList.add('selected');
    button.setAttribute('aria-pressed', 'true');
  }

  const submitButton = document.getElementById('multi-submit-btn');
  if (submitButton) submitButton.disabled = selectedOptions.size === 0;
};

window.submitMultiAnswer = function submitMultiAnswer() {
  if (answered) return;
  answered = true;

  const q = getQuizQuestions()[current];
  const selected = [...selectedOptions];
  const correctAnswers = Array.isArray(q.correct) ? q.correct : [q.correct];
  const isCorrect = arraysMatch(selected, correctAnswers);
  const feedback = document.getElementById('feedback');

  updateDomainTotals(q.domain);

  q.options.forEach((_, optionIndex) => {
    const button = document.getElementById('opt-' + optionIndex);
    button.disabled = true;
    button.setAttribute('aria-pressed', selectedOptions.has(optionIndex) ? 'true' : 'false');
    if (correctAnswers.includes(optionIndex)) {
      button.classList.add(selectedOptions.has(optionIndex) ? 'correct' : 'missed');
    } else if (selectedOptions.has(optionIndex)) {
      button.classList.add('wrong');
    }
  });

  if (isCorrect) {
    score += 1;
    updateDomainCorrect(q.domain);
    feedback.className = 'feedback correct-fb show';
    feedback.innerHTML = `<strong>${getQuizRuntimeCopy().correctPrefix}</strong> ${q.feedback.correct}`;
  } else {
    feedback.className = 'feedback wrong-fb show';
    feedback.innerHTML = `<strong>${getQuizRuntimeCopy().wrongPrefix}</strong> ${q.feedback.wrong}`;
  }

  document.getElementById('multi-submit-btn')?.classList.remove('show');
  document.getElementById('next-btn').classList.add('show');
};

window.next = function next() {
  current += 1;
  if (current >= getQuizQuestions().length) {
    showQuizResult();
  } else {
    renderQuiz();
  }
};

function showQuizResult() {
  const activeQuestions = getQuizQuestions();
  const runtimeCopy = getQuizRuntimeCopy();
  document.getElementById('q-container').innerHTML = '';
  document.getElementById('progress-fill').style.width = '100%';
  document.getElementById('progress-text').textContent = runtimeCopy.progress(activeQuestions.length, activeQuestions.length);

  const pct = Math.round((score / activeQuestions.length) * 100);
  const result = (QUIZ_RESULTS[currentLanguage] || QUIZ_RESULTS.en).find((item) => pct >= item.min);

  const card = document.getElementById('result-card');
  card.querySelectorAll('.quiz-next-steps').forEach((element) => element.remove());
  card.className = 'result-card show';
  document.getElementById('result-score').innerHTML = `<span style="color:${result.color}">${score}</span><span style="font-size:28px;color:#888780">/${activeQuestions.length}</span>`;
  document.getElementById('result-label').textContent = runtimeCopy.resultLabel(pct);
  document.getElementById('result-title').textContent = result.title;
  document.getElementById('result-sub').textContent = result.sub;
  document.getElementById('result-breakdown').innerHTML = `
    <div class="bd-item" style="background:#FCEBEB;">
      <div class="bd-n" style="color:#A32D2D;">${redCorrect}/${redTotal}</div>
      <div class="bd-label">${runtimeCopy.redLines}</div>
    </div>
    <div class="bd-item" style="background:#FAEEDA;">
      <div class="bd-n" style="color:#854F0B;">${orangeCorrect}/${orangeTotal}</div>
      <div class="bd-label">${runtimeCopy.orangeLines}</div>
    </div>
    <div class="bd-item" style="background:#EAF3DE;">
      <div class="bd-n" style="color:#3B6D11;">${greenCorrect}/${greenTotal}</div>
      <div class="bd-label">${runtimeCopy.greenLines}</div>
    </div>
  `;

  const nextSteps = {
    en: score / activeQuestions.length >= 0.8
      ? ['Review Better Practice to connect compliance evidence with trust.', 'Retake any questions that felt uncertain.']
      : score / activeQuestions.length >= 0.5
        ? ['Revisit Hard Stops first.', 'Then read Grey Areas to train context-sensitive judgment.']
        : ['Start with Hard Stops before continuing.', 'Use the score check again after reviewing the boundary patterns.'],
    zh: score / activeQuestions.length >= 0.8
      ? ['继续看更专业做法，把合规证据和信任建立连起来。', '把刚才犹豫的题再过一遍。']
      : score / activeQuestions.length >= 0.5
        ? ['先回到必须停下，补稳底线。', '再看灰区判断，训练上下文里的边界感。']
        : ['先从必须停下开始，不急着继续挑战。', '看完边界模式后，再回来测一次。']
  };
  const steps = nextSteps[currentLanguage] || nextSteps.en;
  document.getElementById('result-breakdown').insertAdjacentHTML('afterend', `
    <div class="quiz-next-steps">
      <div class="quiz-next-steps-title">${runtimeCopy.nextSteps}</div>
      ${steps.map((step) => `<div class="quiz-next-step">${step}</div>`).join('')}
    </div>
  `);
};

window.restart = function restart() {
  resetQuizState();
  renderQuiz();
};

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitch();
  initBook();
  initTabs();
  initWorkplaceTakeaways();
  initPretestModal();
  initFeedbackModules();
  if (document.getElementById('q-container')) {
    renderQuiz();
  }
});
