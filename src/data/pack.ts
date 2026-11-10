export interface PackOffer {
  name: string
  /** Transcribed from the price sheet image. */
  priceFrom: string
  delivery: string
  installation: string
}

export interface PackSize {
  id: string
  label: string
  theme: string
  /**
   * Presentation video. These are hotlinked from the legacy site and are
   * temporary: they should be self-hosted (e.g. under /public/videos) later.
   */
  videoSrc: string
  /** Price sheet image, used as the video poster. */
  priceImage: string
  offers: [PackOffer, PackOffer]
}

export const packStory = {
  before: [
    'Pierre était un investisseur immobilier contrarié. Il passait des jours entiers à chercher son mobilier et sa décoration dans les magasins et sur internet sans jamais trouver son bonheur. Tout était beaucoup trop cher ou mal organisé.',
    'Il passait également des jours entiers à attendre la réception de son mobilier, livré en plusieurs fois, l’obligeant à prendre des jours de congé.',
  ],
  after: [
    'Mais tout ça, c’était avant que son ami Henri l’informe qu’il utilise ADI pour les meubles et la décoration de son parc locatif.',
    'Il choisit un pack meubles et décoration selon le thème souhaité ou la typologie de l’appartement : du studio au 3 pièces. Des centaines de produits sont disponibles. Une fois son choix fait, il reçoit un devis. La livraison de tout le mobilier se fait en une à deux fois maximum, sur rendez-vous pris à l’avance.',
  ],
}

export const packBenefits = [
  'Choisir vos meubles et votre décoration en quelques minutes',
  'Deux livraisons maximum pour tout recevoir',
]

export const packGuarantee = 'Toutes ces prestations ne vous coûteront pas 1 € de plus !'

export const packSteps = [
  {
    title: 'Choisissez votre pack',
    text: 'Un thème et une typologie, du studio au 3 pièces, parmi des centaines de produits.',
  },
  {
    title: 'Recevez votre devis',
    text: 'Une fois votre choix fait, votre devis vous est adressé.',
  },
  {
    title: 'Livraison en 1 à 2 fois',
    text: 'Tout le mobilier arrive en une à deux fois maximum, sur rendez-vous pris à l’avance.',
  },
]

export const packFootnote = '*Selon le stock disponible ou équivalent.'

export const packSizes: PackSize[] = [
  {
    id: 'studio',
    label: 'Studio',
    theme: 'New York',
    videoSrc: 'https://www.adisociete.fr/wp-content/uploads/2024/03/STUDIO-New-York.mp4',
    priceImage: '/images/pack/prix-lmnp-1024x576.jpg',
    offers: [
      { name: 'Pack New York', priceFrom: '3 536 €', delivery: '250 €', installation: '800 €' },
      { name: 'Pack Nature', priceFrom: '3 600 €', delivery: '250 €', installation: '800 €' },
    ],
  },
  {
    id: '2-pieces',
    label: '2 pièces',
    theme: 'Éco Zen',
    videoSrc: 'https://www.adisociete.fr/wp-content/uploads/2024/03/2P-ECO-ZEN-1.mp4',
    priceImage: '/images/pack/prix-lmnp-02-1024x576.jpg',
    offers: [
      { name: 'Pack Eco Zen', priceFrom: '4 022 €', delivery: '250 €', installation: '800 €' },
      { name: 'Pack Éclat', priceFrom: '4 650 €', delivery: '250 €', installation: '800 €' },
    ],
  },
  {
    id: '3-pieces',
    label: '3 pièces',
    theme: 'Terre d’argile',
    videoSrc: 'https://www.adisociete.fr/wp-content/uploads/2024/03/3P-TERRE-DARGILE-1.mp4',
    priceImage: '/images/pack/prix-lmnp-03-1024x576.jpg',
    offers: [
      { name: 'Pack Terre d’argile', priceFrom: '5 016 €', delivery: '300 €', installation: '950 €' },
      { name: 'Pack Ethnique', priceFrom: '6 600 €', delivery: '300 €', installation: '950 €' },
    ],
  },
]
