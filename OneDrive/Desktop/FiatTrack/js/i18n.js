
const I18N = {
  fr: {
    dir: 'ltr',
    nav: {
      home: 'Accueil', market: 'Marché', converter: 'Convertisseur',
      about: 'À propos', contact: 'Contact'
    },
    hero: {
      badge: 'Taux mis à jour en direct',
      h1a: 'Suivez les devises', h1b: 'du monde entier',
      sub: 'Tableau de bord en temps réel pour les monnaies fiat. Consultez les taux, convertissez les montants et analysez les tendances du marché mondial.',
      cta1: 'Explorer le marché', cta2: 'Convertir'
    },
    stats: {
      tracked: 'Devises suivies', up: 'En hausse', down: 'En baisse',
      lastUpdate: 'Dernière MAJ', localTime: 'Heure locale',
      majors: 'Monnaies fiat majeures', hours: 'Sur les 24 dernières heures',
      currencies: 'Devises'
    },
    featured: 'Devises vedettes', seeAll: 'Voir tout', chartTitle: 'EUR/USD — tendance',
    market: {
      title: 'Marché des devises',
      sub: 'Prix en temps réel via API publique. Cliquez sur une ligne pour voir le graphique détaillé.',
      searchPlaceholder: 'Rechercher une devise…',
      sortCodeAZ: 'Code A–Z', sortCodeZA: 'Code Z–A',
      sortRateAsc: 'Taux croissant', sortRateDesc: 'Taux décroissant',
      sortChangeDesc: 'Variation ↑', sortChangeAsc: 'Variation ↓',
      favorites: 'Favoris', refreshIn: 'Actualisation dans',
      colCurrency: 'Devise', colSymbol: 'Symbole', colRate: 'Taux (USD)',
      colChange: 'Variation 24h', colTrend: 'Tendance', colChart: 'Graphique',
      noResults: 'Aucune devise trouvée.', loading: 'Chargement des prix en direct…',
      simNote: 'Données simulées — usage éducatif',
      days7: '7J', days30: '30J', days90: '90J'
    },
    converter: {
      title: 'Convertisseur de devises',
      sub: 'Convertissez instantanément entre 20 devises fiat. Le calcul utilise le Dollar Américain comme pivot.',
      from: 'De', to: 'Vers',
      result: 'Résultat de la conversion',
      noResult: '—', selectHint: 'Sélectionnez des devises pour commencer',
      chartTitle: 'Tendance historique — 30 jours',
      simNote: 'Données simulées à des fins illustratives',
      popular: 'Paires populaires'
    },
    about: {
      title: 'À propos de FiatTrack',
      sub: 'Un projet éducatif conçu pour démontrer les possibilités du développement front-end moderne.',
      detail: 'Le projet en détail',
      detailP1: 'FiatTrack est une plateforme statique de suivi des devises fiat, développée entièrement en HTML5, CSS3 et JavaScript pur. Elle s\'inspire des dashboards financiers professionnels tout en restant accessible et éducative.',
      detailP2: 'Toutes les données affichées sont simulées et ne représentent pas des taux de change réels. L\'objectif est de mettre en pratique des compétences front-end dans un contexte réaliste et visuellement impressionnant.',
      goals: 'Objectifs pédagogiques',
      goalsList: [
        'Structurer un site multi-pages avec HTML5 sémantique',
        'Créer une interface moderne avec CSS Grid et Flexbox',
        'Implémenter des interactions dynamiques en JavaScript',
        'Utiliser localStorage pour la persistance des données',
        'Intégrer des graphiques interactifs avec Chart.js',
        'Assurer une expérience responsive sur tous les écrans',
        'Respecter les bonnes pratiques d\'accessibilité ARIA'
      ],
      features: 'Fonctionnalités clés',
      featuresList: [
        'Taux de change simulés avec fluctuation en temps réel',
        'Convertisseur entre 20 devises fiat',
        'Recherche et filtrage dynamique du marché',
        'Système de favoris persistant (localStorage)',
        'Thème sombre / clair avec mémorisation',
        'Sparklines et graphiques historiques interactifs',
        'Validation de formulaire côté client',
        'Barre ticker défilante animée'
      ],
      arch: 'Architecture du projet',
      techHtml: 'Balises sémantiques, structure logique, attributs ARIA pour l\'accessibilité',
      techCss: 'Grid, Flexbox, variables CSS personnalisées, animations et transitions fluides',
      techJs: 'Manipulation DOM, événements, localStorage, Canvas API, logique métier',
      techChart: 'Graphiques linéaires interactifs avec tooltips, dégradés et animations',
      techStorage: 'Persistance du thème, des favoris et des préférences utilisateur',
      techResponsive: 'Adaptation mobile, tablette et desktop avec media queries CSS'
    },
    contact: {
      title: 'Contactez-nous',
      sub: 'Une question, une suggestion ou un retour sur FiatTrack ? Remplissez le formulaire ci-dessous.',
      stayInTouch: 'Restons en contact',
      stayP: 'FiatTrack est un projet éducatif open-source. N\'hésitez pas à nous contacter pour toute question concernant le code, les fonctionnalités ou les données affichées.',
      email: 'Email', github: 'GitHub', website: 'Site web', location: 'Localisation',
      locationVal: 'Maroc — International',
      disclaimer: '⚠ Rappel : FiatTrack est une plateforme éducative. Les taux de change affichés sont simulés et ne doivent pas être utilisés pour des décisions financières réelles.',
      successMsg: 'Message envoyé avec succès ! Nous vous répondrons rapidement.',
      labelName: 'Nom complet *', labelEmail: 'Adresse email *',
      labelSubject: 'Sujet *', labelMessage: 'Message *',
      minChars: '(min. 10 caractères)',
      placeholderName: 'Jean Dupont', placeholderEmail: 'jean@exemple.com',
      placeholderMessage: 'Décrivez votre question ou suggestion ici…',
      subjectDefault: '— Choisissez un sujet —',
      subjectBug: 'Signalement de bug', subjectFeature: 'Suggestion de fonctionnalité',
      subjectData: 'Question sur les données', subjectCollab: 'Collaboration / Partenariat',
      subjectOther: 'Autre',
      errName: 'Veuillez entrer votre nom.',
      errEmail: 'Email invalide ou manquant.',
      errSubject: 'Veuillez choisir un sujet.',
      errMessage: 'Le message doit contenir au moins 10 caractères.',
      send: 'Envoyer le message'
    },
    footer: {
      desc: 'Plateforme éducative de suivi des devises fiat. Données simulées à des fins de démonstration.',
      nav: 'Navigation', popular: 'Devises populaires',
      copy: '© 2025 FiatTrack. Tous droits réservés. Données simulées — usage éducatif uniquement.'
    },
    currencyNames: {
      USD: 'Dollar Américain', EUR: 'Euro', MAD: 'Dirham Marocain', GBP: 'Livre Sterling',
      JPY: 'Yen Japonais', CHF: 'Franc Suisse', CNY: 'Yuan Chinois', CAD: 'Dollar Canadien',
      AUD: 'Dollar Australien', INR: 'Roupie Indienne', BRL: 'Real Brésilien',
      MXN: 'Peso Mexicain', SGD: 'Dollar Singapour', HKD: 'Dollar Hong Kong',
      NOK: 'Couronne Norvégienne', SEK: 'Couronne Suédoise', TRY: 'Livre Turque',
      ZAR: 'Rand Sud-Africain', KWD: 'Dinar Koweïtien', AED: 'Dirham EAU'
    }
  },

  en: {
    dir: 'ltr',
    nav: {
      home: 'Home', market: 'Market', converter: 'Converter',
      about: 'About', contact: 'Contact'
    },
    hero: {
      badge: 'Rates updated live',
      h1a: 'Track currencies', h1b: 'from the entire world',
      sub: 'Real-time dashboard for fiat currencies. Check rates, convert amounts, and analyse global market trends.',
      cta1: 'Explore market', cta2: 'Convert'
    },
    stats: {
      tracked: 'Tracked currencies', up: 'Rising', down: 'Falling',
      lastUpdate: 'Last update', localTime: 'Local time',
      majors: 'Major fiat currencies', hours: 'Over the last 24 hours',
      currencies: 'Currencies'
    },
    featured: 'Featured currencies', seeAll: 'See all', chartTitle: 'EUR/USD — trend',
    market: {
      title: 'Currency Market',
      sub: 'Real-time prices via public API. Click a row to view the detailed chart.',
      searchPlaceholder: 'Search a currency…',
      sortCodeAZ: 'Code A–Z', sortCodeZA: 'Code Z–A',
      sortRateAsc: 'Rate ascending', sortRateDesc: 'Rate descending',
      sortChangeDesc: 'Change ↑', sortChangeAsc: 'Change ↓',
      favorites: 'Favorites', refreshIn: 'Refreshing in',
      colCurrency: 'Currency', colSymbol: 'Symbol', colRate: 'Rate (USD)',
      colChange: '24h Change', colTrend: 'Trend', colChart: 'Chart',
      noResults: 'No currency found.', loading: 'Loading live prices…',
      simNote: 'Simulated data — educational use',
      days7: '7D', days30: '30D', days90: '90D'
    },
    converter: {
      title: 'Currency Converter',
      sub: 'Instantly convert between 20 fiat currencies. Calculation uses the US Dollar as pivot.',
      from: 'From', to: 'To',
      result: 'Conversion result',
      noResult: '—', selectHint: 'Select currencies to get started',
      chartTitle: 'Historical trend — 30 days',
      simNote: 'Simulated data for illustrative purposes',
      popular: 'Popular pairs'
    },
    about: {
      title: 'About FiatTrack',
      sub: 'An educational project designed to demonstrate the possibilities of modern front-end development.',
      detail: 'The project in detail',
      detailP1: 'FiatTrack is a static fiat currency tracking platform, developed entirely in HTML5, CSS3 and pure JavaScript. It is inspired by professional financial dashboards while remaining accessible and educational.',
      detailP2: 'All displayed data is simulated and does not represent real exchange rates. The goal is to practise front-end skills in a realistic and visually impressive context.',
      goals: 'Educational objectives',
      goalsList: [
        'Structure a multi-page site with semantic HTML5',
        'Create a modern interface with CSS Grid and Flexbox',
        'Implement dynamic interactions in JavaScript',
        'Use localStorage for data persistence',
        'Integrate interactive charts with Chart.js',
        'Ensure a responsive experience on all screens',
        'Follow ARIA accessibility best practices'
      ],
      features: 'Key features',
      featuresList: [
        'Simulated exchange rates with real-time fluctuation',
        'Converter between 20 fiat currencies',
        'Dynamic market search and filtering',
        'Persistent favourites system (localStorage)',
        'Dark / light theme with memory',
        'Sparklines and interactive historical charts',
        'Client-side form validation',
        'Animated scrolling ticker bar'
      ],
      arch: 'Project architecture',
      techHtml: 'Semantic tags, logical structure, ARIA attributes for accessibility',
      techCss: 'Grid, Flexbox, custom CSS variables, smooth animations and transitions',
      techJs: 'DOM manipulation, events, localStorage, Canvas API, business logic',
      techChart: 'Interactive line charts with tooltips, gradients and animations',
      techStorage: 'Persistence of theme, favourites and user preferences',
      techResponsive: 'Mobile, tablet and desktop adaptation with CSS media queries'
    },
    contact: {
      title: 'Contact Us',
      sub: 'A question, suggestion or feedback about FiatTrack? Fill in the form below.',
      stayInTouch: 'Stay in touch',
      stayP: 'FiatTrack is an open-source educational project. Feel free to contact us for any question about the code, features or displayed data.',
      email: 'Email', github: 'GitHub', website: 'Website', location: 'Location',
      locationVal: 'Morocco — International',
      disclaimer: '⚠ Reminder: FiatTrack is an educational platform. The exchange rates displayed are simulated and should not be used for real financial decisions.',
      successMsg: 'Message sent successfully! We will reply shortly.',
      labelName: 'Full name *', labelEmail: 'Email address *',
      labelSubject: 'Subject *', labelMessage: 'Message *',
      minChars: '(min. 10 characters)',
      placeholderName: 'John Doe', placeholderEmail: 'john@example.com',
      placeholderMessage: 'Describe your question or suggestion here…',
      subjectDefault: '— Choose a subject —',
      subjectBug: 'Bug report', subjectFeature: 'Feature suggestion',
      subjectData: 'Question about data', subjectCollab: 'Collaboration / Partnership',
      subjectOther: 'Other',
      errName: 'Please enter your name.',
      errEmail: 'Invalid or missing email.',
      errSubject: 'Please choose a subject.',
      errMessage: 'Message must be at least 10 characters.',
      send: 'Send message'
    },
    footer: {
      desc: 'Educational platform for fiat currency tracking. Simulated data for demonstration purposes.',
      nav: 'Navigation', popular: 'Popular currencies',
      copy: '© 2025 FiatTrack. All rights reserved. Simulated data — educational use only.'
    },
    currencyNames: {
      USD: 'US Dollar', EUR: 'Euro', MAD: 'Moroccan Dirham', GBP: 'British Pound',
      JPY: 'Japanese Yen', CHF: 'Swiss Franc', CNY: 'Chinese Yuan', CAD: 'Canadian Dollar',
      AUD: 'Australian Dollar', INR: 'Indian Rupee', BRL: 'Brazilian Real',
      MXN: 'Mexican Peso', SGD: 'Singapore Dollar', HKD: 'Hong Kong Dollar',
      NOK: 'Norwegian Krone', SEK: 'Swedish Krona', TRY: 'Turkish Lira',
      ZAR: 'South African Rand', KWD: 'Kuwaiti Dinar', AED: 'UAE Dirham'
    }
  },

  ar: {
    dir: 'rtl',
    nav: {
      home: 'الرئيسية', market: 'السوق', converter: 'المحوّل',
      about: 'حول', contact: 'تواصل'
    },
    hero: {
      badge: 'الأسعار محدّثة لحظياً',
      h1a: 'تتبّع عملات', h1b: 'العالم كلّه',
      sub: 'لوحة تحكّم لحظية للعملات الورقية. اطّلع على الأسعار، حوّل المبالغ، وحلّل اتجاهات السوق العالمية.',
      cta1: 'استكشاف السوق', cta2: 'تحويل'
    },
    stats: {
      tracked: 'العملات المتابَعة', up: 'في ارتفاع', down: 'في انخفاض',
      lastUpdate: 'آخر تحديث', localTime: 'التوقيت المحلي',
      majors: 'العملات الورقية الرئيسية', hours: 'خلال الـ 24 ساعة الماضية',
      currencies: 'العملات'
    },
    featured: 'العملات المميّزة', seeAll: 'عرض الكل', chartTitle: 'EUR/USD — الاتجاه',
    market: {
      title: 'سوق العملات',
      sub: 'أسعار فورية عبر واجهة برمجية عامة. انقر على صف لرؤية الرسم البياني التفصيلي.',
      searchPlaceholder: 'ابحث عن عملة…',
      sortCodeAZ: 'الرمز أ–ي', sortCodeZA: 'الرمز ي–أ',
      sortRateAsc: 'السعر تصاعدي', sortRateDesc: 'السعر تنازلي',
      sortChangeDesc: 'التغيّر ↑', sortChangeAsc: 'التغيّر ↓',
      favorites: 'المفضّلة', refreshIn: 'تحديث خلال',
      colCurrency: 'العملة', colSymbol: 'الرمز', colRate: 'السعر (USD)',
      colChange: 'تغيّر 24س', colTrend: 'الاتجاه', colChart: 'الرسم',
      noResults: 'لا توجد عملة مطابقة.', loading: 'تحميل الأسعار الحية…',
      simNote: 'بيانات محاكاة — للاستخدام التعليمي',
      days7: '7أ', days30: '30أ', days90: '90أ'
    },
    converter: {
      title: 'محوّل العملات',
      sub: 'حوّل فورياً بين 20 عملة ورقية. يستخدم الحساب الدولار الأمريكي كمحور.',
      from: 'من', to: 'إلى',
      result: 'نتيجة التحويل',
      noResult: '—', selectHint: 'اختر العملات للبدء',
      chartTitle: 'الاتجاه التاريخي — 30 يوماً',
      simNote: 'بيانات محاكاة لأغراض توضيحية',
      popular: 'الأزواج الشائعة'
    },
    about: {
      title: 'حول FiatTrack',
      sub: 'مشروع تعليمي مصمَّم لإبراز إمكانيات تطوير الواجهة الأمامية الحديثة.',
      detail: 'تفاصيل المشروع',
      detailP1: 'FiatTrack منصة ثابتة لتتبع العملات الورقية، مطوَّرة بالكامل بـ HTML5 وCSS3 وJavaScript خالص. تستلهم تصميمها من لوحات التحكم المالية الاحترافية مع بقائها سهلة الاستخدام وتعليمية.',
      detailP2: 'جميع البيانات المعروضة محاكاة ولا تمثّل أسعار صرف حقيقية. الهدف هو تطبيق مهارات الواجهة الأمامية في سياق واقعي ومثير بصرياً.',
      goals: 'الأهداف التعليمية',
      goalsList: [
        'هيكلة موقع متعدد الصفحات بـ HTML5 دلالي',
        'إنشاء واجهة حديثة باستخدام CSS Grid وFlexbox',
        'تطبيق تفاعلات ديناميكية بـ JavaScript',
        'استخدام localStorage لحفظ البيانات',
        'دمج مخططات تفاعلية باستخدام Chart.js',
        'ضمان تجربة متجاوبة على جميع الأجهزة',
        'اتباع أفضل ممارسات إمكانية الوصول ARIA'
      ],
      features: 'الميزات الرئيسية',
      featuresList: [
        'أسعار صرف محاكاة مع تذبذب فوري',
        'محوّل بين 20 عملة ورقية',
        'بحث وتصفية ديناميكية للسوق',
        'نظام مفضّلة دائم (localStorage)',
        'نمط مظلم / فاتح مع حفظ التفضيل',
        'شرائح مضيئة ومخططات تاريخية تفاعلية',
        'التحقق من صحة النموذج من جانب العميل',
        'شريط إخباري متحرك متدحرج'
      ],
      arch: 'هيكل المشروع',
      techHtml: 'علامات دلالية، هيكل منطقي، سمات ARIA لإمكانية الوصول',
      techCss: 'Grid وFlexbox ومتغيرات CSS مخصصة وانتقالات سلسة',
      techJs: 'معالجة DOM والأحداث وlocalStorage وCanvas API والمنطق التجاري',
      techChart: 'مخططات خطية تفاعلية مع تلميحات وتدرجات وحركات',
      techStorage: 'استمرارية النمط والمفضّلة وتفضيلات المستخدم',
      techResponsive: 'تكيّف مع الجوال والجهاز اللوحي وسطح المكتب باستخدام media queries'
    },
    contact: {
      title: 'تواصل معنا',
      sub: 'سؤال أو اقتراح أو ملاحظة حول FiatTrack؟ أكمل النموذج أدناه.',
      stayInTouch: 'لنبقَ على تواصل',
      stayP: 'FiatTrack مشروع تعليمي مفتوح المصدر. لا تتردد في التواصل معنا لأي سؤال حول الكود أو الميزات أو البيانات المعروضة.',
      email: 'البريد الإلكتروني', github: 'GitHub', website: 'الموقع الإلكتروني', location: 'الموقع',
      locationVal: 'المغرب — دولي',
      disclaimer: '⚠ تذكير: FiatTrack منصة تعليمية. أسعار الصرف المعروضة محاكاة ولا يجب استخدامها لاتخاذ قرارات مالية حقيقية.',
      successMsg: 'تم إرسال الرسالة بنجاح! سنردّ عليك قريباً.',
      labelName: 'الاسم الكامل *', labelEmail: 'البريد الإلكتروني *',
      labelSubject: 'الموضوع *', labelMessage: 'الرسالة *',
      minChars: '(10 أحرف على الأقل)',
      placeholderName: 'محمد أمين', placeholderEmail: 'mohammed@example.com',
      placeholderMessage: 'اكتب سؤالك أو اقتراحك هنا…',
      subjectDefault: '— اختر موضوعاً —',
      subjectBug: 'الإبلاغ عن خطأ', subjectFeature: 'اقتراح ميزة',
      subjectData: 'سؤال حول البيانات', subjectCollab: 'تعاون / شراكة',
      subjectOther: 'أخرى',
      errName: 'يرجى إدخال اسمك.',
      errEmail: 'البريد الإلكتروني غير صالح أو مفقود.',
      errSubject: 'يرجى اختيار موضوع.',
      errMessage: 'يجب أن تحتوي الرسالة على 10 أحرف على الأقل.',
      send: 'إرسال الرسالة'
    },
    footer: {
      desc: 'منصة تعليمية لتتبع العملات الورقية. بيانات محاكاة لأغراض تجريبية.',
      nav: 'التنقل', popular: 'العملات الشائعة',
      copy: '© 2025 FiatTrack. جميع الحقوق محفوظة. بيانات محاكاة — للاستخدام التعليمي فقط.'
    },
    currencyNames: {
      USD: 'الدولار الأمريكي', EUR: 'اليورو', MAD: 'الدرهم المغربي', GBP: 'الجنيه الإسترليني',
      JPY: 'الين الياباني', CHF: 'الفرنك السويسري', CNY: 'اليوان الصيني', CAD: 'الدولار الكندي',
      AUD: 'الدولار الأسترالي', INR: 'الروبية الهندية', BRL: 'الريال البرازيلي',
      MXN: 'البيزو المكسيكي', SGD: 'الدولار السنغافوري', HKD: 'الدولار الهونغ كونغي',
      NOK: 'الكرون النرويجي', SEK: 'الكرون السويدي', TRY: 'الليرة التركية',
      ZAR: 'الراند الجنوب أفريقي', KWD: 'الدينار الكويتي', AED: 'الدرهم الإماراتي'
    }
  }
};

function getLang() {
  return localStorage.getItem('ft_lang') || 'fr';
}

function applyLang(lang) {
  if (!I18N[lang]) lang = 'fr';
  const d = I18N[lang];
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', d.dir);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = key.split('.').reduce((o, k) => o?.[k], d);
    if (val !== undefined && typeof val === 'string') {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = val;
      else el.textContent = val;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = key.split('.').reduce((o, k) => o?.[k], d);
    if (val) el.placeholder = val;
  });

  document.querySelectorAll('option[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = key.split('.').reduce((o, k) => o?.[k], d);
    if (val) el.textContent = val;
  });

  document.querySelectorAll('.lang-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.lang === lang)
  );

  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang, d } }));
}

function initLang() {
  const lang = getLang();
  applyLang(lang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      localStorage.setItem('ft_lang', btn.dataset.lang);
      applyLang(btn.dataset.lang);
    });
  });
}
