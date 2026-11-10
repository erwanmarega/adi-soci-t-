export interface Service {
  slug: string
  route: string
  title: string
  tagline: string
  image: string
  imageAlt: string
}

export interface Value {
  title: string
  text: string
}

export const site = {
  name: 'ADI',
  legalName: 'ADI Société',
  fullName: 'Agencement Décoration Immo',
  phoneDisplay: '01 84 81 11 35',
  phoneHref: 'tel:+33184811135',
  instagram: 'https://www.instagram.com/adisociete/',
  youtubeId: 'Sus2UPcUSHs',
} as const

export const services: Service[] = [
  {
    slug: 'bureau-de-vente',
    route: '/bureau-de-vente',
    title: 'Bureau de vente',
    tagline: 'Conception, aménagement et entretien de vos espaces de vente.',
    image: '/images/bureau/savana_studio_bv_icade_nanterre.jpg',
    imageAlt: 'Bureau de vente sur deux niveaux à l’ossature rouge et noire, enseigne « Espace de vente »',
  },
  {
    slug: 'logement-temoin',
    route: '/logement-temoin',
    title: 'Logement témoin',
    tagline: 'Une décoration qui permet à vos acquéreurs de se projeter.',
    image: '/images/temoin/20230313_112719.jpg',
    imageAlt: 'Salon d’un appartement témoin décoré, canapé, fauteuil et buffets en bois clair',
  },
  {
    slug: 'supports-de-communication',
    route: '/supports-de-communication',
    title: 'Supports de communication',
    tagline: 'Palissades, bâches, panneaux et covering pour rendre votre programme visible.',
    image: '/images/supports/palissade_emerige.jpg',
    imageAlt: 'Palissade de chantier imprimée annonçant un programme immobilier à Paris',
  },
  {
    slug: 'pack-investisseur',
    route: '/pack-investisseur',
    title: 'Pack investisseur',
    tagline: 'Des packs mobilier livrés et installés pour vos acquéreurs investisseurs.',
    image: '/images/home/pack-clean.jpg',
    imageAlt: 'Studio meublé avec canapé gris, verrière d’atelier et chambre en alcôve',
  },
  {
    slug: 'cuisine',
    route: '/cuisine',
    title: 'Cuisine',
    tagline: 'Des cuisines équipées pensées pour vos logements.',
    image: '/images/cuisine/cuisine_versailles_adi.jpg',
    imageAlt: 'Cuisine linéaire aux façades blanches et bois sous un plafond à poutres apparentes',
  },
]

export interface NavItem {
  label: string
  to: string
}

export const navItems: NavItem[] = services.map((s) => ({ label: s.title, to: s.route }))

export const values: Value[] = [
  { title: 'Professionnalisme', text: 'Nos experts garantissent des prestations de qualité.' },
  { title: 'Réactivité', text: 'Notre équipe relève les défis lancés au quotidien.' },
  {
    title: 'Souplesse',
    text: 'Notre méthode de travail s’accorde parfaitement aux rythmes liés à vos impératifs.',
  },
  {
    title: 'Ponctualité',
    text: 'Nous respectons les délais fixés par nos clients liés aux lancements de nouveaux programmes.',
  },
]

export const clients: string[] = [
  'Icade',
  'Emerige',
  'Stradim',
  'Quartus',
  'Marignan',
  'European Homes',
  'Capelli',
  'Livinx',
  'Emocom',
  'Grand Paris Promotion',
  'Saint-Agne Immobilier',
  'Birdy Promotion',
]
