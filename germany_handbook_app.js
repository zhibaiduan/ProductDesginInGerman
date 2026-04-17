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

window.toggleCard = function toggleCard(card) {
  const cardsRoot = card.closest('.cards');
  if (!cardsRoot) return;

  const body = card.querySelector('.card-body');
  if (!body) return;

  const isOpen = body.classList.contains('open');
  cardsRoot.querySelectorAll('.card-body').forEach((item) => item.classList.remove('open'));
  cardsRoot.querySelectorAll('.card').forEach((item) => item.classList.remove('open'));

  if (!isOpen) {
    body.classList.add('open');
    card.classList.add('open');
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
    domain: "orange", domainLabel: "Orange line",
    scenario: "You're launching a B2B analytics SaaS in Germany. Your tech stack uses Google Tag Manager on your marketing website, which loads GA4 and a heatmap tool.",
    question: "What is your current legal situation?",
    options: [
      "Fully compliant — GTM is a tag manager, not a tracker",
      "Compliant as long as you have a cookie banner",
      "At legal risk — VG Hannover (2025) ruled GTM itself requires consent before loading",
      "Fine — GA4 is covered by the EU-US Data Privacy Framework"
    ],
    correct: 2,
    feedback: {
      correct: "Correct. VG Hannover ruled in March 2025 that Google Tag Manager requires explicit user consent before loading — because loading GTM contacts Google's servers and transmits IP address and device data, even before any tag fires. GTM must load post-consent via a compliant CMP.",
      wrong: "VG Hannover (March 2025) ruled that GTM itself — not just the tags it fires — requires explicit prior consent because it contacts Google servers on load. A cookie banner that loads GTM before consent is clicked is not sufficient. You need a CMP that fires GTM only after the user opts in."
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
    domain: "red", domainLabel: "Red line",
    scenario: "Your product team wants to launch a public-facing AI search tool in Germany that lets users upload a photo and find visually similar people across public social media profiles and news images.",
    question: "What's the legal status?",
    options: [
      "Allowed if the images are publicly available online",
      "Allowed with user consent and a privacy policy",
      "Prohibited — untargeted scraping of facial images to build recognition databases is banned by EU AI Act Art. 5(1)(e)",
      "Only illegal if the tool is sold to police"
    ],
    correct: 2,
    feedback: {
      correct: "Correct. EU AI Act Art. 5(1)(e) prohibits placing on the market AI systems that create or expand facial recognition databases through untargeted scraping of facial images from the internet or CCTV. This is the Clearview AI rule. Public availability of images is irrelevant.",
      wrong: "The source of the images doesn't save you here. EU AI Act Art. 5(1)(e) specifically prohibits untargeted scraping of facial images from the internet to build or expand recognition databases. That's exactly the practice Clearview became known for, and it's now a hard red line in the EU."
    }
  },
  {
    domain: "orange", domainLabel: "Orange line",
    scenario: "You run a German-facing SaaS website. Your marketing team wants to use GA4, but only with IP anonymisation, EU region settings, and a clean consent banner. The DPO asks: 'Is this safe now?'",
    question: "What's the best answer?",
    options: [
      "Yes — GA4 is now safe in Germany if IP anonymisation is on",
      "Still legally contested — consent helps, but transfer and re-identification concerns remain despite the DPF",
      "Yes — the DPF solved all US data transfer issues permanently",
      "Only the old Universal Analytics was a problem, not GA4"
    ],
    correct: 1,
    feedback: {
      correct: "Correct. GA4 is in the orange zone, not the green zone. Consent is necessary, but not sufficient. The DPF is valid today, yet challenge-prone. DPAs remain skeptical about re-identification risk and US intelligence access. It's usable with caution — but not 'safe now' in a settled sense.",
      wrong: "GA4 is not clearly green-lit in Germany. Consent, region settings, and IP masking improve the position, but the legal posture remains contested due to unresolved transfer and access concerns. The DPF made GA4 more defensible, not fully settled."
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
    domain: "orange", domainLabel: "Orange line",
    scenario: "You're designing the cancellation flow for your German B2C subscription. Your lawyer suggests hiding the cancellation button behind a 'why are you leaving?' survey that must be completed first.",
    question: "Is this legal?",
    options: [
      "Yes — collecting churn feedback is legitimate business practice",
      "Yes — as long as the survey is optional and clearly marked",
      "Likely not — courts have ruled that adding friction before the cancellation button can violate BGB §312k",
      "Only illegal if the survey has more than 3 questions"
    ],
    correct: 2,
    feedback: {
      correct: "Correct. BGB §312k requires a 'directly accessible' cancellation mechanism. OLG Köln ruled in 2025 that even requiring a login before seeing the cancellation button is illegal. A mandatory survey before cancellation adds friction to a process that must be as easy as sign-up — this is highly likely to be challenged under §312k and potentially as a dark pattern under UWG §4a. Optional exit surveys shown after cancellation confirmation are fine.",
      wrong: "BGB §312k requires cancellation to be 'directly accessible' — the standard from 67+ court rulings is that it must be at least as easy as signing up. OLG Köln (January 2025) ruled that even requiring a login before the cancellation button is illegal. A mandatory survey gating the cancellation process adds illegal friction. An optional survey shown after the cancellation is confirmed is fine — the sequence matters."
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
    domain: "orange", domainLabel: "Orange line",
    scenario: "You're building a 'People Analytics' dashboard for enterprise HR teams. It aggregates individual employee activity data (Slack messages sent, meetings attended, documents edited, login times) into team-level averages that managers can view.",
    question: "Do you need Betriebsrat approval before deploying this to German companies?",
    options: [
      "No — it shows team averages, not individual data, so no monitoring occurs",
      "No — employees aren't identified, so GDPR and BetrVG don't apply",
      "Yes — BetrVG §87(1) Nr. 6's 'objective suitability' test applies to the underlying system, not just the aggregated output. If individual data is collected at any point, the system can monitor — consent required",
      "Only if the team has fewer than 20 people"
    ],
    correct: 2,
    feedback: {
      correct: "Correct. The BAG's 'objective suitability' standard from 1975 applies to whether the underlying system can monitor individuals — not whether the dashboard output is aggregated. If individual-level data is collected at any stage, the system is 'objectively suitable' for monitoring. A team of 5 where 'team average' is shown is effectively individual monitoring. Betriebsrat approval is required before the system is deployed to any German company with a works council.",
      wrong: "BetrVG §87(1) Nr. 6 uses an 'objective suitability' standard: if the underlying system can monitor individual employees — even if outputs are aggregated — co-determination rights apply. A team of 5 people where you display 'team average login times' is effectively individual monitoring. The BAG (May 2025) confirmed this by awarding damages in a case where Workday processing exceeded what the Betriebsvereinbarung authorised. Betriebsrat approval is needed before German deployment."
    }
  }
];

let current = 0;
let score = 0;
let answered = false;
let redCorrect = 0;
let orangeCorrect = 0;
let greenCorrect = 0;
let redTotal = 0;
let orangeTotal = 0;
let greenTotal = 0;

function renderQuiz() {
  const container = document.getElementById('q-container');
  if (!container) return;

  const q = questions[current];
  const pct = Math.round((current / questions.length) * 100);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-text').textContent = current + ' / ' + questions.length;

  const domainClass = q.domain === 'red' ? 'domain-red' : q.domain === 'orange' ? 'domain-orange' : 'domain-green';
  const letters = ['A', 'B', 'C', 'D'];
  const optionsMarkup = q.options.map((option, index) => `
    <button class="opt-btn" onclick="answer(${index})" id="opt-${index}">
      <span class="opt-letter">${letters[index]}</span>
      <span>${option}</span>
    </button>
  `).join('');

  container.innerHTML = `
    <div class="q-card">
      <div class="q-meta">
        <span class="q-num">QUESTION ${current + 1} OF ${questions.length}</span>
        <span class="q-domain ${domainClass}">${q.domainLabel}</span>
      </div>
      <div class="q-scenario">${q.scenario}</div>
      <div class="q-text">${q.question}</div>
      <div class="options">${optionsMarkup}</div>
      <div class="feedback" id="feedback"></div>
    </div>
    <button class="next-btn" id="next-btn" onclick="next()">${current === questions.length - 1 ? 'See my results' : 'Next question'} &rarr;</button>
  `;

  answered = false;
}

window.answer = function answer(index) {
  if (answered) return;
  answered = true;

  const q = questions[current];
  const isCorrect = index === q.correct;
  const feedback = document.getElementById('feedback');

  if (q.domain === 'red') redTotal += 1;
  else if (q.domain === 'orange') orangeTotal += 1;
  else greenTotal += 1;

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
    if (q.domain === 'red') redCorrect += 1;
    else if (q.domain === 'orange') orangeCorrect += 1;
    else greenCorrect += 1;
    feedback.className = 'feedback correct-fb show';
    feedback.innerHTML = '<strong>Correct.</strong> ' + q.feedback.correct;
  } else {
    feedback.className = 'feedback wrong-fb show';
    feedback.innerHTML = '<strong>Not quite.</strong> ' + q.feedback.wrong;
  }

  document.getElementById('next-btn').classList.add('show');
};

window.next = function next() {
  current += 1;
  if (current >= questions.length) {
    showQuizResult();
  } else {
    renderQuiz();
  }
};

function showQuizResult() {
  document.getElementById('q-container').innerHTML = '';
  document.getElementById('progress-fill').style.width = '100%';
  document.getElementById('progress-text').textContent = questions.length + ' / ' + questions.length;

  const pct = Math.round((score / questions.length) * 100);
  let title;
  let sub;
  let scoreColor;

  if (pct >= 90) {
    title = 'Compliance-ready';
    sub = "You have a solid command of Germany's digital product rules. You'd be a reliable voice in early-stage market entry discussions — and you'd likely catch issues before they become enforcement actions.";
    scoreColor = '#1D9E75';
  } else if (pct >= 70) {
    title = 'Mostly there — a few blind spots';
    sub = "You understand the major red lines but some of the grey zones and positive strategies slipped through. Those are exactly the areas where small decisions have disproportionate commercial consequences.";
    scoreColor = '#854F0B';
  } else if (pct >= 50) {
    title = 'Aware, but not yet ready';
    sub = "You know Germany is different, but the specifics are still fuzzy. The rules you missed are live enforcement risks — not theoretical. Revisit the handbooks before making product decisions for this market.";
    scoreColor = '#BA7517';
  } else {
    title = 'High-risk zone';
    sub = "Several of the practices you might have approved are active red lines in Germany. A product launch based on these assumptions would face serious legal exposure within months. Start with the red lines handbook.";
    scoreColor = '#A32D2D';
  }

  const card = document.getElementById('result-card');
  card.className = 'result-card show';
  document.getElementById('result-score').innerHTML = `<span style="color:${scoreColor}">${score}</span><span style="font-size:28px;color:#888780">/${questions.length}</span>`;
  document.getElementById('result-label').textContent = pct + '% correct';
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-sub').textContent = sub;
  document.getElementById('result-breakdown').innerHTML = `
    <div class="bd-item" style="background:#FCEBEB;">
      <div class="bd-n" style="color:#A32D2D;">${redCorrect}/${redTotal}</div>
      <div class="bd-label">Red lines</div>
    </div>
    <div class="bd-item" style="background:#FAEEDA;">
      <div class="bd-n" style="color:#854F0B;">${orangeCorrect}/${orangeTotal}</div>
      <div class="bd-label">Orange lines</div>
    </div>
    <div class="bd-item" style="background:#EAF3DE;">
      <div class="bd-n" style="color:#3B6D11;">${greenCorrect}/${greenTotal}</div>
      <div class="bd-label">Green lines</div>
    </div>
  `;
};

window.restart = function restart() {
  current = 0;
  score = 0;
  answered = false;
  redCorrect = 0;
  orangeCorrect = 0;
  greenCorrect = 0;
  redTotal = 0;
  orangeTotal = 0;
  greenTotal = 0;
  document.getElementById('result-card').className = 'result-card';
  renderQuiz();
};

document.addEventListener('DOMContentLoaded', () => {
  initBook();
  initTabs();
  if (document.getElementById('q-container')) {
    renderQuiz();
  }
});
