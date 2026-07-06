const base = import.meta.env.BASE_URL

export const asset = (p) => `${base}assets/${p}`

export const FLAVORS = [
  {
    id: 'strawberry',
    name: 'Strawberry',
    word: 'STRAWBERRY',
    num: '01',
    color: '#ff2440',
    glow: 'rgba(255,36,64,0.35)',
    dark: '#3a0a12',
    desc: 'Crushed strawberry with a razor-sharp energy core. Sweet, loud, relentless.',
    img: asset('can-strawberry.webp'),
    imgSm: asset('can-strawberry-sm.webp'),
  },
  {
    id: 'lime',
    name: 'Lime',
    word: 'LIME',
    num: '02',
    color: '#9bd60a',
    glow: 'rgba(155,214,10,0.30)',
    dark: '#1c2a05',
    desc: 'Cold-pressed lime and a bite of citric acid. Sharp enough to wake the dead.',
    img: asset('can-lime.webp'),
    imgSm: asset('can-lime-sm.webp'),
  },
  {
    id: 'mango',
    name: 'Mango',
    word: 'MANGO',
    num: '03',
    color: '#ff9d00',
    glow: 'rgba(255,157,0,0.32)',
    dark: '#3a2403',
    desc: 'Sun-ripened mango with a slow warm finish. Golden hour in a can.',
    img: asset('can-mango.webp'),
    imgSm: asset('can-mango-sm.webp'),
  },
  {
    id: 'blueberry',
    name: 'Blueberry',
    word: 'BLUEBERRY',
    num: '04',
    color: '#8b45ff',
    glow: 'rgba(139,69,255,0.35)',
    dark: '#22103f',
    desc: 'Deep-frozen blueberry, loaded with voltage. Pure midnight energy.',
    img: asset('can-blueberry.webp'),
    imgSm: asset('can-blueberry-sm.webp'),
  },
]
