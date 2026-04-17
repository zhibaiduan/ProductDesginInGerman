function renderTags(items) {
  return items.map((item) => `<span class="who-tag">${item}</span>`).join('');
}

function renderLawTags(items) {
  return items.map((item) => `<span class="law-tag">${item}</span>`).join('');
}

function renderOrangeCard(card) {
  return `
      <div class="card" onclick="toggleCard(this)">
        <div class="card-header">
          <div class="card-left">
            <div class="card-number">灰区 ${card.number}</div>
            <div class="card-title">${card.title}</div>
          </div>
          <div class="card-tag ${card.tagClass}">${card.tag}</div>
          <svg class="chevron" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </div>
        <div class="card-body">
          <div class="status-pill ${card.statusClass}"><div class="status-dot"></div>${card.status}</div>
          <div class="tension-block">
            <div class="tension-title">为什么中国团队容易误判</div>
            <div class="tension-text">${card.tension}</div>
          </div>
          <div class="law-ref">${renderLawTags(card.laws)}</div>
          <div class="verdict-row">
            <div class="verdict-box verdict-safe">
              <div class="verdict-label label-safe">更适合德国的做法</div>
              <div class="verdict-text text-safe">${card.safe}</div>
            </div>
            <div class="verdict-box verdict-risky">
              <div class="verdict-label label-risky">容易踩坑的做法</div>
              <div class="verdict-text text-risky">${card.risky}</div>
            </div>
          </div>
          <div class="who-block">
            <div class="who-title">谁会被卡住</div>
            <div class="who-tags">${renderTags(card.who)}</div>
          </div>
          <div class="watch-block">
            <div class="watch-label">落地提醒</div>
            <div class="watch-text">${card.watch}</div>
          </div>
        </div>
      </div>`;
}

function renderOrangeSection(section, index) {
  return `
  <div class="section${index === 0 ? ' visible' : ''}" data-tab-panel="${section.id}">
    <div class="section-intro">${section.intro}</div>
    <div class="cards">
${section.cards.map(renderOrangeCard).join('\n')}
    </div>
  </div>`;
}

