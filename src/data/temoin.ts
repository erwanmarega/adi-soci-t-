export interface TemoinPhoto {
  src: string
  alt: string
}

const base = '/images/temoin/'

export const temoinPhotos: Record<'living' | 'lounge' | 'suite' | 'bedroom' | 'kids', TemoinPhoto> = {
  living: {
    src: `${base}20220720_170507.jpg`,
    alt: 'Séjour d’un appartement témoin : table ronde dressée, fauteuils en velours gris, salon et luminaires',
  },
  lounge: {
    src: `${base}20230313_112719.jpg`,
    alt: 'Salon lumineux aux grands rideaux, canapé gris, fauteuil rose poudré et buffet en bois clair',
  },
  suite: {
    src: `${base}20211222_115400_1.jpg`,
    alt: 'Chambre parentale avec couvre-lit vert émeraude, tête de lit bleu nuit et commode blanche',
  },
  bedroom: {
    src: `${base}20230313_113640.jpg`,
    alt: 'Chambre aux tons naturels : tête de lit en rotin, coussins colorés et miroir soleil',
  },
  kids: {
    src: `${base}20230313_113806.jpg`,
    alt: 'Chambre d’enfant avec lit cabane en bois, rideaux rose poudré et grand tapis à pois',
  },
}

export const temoinText = {
  lead: 'L’achat d’un bien immobilier est une opération importante dans la vie d’un acquéreur. Il est souvent difficile de se projeter dans un logement, d’autant plus quand il s’agit d’un achat sur plans !',
  why: 'C’est pourquoi l’aménagement d’un appartement ou d’une maison témoin peut vivement aider les futurs propriétaires à prendre leur décision.',
  quote:
    'Parcourir un appartement chaleureux, dans lequel on s’imagine vivre, construire sa famille et recevoir ses amis favorisera l’effet « coup de cœur » !',
}
