export const TABLE_HEAD = [
  {
    primaryLabel: 'ФОП',
    secondaryLabel: null,

    sortBy: 'isFop',
  },
  {
    primaryLabel: 'ДРФО',
    secondaryLabel: null,

    sortBy: null,
  },
  {
    primaryLabel: 'ПІБ',
    secondaryLabel: 'Код 1С',
    sortBy: 'name',
  },
  {
    primaryLabel: 'Посада HR',
    secondaryLabel: 'Посада бух.',
    sortBy: 'position',
  },
  {
    primaryLabel: 'Работодавець',
    secondaryLabel: null,
    sortBy: null,
  },
  {
    primaryLabel: 'Магазин',
    secondaryLabel: 'Магазин бух.',
    sortBy: null,
  },
  {
    primaryLabel: 'Телефон',
    secondaryLabel: null,
    sortBy: null,
  },
  {
    primaryLabel: null,
    secondaryLabel: null,
    sortBy: null,
  },
] as const;