const orangeZhSections = [
  {
    id: 'ai',
    pill: 'AI 与自动化',
    intro: '很多中文团队会把 AI 合规理解成“等法务给结论”。在德国更现实的做法是：只要 AI 碰到招聘、信贷、教育、员工管理这类高影响场景，就先按高风险产品来设计。否则等到客户 DPO 或监管口径明确时，返工的不只是文档，而是流程、日志、人工复核和解释能力。',
    cards: [
      {
        number: '01',
        title: '高风险 AI 分类：别先问能不能豁免，先问德国客户会不会接受',
        tagClass: 'tag-ai',
        tag: 'AI Act',
        statusClass: 'status-live',
        status: '2026 年起进入硬约束 · 现在已经影响采购',
        tension: '中文产品语境里，“只是辅助决策”常被当作万能解释。但德国客户会追问：AI 有没有影响候选人、借款人、学生或员工的实际结果？有没有画像？人类复核是不是只是在点确认？只要答案不清楚，采购就会把它当高风险处理。',
        laws: ['EU AI Act Art. 6(3)', 'Annex III', 'Art. 6(4) self-declaration'],
        safe: '凡是 HR、信贷、教育、保险、公共服务相关 AI，先准备高风险材料：用途边界、人工复核、可解释日志、错误申诉、客户可关闭配置。',
        risky: '沿用国内“智能推荐/智能评分”的产品话术，却没有说明 AI 对最终结果的影响；把“有人看一眼”当成人工复核。',
        who: ['HR 科技 / 招聘 AI', '信贷评分系统', '教育评估 AI', '保险核保'],
        watch: '销售德国企业前，先准备一页 AI 风险说明。客户不一定马上要完整合规包，但会先看你是否知道自己处在哪类风险里。'
      },
      {
        number: '02',
        title: 'AI 内容标注：不要把“人工改过”当作默认安全',
        tagClass: 'tag-ai',
        tag: 'AI Act',
        statusClass: 'status-live',
        status: '披露义务已经进入产品设计期',
        tension: '中文内容团队常说“编辑审核过，所以不算 AI 生成”。德国/欧盟语境下，关键不是有没有人碰过，而是 AI 是否实质生成了内容、用户是否可能被误导、内容是否是深度伪造或合成声音。',
        laws: ['EU AI Act Art. 50(1)', 'EU AI Act Art. 50(2)', 'Art. 50(4) deepfakes'],
        safe: '先建立内部分级：AI 起草、AI 改写、AI 生成图片/视频/语音分别怎么披露。面向用户的聊天机器人、合成头像、合成声音默认说明。',
        risky: '把批量 AI 生成文章、广告素材或销售邮件统称“提效工具”；等监管完全明确后再改 CMS、素材库和发布流程。',
        who: ['内容生成工具', '营销 AI', '语音合成', '图片/视频生成', '聊天机器人'],
        watch: '如果产品面向德国用户，披露文案要像产品功能一样设计，不要只藏在隐私政策里。'
      },
      {
        number: '03',
        title: '自动化画像：德国不太吃“AI 只是建议”这套说法',
        tagClass: 'tag-ai',
        tag: 'AI & GDPR',
        statusClass: 'status-live',
        status: 'SCHUFA 判决后，名义人工复核不再够用',
        tension: '很多产品会在流程里加一个人工审核节点，然后说不是自动化决策。德国监管和法院更关心实质：人工有没有足够信息和权限推翻 AI？如果 97% 都照单全收，这个“人在环路里”很可能只是形式。',
        laws: ['GDPR Art. 22', 'CJEU C-634/21', 'CJEU C-203/22', 'DSK guidance 2024'],
        safe: '把人工复核做实：显示依据、允许覆盖、记录为什么覆盖或不覆盖；对用户提供解释、人工复查和申诉入口。',
        risky: '让审核员只看到一个分数或红黄绿标签；产品文案说“AI 不做决定”，但业务流程实际上由 AI 分数驱动。',
        who: ['贷款 / 信贷 AI', '招聘筛选', '保险定价', '自动封禁的反欺诈系统'],
        watch: '给德国客户演示时，不要只演示模型准确率。要演示人工如何介入、用户如何申诉、错误如何纠正。'
      }
    ]
  },
  {
    id: 'data',
    pill: '数据与追踪',
    intro: '中文团队最容易低估德国的数据问题：不是“有没有隐私政策”，而是脚本什么时候加载、数据流向哪里、谁能访问、用户有没有真正选择。德国 DPO 会把这些当作采购问题，而不只是法务问题。',
    cards: [
      {
        number: '04',
        title: 'GA4、Meta Pixel、GTM：别把增长标配直接搬到德国',
        tagClass: 'tag-data',
        tag: 'Tracking',
        statusClass: 'status-live',
        status: '不是绝对不能用，但默认接入方式通常不够',
        tension: '在中文增长语境里，GTM、GA4、热力图、广告像素是官网标配。但德国会先问：同意前有没有加载？IP 和设备数据去了哪里？拒绝按钮是否同等明显？服务端打点有没有绕过用户选择？',
        laws: ['GDPR Art. 6/7', 'TDDDG §25', 'DSK guidance', 'VG Hannover 2025'],
        safe: '先让非必要脚本在同意后加载；优先用 EU-hosted 或自托管分析；准备一张数据流图给客户 DPO；把拒绝和接受做成同等容易。',
        risky: '上线前先把 GTM 丢进页面头部；用“IP 匿名化”解释所有问题；把服务端打点当成绕过同意的办法。',
        who: ['营销网站', '增长团队', 'B2B SaaS 官网', '广告归因系统'],
        watch: '如果销售德国企业，官网追踪栈也会被看。不要等客户安全审查时才发现 GTM 已经先加载。'
      },
      {
        number: '05',
        title: '跨境数据：德国客户问的是“如果规则变了怎么办”',
        tagClass: 'tag-data',
        tag: 'Transfers',
        statusClass: 'status-forming',
        status: 'DPF 目前有效，但采购会要求 B 计划',
        tension: '中文团队常把跨境传输理解成“签 SCC / 用 DPF 就行”。德国企业会继续追问：美国支持团队能不能访问？密钥谁持有？未来 DPF 被挑战时能否迁到 EU-only？',
        laws: ['GDPR Art. 44-49', 'SCCs', 'EU-US DPF', 'Schrems II'],
        safe: '准备 TIA、SCC/DPF 说明、支持访问边界、密钥控制方案和 EU-only/自托管路线图。',
        risky: '只回答“我们用 AWS Frankfurt，所以没问题”；不说明远程支持、日志、备份、LLM API 调用是否离开欧盟。',
        who: ['中国 SaaS 出海', '美国云托管产品', 'LLM API 集成', '分析和客服工具'],
        watch: '德国客户接受“现在合规”，但更看重“出事时能否退出”。把退出方案说清楚。'
      },
      {
        number: '06',
        title: '健康/情绪/压力功能：别用 wellness 包装医疗或敏感推断',
        tagClass: 'tag-data',
        tag: 'Health data',
        statusClass: 'status-forming',
        status: '边界取决于用途、表达和推断能力',
        tension: '国内常见的“压力检测”“情绪识别”“焦虑风险提示”在德国会被更谨慎地看待。监管会看用户如何理解你的功能，而不是你内部是否叫 wellness。',
        laws: ['GDPR Art. 9', 'MDR Rule 11', 'MPDG', 'DSK guidance'],
        safe: '把普通健康记录、心理状态推断、疾病风险提示分开设计；避免诊断性营销；敏感推断单独同意；必要时先做医疗器械分类评估。',
        risky: '页面写“发现抑郁早期迹象”，底部再加“非医疗建议”；把员工压力、情绪、健康状态用于画像或管理。',
        who: ['健康应用', '可穿戴设备', '员工健康平台', 'AI 语音/情绪分析'],
        watch: 'MDR Rule 11 执法、德国 BfArM 对数字健康产品的分类口径、DPA 对 wellness 数据的案例。'
      }
    ]
  },
  {
    id: 'fin',
    pill: '金融科技',
    intro: '德国金融监管的灰区核心在于：你以为自己只是“撮合”或“嵌入”，BaFin 可能认为你已经在提供支付、信贷、账户信息或金融服务。产品文案、资金流、谁承担风险，都会影响分类。',
    cards: [
      {
        number: '07',
        title: '嵌入式金融：你是在“促进”支付/信贷，还是已经在“提供”？',
        tagClass: 'tag-fin',
        tag: 'BaFin',
        statusClass: 'status-live',
        status: '合作模式可行 · 边界由资金流和责任决定',
        tension: '使用持牌 partner 并不自动让你远离监管。如果你的产品控制用户入口、定价、审批、资金路径或风险呈现，BaFin 可能认为你不只是技术服务商。',
        laws: ['KWG', 'ZAG', 'PSD2', 'BaFin guidance'],
        safe: '让持牌方承担清晰的法律角色；合同、UI 和用户条款一致；不要暗示你自己批准贷款或持有资金；上线前做 BaFin 分类 memo。',
        risky: '在营销中说“我们提供贷款/账户/支付”，但实际牌照在 partner；让用户完全感知不到持牌机构。',
        who: ['嵌入支付', 'B2B 信贷', '钱包产品', '订阅金融化功能'],
        watch: 'BaFin 对银行即服务、嵌入式金融和前端责任的执法趋势。'
      },
      {
        number: '08',
        title: 'BNPL：CCD II 转化仍未完全清晰，规则还在落地',
        tagClass: 'tag-fin',
        tag: 'Credit',
        statusClass: 'status-forming',
        status: '欧盟规则已定 · 德国执行细节仍在形成',
        tension: '新版消费者信贷指令 CCD II 扩大了对短期、小额和 BNPL 的覆盖。德国转化后，很多原本被当作 UX/支付功能的分期体验，可能需要更完整的信息披露、信用评估和消费者保护流程。',
        laws: ['CCD II', 'BGB consumer credit', 'BaFin', 'UWG'],
        safe: '把 BNPL 当成信贷产品设计：清楚展示总成本、期限、违约后果和提供方；保留信用评估和同意记录。',
        risky: '把分期按钮做成“无痛支付”而弱化债务事实；在结账页默认突出延期付款；没有清晰说明费用和风险。',
        who: ['电商', '订阅产品', 'Fintech', 'B2B 采购分期'],
        watch: '德国 CCD II 转化法、BaFin 对 BNPL 供应链责任的解释、消费者组织诉讼。'
      }
    ]
  },
  {
    id: 'labor',
    pill: 'HR 与职场',
    intro: '德国职场产品的灰区通常不只属于 GDPR，还属于 BetrVG。只要系统客观上适合监控员工，哪怕你只展示团队平均值，也可能触发 Betriebsrat 共同决定权。',
    cards: [
      {
        number: '09',
        title: '聚合或“匿名化”的效率监控：匿名化真的能免掉同意吗？',
        tagClass: 'tag-labor',
        tag: 'Workplace',
        statusClass: 'status-live',
        status: 'BetrVG 风险高 · 小团队聚合尤其危险',
        tension: 'BetrVG §87(1) Nr. 6 看的是底层系统是否客观上适合监控个人，而不只是最终展示界面。五个人团队的“平均登录时间”几乎可以反推个人；底层收集个人数据也会让共同决定权适用。',
        laws: ['BetrVG §87(1) Nr. 6', 'GDPR Art. 88', 'BDSG §26', 'BAG case law'],
        safe: '默认需要 Betriebsrat 参与；设置最小群组阈值；避免个人级采集；为德国客户提供可关闭监控字段的配置。',
        risky: '只因为看板展示平均值就宣称不是员工监控；在没有 Betriebsvereinbarung 的情况下部署员工行为分析。',
        who: ['People analytics', '员工效率工具', '协作软件分析', 'HR SaaS'],
        watch: 'BAG 对 Workday/员工数据案件的后续，以及德国企业客户对 AI 管理工具的 Betriebsrat 审查。'
      }
    ]
  },
  {
    id: 'consumer',
    pill: '消费者 UX',
    intro: '德国消费者 UX 的灰区正在从“可用但讨厌”变成“可能违法”。DSA、UWG、BGB 和消费者组织诉讼会一起挤压暗黑模式、个性化价格和取消流程。',
    cards: [
      {
        number: '10',
        title: '暗黑模式：DSA Art. 25 已开始执行，但定义仍有弹性',
        tagClass: 'tag-consumer',
        tag: 'UX',
        statusClass: 'status-live',
        status: '平台先受影响 · 设计模式会外溢到所有产品',
        tension: 'DSA 禁止在线平台用界面操纵用户选择，但“操纵”的边界仍依赖案例。德国消费者组织会把不对称按钮、隐藏拒绝、误导性倒计时和取消摩擦作为重点攻击对象。',
        laws: ['DSA Art. 25', 'UWG §4a', 'BGB §312k', 'CPC enforcement'],
        safe: '让拒绝和接受同等容易；取消和注册同样直接；避免倒计时、羞辱文案、默认勾选和视觉压迫。',
        risky: '把“全部拒绝”藏在二级页面；用颜色和布局诱导同意；在取消前强制问卷或挽留。',
        who: ['订阅产品', 'Cookie CMP', '电商', '平台产品'],
        watch: '欧盟 DSA 执法、德国消费者协会诉讼、取消按钮判例继续扩张。'
      },
      {
        number: '11',
        title: '个性化定价：需要披露，但歧视阈值仍不清楚',
        tagClass: 'tag-consumer',
        tag: 'Pricing',
        statusClass: 'status-forming',
        status: '披露义务清楚 · 哪些差异违法仍看场景',
        tension: '如果价格基于自动化决策对个人定制，欧盟消费者法要求披露。但差异化优惠、动态库存价格、地理价格和画像定价之间的边界并不总是清楚。',
        laws: ['Omnibus Directive', 'UWG', 'GDPR profiling', 'P2B'],
        safe: '清楚说明价格是否个性化；避免使用敏感属性或脆弱状态；保留定价逻辑审计；B2C 中给用户可理解解释。',
        risky: '基于设备、地区、历史行为静默提高价格；对容易冲动购买的用户加价；把个性化价格说成普通折扣。',
        who: ['电商', '旅游/票务', '订阅定价', '市场平台'],
        watch: '消费者组织对个性化价格的测试诉讼，以及 GDPR 对画像定价的解释。'
      }
    ]
  },
  {
    id: 'platform',
    pill: '平台与竞争',
    intro: '平台和竞争法灰区的危险在于：算法看似只是优化供需，监管可能看到价格协调、排序自我优待或数据壁垒。规模越大，解释义务越重。',
    cards: [
      {
        number: '12',
        title: '算法定价：动态价格什么时候变成非法协同？',
        tagClass: 'tag-platform',
        tag: 'Competition',
        statusClass: 'status-forming',
        status: '算法工具普遍可用 · 竞争法边界仍在形成',
        tension: '动态定价本身不是违法，但如果多个卖家使用同一套定价工具，或算法学习到维持高价、跟随竞争者、限制折扣，就可能被视为协调行为。德国和欧盟竞争机构会看数据共享、供应商角色和可预见性。',
        laws: ['GWB', 'Art. 101 TFEU', 'DMA', 'Bundeskartellamt'],
        safe: '避免跨卖家共享敏感价格数据；为算法设定竞争法约束；记录模型目标和人工审核；对平台卖家定价保持隔离。',
        risky: '向多个竞争者提供同一个“利润最大化”定价引擎；用 competitor scraping 自动跟价却没有法务审查；让平台自营商品利用第三方卖家数据定价。',
        who: ['Marketplace', '定价 SaaS', '电商平台', '旅游/票务'],
        watch: 'Bundeskartellamt 对算法协调和平台自我优待的案例，以及 DMA 对 gatekeeper 的数据使用限制。'
      }
    ]
  }
];

