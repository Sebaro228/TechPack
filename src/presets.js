// Офіційні технологічні контрольні точки для футбольної форми за стандартами FIFA / UEFA / УПЛ
export const FOOTBALL_CONTROL_POINTS = {
  front: [
    {
      code: 'CP_CHEST_LEFT',
      name: 'Герб клубу / збірної',
      role: 'Ліва сторона грудей (над серцем гравця)',
      defaultX: 15.0,
      defaultY: 14.0,
      standardW: 7.5,
      standardH: 7.5,
      centerHorizontally: false,
      standardRule: 'UEFA Equipment Reg. Art. 38 (площа ≤ 100 см²)',
      defaultType: 'crest'
    },
    {
      code: 'CP_CHEST_RIGHT',
      name: 'Бренд екіпірування',
      role: 'Права сторона грудей (симетрично гербу)',
      defaultX: 35.0,
      defaultY: 14.0,
      standardW: 6.0,
      standardH: 3.5,
      centerHorizontally: false,
      standardRule: 'UEFA Equipment Reg. Art. 39 (площа ≤ 20 см²)',
      defaultType: 'brand'
    },
    {
      code: 'CP_CHEST_CENTER',
      name: 'Титульний спонсор',
      role: 'Центр грудей під лінією пройм',
      defaultX: 25.0,
      defaultY: 23.5,
      standardW: 26.0,
      standardH: 6.5,
      centerHorizontally: true,
      standardRule: 'UEFA Equipment Reg. Art. 41 (площа ≤ 200 см²)',
      defaultType: 'sponsor'
    },
    {
      code: 'CP_FRONT_NUMBER',
      name: 'Номер на грудях / Матчеві деталі',
      role: 'По центру грудей між гербом і брендом',
      defaultX: 25.0,
      defaultY: 14.0,
      standardW: 5.0,
      standardH: 5.0,
      centerHorizontally: true,
      standardRule: 'FIFA Equipment Reg. (висота 3–5 см)',
      defaultType: 'front_number'
    },
    {
      code: 'CP_AUTHENTIC_LABEL',
      name: 'Ярлик автентичності форми',
      role: 'Правий нижній край (3–5 см від лінії підгину)',
      defaultX: 42.0,
      defaultY: 65.0,
      standardW: 4.0,
      standardH: 2.2,
      centerHorizontally: false,
      standardRule: 'Official Authentics Hologram / Dri-FIT',
      defaultType: 'authentic_label'
    },
    {
      code: 'CP_COLLAR_MOTTO',
      name: 'Девіз на горловині',
      role: 'Внутрішній/зовнішній комірець по центру',
      defaultX: 25.0,
      defaultY: 4.5,
      standardW: 7.0,
      standardH: 1.8,
      centerHorizontally: true,
      standardRule: 'Collar Pride Slogan (висота ≤ 2 см)',
      defaultType: 'collar_motto'
    }
  ],
  back: [
    {
      code: 'CP_BACK_FLAG',
      name: 'Символ / Прапор на потилиці',
      role: 'Під комірцем спинки суворо по осі',
      defaultX: 25.0,
      defaultY: 4.5,
      standardW: 4.0,
      standardH: 2.5,
      centerHorizontally: true,
      standardRule: 'UEFA Club Initials / National Flag (площа ≤ 10 см²)',
      defaultType: 'back_flag'
    },
    {
      code: 'CP_NAME_LINE',
      name: 'Прізвище гравця',
      role: 'Верх спинки по осі симетрії',
      defaultX: 25.0,
      defaultY: 11.5,
      standardW: 28.0,
      standardH: 5.0,
      centerHorizontally: true,
      standardRule: 'UEFA Equipment Reg. Art. 56 (висота літер 5–7.5 см)',
      defaultType: 'name'
    },
    {
      code: 'CP_NUMBER_CENTER',
      name: 'Ігровий номер гравця',
      role: 'Геометричний центр спинки',
      defaultX: 25.0,
      defaultY: 26.0,
      standardW: 18.0,
      standardH: 24.0,
      centerHorizontally: true,
      standardRule: 'UEFA Equipment Reg. Art. 55 (висота 22–26 см)',
      defaultType: 'number'
    },
    {
      code: 'CP_BACK_SPONSOR',
      name: 'Нижній спонсор спинки',
      role: 'Низ спинки під номером по осі',
      defaultX: 25.0,
      defaultY: 53.0,
      standardW: 22.0,
      standardH: 5.5,
      centerHorizontally: true,
      standardRule: 'Domestic League Standards (площа ≤ 100 см²)',
      defaultType: 'sponsor'
    }
  ],
  sleeve: [
    {
      code: 'CP_SLEEVE_TOURNAMENT',
      name: 'Шеврон турніру / Ліги',
      role: 'Окат рукава (8–10 см від шва)',
      defaultX: 18.0,
      defaultY: 9.0,
      standardW: 7.5,
      standardH: 8.0,
      centerHorizontally: true,
      standardRule: 'UEFA Competition Patch (площа ≤ 100 см²)',
      defaultType: 'patch'
    },
    {
      code: 'CP_SLEEVE_SPONSOR',
      name: 'Спонсор рукава / Шеврон Respect',
      role: 'Нижня зона рукава',
      defaultX: 18.0,
      defaultY: 16.5,
      standardW: 8.0,
      standardH: 5.0,
      centerHorizontally: true,
      standardRule: 'Sleeve Sponsor / Foundation (площа ≤ 100 см²)',
      defaultType: 'sleeve_sponsor'
    }
  ]
};

