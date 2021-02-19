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

export const accountantLinks = {
  allowedRoles: [
    'seller',
    'engineer',
    'accountant',
    'manager',
    'boss',
    'admin',
  ],
  groupLinks: [
    {
      groupName: 'Поступления',
      allowedRoles: ['accountant', 'boss', 'admin'],
      links: [],
    },
    {
      groupName: 'Реализация',
      allowedRoles: ['accountant', 'boss', 'admin'],
      links: [],
    },
    {
      groupName: 'Расходы',
      allowedRoles: ['accountant', 'boss', 'admin'],
      links: [
        {
          name__MenuLink: 'Расходы',
          linkToPage: '/accountant/expenses/expense',
        },
      ],
    },
    {
      groupName: 'Платежи',
      allowedRoles: ['accountant', 'boss', 'admin'],
      links: [],
    },
    {
      groupName: 'Приходы (банк)',
      allowedRoles: ['accountant', 'boss', 'admin'],
      links: [],
    },
    {
      groupName: 'Отчеты',
      allowedRoles: ['accountant', 'boss', 'admin'],
      links: [],
    },
    {
      groupName: 'Справочники',
      allowedRoles: [
        'seller',
        'engineer',
        'accountant',
        'manager',
        'boss',
        'admin',
      ],

      links: [
        {
          name__MenuLink: 'Работы',
          linkToPage: '/reference-data/service-job',
        },

        {
          name__MenuLink: 'Группы работ',
          linkToPage: '/reference-data/group-service-job',
        },

        {
          name__MenuLink: 'Товары',
          linkToPage: '/reference-data/product',
        },
        {
          name__MenuLink: 'Группы товаров',
          linkToPage: '/reference-data/group-product',
        },

        {
          name__MenuLink: 'Работники',
          linkToPage: '/reference-data/worker',
        },

        {
          name__MenuLink: 'Единицы измерения',
          linkToPage: '/reference-data/unit',
        },

        {
          name__MenuLink: 'Формы собственности',
          linkToPage: '/reference-data/type-firm',
        },

        {
          name__MenuLink: 'Фирмы',
          linkToPage: '/reference-data/firm',
        },

        {
          name__MenuLink: 'Группы расходов',
          linkToPage: '/reference-data/group-expense',
        },
      ],
    },
  ],
};

export const whoIsThisFirm = ['наша фирма', 'клиент', 'поставщик', 'партнер'];