function buildOrangeZh() {
  return `<div class="handbook chapter-handbook" data-tabs data-chapter="orange">
  <div class="hero">
    <div class="hero-label">德国 · 产品出海 · 待判断灰区 2026</div>
    <div class="hero-title">不是不能做，<br>而是不能<em>照原样搬过去</em></div>
    <div class="hero-sub">灰区最容易误导出海团队：它看起来不像红线，但德国客户、DPO、监管机构和消费者组织会用完全不同的标准看它。这里关注的不是背法条，而是哪些产品决策需要先降风险、留证据、给客户选择权。</div>
  </div>

  <div class="nav-pills">
${orangeZhSections.map((section, index) => `    <div class="pill${index === 0 ? ' active' : ''}" role="button" tabindex="0" data-tab-button="${section.id}">${section.pill}</div>`).join('\n')}
  </div>
${orangeZhSections.map(renderOrangeSection).join('\n')}

  <div class="summary-bar">
    <div class="stat-item">
      <div class="stat-n">12</div>
      <div class="stat-label">个容易被中文团队低估的德国灰区</div>
    </div>
    <div class="stat-item">
      <div class="stat-n">2026</div>
      <div class="stat-label">AI、追踪、员工数据和消费者 UX 会继续收紧</div>
    </div>
    <div class="stat-item">
      <div class="stat-n">现在</div>
      <div class="stat-label">先把可解释、可关闭、可审计做进产品</div>
    </div>
  </div>
</div>`;
}