// Реперні точки лекал
export const REFERENCE_POINTS = {
  front: [
    { code: 'NECK_CENTER', name: 'Яремна западина (Верх горловини)', x: 25.0, y: 3.0 },
    { code: 'CHEST_LEFT', name: 'Зона серця (Герб клубу)', x: 15.0, y: 14.0 },
    { code: 'CHEST_RIGHT', name: 'Права сторона грудей (Бренд)', x: 35.0, y: 14.0 },
    { code: 'CHEST_CENTER', name: 'Центр грудей (Титульний спонсор)', x: 25.0, y: 23.5 },
    { code: 'ARMPIT_LEFT', name: 'Нижня точка лівої пройми', x: 4.0, y: 24.0 },
    { code: 'ARMPIT_RIGHT', name: 'Нижня точка правої пройми', x: 46.0, y: 24.0 },
    { code: 'BOTTOM_CENTER', name: 'Середина низу (Лінія підгину)', x: 25.0, y: 70.0 },
  ],
  back: [
    { code: 'BACK_NECK_CENTER', name: 'Горловина спинки', x: 25.0, y: 2.0 },
    { code: 'NAME_LINE', name: 'Лінія прізвища гравця', x: 25.0, y: 11.5 },
    { code: 'NUMBER_CENTER', name: 'Центр номера гравця', x: 25.0, y: 26.0 },
    { code: 'BACK_SPONSOR', name: 'Нижній спонсор спинки', x: 25.0, y: 53.0 },
    { code: 'BOTTOM_CENTER', name: 'Середина низу спинки', x: 25.0, y: 72.0 },
  ],
  sleeve: [
    { code: 'SLEEVE_TOP', name: 'Верхня точка окату рукава', x: 18.0, y: 0.0 },
    { code: 'SLEEVE_PATCH', name: 'Зона шеврона турніру', x: 18.0, y: 9.0 },
    { code: 'SLEEVE_BOTTOM', name: 'Низ рукава (Манжет)', x: 18.0, y: 24.0 },
  ]
};

