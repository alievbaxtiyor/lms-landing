const uzFallback = "Ushbu imkoniyat haqida batafsil ma'lumot tez orada qo'shiladi."
const ruFallback = 'Подробная информация об этой возможности скоро будет добавлена.'
const enFallback = 'Detailed information about this feature will be added soon.'

const uzProctoring =
  "Face ID, Object Detection va sun'iy intellekt texnologiyalari yordamida imtihon jarayonlarini real vaqt rejimida nazorat qiling. Shaxsni tasdiqlash, qoidabuzarliklarni aniqlash va akademik halollikni ta'minlash imkonini beradi."
const ruProctoring =
  'С помощью технологий Face ID, Object Detection и искусственного интеллекта контролируйте экзаменационные процессы в режиме реального времени. Это позволяет подтверждать личность, выявлять нарушения и обеспечивать академическую честность.'
const enProctoring =
  'Monitor exam processes in real time using Face ID, Object Detection and artificial intelligence technologies. It enables identity verification, violation detection and academic integrity.'

export default {
  uz: {
    titlePre: 'Bitta platforma,',
    titleHighlight: '20+',
    titlePost: 'kuchli imkoniyat',
    items: {
      'face-id': {
        label: 'Face ID va AI nazorati bilan xavfsiz imtihonlar',
        description: uzProctoring,
      },
      features: {
        label: "Kiberxavfsizlik bosqichidan o'tgan platforma",
        description: uzFallback,
      },
      sync: {
        label: 'HEMIS bilan real vaqt rejimida sinxronizatsiya',
        description: uzFallback,
      },
      hemis: {
        label: 'Baholarni HEMIS tizimiga avtomatik uzatish',
        description: uzFallback,
      },
      ai: {
        label: "Mashhur ta'lim va AI xizmatlari bilan integratsiya",
        description: uzProctoring,
      },
      mobile: {
        label: 'Barcha imkoniyatlarga ega mobil ilova',
        description: uzFallback,
      },
      calendar: {
        label: 'QR-kod va Face ID orqali aqlli davomat',
        description: uzFallback,
      },
      globe: {
        label: 'Global standartlarga mos kurs konstruktori',
        description: uzFallback,
      },
      chart: {
        label: 'Chuqur analitika va kengaytirilgan hisobotlar',
        description: uzFallback,
      },
      repeat: {
        label: "Qayta o'qish jarayonlarini avtomatlashtirish",
        description: uzFallback,
      },
      magic: {
        label: 'AI yordamida baholash, tekshirish va kontent yaratish',
        description: uzFallback,
      },
      schedule: {
        label: 'Moslashuvchan va dinamik dars jadvali',
        description: uzFallback,
      },
      dashboard: {
        label: "Talabalar uchun zamonaviy o'quv platformasi",
        description: uzFallback,
      },
      exam: {
        label: 'Nazorat va imtihonlarni moslashuvchan boshqarish',
        description: uzFallback,
      },
      feedback: {
        label: "So'rovnomalar va fikr-mulohazalarni yig'ish",
        description: uzFallback,
      },
      messages: {
        label: "Talabalar va o'qituvchilar uchun yagona chat",
        description: uzFallback,
      },
      history: {
        label: 'Har bir harakatni qayd etuvchi audit loglar',
        description: uzFallback,
      },
      money: {
        label: "Kontrakt va to'lovlarni nazorat qilish",
        description: uzFallback,
      },
      bell: {
        label: 'Aqlli va maqsadli bildirishnomalar',
        description: uzFallback,
      },
      'time-add': {
        label: "Kunduzgi, masofaviy va sirtqi ta'limni birlashtirish",
        description: uzFallback,
      },
    },
    defaultBody: [
      "Platforma Zoom, Telegram, YouTube, Google Workspace, Gemini, Antiplagiat.uz va boshqa yetakchi xizmatlar bilan integratsiyalashgan bo'lib, ta'lim, muloqot va boshqaruv jarayonlarini yagona raqamli ekotizimda birlashtiradi. Bu esa ma'lumot almashinuvini soddalashtiradi, ish jarayonlarini avtomatlashtiradi va foydalanuvchilarga tanish vositalar bilan samarali ishlash imkonini beradi.",
      "Keng ko'lamli integratsiyalar yordamida platforma mavjud ta'lim tizimlari, kommunikatsiya vositalari va sun'iy intellekt xizmatlari bilan uzluksiz ishlaydi. Bu ma'lumotlarni qo'lda ko'chirish zaruratini kamaytiradi, jarayonlarni tezlashtiradi va barcha muhim xizmatlarni yagona boshqaruv muhitida birlashtiradi.",
      "Ta'lim jarayonlarini yanada samarali boshqarish uchun platforma mashhur ta'lim, kommunikatsiya va AI xizmatlari bilan chuqur integratsiyalashgan. Natijada barcha vositalar yagona ekotizimda ishlaydi, ma'lumotlar avtomatik almashiladi va foydalanuvchilar uchun uzluksiz raqamli tajriba yaratiladi.",
      "Kengaytirilgan integratsiya imkoniyatlari platformani mavjud infratuzilmangizning ajralmas qismiga aylantiradi. Video konferensiyalar, messenjerlar, sun'iy intellekt xizmatlari va tashqi tizimlar bilan ishlash orqali barcha jarayonlar yagona boshqaruv markazida jamlanadi.",
    ],
    detail: {
      breadcrumb: 'Asosiy',
      sidebar: 'Imkoniyatlar',
      prev: 'Oldingi',
      next: 'Keyingi',
      videoBrand: 'LMS.UZ — BOSHQARUV',
      videoTitlePre: 'Imtihon',
      videoTitleHighlight: 'proctoringi',
      videoCaption: "Onlayn imtihonlarni kuzating — ishonchlilik to'liq nazoratda.",
      pause: 'Pauza',
      play: "O'ynatish",
      mute: 'Ovozsiz',
      fullscreen: "To'liq ekran",
    },
  },
  ru: {
    titlePre: 'Одна платформа,',
    titleHighlight: '20+',
    titlePost: 'мощных возможностей',
    items: {
      'face-id': {
        label: 'Безопасные экзамены с контролем Face ID и ИИ',
        description: ruProctoring,
      },
      features: {
        label: 'Платформа, прошедшая проверку кибербезопасности',
        description: ruFallback,
      },
      sync: {
        label: 'Синхронизация с HEMIS в режиме реального времени',
        description: ruFallback,
      },
      hemis: {
        label: 'Автоматическая передача оценок в систему HEMIS',
        description: ruFallback,
      },
      ai: {
        label: 'Интеграция с популярными образовательными и ИИ-сервисами',
        description: ruProctoring,
      },
      mobile: {
        label: 'Мобильное приложение со всеми возможностями',
        description: ruFallback,
      },
      calendar: {
        label: 'Умная посещаемость через QR-код и Face ID',
        description: ruFallback,
      },
      globe: {
        label: 'Конструктор курсов по мировым стандартам',
        description: ruFallback,
      },
      chart: {
        label: 'Глубокая аналитика и расширенные отчёты',
        description: ruFallback,
      },
      repeat: {
        label: 'Автоматизация процессов пересдачи',
        description: ruFallback,
      },
      magic: {
        label: 'Оценивание, проверка и создание контента с помощью ИИ',
        description: ruFallback,
      },
      schedule: {
        label: 'Гибкое и динамичное расписание занятий',
        description: ruFallback,
      },
      dashboard: {
        label: 'Современная учебная платформа для студентов',
        description: ruFallback,
      },
      exam: {
        label: 'Гибкое управление контролем и экзаменами',
        description: ruFallback,
      },
      feedback: {
        label: 'Сбор опросов и отзывов',
        description: ruFallback,
      },
      messages: {
        label: 'Единый чат для студентов и преподавателей',
        description: ruFallback,
      },
      history: {
        label: 'Журналы аудита, фиксирующие каждое действие',
        description: ruFallback,
      },
      money: {
        label: 'Контроль контрактов и платежей',
        description: ruFallback,
      },
      bell: {
        label: 'Умные и целевые уведомления',
        description: ruFallback,
      },
      'time-add': {
        label: 'Объединение очного, дистанционного и заочного обучения',
        description: ruFallback,
      },
    },
    defaultBody: [
      'Платформа интегрирована с Zoom, Telegram, YouTube, Google Workspace, Gemini, Antiplagiat.uz и другими ведущими сервисами, объединяя процессы обучения, общения и управления в единую цифровую экосистему. Это упрощает обмен данными, автоматизирует рабочие процессы и позволяет пользователям эффективно работать со знакомыми инструментами.',
      'Благодаря масштабным интеграциям платформа бесперебойно работает с существующими образовательными системами, средствами коммуникации и сервисами искусственного интеллекта. Это снижает необходимость ручного переноса данных, ускоряет процессы и объединяет все важные сервисы в единой среде управления.',
      'Для более эффективного управления образовательными процессами платформа глубоко интегрирована с популярными образовательными, коммуникационными и ИИ-сервисами. В результате все инструменты работают в единой экосистеме, данные обмениваются автоматически, а для пользователей создаётся бесшовный цифровой опыт.',
      'Расширенные возможности интеграции делают платформу неотъемлемой частью вашей существующей инфраструктуры. Благодаря работе с видеоконференциями, мессенджерами, сервисами искусственного интеллекта и внешними системами все процессы собираются в едином центре управления.',
    ],
    detail: {
      breadcrumb: 'Главная',
      sidebar: 'Возможности',
      prev: 'Предыдущий',
      next: 'Следующий',
      videoBrand: 'LMS.UZ — УПРАВЛЕНИЕ',
      videoTitlePre: 'Прокторинг',
      videoTitleHighlight: 'экзаменов',
      videoCaption: 'Наблюдайте за онлайн-экзаменами — надёжность под полным контролем.',
      pause: 'Пауза',
      play: 'Воспроизвести',
      mute: 'Без звука',
      fullscreen: 'Полный экран',
    },
  },
  en: {
    titlePre: 'One platform,',
    titleHighlight: '20+',
    titlePost: 'powerful features',
    items: {
      'face-id': {
        label: 'Secure exams with Face ID and AI monitoring',
        description: enProctoring,
      },
      features: {
        label: 'A platform that passed cybersecurity review',
        description: enFallback,
      },
      sync: {
        label: 'Real-time synchronization with HEMIS',
        description: enFallback,
      },
      hemis: {
        label: 'Automatic grade transfer to the HEMIS system',
        description: enFallback,
      },
      ai: {
        label: 'Integration with popular education and AI services',
        description: enProctoring,
      },
      mobile: {
        label: 'A mobile app with all features',
        description: enFallback,
      },
      calendar: {
        label: 'Smart attendance via QR code and Face ID',
        description: enFallback,
      },
      globe: {
        label: 'A course builder aligned with global standards',
        description: enFallback,
      },
      chart: {
        label: 'Deep analytics and advanced reports',
        description: enFallback,
      },
      repeat: {
        label: 'Automation of retake processes',
        description: enFallback,
      },
      magic: {
        label: 'AI-assisted grading, checking and content creation',
        description: enFallback,
      },
      schedule: {
        label: 'A flexible and dynamic class schedule',
        description: enFallback,
      },
      dashboard: {
        label: 'A modern learning platform for students',
        description: enFallback,
      },
      exam: {
        label: 'Flexible management of assessments and exams',
        description: enFallback,
      },
      feedback: {
        label: 'Collecting surveys and feedback',
        description: enFallback,
      },
      messages: {
        label: 'A single chat for students and teachers',
        description: enFallback,
      },
      history: {
        label: 'Audit logs that record every action',
        description: enFallback,
      },
      money: {
        label: 'Control over contracts and payments',
        description: enFallback,
      },
      bell: {
        label: 'Smart and targeted notifications',
        description: enFallback,
      },
      'time-add': {
        label: 'Combining full-time, remote and part-time learning',
        description: enFallback,
      },
    },
    defaultBody: [
      'The platform is integrated with Zoom, Telegram, YouTube, Google Workspace, Gemini, Antiplagiat.uz and other leading services, uniting learning, communication and management processes in a single digital ecosystem. This simplifies data exchange, automates workflows and lets users work efficiently with familiar tools.',
      'Thanks to wide-ranging integrations, the platform works seamlessly with existing education systems, communication tools and artificial intelligence services. This reduces the need for manual data transfer, speeds up processes and brings all important services together in a single management environment.',
      'To manage educational processes even more efficiently, the platform is deeply integrated with popular education, communication and AI services. As a result, all tools work in a single ecosystem, data is exchanged automatically and a seamless digital experience is created for users.',
      'Advanced integration capabilities make the platform an integral part of your existing infrastructure. By working with video conferences, messengers, artificial intelligence services and external systems, all processes are gathered in a single management center.',
    ],
    detail: {
      breadcrumb: 'Home',
      sidebar: 'Features',
      prev: 'Previous',
      next: 'Next',
      videoBrand: 'LMS.UZ — MANAGEMENT',
      videoTitlePre: 'Exam',
      videoTitleHighlight: 'proctoring',
      videoCaption: 'Monitor online exams — reliability fully under control.',
      pause: 'Pause',
      play: 'Play',
      mute: 'Mute',
      fullscreen: 'Fullscreen',
    },
  },
}