function renderGreenCard(card) {
  return `
      <div class="card" onclick="toggleCard(this)">
        <div class="card-header">
          <div class="card-left">
            <div class="card-number">加分项 ${card.number}</div>
            <div class="card-title">${card.title}</div>
          </div>
          <div class="card-tag ${card.tagClass}">${card.tag}</div>
          <svg class="chevron" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </div>
        <div class="card-body">
          <div class="why-block">
            <div class="why-label">为什么中文团队容易低估</div>
            <div class="why-text">${card.why}</div>
          </div>
          <div class="how-steps">
            <div class="how-title">怎么改成德国可接受</div>
${card.steps.map((step, index) => `            <div class="step"><div class="step-n">${index + 1}</div><div class="step-text">${step}</div></div>`).join('\n')}
          </div>
${card.cases.map((item) => `          <div class="case-block"><div class="case-co">${item.name}</div><div class="case-text">${item.text}</div></div>`).join('\n')}
          <div class="dont-block">
            <div class="dont-title">不要这样做</div>
            <div class="dont-text">${card.dont}</div>
          </div>
        </div>
      </div>`;
}

function renderGreenSection(section, index) {
  return `
  <div class="section${index === 0 ? ' visible' : ''}" data-tab-panel="${section.id}">
    <div class="section-intro">${section.intro}</div>
    <div class="cards">
${section.cards.map(renderGreenCard).join('\n')}
    </div>
  </div>`;
}