// Бібліотека окремих реальних футбольних логотипів
export const PRESET_LOGOS = [
  // 1. Герби
  {
    id: 'crest_ukraine',
    name: 'Герб Тризуб (Збірна України)',
    type: 'crest',
    category: 'Герби',
    width: 7.5,
    height: 7.5,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 4 C75 4 92 18 92 48 C92 78 50 96 50 96 C50 96 8 78 8 48 C8 18 25 4 50 4 Z" fill="#0057b7" stroke="#ffd700" stroke-width="3"/>
      <path d="M50 16 L50 78 M42 28 L42 66 M58 28 L58 66 M34 40 C34 60 42 70 50 78 C58 70 66 60 66 40" fill="none" stroke="#ffd700" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M42 28 C42 22 50 20 50 20 C50 20 58 22 58 28" fill="none" stroke="#ffd700" stroke-width="4.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'crest_dynamo',
    name: 'ФК Динамо Київ',
    type: 'crest',
    category: 'Герби',
    width: 7.5,
    height: 8.5,
    svg: `<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,15 88,58 50,102 12,58" fill="#ffffff" stroke="#1d4ed8" stroke-width="5"/>
      <polygon points="50,22 81,58 50,95 19,58" fill="#1e40af"/>
      <text x="50" y="74" font-family="'Times New Roman', serif" font-weight="bold" font-style="italic" font-size="52" fill="#ffffff" text-anchor="middle">Д</text>
      <polygon points="43,6 46,12 52,12 47,15 49,21 44,17 39,21 41,15 36,12 42,12" fill="#facc15"/>
      <polygon points="57,6 60,12 66,12 61,15 63,21 58,17 53,21 55,15 50,12 56,12" fill="#facc15"/>
    </svg>`
  },
  {
    id: 'crest_shakhtar',
    name: 'ФК Шахтар',
    type: 'crest',
    category: 'Герби',
    width: 7.5,
    height: 7.5,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#ea580c" stroke="#000000" stroke-width="4"/>
      <path d="M12 50 A38 38 0 0 0 88 50 Z" fill="#000000"/>
      <path d="M40 26 L60 26 L55 58 L45 58 Z" fill="#ffffff"/>
      <polygon points="36,44 48,34 52,38 40,48" fill="#ffd700"/>
      <polygon points="64,44 52,34 48,38 60,48" fill="#ffd700"/>
      <text x="50" y="76" font-family="'Impact', sans-serif" font-weight="bold" font-size="16" fill="#ea580c" text-anchor="middle">ШАХТАР</text>
    </svg>`
  },

  // 2. Бренди
  {
    id: 'brand_nike',
    name: 'Nike Swoosh',
    type: 'brand',
    category: 'Бренди',
    width: 6.0,
    height: 2.5,
    svg: `<svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 24 C28 32 46 33 62 25 C78 18 92 4 96 2 C90 10 76 28 54 36 C34 43 14 36 6 27 C3 23 5 21 10 24 Z" fill="#0f172a"/>
    </svg>`
  },
  {
    id: 'brand_joma',
    name: 'Joma J',
    type: 'brand',
    category: 'Бренди',
    width: 5.5,
    height: 3.5,
    svg: `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 12 L45 12 C62 12 76 22 76 38 C76 46 70 54 60 56 L15 56 L30 40 L50 40 C55 40 58 37 58 34 C58 29 54 26 48 26 L25 26 Z" fill="#0284c7"/>
    </svg>`
  },
  {
    id: 'brand_puma',
    name: 'Puma Cat',
    type: 'brand',
    category: 'Бренди',
    width: 6.0,
    height: 3.5,
    svg: `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
      <path d="M82 6 C76 8 72 13 69 19 C64 16 57 15 50 17 C42 19 36 25 32 32 C26 31 19 34 14 38 C9 43 7 51 6 58 C12 55 18 51 24 49 C30 48 37 50 43 47 C48 45 52 40 56 36 C61 40 68 41 74 38 C80 34 84 27 86 20 C90 17 93 11 94 6 C90 8 86 7 82 6 Z" fill="#0f172a"/>
    </svg>`
  },
  {
    id: 'brand_adidas',
    name: 'Adidas 3-Bars',
    type: 'brand',
    category: 'Бренди',
    width: 6.0,
    height: 3.8,
    svg: `<svg viewBox="0 0 100 65" xmlns="http://www.w3.org/2000/svg">
      <polygon points="12,58 28,58 48,32 32,32" fill="#0f172a"/>
      <polygon points="38,58 54,58 74,18 58,18" fill="#0f172a"/>
      <polygon points="64,58 80,58 100,4 84,4" fill="#0f172a"/>
    </svg>`
  },

  // 3. Спонсори
  {
    id: 'sponsor_ukraine',
    name: 'UKRAINE',
    type: 'sponsor',
    category: 'Спонсори',
    width: 26.0,
    height: 6.5,
    svg: `<svg viewBox="0 0 280 65" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="65" rx="6" fill="#0057b7"/>
      <text x="140" y="44" font-family="'Impact', 'Arial Black', sans-serif" font-size="34" letter-spacing="6" font-weight="bold" fill="#ffd700" text-anchor="middle">UKRAINE</text>
    </svg>`
  },
  {
    id: 'sponsor_favbet',
    name: 'FAVBET',
    type: 'sponsor',
    category: 'Спонсори',
    width: 26.0,
    height: 6.5,
    svg: `<svg viewBox="0 0 280 70" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="70" rx="8" fill="#e11d48"/>
      <text x="140" y="47" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="40" letter-spacing="4" fill="#ffffff" text-anchor="middle">FAVBET</text>
    </svg>`
  },
  {
    id: 'sponsor_fly_emirates',
    name: 'Fly Emirates',
    type: 'sponsor',
    category: 'Спонсори',
    width: 28.0,
    height: 7.5,
    svg: `<svg viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="80" rx="6" fill="#0f172a"/>
      <text x="150" y="38" font-family="'Arial', sans-serif" font-weight="900" font-size="28" letter-spacing="4" fill="#ffffff" text-anchor="middle">Fly</text>
      <text x="150" y="68" font-family="'Arial Black', sans-serif" font-weight="900" font-size="32" letter-spacing="6" fill="#e11d48" text-anchor="middle">Emirates</text>
    </svg>`
  },

  // 4. Номер на грудях
  {
    id: 'front_num_17',
    name: 'Номер на грудях №17',
    type: 'front_number',
    category: 'Деталі форми',
    width: 5.0,
    height: 5.0,
    svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <text x="30" y="48" font-family="'Arial Black', sans-serif" font-weight="900" font-size="46" fill="#ffd700" text-anchor="middle">17</text>
    </svg>`
  },
  {
    id: 'front_num_7',
    name: 'Номер на грудях №7',
    type: 'front_number',
    category: 'Деталі форми',
    width: 5.0,
    height: 5.0,
    svg: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <text x="30" y="48" font-family="'Arial Black', sans-serif" font-weight="900" font-size="46" fill="#1e40af" text-anchor="middle">7</text>
    </svg>`
  },

  // 5. Ярлик автентичності
  {
    id: 'auth_joma_official',
    name: 'Joma Official Kit',
    type: 'authentic_label',
    category: 'Деталі форми',
    width: 4.0,
    height: 2.2,
    svg: `<svg viewBox="0 0 80 44" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="44" rx="3" fill="#0f172a" stroke="#ffd700" stroke-width="2"/>
      <text x="40" y="18" font-family="'Arial Black', sans-serif" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">OFFICIAL</text>
      <text x="40" y="34" font-family="'Arial', sans-serif" font-size="8" fill="#ffd700" text-anchor="middle">★ AUTHENTIC ★</text>
    </svg>`
  },
  {
    id: 'auth_nb_official',
    name: 'NB Dry Official Tag',
    type: 'authentic_label',
    category: 'Деталі форми',
    width: 4.0,
    height: 2.2,
    svg: `<svg viewBox="0 0 80 44" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="44" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
      <text x="40" y="18" font-family="'Arial Black', sans-serif" font-size="10" font-weight="bold" fill="#38bdf8" text-anchor="middle">AUTHENTIC</text>
      <text x="40" y="33" font-family="'Arial', sans-serif" font-size="8" fill="#ffffff" text-anchor="middle">LICENSED 2026</text>
    </svg>`
  },

  // 6. Девіз горловини
  {
    id: 'motto_slava_ukraini',
    name: 'СЛАВА УКРАЇНІ!',
    type: 'collar_motto',
    category: 'Деталі форми',
    width: 7.0,
    height: 1.8,
    svg: `<svg viewBox="0 0 140 36" xmlns="http://www.w3.org/2000/svg">
      <rect width="140" height="36" rx="4" fill="#0057b7"/>
      <text x="70" y="24" font-family="'Arial Black', sans-serif" font-size="13" font-weight="bold" fill="#ffd700" text-anchor="middle">СЛАВА УКРАЇНІ!</text>
    </svg>`
  },
  {
    id: 'motto_fcdk',
    name: 'КИЇВ — ЦЕ МИ!',
    type: 'collar_motto',
    category: 'Деталі форми',
    width: 7.0,
    height: 1.8,
    svg: `<svg viewBox="0 0 140 36" xmlns="http://www.w3.org/2000/svg">
      <rect width="140" height="36" rx="4" fill="#1e40af"/>
      <text x="70" y="24" font-family="'Arial Black', sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">КИЇВ — ЦЕ МИ!</text>
    </svg>`
  },

  // 7. Потилиця: прапор або символ
  {
    id: 'flag_ukraine',
    name: 'Прапор України',
    type: 'back_flag',
    category: 'Спинка',
    width: 4.0,
    height: 2.5,
    svg: `<svg viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="25" fill="#0057b7"/>
      <rect y="25" width="80" height="25" fill="#ffd700"/>
      <rect width="80" height="50" fill="none" stroke="#cbd5e1" stroke-width="1"/>
    </svg>`
  },
  {
    id: 'flag_fcdk',
    name: 'Символ FCDK',
    type: 'back_flag',
    category: 'Спинка',
    width: 4.0,
    height: 2.5,
    svg: `<svg viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="50" rx="4" fill="#1e40af"/>
      <text x="40" y="32" font-family="'Arial Black', sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">FCDK</text>
    </svg>`
  },

  // 8. Нижній спонсор спинки
  {
    id: 'sponsor_back_unicef',
    name: 'UNICEF (Благодійний спонсор)',
    type: 'sponsor',
    category: 'Спинка',
    width: 22.0,
    height: 5.5,
    svg: `<svg viewBox="0 0 220 55" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="55" rx="6" fill="#0284c7"/>
      <text x="110" y="38" font-family="'Arial Black', sans-serif" font-weight="bold" font-size="28" fill="#ffffff" text-anchor="middle">unicef</text>
    </svg>`
  },
  {
    id: 'sponsor_back_favbet_fund',
    name: 'FAVBET Foundation',
    type: 'sponsor',
    category: 'Спинка',
    width: 22.0,
    height: 5.5,
    svg: `<svg viewBox="0 0 220 55" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="55" rx="6" fill="#e11d48"/>
      <text x="110" y="36" font-family="'Arial Black', sans-serif" font-weight="bold" font-size="20" fill="#ffffff" text-anchor="middle">FAVBET FOUNDATION</text>
    </svg>`
  },

  // 9. Шеврони рукава
  {
    id: 'patch_upl',
    name: 'Шеврон УПЛ (Премʼєр-ліга)',
    type: 'patch',
    category: 'Шеврони',
    width: 7.5,
    height: 8.0,
    svg: `<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 4 L90 24 L90 74 L50 106 L10 74 L10 24 Z" fill="#0f172a" stroke="#ffd700" stroke-width="4"/>
      <circle cx="50" cy="52" r="26" fill="#0284c7"/>
      <polygon points="50,34 54,44 64,44 56,50 59,60 50,54 41,60 44,50 36,44 46,44" fill="#ffd700"/>
      <text x="50" y="94" font-family="'Arial Black', sans-serif" font-weight="bold" font-size="14" fill="#ffffff" text-anchor="middle">УПЛ</text>
    </svg>`
  },
  {
    id: 'patch_ucl',
    name: 'Шеврон Champions League Starball',
    type: 'patch',
    category: 'Шеврони',
    width: 7.5,
    height: 7.5,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#0f172a" stroke="#38bdf8" stroke-width="4"/>
      <circle cx="50" cy="50" r="32" fill="none" stroke="#ffffff" stroke-width="3" stroke-dasharray="10,6"/>
      <polygon points="50,22 53,30 61,30 55,35 57,43 50,38 43,43 45,35 39,30 47,30" fill="#ffffff"/>
      <polygon points="32,46 35,54 43,54 37,59 39,67 32,62 25,67 27,59 21,54 29,54" fill="#ffffff"/>
      <polygon points="68,46 71,54 79,54 73,59 75,67 68,62 61,67 63,59 57,54 65,54" fill="#ffffff"/>
    </svg>`
  },
  {
    id: 'patch_respect',
    name: 'UEFA RESPECT Patch',
    type: 'sleeve_sponsor',
    category: 'Шеврони',
    width: 8.0,
    height: 4.5,
    svg: `<svg viewBox="0 0 100 55" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="55" rx="6" fill="#0057b7"/>
      <text x="50" y="35" font-family="'Arial Black', sans-serif" font-size="18" font-weight="900" fill="#ffffff" text-anchor="middle">RESPECT</text>
    </svg>`
  }
];

