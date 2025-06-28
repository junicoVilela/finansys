export interface IconCategory {
  name: string;
  label: string;
  icons: string[];
}

export const ICON_CATEGORIES: IconCategory[] = [
  {
    name: 'finance',
    label: 'Financeiro',
    icons: [
      'bi-graph-up', 'bi-bank', 'bi-wallet2', 'bi-piggy-bank',
      'bi-currency-dollar', 'bi-currency-euro', 'bi-currency-exchange',
      'bi-credit-card', 'bi-cash-coin', 'bi-cart', 'bi-cart-check',
      'bi-cart-dash', 'bi-cart-plus', 'bi-cart-x', 'bi-shop',
      'bi-basket', 'bi-basket2', 'bi-basket3'
    ]
  },
  {
    name: 'home',
    label: 'Casa',
    icons: [
      'bi-house', 'bi-house-door', 'bi-house-fill', 'bi-house-gear',
      'bi-house-heart', 'bi-house-heart-fill', 'bi-house-lock',
      'bi-house-lock-fill', 'bi-building', 'bi-building-fill'
    ]
  },
  {
    name: 'food',
    label: 'Alimentação',
    icons: [
      'bi-cup-hot', 'bi-cup-straw', 'bi-cup', 'bi-cup-fill',
      'bi-basket', 'bi-basket-fill', 'bi-shop', 'bi-shop-window'
    ]
  },
  {
    name: 'transport',
    label: 'Transporte',
    icons: [
      'bi-car-front', 'bi-car-front-fill', 'bi-bus-front', 'bi-bus-front-fill',
      'bi-train-front', 'bi-train-front-fill', 'bi-airplane', 'bi-airplane-engines',
      'bi-bicycle', 'bi-motorcycle', 'bi-truck', 'bi-truck-flatbed'
    ]
  },
  {
    name: 'health',
    label: 'Saúde',
    icons: [
      'bi-heart-pulse', 'bi-heart', 'bi-heart-fill', 'bi-heart-half',
      'bi-heart-pulse-fill', 'bi-thermometer-half', 'bi-thermometer-high',
      'bi-thermometer-low', 'bi-droplet', 'bi-droplet-half', 'bi-droplet-fill'
    ]
  },
  {
    name: 'education',
    label: 'Educação',
    icons: [
      'bi-mortarboard', 'bi-mortarboard-fill', 'bi-book', 'bi-book-fill',
      'bi-journal-text', 'bi-journal-text', 'bi-newspaper', 'bi-magazine',
      'bi-pencil', 'bi-pencil-fill', 'bi-pen', 'bi-pen-fill'
    ]
  },
  {
    name: 'entertainment',
    label: 'Entretenimento',
    icons: [
      'bi-film', 'bi-camera', 'bi-camera-video', 'bi-camera-fill',
      'bi-music-note', 'bi-music-note-beamed', 'bi-headphones', 'bi-speaker',
      'bi-tv', 'bi-tv-fill', 'bi-controller', 'bi-controller-fill'
    ]
  },
  {
    name: 'clothing',
    label: 'Vestuário',
    icons: [
      'bi-bag', 'bi-bag-fill', 'bi-bag-check', 'bi-bag-check-fill',
      'bi-bag-dash', 'bi-bag-dash-fill', 'bi-bag-plus', 'bi-bag-plus-fill',
      'bi-bag-x', 'bi-bag-x-fill', 'bi-shop', 'bi-shop-window'
    ]
  },
  {
    name: 'gifts',
    label: 'Presentes',
    icons: [
      'bi-gift', 'bi-gift-fill', 'bi-award', 'bi-award-fill',
      'bi-trophy', 'bi-trophy-fill', 'bi-patch-check', 'bi-patch-check-fill',
      'bi-patch-exclamation', 'bi-patch-exclamation-fill', 'bi-star',
      'bi-star-fill', 'bi-star-half'
    ]
  },
  {
    name: 'technology',
    label: 'Tecnologia',
    icons: [
      'bi-laptop', 'bi-laptop-fill', 'bi-phone', 'bi-phone-fill',
      'bi-tablet', 'bi-tablet-fill', 'bi-gear', 'bi-gear-fill',
      'bi-gear-wide-connected', 'bi-tools', 'bi-wrench', 'bi-wrench-adjustable'
    ]
  },
  {
    name: 'time',
    label: 'Tempo',
    icons: [
      'bi-clock', 'bi-clock-fill', 'bi-clock-history', 'bi-alarm',
      'bi-alarm-fill', 'bi-stopwatch', 'bi-stopwatch-fill', 'bi-calendar-event',
      'bi-calendar-check', 'bi-calendar-x', 'bi-calendar-plus', 'bi-calendar-minus'
    ]
  },
  {
    name: 'nature',
    label: 'Natureza',
    icons: [
      'bi-sun', 'bi-sun-fill', 'bi-moon', 'bi-moon-fill',
      'bi-cloud', 'bi-cloud-fill', 'bi-cloud-rain', 'bi-cloud-rain-fill',
      'bi-cloud-snow', 'bi-cloud-snow-fill', 'bi-wind', 'bi-lightning',
      'bi-lightning-charge', 'bi-lightning-fill'
    ]
  },
  {
    name: 'people',
    label: 'Pessoas',
    icons: [
      'bi-person', 'bi-person-fill', 'bi-people', 'bi-people-fill',
      'bi-person-badge', 'bi-person-check', 'bi-person-dash',
      'bi-person-plus', 'bi-person-x', 'bi-person-workspace',
      'bi-person-gear', 'bi-person-heart'
    ]
  },
  {
    name: 'work',
    label: 'Trabalho',
    icons: [
      'bi-briefcase', 'bi-briefcase-fill', 'bi-building', 'bi-building-fill',
      'bi-person-workspace', 'bi-person-gear', 'bi-tools', 'bi-wrench',
      'bi-gear', 'bi-gear-wide-connected', 'bi-laptop', 'bi-phone'
    ]
  },
  {
    name: 'general',
    label: 'Geral',
    icons: [
      'bi-collection', 'bi-collection-fill', 'bi-grid', 'bi-grid-3x3-gap',
      'bi-grid-3x3-gap-fill', 'bi-list', 'bi-list-ul', 'bi-list-check',
      'bi-plus', 'bi-plus-circle', 'bi-plus-circle-fill', 'bi-dash',
      'bi-dash-circle', 'bi-dash-circle-fill', 'bi-x', 'bi-x-circle',
      'bi-x-circle-fill', 'bi-check', 'bi-check-circle', 'bi-check-circle-fill'
    ]
  }
];

// Lista completa de todos os ícones
export const ALL_ICONS: string[] = ICON_CATEGORIES.flatMap(category => category.icons);

// Ícones mais populares/importantes
export const POPULAR_ICONS: string[] = [
  'bi-house', 'bi-cup-hot', 'bi-car-front', 'bi-heart-pulse', 'bi-mortarboard',
  'bi-film', 'bi-bag', 'bi-graph-up', 'bi-bank', 'bi-gift', 'bi-collection',
  'bi-cart', 'bi-credit-card', 'bi-cash-coin', 'bi-wallet2', 'bi-piggy-bank',
  'bi-laptop', 'bi-phone', 'bi-gear', 'bi-clock', 'bi-calendar-event',
  'bi-person', 'bi-briefcase', 'bi-building', 'bi-shop', 'bi-basket'
];

// Ícone padrão
export const DEFAULT_ICON = 'bi-collection'; 