const greenZhSections = [
  {
    id: 'arch',
    pill: '架构与部署',
    intro: '中文团队做德国市场时，最容易先改语言、官网和销售材料。但德国客户真正先看的，是架构是否可控：数据在哪里、谁能访问、能不能迁移、供应商能不能被替换。把这些做成产品能力，比多写十页隐私承诺更有效。',
    cards: [
      {
        number: '01',
        title: '提供自托管或本地部署选项：卖的是控制权，不是运维方式',
        tagClass: 'tag-arch',
        tag: 'Architecture',
        why: '很多中文团队会说“客户其实不会自己部署，所以不用做”。但德国企业常常不是要真的自运维，而是要确认自己有<strong>退出权和控制权</strong>。',
        steps: [
          '发布 <em>docker-compose.yml</em> 和清楚的自托管路径。即使标注“高级用户使用”，这个页面本身就是信任信号。',
          '在文档里做一个“部署选项”页面：EU 云、客户自选区域、自托管、本地企业部署。四行就能改变销售对话。',
          '企业销售材料里先展示部署图，明确本地部署时数据不会离开客户基础设施。',
          '自托管按企业溢价定价，而不是打折。它传达的是严肃的企业能力。'
        ],
        cases: [
          { name: 'Nextcloud', text: 'Nextcloud 的增长并不只来自功能，而来自“可自己掌控”的架构承诺。德国公共部门和受监管行业尤其吃这一点。' }
        ],
        dont: '不要只说“我们使用行业领先云基础设施并符合 GDPR”。德国采购已经对这种模板话术免疫；他们想知道具体供应商、区域、访问权限和退出路径。'
      },
      {
        number: '02',
        title: '数据中心位置要写到城市/区域，不要只写“欧洲节点”',
        tagClass: 'tag-arch',
        tag: 'Residency',
        why: '“欧洲节点”在中文出海材料里听起来够了，但对德国 DPO 和 IT-Leiter 来说信息量太低。Frankfurt、Falkenstein、Nuremberg 这类具体位置，才是在回答真实问题。',
        steps: [
          '在页脚、定价页和安全页写清楚：<em>数据存储在德国 Hetzner Falkenstein</em>，或 <em>主区域：AWS Frankfurt eu-central-1</em>。',
          '做一个 Data Residency 页面：主存储位置、备份位置、美国员工是否可访问、是否存在 CLOUD Act 暴露。',
          '如果用 AWS/Azure/GCP，不要躲。解释你的缓解措施：客户持钥、数据最小化、EU-only 支持等。',
          '企业交易中提供德国实体 AVV，并以德国法为适用法。不要只写“EU law”。'
        ],
        cases: [
          { name: 'STACKIT / Hetzner', text: '德国本土云厂商的优势，很大一部分来自“位置和控制权说得清楚”。' }
        ],
        dont: '不要把“欧盟数据驻留”当作完整答案。德国 DPO 和 IT-Leiter 会继续追问具体城市、备份位置和访问链路。'
      },
      {
        number: '03',
        title: '把数据导出做成产品入口，而不是“联系客服”',
        tagClass: 'tag-arch',
        tag: 'Portability',
        why: '中国 SaaS 常把导出当后台能力或客服流程。德国客户会把可导出性理解为可退出性：你不是靠锁定客户赚钱，而是靠产品价值留住客户。',
        steps: [
          '在设置里放“导出我的全部数据”，不要藏四层。合理数据量下，一键 ZIP，包含 CSV/JSON。',
          '文档写清导出包括哪些字段、格式和元数据。“Data portability”页面会显著提升采购信任。',
          'B2B 合同里主动写“终止后的数据返还”：格式、期限、取消后保留 30 天等。',
          '企业客户可提供定时自动导出到客户 S3/SFTP，减少审计人工步骤。'
        ],
        cases: [
          { name: 'GDPR Art. 20', text: '数据可携带权不只是合规要求。把它产品化，会让 DPO 更容易把你放进可接受供应商列表。' }
        ],
        dont: '不要把导出流程变成客服工单，也不要只给不可读 PDF。客户会把这理解为退出困难。'
      },
      {
        number: '04',
        title: '子处理方列表要公开、可订阅、可审计',
        tagClass: 'tag-arch',
        tag: 'Sub-processors',
        why: '德国 DPO 会认真检查谁在处理数据。一个清楚、可订阅、带变更记录的子处理方页面，会让对方少问很多来回邮件。',
        steps: [
          '发布在 <em>yourproduct.com/legal/sub-processors</em>，不要埋在隐私政策里。',
          '每个子处理方列出：名称、用途、数据类别、国家、传输机制。',
          '加 changelog：什么时候新增 Stripe、用途是什么、适用 SCC/DPF。DPO 会引用它做审计记录。',
          '提供子处理方变更邮件通知。GDPR Art. 28(2) 本来就要求事前通知。'
        ],
        cases: [
          { name: 'Personio / 德国 SaaS 信任页面', text: '成熟德国 SaaS 会把法律页面当作销售资产，而不是合规垃圾桶。' }
        ],
        dont: '不要只写“we use trusted partners”。德国客户需要能审计的清单，而不是形容词。'
      }
    ]
  },
  {
    id: 'ux',
    pill: '信任型 UX',
    intro: '中文互联网产品常把“提高转化”理解成更强引导、更少解释、更快点击。德国用户不是讨厌好体验，而是非常警惕被操控。清楚、克制、可解释的界面反而会提高转化，因为它降低防御感。',
    cards: [
      {
        number: '05',
        title: '明确写出“我们不会做什么”，比泛泛说重视隐私更有用',
        tagClass: 'tag-ux',
        tag: 'Privacy UX',
        why: '中文产品文案常写“我们重视隐私”。德国用户和 DPO 更想看到具体边界：不会追踪、不会卖数据、不会训练模型、不会给广告商。',
        steps: [
          '在首屏或定价页放 3-4 条负向保证：<em>未同意不追踪 · 不投放广告 · 不向第三方转交数据</em>。',
          '具体写“我们不会用你的数据训练 AI”，比“我们尊重隐私”可信得多。',
          '每次权限请求后加一句不会做什么：不会分享给广告商、不会用于画像等。',
          '邮件页脚也可写“没有 tracking pixel”。让它成为品牌语气的一部分。'
        ],
        cases: [
          { name: 'Privacy-first positioning', text: '德国市场里，“少做什么”常常比“多做什么”更能赢得信任。' }
        ],
        dont: '不要只写“我们重视你的隐私”。没有具体承诺的隐私口号，在德国买家眼里几乎等于没有说。'
      },
      {
        number: '06',
        title: 'Onboarding 先解释原因，再请求权限',
        tagClass: 'tag-ux',
        tag: 'Onboarding',
        why: '德国用户不是不愿授权，而是不喜欢被突然索权。先解释再请求，不是多一步摩擦，而是在建立“我知道自己同意了什么”的感觉。',
        steps: [
          '第一次权限请求前加一个“数据会发生什么”页面。3 个 bullet，少于 40 个词。',
          '把进度条换成上下文：第 2 步会请求日历访问，因为你将获得某个具体收益。',
          '每个权限旁边放真正可点的“Warum brauchen wir das?”，不是模糊 tooltip。',
          '不要在新手引导里用倒计时、稀缺提示和“最后机会”话术。'
        ],
        cases: [
          { name: 'German consent UX', text: '清楚解释让用户觉得自己在做决定，而不是被流程推着走。' }
        ],
        dont: '不要把美式增长漏斗直接搬过来。高压促成、倒计时和社交证明轰炸，在德国很容易被读成操控。'
      },
      {
        number: '07',
        title: '用克制、具体、可查的界面传达 Seriosität',
        tagClass: 'tag-ux',
        tag: 'Design',
        why: 'Seriosität 很难直译，接近“正经、可靠、可托付”。德国 B2B 买家会从信息结构、细节完整度、Impressum 和视觉克制判断你是不是成熟供应商。',
        steps: [
          'B2B 主色优先选深蓝、石墨灰、森林绿这类低饱和颜色，重点是专业，不是无聊。',
          '复杂功能多给规格表、对比表、FAQ 和精确数字。德国买家会读。',
          '去掉“X people are looking now”、退出弹窗和过度社交证明。',
          '把 Impressum 做完整、显眼、有人味：负责人、真实地址、电话。'
        ],
        cases: [
          { name: '德国中型企业采购习惯', text: '很多德国中型企业会先看你是否像一个能长期合作的供应商，再看具体功能。' }
        ],
        dont: '不要把美国 B2B 落地页逐字翻译成德语。夸张 CTA 和含糊利益点会显得不真诚。'
      }
    ]
  },
  {
    id: 'sales',
    pill: '销售与采购',
    intro: '很多中文团队把合规材料当作“客户要了再给”。德国企业采购正好相反：AVV、安全文档、子处理方、认证和价格说明越早出现，越像一个能被采购的本地供应商。',
    cards: [
      {
        number: '08',
        title: 'AVV 不只是法务文件，而是德国 B2B 销售材料',
        tagClass: 'tag-sales',
        tag: 'Procurement',
        why: '中文团队容易把 AVV 当成合同附件。德国 DPO 要 AVV，其实是在判断你是否熟悉德国企业采购。自助、德文、德国法、可签署，会明显减少来回。',
        steps: [
          '请德国数据保护律所起草德文 AVV 模板。一次投入，节省每个企业交易数周。',
          '发布自助页面 <em>yourproduct.com/legal/avv</em>，DPO 可下载、审阅、请求签署。',
          '在 AVV 页面提供 DocuSign “sign now” 流程。',
          '第一次销售邮件就提到 AVV 已准备好，比泛泛功能卖点更有力量。'
        ],
        cases: [
          { name: 'German DPO workflow', text: 'AVV 是采购信任测试。处理得越顺，客户越相信你已经做过德国企业交易。' }
        ],
        dont: '不要让德国企业签英文 DPA，并适用爱尔兰或 Delaware 法。即使技术上有效，也会增加 4-6 周审阅。'
      },
      {
        number: '09',
        title: 'Trust Center 要能让客户内部直接转发',
        tagClass: 'tag-sales',
        tag: 'Trust Center',
        why: '德国采购链条长，销售对象往往不是最终审批人。一个可转发的 Trust Center，能让 IT、DPO、采购和安全团队在你不在场时继续推进。',
        steps: [
          '最少包含：数据中心位置、静态/传输加密、访问控制、渗透测试节奏、事故响应 SLA、认证、子处理方、AVV、漏洞奖励。',
          '提供“申请完整安全文档”按钮，用 NDA 获取网络图、渗透测试报告等细节。',
          '加入 changelog：ISO 27001 更新、范围扩展到 Frankfurt 数据中心等。',
          '销售外联时主动发 Trust Center 链接，让客户 IT 团队提前看。'
        ],
        cases: [
          { name: '企业安全审查', text: '提前给 IT 和 DPO 可转发的材料，能减少销售会后长时间沉默。' }
        ],
        dont: '不要等客户发来 200 问安全表才开始整理材料。那时你已经显得不成熟。'
      },
      {
        number: '10',
        title: '价格要透明，并按德国语境展示 VAT / MwSt.',
        tagClass: 'tag-sales',
        tag: 'Pricing',
        why: '中文 B2B 常用“联系销售”承接所有价格。德国 SME 和采购会把隐藏价格理解成潜在风险：后续可能有锁定、加价或复杂条款。',
        steps: [
          '德国定价页同时展示含/不含 MwSt.。B2B 写 <em>zzgl. MwSt.</em>，B2C 展示含税价。',
          '每档列清功能，并明确哪些不包含。SSO 是否包含，不要让客户猜。',
          'FAQ 直接回答：取消后怎样、是否有最低合同期、是否有超额费用、迁移是否包含。',
          '提供真实月付选项。德国 SME 很重视灵活性。'
        ],
        cases: [
          { name: '德国采购心理', text: '透明会让 CFO 更容易评估风险，也让采购更容易向内部解释。' }
        ],
        dont: '不要用“Contact sales”隐藏所有价格。对很多德国中小企业，这会直接触发不信任。'
      }
    ]
  },
  {
    id: 'positioning',
    pill: '市场定位',
    intro: '德国市场的好定位不是把“合规、安全、可靠”喊得更响，而是把数字主权、本地流程和行业语境做成可验证的产品能力。',
    cards: [
      {
        number: '11',
        title: '数字主权不要当口号，要拆成可验证能力',
        tagClass: 'tag-pos',
        tag: 'Positioning',
        why: '中文团队常把 sovereignty 当成品牌词。德国公共部门、医疗、关键基础设施和部分 Mittelstand 会把它当采购条件：数据、控制权、密钥、部署边界都要能验证。',
        steps: [
          '把主权翻译成 4-5 个技术声明：无美国母公司、数据在德国、无 CLOUD Act 暴露、客户持钥、可本地部署。',
          '做“主权部署”页面，用架构图展示什么留在德国、什么会离开德国、什么可 air-gapped。',
          '适用时关注 Gaia-X 或 EUCS。这些标准仍早期，但会出现在德国公共采购评估里。',
          '面向公共部门使用德语 <em>Digitale Souveränität</em>，不要只用英文术语。'
        ],
        cases: [
          { name: 'Schleswig-Holstein / Microsoft 365 exit', text: '政府退出美国云依赖不是抽象讨论，它正在变成采购预算和技术路线。' }
        ],
        dont: '不要把“sovereign cloud”写成漂亮口号，却没有位置、密钥、访问和退出的具体说明。'
      },
      {
        number: '12',
        title: '面向 Mittelstand，要做深德国本地流程',
        tagClass: 'tag-pos',
        tag: 'Mittelstand',
        why: '中国/美国式横向 SaaS 常强调“全能平台”。德国 Mittelstand 更看重你是否理解它的本地流程。一个德国特有流程做对，胜过十个泛泛功能。',
        steps: [
          '选一个美国产品做不好或根本没有的德国流程：Minijob/Midijob、Handwerkerrechnung、GoBD-konforme Buchführung、Betriebsrat 通知。',
          '请 Steuerberater 和 Rechtsanwälte 做产品顾问。他们的背书比很多付费渠道更有效。',
          '营销里写清具体合规词：<em>GoBD-konform</em>、<em>ELSTER-kompatibel</em>、<em>Betriebsrat-tauglich</em>。',
          '参与 IHK 和 Handwerkskammer 活动。一个信任网络里的演讲机会，比许多广告更值钱。'
        ],
        cases: [
          { name: 'German vertical SaaS', text: '真正赢下 Mittelstand 的产品，往往先解决一个本地流程，再向外扩展。' }
        ],
        dont: '不要只翻译通用 horizontal SaaS 功能页。德国买家会搜索具体制度词和流程词。'
      }
    ]
  },
  {
    id: 'cert',
    pill: '认证',
    intro: '认证在德国不是官网贴 logo，而是采购通行证。ISO 27001 是起点，BSI C5 正在公共部门、医疗和受监管行业变成更强门槛。',
    cards: [
      {
        number: '13',
        title: 'ISO 27001 是桌面筹码，德国审计机构更容易被识别',
        tagClass: 'tag-cert',
        tag: 'ISO 27001',
        why: '没有 ISO 27001，很多德国企业采购会直接卡在安全审查。德国审计机构出具的证书，在本地采购和安全团队眼里更容易被识别。',
        steps: [
          '为初次认证预留 €40,000-100,000 和 8-14 个月。优先考虑 TÜV SÜD、TÜV Rheinland、DQS 等德国总部审计机构。',
          '范围不要过窄：包含处理客户数据的生产系统、开发环境和关键支持流程。',
          '拿证后在 Trust Center 显示证书编号、认证机构和 PDF 链接。',
          '把年度监督审核写进 changelog，说明 ISMS 是持续运行，不是一次性打勾。'
        ],
        cases: [
          { name: '德国采购基线', text: 'ISO 27001 不是万能，但没有它，许多企业安全问卷会很难推进。' }
        ],
        dont: '不要只认证一个无关小范围然后大面积营销。成熟 DPO 会看 scope。'
      },
      {
        number: '14',
        title: 'BSI C5 Type 2：公共部门和受监管行业的强信号',
        tagClass: 'tag-cert',
        tag: 'BSI C5',
        why: 'C5 是德国云信任语境里的硬信号。对公共部门、医疗、金融和关键基础设施，它常常比国际通用证书更接近采购语言。',
        steps: [
          '预留 €80,000-200,000+ 和 12-18 个月；可建立在 ISO 27001 基础上，重叠度约 60-70%。',
          '提前准备 BSI 透明度文件，公开云架构、位置和流程等具体披露。',
          '重点看医疗 SaaS：自 2025 年 7 月起，§393 SGB V 让医保云供应商需要 C5。',
          '国际 SaaS 进入德国时，可对 EU region 做 C5 attestation，并清楚说明范围。'
        ],
        cases: [
          { name: 'BSI C5 market signal', text: 'C5 会把对话从“能不能信任你”推进到“什么时候能部署”。' }
        ],
        dont: '不要拿 SOC 2 当作德国公共部门的唯一安全凭证。SOC 2 有价值，但不是本地采购语言里的最强信号。'
      }
    ]
  }
];

