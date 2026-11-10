export interface SupportImage {
  src: string
  alt: string
  caption?: string
}

export interface SupportFamily {
  id: string
  label: string
  title: string
  paragraphs: string[]
  images: SupportImage[]
}

const base = '/images/supports'

export const supportFamilies: SupportFamily[] = [
  {
    id: 'permis-de-construire',
    label: 'Permis de construire',
    title: 'Permis de construire',
    paragraphs: [
      'Vous souhaitez construire ou modifier une construction ? Nous créons, fabriquons et posons pour vous vos panneaux de permis de construire.',
      'Nous réalisons la fabrication et la pose de votre permis de construire dans les 36 h suivant la signature du devis. Vous n’avez qu’à nous fournir la création et toutes les informations nécessaires, et le tour est joué !',
      'Vous souhaitez nous confier la création ? Nous créons le B.A.T. sur demande et sur devis en respectant votre charte graphique. La pose est programmée dans les 48 h suivant la validation de la création.',
    ],
    images: [
      {
        src: `${base}/banniere-permis-de-construire.jpg`,
        alt: 'Panneau de permis de construire vierge accroché sur un mur bleu, avec la mention « fabrication et pose sous 36 h »',
      },
      {
        src: `${base}/panneau_permis_de_construire_grand_paris_promotion.jpg`,
        alt: 'Panneau de permis de construire aux couleurs de Grand Paris Promotion, fixé à une clôture de chantier devant une pelleteuse',
        caption: 'Panneau de permis de construire — Grand Paris Promotion',
      },
      {
        src: `${base}/panneau_permis_de_construire_saint_agne_immobilier.jpg`,
        alt: 'Panneau de permis de construire aux couleurs de Saint-Agne Immobilier, fixé à un grillage devant un sous-bois',
        caption: 'Panneau de permis de construire — Saint-Agne Immobilier',
      },
    ],
  },
  {
    id: 'palissade',
    label: 'Palissade',
    title: 'Palissade',
    paragraphs: [
      'Support de communication incontournable, l’habillage de vos palissades de chantier offre un visuel esthétique pendant la durée des travaux et en occulte les désagréments.',
      'Nous pouvons réaliser un habillage en bâche ou en Dibond, avec une impression numérique. La palissade entourant vos chantiers devient alors un véritable outil de communication !',
    ],
    images: [
      {
        src: `${base}/palissade_livinx.jpg`,
        alt: 'Palissade de chantier le long d’un mur en pierre, habillée de visuels turquoise annonçant un programme de 13 appartements',
        caption: 'Palissade — Livinx',
      },
      {
        src: `${base}/palissade_emerige.jpg`,
        alt: 'Palissade de chantier imprimée annonçant un programme de 168 appartements à Paris 19e, avec perspectives de terrasses',
        caption: 'Palissade — Emerige',
      },
      {
        src: `${base}/palissade_birdy_promotion.jpg`,
        alt: 'Longue palissade vert et gris ardoise présentant la résidence « Cascades » et ses perspectives architecturales',
        caption: 'Palissade — Birdy Promotion',
      },
      {
        src: `${base}/savana_studio_edition_palissade_quartus-2.jpg`,
        alt: 'Trois grands panneaux bleus et blancs de la résidence 110 Flandre posés derrière un muret en briques',
        caption: 'Panneaux de chantier — Quartus',
      },
      {
        src: `${base}/savana_studio_edition_palissade_marignan.jpg`,
        alt: 'Palissade blanche en perspective le long d’un trottoir, annonçant un futur centre de santé et une résidence neuve',
        caption: 'Palissade — Marignan',
      },
      {
        src: `${base}/savana_studio_edition_palissade_european_homes.jpg`,
        alt: 'Palissade framboise « Travaux en cours » et perspectives d’un immeuble d’angle, au bord d’une rue',
        caption: 'Palissade — European Homes',
      },
    ],
  },
  {
    id: 'bache',
    label: 'Bâche',
    title: 'Bâche',
    paragraphs: [
      'La bâche publicitaire est un support de communication idéal pour promouvoir vos programmes immobiliers. Souple et maniable, la banderole publicitaire convient parfaitement à l’extérieur en s’adaptant à chaque surface.',
    ],
    images: [
      {
        src: `${base}/panneau_smbi_livinx.jpg`,
        alt: 'Grand panneau publicitaire turquoise « Ici votre nouvelle résidence » indiquant l’espace conseils, sur fond de verdure',
        caption: 'Panneau publicitaire — Livinx',
      },
      {
        src: `${base}/bache_capelli.jpg`,
        alt: 'Trois grandes bâches « Ici prochainement » tendues sur les façades d’un bâtiment d’angle',
        caption: 'Bâches de façade — Capelli',
      },
      {
        src: `${base}/bache_2_emocom.jpg`,
        alt: 'Bâche tendue dans un cadre noir présentant l’illustration d’un immeuble de standing sur fond de ciel bleu',
        caption: 'Bâche — Emocom',
      },
      {
        src: `${base}/savana_studio_edition_panneau_publicitaire_icade.jpg`,
        alt: 'Panneau publicitaire en hauteur annonçant « Espace de vente ici » pour un programme à Meudon-la-Forêt',
        caption: 'Panneau publicitaire — Icade',
      },
      {
        src: `${base}/bache_emocom.jpg`,
        alt: 'Large bâche noire et illustrations d’une résidence, tendue au-dessus d’un mur en cours de démolition',
        caption: 'Bâche — Emocom',
      },
    ],
  },
  {
    id: 'kakemono',
    label: 'Kakémono',
    title: 'Kakémono',
    paragraphs: [
      'Le kakémono ou le beach flag sont des supports de communication efficaces, rapides et économiques ! De la création à la pose du support, nous assurons l’ensemble des services liés à leur utilisation publicitaire.',
    ],
    images: [
      {
        src: `${base}/plv-rollup.jpg`,
        alt: 'Deux roll-ups Icade présentés dos à dos : l’un présentant l’opérateur, l’autre un programme à Noisy-le-Grand',
        caption: 'Roll-ups — Icade',
      },
      {
        src: `${base}/savana_studio_rollup.jpg`,
        alt: 'Roll-up présentant un programme immobilier, installé dans un grand hall lumineux',
        caption: 'Roll-up dans un hall d’accueil',
      },
    ],
  },
  {
    id: 'covering',
    label: 'Covering',
    title: 'Covering',
    paragraphs: [
      'Vous souhaitez plus de visibilité et attirer l’attention des futurs acquéreurs ? Le covering est un moyen novateur pour votre communication visuelle.',
      'ADI vous propose le marquage de vos véhicules, de la création des visuels jusqu’à la pose. Un outil simple et efficace pour créer un véritable impact lors de vos campagnes publicitaires !',
    ],
    images: [
      {
        src: `${base}/covering1.jpg`,
        alt: 'Citadine blanche entièrement habillée aux couleurs d’Icade, avec la façade d’un immeuble imprimée sur le flanc',
        caption: 'Covering véhicule — Icade',
      },
      {
        src: `${base}/covering2.jpg`,
        alt: 'Vue latérale d’une citadine blanche marquée du logo Icade et d’une perspective de terrasse',
        caption: 'Covering véhicule — Icade',
      },
      {
        src: `${base}/covering3.jpg`,
        alt: 'Véhicule blanc aménagé en espace de vente mobile, entièrement habillé de visuels Icade',
        caption: 'Covering bureau de vente mobile — Icade',
      },
      {
        src: `${base}/covering5.jpg`,
        alt: 'Face avant d’un utilitaire blanc habillé du message « Espace de vente » et de visuels de famille',
        caption: 'Covering bureau de vente mobile — Icade',
      },
    ],
  },
]
