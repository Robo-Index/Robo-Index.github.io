import type { Locale } from '@/src/lib/i18n'

export interface Dictionary {
  header: {
    papers: string
    guides: string
    ralSkill: string
    dashboard: string
    contribute: string
    themeToggleLabel: string
    languageToggleLabel: string
  }
  root: {
    redirecting: string
    english: string
    chinese: string
  }
  home: {
    subtitle: string
    comingSoon: string
    papersLabel: string
    reposLabel: string
    visitorsLabel: string
    skillLabel: string
    browseCta: string
    builtByNote: string
    builtByLink: string
    metadataTitle: string
    metadataDescription: string
  }
  papers: {
    metadataTitle: string
    heading: string
    summary: string
    rangeLabel: string
    searchPlaceholder: string
    allVenues: string
    allYears: string
    clearAll: string
    filterByTags: string
    tagsUnit: string
    foundSuffix: string
    noMatches: string
    clearFilters: string
    paperSingular: string
    paperPlural: string
    backToPapers: string
    abstractLabel: string
    repository: string
    projectPage: string
    details: string
    code: string
  }
  guides: {
    metadataTitle: string
    metadataDescription: string
    notFound: string
    phases: string[]
    ctaText: string
    ctaButton: string
    fallbackNotice: string
    tocExpand: string
    tocCollapse: string
  }
  dashboard: {
    metadataTitle: string
    heading: string
    summary: string
    totalPapers: string
    openSourceRate: string
    uniqueTags: string
    venues: string
    publicationTimeline: string
    papersByYear: string
    topResearchTopics: string
    commonTags: string
    tagCloud: string
    topicsAtAGlance: string
    tagTrends: string
    tagTrendSummary: string
    venueBreakdown: string
    venueSummary: string
    noData: string
    retry: string
    timelineTitle: string
    timelineSummary: string
    timelineDays: string
    timelineFromSubmission: string
    timelineDataFrom: string
    timelineHardDeadline: string
    tagColumn: string
    trendColumn: string
    yoySuffix: string
  }
  showcase: {
    metadataTitle: string
    metadataDescription: string
    badge: string
    heading: string
    summary: string
    openSourcePapers: string
    totalIndexed: string
    yearsCovered: string
    totalStars: string
    searchPlaceholder: string
    allYears: string
    sortDefault: string
    sortStars: string
    sortActive: string
    sortRecent: string
    clearAll: string
    paperSingular: string
    paperPlural: string
    foundSuffix: string
    noMatches: string
    clearFilters: string
    details: string
    project: string
    today: string
    daysAgo: string
    monthsAgo: string
    yearsAgo: string
    lastPushed: string
  }
  contribute: {
    metadataTitle: string
    metadataDescription: string
    heading: string
    summary: string
    team: string
    ways: Array<{
      title: string
      desc: string
      steps: string[]
      linkLabel: string
    }>
    teamRoles: Array<{
      role: string
      desc: string
    }>
    contributors: string
    contributorsSummary: string
    contributorRoles: Array<{
      role: string
      desc: string
    }>
  }
  ralSkill: {
    metadataTitle: string
    metadataDescription: string
    badge: string
    subtitle: string
    summary: string
    guidesCta: string
    sourcesHeading: string
    sourceCards: Array<{
      title: string
      desc: string
    }>
    featuresHeading: string
    features: Array<{
      title: string
      desc: string
    }>
    demoHeading: string
    demos: Array<{
      question: string
      answer: string
      sources: string[]
    }>
    installHeading: string
    installGlobal: string
    installUsage: string
    credits: string
  }
  notFound: {
    message: string
    goHome: string
  }
}

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    header: {
      papers: 'Papers',
      guides: 'Guides',
      ralSkill: 'ral.skill',
      dashboard: 'Dashboard',
      contribute: 'Contribute',
      themeToggleLabel: 'Toggle theme',
      languageToggleLabel: 'Switch language',
    },
    root: {
      redirecting: 'Redirecting to your preferred language…',
      english: 'English',
      chinese: '中文',
    },
    home: {
      subtitle: 'Structured robotics research paper data',
      comingSoon: 'coming soon',
      papersLabel: 'papers',
      reposLabel: 'open-source repos',
      visitorsLabel: 'visitors',
      skillLabel: '1 skill for all',
      browseCta: 'Browse papers',
      builtByNote: 'Built by the community',
      builtByLink: 'See contributors',
      metadataTitle: 'RoboIndex',
      metadataDescription: 'Structured robotics research paper data',
    },
    papers: {
      metadataTitle: 'Papers',
      heading: 'Papers',
      summary: 'open-source RA-L papers with GitHub repos',
      rangeLabel: '2020–2026 · open-source only',
      searchPlaceholder: 'Search papers by title or abstract...',
      allVenues: 'All venues',
      allYears: 'All years',
      clearAll: 'Clear all',
      filterByTags: 'Filter by tags',
      tagsUnit: 'tags',
      foundSuffix: 'found',
      noMatches: 'No papers match your filters.',
      clearFilters: 'Clear filters',
      paperSingular: 'paper',
      paperPlural: 'papers',
      backToPapers: 'Back to papers',
      abstractLabel: 'Abstract',
      repository: 'Repository',
      projectPage: 'Project Page',
      details: 'Details',
      code: 'Code',
    },
    guides: {
      metadataTitle: 'RA-L Submission Guide',
      metadataDescription: 'Comprehensive RA-L submission guide by Ce Hao',
      notFound: 'Guide not found',
      phases: ['Phase 1', 'Phase 2', 'Phase 3'],
      ctaText: 'Want AI-assisted submission guidance?',
      ctaButton: 'Install ral.skill →',
      fallbackNotice: 'This content is currently available only in English.',
      tocExpand: 'Expand',
      tocCollapse: 'Collapse',
    },
    dashboard: {
      metadataTitle: 'Dashboard',
      heading: 'Dashboard',
      summary: 'Research trends, topic distribution, and tag analytics',
      totalPapers: 'Total Papers',
      openSourceRate: 'Open-Source Rate',
      uniqueTags: 'Unique Tags',
      venues: 'Venues',
      publicationTimeline: 'Publication Timeline',
      papersByYear: 'Papers by year',
      topResearchTopics: 'Top Research Topics',
      commonTags: 'Most common tags across papers',
      tagCloud: 'Tag Cloud',
      topicsAtAGlance: 'Research topics at a glance',
      tagTrends: 'Tag Trends',
      tagTrendSummary: 'Top tags by year with trend direction',
      venueBreakdown: 'Venue Breakdown',
      venueSummary: 'Papers by conference or journal',
      noData: 'No data available',
      retry: 'Retry',
      timelineTitle: 'RA-L Submission Timeline',
      timelineSummary: 'Total ~{min}–{max} months · Official guarantee ≤ 6 months',
      timelineDays: '{min}–{max} days',
      timelineFromSubmission: '~Day {min}–{max} from submission',
      timelineDataFrom: 'Data from',
      timelineHardDeadline: 'Hard deadline',
      tagColumn: 'Tag',
      trendColumn: 'Trend',
      yoySuffix: 'YoY',
    },
    showcase: {
      metadataTitle: 'Open-source RA-L Papers',
      metadataDescription: 'Discover robotics papers from IEEE RA-L with open-source GitHub repositories.',
      badge: 'Open Source',
      heading: 'RA-L Paper Showcase',
      summary: 'Robotics papers from IEEE RA-L with open-source code. Discover reproducible research.',
      openSourcePapers: 'open-source papers',
      totalIndexed: 'total indexed',
      yearsCovered: 'years covered',
      totalStars: 'total stars',
      searchPlaceholder: 'Search by title, abstract, or repo...',
      allYears: 'All years',
      sortDefault: 'Sort: Default',
      sortStars: 'Most stars',
      sortActive: 'Recently active',
      sortRecent: 'Recently added',
      clearAll: 'Clear all',
      paperSingular: 'paper',
      paperPlural: 'papers',
      foundSuffix: 'found',
      noMatches: 'No papers match your filters.',
      clearFilters: 'Clear filters',
      details: 'Details',
      project: 'Project',
      today: 'today',
      daysAgo: '{count}d ago',
      monthsAgo: '{count}mo ago',
      yearsAgo: '{count}y ago',
      lastPushed: 'Last pushed: {date}',
    },
    contribute: {
      metadataTitle: 'Contribute',
      metadataDescription: 'Help grow RoboIndex — share submission experiences, improve ral.skill, report issues.',
      heading: 'Contribute',
      summary: "RoboIndex is open-source and community-driven. Here's how you can help.",
      team: 'Team',
      ways: [
        {
          title: 'Share Submission Experience',
          desc: 'Contribute your RA-L / ICRA / IROS submission experience to help future researchers.',
          steps: [
            'Write your experience (anonymize personal info)',
            'Submit via GitHub Issue or PR to the guides/ directory',
            "We'll review and add it to the Guides page",
          ],
          linkLabel: 'Share experience →',
        },
        {
          title: 'Improve ral.skill',
          desc: 'Help improve the AI submission assistant — better prompts, more knowledge, new features.',
          steps: [
            'Check the knowledge/ directory for areas to improve',
            'Add new tips, fix outdated info, or improve prompt templates',
            'Submit a PR to the ral-skill repo',
          ],
          linkLabel: 'ral-skill repo →',
        },
        {
          title: 'Report Issues & Feedback',
          desc: "Found a bug? Have a suggestion? We'd love to hear from you.",
          steps: [
            'Website issues → RoboIndex repo',
            'Skill issues → ral-skill repo',
            'Feature requests welcome!',
          ],
          linkLabel: 'Open an issue →',
        },
      ],
      teamRoles: [
        {
          role: 'Community & Knowledge',
          desc: 'RA-L submission guide author, community organizer',
        },
        {
          role: 'Technical Development',
          desc: 'RoboIndex platform, ral.skill development, data pipeline',
        },
        {
          role: 'Internationalization & Data',
          desc: 'Bilingual routing (i18n) and data-related contributions.',
        },
        {
          role: 'Co-author',
          desc: 'RoboIndex team co-author.',
        },
      ],
      contributors: 'Contributors',
      contributorsSummary: 'Thanks to everyone who has helped grow RoboIndex.',
      contributorRoles: [
        {
          role: 'Contributor',
          desc: 'Community contribution to RoboIndex.',
        },
      ],
    },
    ralSkill: {
      metadataTitle: 'ral.skill — AI Submission Assistant',
      metadataDescription: 'Claude Code Skill for IEEE RA-L submission guidance with traceable, live-verified advice.',
      badge: 'Claude Code Skill',
      subtitle: 'IEEE RA-L submission AI assistant',
      summary: 'Submission experience distilled into an AI skill. Every recommendation is source-tagged and official rules are checked live.',
      guidesCta: 'View submission guide',
      sourcesHeading: 'Three Sources, Fully Traceable',
      sourceCards: [
        { title: 'IEEE website', desc: 'Authoritative · live-verified' },
        { title: 'Submission guide', desc: 'Written by Ce Hao' },
        { title: 'Community experience', desc: 'Anonymized peer discussion' },
      ],
      featuresHeading: '7 feature modules',
      features: [
        { title: 'End-to-end guidance', desc: 'Targeted suggestions from topic selection to publication.' },
        { title: 'Writing support', desc: 'Read .tex/.pdf, analyze section by section, and suggest rewrites.' },
        { title: 'Review response', desc: 'Classify reviewer comments and generate rebuttal strategies.' },
        { title: 'Format checks', desc: 'Compare your draft against the latest IEEE rules in real time.' },
        { title: 'Timeline forecast', desc: 'Estimate review time and remind you about key milestones.' },
        { title: 'Open-source discovery', desc: 'Recommend related open-source projects and companion code.' },
        { title: 'Fun extras', desc: 'Submission fortune, reviewer archetypes, and academic trivia.' },
      ],
      demoHeading: 'Example output',
      demos: [
        {
          question: 'How should I start an RA-L submission?',
          answer: 'RA-L usually has 5 stages: initial submission → review (~3 months) → rebuttal (30 days) → final version (within 14 days) → publication / transfer. Which stage are you in now?',
          sources: ['Submission guide', 'IEEE website'],
        },
        {
          question: "It's been 3 months with no update. Should I follow up?",
          answer: "Three months is still within the normal range. A polite email to the editor is fine and won't get you rejected.",
          sources: ['Community experience', 'IEEE website'],
        },
        {
          question: 'Can I put a GitHub link in the paper?',
          answer: "Better not. Some AEs allow it, some may desk reject. It's safer to say in the paper that the code will be released.",
          sources: ['Submission guide', 'Community experience'],
        },
        {
          question: "What's my submission fortune today?",
          answer: 'Lucky day. Good for: initial submission, figure polishing. Avoid: rewriting the introduction at midnight.',
          sources: ['Community experience'],
        },
      ],
      installHeading: 'Install',
      installGlobal: '# global install',
      installUsage: '# usage',
      credits: 'Community support · Technical development',
    },
    notFound: {
      message: 'This page could not be found.',
      goHome: 'Go home',
    },
  },
  zh: {
    header: {
      papers: '论文',
      guides: '攻略',
      ralSkill: 'ral.skill',
      dashboard: '数据看板',
      contribute: '参与共建',
      themeToggleLabel: '切换主题',
      languageToggleLabel: '切换语言',
    },
    root: {
      redirecting: '正在跳转到你的首选语言…',
      english: 'English',
      chinese: '中文',
    },
    home: {
      subtitle: '结构化机器人研究论文数据',
      comingSoon: '即将支持',
      papersLabel: '篇论文',
      reposLabel: '个开源仓库',
      visitorsLabel: '位访客',
      skillLabel: '一个 skill，贯穿全流程',
      browseCta: '浏览论文',
      builtByNote: '由社区共同构建',
      builtByLink: '查看贡献者',
      metadataTitle: 'RoboIndex',
      metadataDescription: '结构化机器人研究论文数据',
    },
    papers: {
      metadataTitle: '论文',
      heading: '论文',
      summary: '收录带 GitHub 仓库的 RA-L 开源论文',
      rangeLabel: '2020–2026 · 仅开源项目',
      searchPlaceholder: '按标题或摘要搜索论文…',
      allVenues: '全部 venue',
      allYears: '全部年份',
      clearAll: '清除全部',
      filterByTags: '按标签筛选',
      tagsUnit: '个标签',
      foundSuffix: '条结果',
      noMatches: '没有论文符合当前筛选条件。',
      clearFilters: '清除筛选',
      paperSingular: '篇论文',
      paperPlural: '篇论文',
      backToPapers: '返回论文列表',
      abstractLabel: '摘要',
      repository: '代码仓库',
      projectPage: '项目主页',
      details: '详情',
      code: '代码',
    },
    guides: {
      metadataTitle: 'RA-L 投稿攻略',
      metadataDescription: 'Ce Hao 编写的完整 RA-L 投稿攻略',
      notFound: '未找到攻略内容',
      phases: ['阶段一', '阶段二', '阶段三'],
      ctaText: '想要 AI 辅助的投稿指导？',
      ctaButton: '安装 ral.skill →',
      fallbackNotice: '当前内容暂未提供中文翻译，以下显示英文原文。',
      tocExpand: '展开',
      tocCollapse: '收起',
    },
    dashboard: {
      metadataTitle: '数据看板',
      heading: '数据看板',
      summary: '研究趋势、主题分布与标签分析',
      totalPapers: '论文总数',
      openSourceRate: '开源比例',
      uniqueTags: '唯一标签数',
      venues: 'Venue 数量',
      publicationTimeline: '发表时间线',
      papersByYear: '按年份统计论文数量',
      topResearchTopics: '热门研究主题',
      commonTags: '论文中最常见的标签',
      tagCloud: '标签云',
      topicsAtAGlance: '快速浏览研究主题',
      tagTrends: '标签趋势',
      tagTrendSummary: '按年份查看热门标签与变化方向',
      venueBreakdown: 'Venue 分布',
      venueSummary: '按会议或期刊统计论文数量',
      noData: '暂无可用数据',
      retry: '重试',
      timelineTitle: 'RA-L 投稿时间线',
      timelineSummary: '总计约 {min}–{max} 个月 · 官方承诺不超过 6 个月',
      timelineDays: '{min}–{max} 天',
      timelineFromSubmission: '从投稿起约第 {min}–{max} 天',
      timelineDataFrom: '数据来源',
      timelineHardDeadline: '硬截止',
      tagColumn: '标签',
      trendColumn: '趋势',
      yoySuffix: '同比',
    },
    showcase: {
      metadataTitle: 'RA-L 开源论文',
      metadataDescription: '发现来自 IEEE RA-L、附带 GitHub 开源仓库的机器人论文。',
      badge: '开源项目',
      heading: 'RA-L 论文展示',
      summary: '汇总 IEEE RA-L 的机器人论文与开源代码，帮助发现可复现研究。',
      openSourcePapers: '篇开源论文',
      totalIndexed: '篇总收录',
      yearsCovered: '个覆盖年份',
      totalStars: '总星标',
      searchPlaceholder: '按标题、摘要或仓库搜索…',
      allYears: '全部年份',
      sortDefault: '排序：默认',
      sortStars: '星标最多',
      sortActive: '最近活跃',
      sortRecent: '最近新增',
      clearAll: '清除全部',
      paperSingular: '篇论文',
      paperPlural: '篇论文',
      foundSuffix: '条结果',
      noMatches: '没有论文符合当前筛选条件。',
      clearFilters: '清除筛选',
      details: '详情',
      project: '项目页',
      today: '今天',
      daysAgo: '{count} 天前',
      monthsAgo: '{count} 个月前',
      yearsAgo: '{count} 年前',
      lastPushed: '最后更新：{date}',
    },
    contribute: {
      metadataTitle: '参与共建',
      metadataDescription: '帮助 RoboIndex 成长：分享投稿经验、改进 ral.skill、反馈问题。',
      heading: '参与共建',
      summary: 'RoboIndex 是一个开源、社区驱动的项目。你可以这样参与。',
      team: '团队',
      ways: [
        {
          title: '分享投稿经验',
          desc: '贡献你的 RA-L / ICRA / IROS 投稿经验，帮助后来的研究者。',
          steps: [
            '整理你的投稿经历并匿名化个人信息',
            '通过 GitHub Issue 或 PR 提交到 guides/ 目录',
            '我们审核后会加入 Guides 页面',
          ],
          linkLabel: '分享经验 →',
        },
        {
          title: '改进 ral.skill',
          desc: '帮助完善 AI 投稿助手：更好的 prompt、更丰富的知识、更完整的功能。',
          steps: [
            '检查 knowledge/ 目录里还可以补强的部分',
            '补充新技巧、修正过时信息，或优化 prompt 模板',
            '向 ral-skill 仓库提交 PR',
          ],
          linkLabel: '查看 ral-skill 仓库 →',
        },
        {
          title: '反馈问题与建议',
          desc: '发现 bug 或有改进建议，都欢迎告诉我们。',
          steps: [
            '网站相关问题 → RoboIndex 仓库',
            'Skill 相关问题 → ral-skill 仓库',
            '欢迎提交功能建议',
          ],
          linkLabel: '提交 issue →',
        },
      ],
      teamRoles: [
        {
          role: '社区与知识内容',
          desc: 'RA-L 投稿攻略作者，社区组织者',
        },
        {
          role: '技术开发',
          desc: 'RoboIndex 平台、ral.skill 开发与数据流水线',
        },
        {
          role: '多语言与数据',
          desc: '多语言路由（i18n）与数据相关工作。',
        },
        {
          role: '共同作者',
          desc: 'RoboIndex 团队共同作者。',
        },
      ],
      contributors: '社区贡献者',
      contributorsSummary: '感谢所有帮助 RoboIndex 成长的社区成员。',
      contributorRoles: [
        {
          role: '社区贡献者',
          desc: '参与 RoboIndex 社区共建。',
        },
      ],
    },
    ralSkill: {
      metadataTitle: 'ral.skill — AI 投稿助手',
      metadataDescription: '面向 IEEE RA-L 投稿指导的 Claude Code Skill，建议可追溯、规则可实时校验。',
      badge: 'Claude Code Skill',
      subtitle: 'IEEE RA-L 投稿 AI 助手',
      summary: '把投稿经验蒸馏成 AI Skill。每条建议都标注出处，官方规则实时验证。',
      guidesCta: '查看投稿攻略',
      sourcesHeading: '三类来源，全部可追溯',
      sourceCards: [
        { title: 'IEEE 官网', desc: '权威 · 实时验证' },
        { title: '投稿攻略', desc: 'Ce Hao 撰写' },
        { title: '社区经验', desc: '脱敏同行讨论' },
      ],
      featuresHeading: '7 个功能模块',
      features: [
        { title: '全流程指导', desc: '从选题到发表，根据你的阶段给出针对性建议。' },
        { title: '写作辅助', desc: '读取 .tex/.pdf，逐章节分析并给出改写建议。' },
        { title: '审稿应对', desc: '分类审稿意见，生成 rebuttal 策略。' },
        { title: '格式检查', desc: '实时对照最新 IEEE 规则检查稿件。' },
        { title: '周期预测', desc: '估计审稿时间并提醒关键节点。' },
        { title: '开源聚合', desc: '推荐相关开源项目和论文配套代码。' },
        { title: '趣味彩蛋', desc: '投稿运势、审稿人图鉴和学术冷知识。' },
      ],
      demoHeading: '实际效果',
      demos: [
        {
          question: '我想投 RAL，该怎么开始？',
          answer: 'RAL 投稿通常分 5 个阶段：初稿提交 → 等待审稿（约 3 个月）→ rebuttal（30 天）→ final version（14 天内）→ 发表 / transfer。你目前在哪个阶段？',
          sources: ['投稿攻略', 'IEEE 官网'],
        },
        {
          question: '审稿 3 个月了没消息，要催吗？',
          answer: '三个月仍在正常范围内。可以礼貌邮件询问编辑，这不会导致被拒。',
          sources: ['社区经验', 'IEEE 官网'],
        },
        {
          question: '论文里能放 GitHub 链接吗？',
          answer: '最好不要。有的 AE 会接受，有的可能直接 desk reject。更稳妥的做法是在文中说明代码将会开源。',
          sources: ['投稿攻略', '社区经验'],
        },
        {
          question: '今日投稿运势',
          answer: '今天适合提交初稿和精修图表，不适合半夜重写 introduction。',
          sources: ['社区经验'],
        },
      ],
      installHeading: '安装',
      installGlobal: '# 全局安装',
      installUsage: '# 使用',
      credits: '社区支持 · 技术开发',
    },
    notFound: {
      message: '页面不存在。',
      goHome: '返回首页',
    },
  },
}

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang]
}
