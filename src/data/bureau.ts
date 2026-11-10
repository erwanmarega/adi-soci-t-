export interface BureauPhoto {
  src: string
  alt: string
  caption?: string
}

export interface BureauService {
  slug: string
  title: string
  hook: string
  text: string
  images: BureauPhoto[]
}

const base = '/images/bureau/'

export const bureauIntro = {
  title: 'L’image et l’expérience client font votre succès.',
  text: 'En tant que promoteur immobilier, vous savez que l’image et l’expérience client sont des éléments essentiels à votre succès. C’est pourquoi nous vous proposons des solutions sur mesure pour la construction de votre espace de vente, conçues pour vous aider à :',
  goals: [
    'attirer et fidéliser les clients potentiels',
    'présenter vos projets immobiliers de manière professionnelle et attrayante',
    'accélérer votre processus de vente',
  ],
}

export const bureauQualities = [
  {
    title: 'Modulables',
    text: 'Nous adaptons la conception de votre espace de vente à vos besoins spécifiques et à votre budget.',
  },
  {
    title: 'Économiques',
    text: 'Nos solutions sont conçues pour être rentables et vous offrir un excellent rapport qualité-prix.',
  },
  {
    title: 'Personnalisables',
    text: 'Vous pouvez choisir parmi une large gamme d’options de finition et d’aménagement pour créer un espace de vente qui reflète votre image de marque.',
  },
  {
    title: 'Durables',
    text: 'Nos espaces de vente sont construits avec des matériaux de qualité supérieure pour une longévité accrue.',
  },
]

/* The three services illustrated by photos, rendered as alternating editorial blocks. */
export const bureauServices: BureauService[] = [
  {
    slug: 'construction',
    title: 'Construction d’espaces de vente',
    hook: 'Donnez vie à l’espace de vente de vos rêves.',
    text: 'Imaginez un espace de vente unique et impactant, conçu pour attirer les clients potentiels et refléter votre image de marque. Nos solutions sur mesure, modulables et économiques, s’adaptent à tous vos besoins et à votre budget.',
    images: [
      {
        src: `${base}img_4838.jpg`,
        alt: 'Espace de vente à deux niveaux, vitrages noirs et bardage en bois, perron et rampe, au milieu des arbres',
      },
      {
        src: `${base}savana_studio_bv_icade_nanterre.jpg`,
        alt: 'Espace de vente à ossature rouge et noire, enseigne « Espace de vente » et visuels du programme en vitrine',
        caption: 'Icade — Nanterre',
      },
      {
        src: `${base}savana_studio_stradim_dammarie_bv.jpg`,
        alt: 'Pavillon de vente vert sombre avec vitrines, marches en bois et affiche d’un programme neuf',
        caption: 'Stradim — Dammarie',
      },
      {
        src: `${base}espace_de_vente_emocom.jpg`,
        alt: 'Espace de vente en façade noire vitrée, panneau publicitaire surmontant le toit',
      },
      {
        src: `${base}bureau_vente_panneau_livinx.jpg`,
        alt: 'Espace conseils turquoise installé derrière une clôture, avec grand panneau de programme à côté',
      },
      {
        src: `${base}bureau_vente_espace2.jpg`,
        alt: 'Espace de vente blanc sur terrasse en bois, enseigne rouge et panneau à trois faces sur le toit',
      },
      {
        src: `${base}img_3491.jpg`,
        alt: 'Espace de vente à deux niveaux, enseigne et bandeau bleu roi, grandes baies vitrées et visuel du programme en façade',
      },
      {
        src: `${base}savana_studio_espace_de_vente_stradim-2.jpg`,
        alt: 'Pavillon de vente bleu marine et blanc, palissades de chantier avec visuels du programme',
        caption: 'Stradim',
      },
    ],
  },
  {
    slug: 'boutiques',
    title: 'Rénovation de boutiques',
    hook: 'Offrez une nouvelle jeunesse à votre boutique.',
    text: 'Revitalisez votre boutique et boostez votre activité commerciale grâce à une rénovation complète. Optimisation de l’agencement, mise en valeur de vos produits, design moderne et délais respectés : nous transformons votre boutique en un lieu attractif et performant.',
    images: [
      {
        src: `${base}bureau_de_vente_icade_emerige_paris.jpg`,
        alt: 'Façade d’un espace de vente en rez-de-chaussée, enseigne grise et vitrine affichant les prix du programme',
        caption: 'Icade / Emerige — Paris',
      },
      {
        src: `${base}bureau_vente_1_icade.jpg`,
        alt: 'Boutique d’angle habillée de visuels du programme, enseigne noire et dorée',
        caption: 'Icade',
      },
      {
        src: `${base}savana_studio_boutique_suresnes_icade1.jpg`,
        alt: 'Boutique d’angle vitrée avec grand visuel d’architecture et numéro de téléphone du programme',
        caption: 'Icade — Suresnes',
      },
      {
        src: `${base}savana_studio_boutique_icade.jpg`,
        alt: 'Vitrine d’une boutique habillée de visuels colorés de deux programmes neufs, enseigne blanche',
        caption: 'Icade',
      },
    ],
  },
  {
    slug: 'amenagement',
    title: 'Aménagement intérieur',
    hook: 'Créez un espace de travail propice à la réussite.',
    text: 'Ergonomie, design moderne, matériaux de qualité : nous aménageons un espace fonctionnel et esthétique, stimulant pour vos équipes comme pour vos futurs acquéreurs.',
    images: [
      {
        src: `${base}savana_studio_espace_de_vente_st-ouen4_icade.jpg`,
        alt: 'Intérieur lumineux d’un espace de vente : table de présentation, chaises jaunes et visuels du programme au mur',
        caption: 'Icade — Saint-Ouen',
      },
      {
        src: `${base}savana_studio_espace_de_vente_st-ouen5_icade.jpg`,
        alt: 'Coin salon d’un espace de vente avec canapé beige, grande table en bois et tabourets en rotin',
        caption: 'Icade — Saint-Ouen',
      },
      {
        src: `${base}savana_studio_edition_plv_icade.jpg`,
        alt: 'Bureau d’accueil avec table en bois sombre, fauteuils moutarde et grands visuels de programmes sur les murs',
      },
      {
        src: `${base}savana_studio_boutique_suresnes_icade3.jpg`,
        alt: 'Salle de vente aux murs blancs avec trois grands visuels d’immeubles, bureau et fauteuils',
        caption: 'Icade — Suresnes',
      },
      {
        src: `${base}adi_amenagement_bv_stradim_1.jpg`,
        alt: 'Espace d’accueil avec tables rondes, canapé bleu, plans d’étages au mur et visuel du programme',
        caption: 'Stradim',
      },
      {
        src: `${base}adi_amenagement_bv_stradim_2.jpg`,
        alt: 'Bureau de vente avec table ronde blanche, bureau en bois clair, plante et visuels de programme',
        caption: 'Stradim',
      },
    ],
  },
]

/* Text-only services. */
export const bureauOtherServices = [
  {
    title: 'Transport et stockage',
    hook: 'Vos marchandises entre de bonnes mains.',
    text: 'Confiez-nous le transport et le stockage de votre mobilier en toute sérénité : véhicules adaptés, conducteurs expérimentés et entrepôts sécurisés.',
  },
  {
    title: 'Entretien',
    hook: 'Des locaux impeccables pour une image professionnelle.',
    text: 'Ménage, nettoyage, entretien des installations et nettoyage après chantier : nous prenons soin de vos espaces pour une image irréprochable.',
  },
]