// Готові повнокомплектні шаблони футбольної форми (всі 3 сторони: Перед, Спинка, Рукав)
export const FOOTBALL_KIT_PRESETS = [
  {
    id: 'ukraine_national',
    title: 'Збірна України (Official Match Kit)',
    country: 'Україна',
    description: '12 обовʼязкових логотипів на трьох сторонах форми згідно регламенту UEFA/FIFA',
    slots: {
      // ПЕРЕД (6 елементів)
      crest: {
        id: 'crest_ukraine',
        name: 'Герб Тризуб України',
        type: 'crest',
        controlPointCode: 'CP_CHEST_LEFT',
        pieceType: 'front',
        svg: PRESET_LOGOS.find(p => p.id === 'crest_ukraine').svg
      },
      brand: {
        id: 'brand_joma',
        name: 'Бренд форми Joma',
        type: 'brand',
        controlPointCode: 'CP_CHEST_RIGHT',
        pieceType: 'front',
        svg: PRESET_LOGOS.find(p => p.id === 'brand_joma').svg
      },
      sponsor: {
        id: 'sponsor_ukraine',
        name: 'Напис UKRAINE',
        type: 'sponsor',
        controlPointCode: 'CP_CHEST_CENTER',
        pieceType: 'front',
        svg: PRESET_LOGOS.find(p => p.id === 'sponsor_ukraine').svg
      },
      frontNumber: {
        id: 'front_num_17',
        name: 'Номер на грудях №17',
        type: 'front_number',
        controlPointCode: 'CP_FRONT_NUMBER',
        pieceType: 'front',
        svg: PRESET_LOGOS.find(p => p.id === 'front_num_17').svg
      },
      authenticLabel: {
        id: 'auth_joma_official',
        name: 'Офіційний ярлик Joma Official',
        type: 'authentic_label',
        controlPointCode: 'CP_AUTHENTIC_LABEL',
        pieceType: 'front',
        svg: PRESET_LOGOS.find(p => p.id === 'auth_joma_official').svg
      },
      collarMotto: {
        id: 'motto_slava_ukraini',
        name: 'Девіз «СЛАВА УКРАЇНІ!»',
        type: 'collar_motto',
        controlPointCode: 'CP_COLLAR_MOTTO',
        pieceType: 'front',
        svg: PRESET_LOGOS.find(p => p.id === 'motto_slava_ukraini').svg
      },

      // СПИНКА (4 елементи)
      backFlag: {
        id: 'flag_ukraine',
        name: 'Прапор України на потилиці',
        type: 'back_flag',
        controlPointCode: 'CP_BACK_FLAG',
        pieceType: 'back',
        svg: PRESET_LOGOS.find(p => p.id === 'flag_ukraine').svg
      },
      playerName: {
        id: 'name_zinchenko',
        name: 'Прізвище ZINCHENKO',
        type: 'name',
        textContent: 'ZINCHENKO',
        controlPointCode: 'CP_NAME_LINE',
        pieceType: 'back',
        color: '#ffd700'
      },
      playerNumber: {
        id: 'num_17',
        name: 'Номер 17',
        type: 'number',
        textContent: '17',
        controlPointCode: 'CP_NUMBER_CENTER',
        pieceType: 'back',
        color: '#ffd700'
      },
      backSponsor: {
        id: 'sponsor_back_favbet_fund',
        name: 'Нижній спонсор FAVBET Foundation',
        type: 'sponsor',
        controlPointCode: 'CP_BACK_SPONSOR',
        pieceType: 'back',
        svg: PRESET_LOGOS.find(p => p.id === 'sponsor_back_favbet_fund').svg
      },

      // РУКАВ (2 елементи)
      sleevePatch: {
        id: 'patch_ucl',
        name: 'Шеврон турніру (Рукав)',
        type: 'patch',
        controlPointCode: 'CP_SLEEVE_TOURNAMENT',
        pieceType: 'sleeve',
        svg: PRESET_LOGOS.find(p => p.id === 'patch_ucl').svg
      },
      sleeveRespect: {
        id: 'patch_respect',
        name: 'Шеврон UEFA RESPECT',
        type: 'sleeve_sponsor',
        controlPointCode: 'CP_SLEEVE_SPONSOR',
        pieceType: 'sleeve',
        svg: PRESET_LOGOS.find(p => p.id === 'patch_respect').svg
      }
    }
  },
  {
    id: 'dynamo_kyiv',
    title: 'ФК Динамо Київ (УПЛ & Єврокубки)',
    country: 'Україна',
    description: 'Офіційний стандарт брендингу форми київського «Динамо»',
    slots: {
      // ПЕРЕД
      crest: {
        id: 'crest_dynamo',
        name: 'Герб Динамо Київ',
        type: 'crest',
        controlPointCode: 'CP_CHEST_LEFT',
        pieceType: 'front',
        svg: PRESET_LOGOS.find(p => p.id === 'crest_dynamo').svg
      },
      brand: {
        id: 'brand_nike',
        name: 'Бренд екіпірування',
        type: 'brand',
        controlPointCode: 'CP_CHEST_RIGHT',
        pieceType: 'front',
        svg: PRESET_LOGOS.find(p => p.id === 'brand_nike').svg
      },
      sponsor: {
        id: 'sponsor_favbet',
        name: 'Титульний спонсор FAVBET',
        type: 'sponsor',
        controlPointCode: 'CP_CHEST_CENTER',
        pieceType: 'front',
        svg: PRESET_LOGOS.find(p => p.id === 'sponsor_favbet').svg
      },
      frontNumber: {
        id: 'front_num_7',
        name: 'Номер на грудях №7',
        type: 'front_number',
        controlPointCode: 'CP_FRONT_NUMBER',
        pieceType: 'front',
        svg: PRESET_LOGOS.find(p => p.id === 'front_num_7').svg
      },
      authenticLabel: {
        id: 'auth_nb_official',
        name: 'Ярлик автентичності форми',
        type: 'authentic_label',
        controlPointCode: 'CP_AUTHENTIC_LABEL',
        pieceType: 'front',
        svg: PRESET_LOGOS.find(p => p.id === 'auth_nb_official').svg
      },
      collarMotto: {
        id: 'motto_fcdk',
        name: 'Девіз «КИЇВ — ЦЕ МИ!»',
        type: 'collar_motto',
        controlPointCode: 'CP_COLLAR_MOTTO',
        pieceType: 'front',
        svg: PRESET_LOGOS.find(p => p.id === 'motto_fcdk').svg
      },

      // СПИНКА
      backFlag: {
        id: 'flag_fcdk',
        name: 'Символ FCDK на потилиці',
        type: 'back_flag',
        controlPointCode: 'CP_BACK_FLAG',
        pieceType: 'back',
        svg: PRESET_LOGOS.find(p => p.id === 'flag_fcdk').svg
      },
      playerName: {
        id: 'name_yarmolenko',
        name: 'Прізвище YARMOLENKO',
        type: 'name',
        textContent: 'YARMOLENKO',
        controlPointCode: 'CP_NAME_LINE',
        pieceType: 'back',
        color: '#1e40af'
      },
      playerNumber: {
        id: 'num_7',
        name: 'Номер 7',
        type: 'number',
        textContent: '7',
        controlPointCode: 'CP_NUMBER_CENTER',
        pieceType: 'back',
        color: '#1e40af'
      },
      backSponsor: {
        id: 'sponsor_back_favbet_fund',
        name: 'Спонсор FAVBET Foundation',
        type: 'sponsor',
        controlPointCode: 'CP_BACK_SPONSOR',
        pieceType: 'back',
        svg: PRESET_LOGOS.find(p => p.id === 'sponsor_back_favbet_fund').svg
      },

      // РУКАВ
      sleevePatch: {
        id: 'patch_upl',
        name: 'Шеврон УПЛ (Рукав)',
        type: 'patch',
        controlPointCode: 'CP_SLEEVE_TOURNAMENT',
        pieceType: 'sleeve',
        svg: PRESET_LOGOS.find(p => p.id === 'patch_upl').svg
      },
      sleeveRespect: {
        id: 'patch_respect',
        name: 'Шеврон RESPECT',
        type: 'sleeve_sponsor',
        controlPointCode: 'CP_SLEEVE_SPONSOR',
        pieceType: 'sleeve',
        svg: PRESET_LOGOS.find(p => p.id === 'patch_respect').svg
      }
    }
  }
];

// Градація розмірного ряду (ТКШВ)
export const GRADING_RULES = [
  { size: 'CHILD (116)', scale: 0.70, neckOffsetBase: 7.0, desc: 'Дитячий зріст 116 см (відступ 7 см)' },
  { size: 'XS', scale: 0.85, neckOffsetBase: 8.5, desc: 'Підлітковий / Дуже малий' },
  { size: 'S', scale: 0.92, neckOffsetBase: 9.2, desc: 'Малий розмір' },
  { size: 'M', scale: 1.00, neckOffsetBase: 10.5, desc: 'Базовий лекальний розмір (50)' },
  { size: 'L', scale: 1.08, neckOffsetBase: 11.5, desc: 'Великий розмір' },
  { size: 'XL', scale: 1.16, neckOffsetBase: 12.5, desc: 'Дуже великий розмір' },
  { size: '2XL', scale: 1.25, neckOffsetBase: 13.5, desc: '2X Великий розмір' },
  { size: '3XL', scale: 1.40, neckOffsetBase: 14.5, desc: '3X Великий розмір (відступ 14 см)' }
];
