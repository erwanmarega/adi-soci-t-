export interface CuisinePhoto {
  src: string
  alt: string
}

const base = '/images/cuisine/'

export const cuisineHero: CuisinePhoto = {
  src: `${base}cuisine_versailles_adi.jpg`,
  alt: 'Cuisine linéaire aux façades gris clair et noyer, plan de travail en marbre, sous un plafond à poutres apparentes',
}

export const cuisineEngagements = [
  { title: 'Cuisines sur mesure', text: 'Des designs uniques adaptés à vos besoins et à votre espace.' },
  {
    title: 'Qualité supérieure',
    text: 'Matériaux de haute qualité pour une durabilité et une esthétique incomparables.',
  },
  {
    title: 'Installation professionnelle',
    text: 'Nos experts s’occupent de tout, de la conception à l’installation.',
  },
  { title: 'Service client dédié', text: 'Un accompagnement personnalisé tout au long de votre projet.' },
]

export const cuisineSteps = [
  { title: 'Conception personnalisée', text: 'Rencontrez nos designers pour créer la cuisine de vos rêves.' },
  { title: 'Pose de cuisine', text: 'Installation rapide et professionnelle par notre équipe qualifiée.' },
  { title: 'Garantie satisfaction', text: 'Votre satisfaction est notre priorité absolue.' },
]

export const cuisineSidePhoto: CuisinePhoto = {
  src: `${base}cuisine-4.jpg`,
  alt: 'Cuisine anthracite mat avec deux colonnes hautes, plan de travail en bois clair et poignées noires',
}

export const cuisineGallery: CuisinePhoto[] = [
  {
    src: `${base}cuisine-1.jpg`,
    alt: 'Cuisine beige mat avec plan de travail et crédence sombres, suspension en cage dorée et table dressée',
  },
  {
    src: `${base}cuisine-2.jpg`,
    alt: 'Cuisine blanche mat, plan de travail et crédence noirs effet métal, four et micro-ondes encastrés',
  },
  {
    src: `${base}cuisine-3.jpg`,
    alt: 'Cuisine bicolore : meubles hauts en bois clair, meubles bas anthracite, plan de travail en bois',
  },
  {
    src: `${base}cuisine-5.jpg`,
    alt: 'Cuisine blanche avec crédence et plan de travail en bois, four encastré et parquet gris',
  },
  {
    src: `${base}cuisine-6.jpg`,
    alt: 'Cuisine d’angle beige et gris clair, plan de travail et crédence sombres, suspension à globes dorée',
  },
]