function buildGreenZh() {
  return `<div class="handbook chapter-handbook" data-tabs data-chapter="green">
  <div class="hero">
    <div class="hero-label">德国 · 产品出海 · 推荐做法 2026</div>
    <div class="hero-title">让德国客户觉得<br>你<em>可以被采购</em>的产品准备</div>
    <div class="hero-sub">德国市场的“加分项”通常不是炫酷功能，而是让 DPO、IT-Leiter、采购和 CFO 少担心的证据：数据在哪、谁能访问、怎么退出、合同怎么签、出了问题谁负责。</div>
  </div>

  <div class="nav-pills">
${greenZhSections.map((section, index) => `    <div class="pill${index === 0 ? ' active' : ''}" role="button" tabindex="0" data-tab-button="${section.id}">${section.pill}</div>`).join('\n')}
  </div>
${greenZhSections.map(renderGreenSection).join('\n')}

  <div class="summary-bar">
    <div class="stat-item">
      <div class="stat-n">14</div>
      <div class="stat-label">个能降低德国采购阻力的产品准备</div>
    </div>
    <div class="stat-item">
      <div class="stat-n">先信任</div>
      <div class="stat-label">再销售。德国客户先判断你是否可靠</div>
    </div>
    <div class="stat-item">
      <div class="stat-n">具体</div>
      <div class="stat-label">位置、流程、认证、退出路径都要能查</div>
    </div>
  </div>
</div>`;
}

module.exports = {
  buildOrangeZh,
  buildGreenZh
};
