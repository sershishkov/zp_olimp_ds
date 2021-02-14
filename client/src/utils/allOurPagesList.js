export const landingLinksList = [
  {
    name__MenuLink: 'Асфальтные работы',
    linkToPage: '/asfalt',
  },
  {
    name__MenuLink: 'Электро работы',
    linkToPage: '/electro',
  },
  {
    name__MenuLink: 'Цоколь и ливневки',
    linkToPage: '/ground-floor-storm-water',
  },
  {
    name__MenuLink: 'Высотные работы',
    linkToPage: '/high-altitude-work',
  },
  {
    name__MenuLink: 'Сантехнические работы',
    linkToPage: '/plumbing-work',
  },
  {
    name__MenuLink: 'Крыльцо и Козырьки',
    linkToPage: '/porch-and-visors',
  },
  {
    name__MenuLink: 'Ремонт подъездов',
    linkToPage: '/repair-of-entrance',
  },
  {
    name__MenuLink: 'Кровельные работы',
    linkToPage: '/roofing-work',
  },
  {
    name__MenuLink: 'Металлоконструкции',
    linkToPage: '/steel-structures',
  },
  {
    name__MenuLink: 'Окна Двери Пластиковые',
    linkToPage: '/windows-door-plastic',
  },
];

export const roles = [
  'user',
  'worker',
  'client',
  'partner',
  'seller',
  'engineer',
  'accountant',
  'manager',
  'boss',
  'admin',
];

export const adminLinks = [
  {
    name__MenuLink: 'Пользователи',
    linkToPage: '/user-admin',
    allowedRoles: ['admin'],
  },
];

export const accountantLinks = [
  {
    groupName: 'Поступления',
    links: [],
  },
  {
    groupName: 'Реализация',
    links: [],
  },
  {
    groupName: 'Расходы',
    links: [
      {
        name__MenuLink: 'Расходы',
        linkToPage: '/accountant/expenses/expense',
        allowedRoles: ['accountant', 'boss', 'admin'],
      },
    ],
  },
  {
    groupName: 'Платежи',
    links: [],
  },
  {
    groupName: 'Приходы (банк)',
    links: [],
  },
  {
    groupName: 'Отчеты',
    links: [],
  },
  {
    groupName: 'Справочники',

    links: [
      {
        name__MenuLink: 'Работы',
        linkToPage: '/reference-data/service-job',
        allowedRoles: [
          'seller',
          'engineer',
          'accountant',
          'manager',
          'boss',
          'admin',
        ],
      },

      {
        name__MenuLink: 'Группы работ',
        linkToPage: '/reference-data/group-service-job',
        allowedRoles: [
          'seller',
          'engineer',
          'accountant',
          'manager',
          'boss',
          'admin',
        ],
      },

      {
        name__MenuLink: 'Товары',
        linkToPage: '/reference-data/product',
        allowedRoles: [
          'seller',
          'engineer',
          'accountant',
          'manager',
          'boss',
          'admin',
        ],
      },
      {
        name__MenuLink: 'Группы товаров',
        linkToPage: '/reference-data/group-product',
        allowedRoles: [
          'seller',
          'engineer',
          'accountant',
          'manager',
          'boss',
          'admin',
        ],
      },

      {
        name__MenuLink: 'Работники',
        linkToPage: '/reference-data/worker',
        allowedRoles: ['engineer', 'accountant', 'manager', 'boss', 'admin'],
      },

      {
        name__MenuLink: 'Единицы измерения',
        linkToPage: '/reference-data/unit',
        allowedRoles: [
          'seller',
          'engineer',
          'accountant',
          'manager',
          'boss',
          'admin',
        ],
      },

      {
        name__MenuLink: 'Формы собственности',
        linkToPage: '/reference-data/type-firm',
        allowedRoles: [
          'seller',
          'engineer',
          'accountant',
          'manager',
          'boss',
          'admin',
        ],
      },

      {
        name__MenuLink: 'Фирмы',
        linkToPage: '/reference-data/firm',
        allowedRoles: [
          'seller',
          'engineer',
          'accountant',
          'manager',
          'boss',
          'admin',
        ],
      },

      {
        name__MenuLink: 'Группы расходов',
        linkToPage: '/reference-data/group-expense',
        allowedRoles: [
          'seller',
          'engineer',
          'accountant',
          'manager',
          'boss',
          'admin',
        ],
      },
    ],
  },
];

export const whoIsThisFirm = ['наша фирма', 'клиент', 'поставщик', 'партнер'];
