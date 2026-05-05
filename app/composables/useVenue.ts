/**
 * Source unique de vérité pour les coordonnées du Meynadier.
 *
 * Centralisé ici pour synchroniser :
 * - Footer, page Contact, JSON-LD `Restaurant`/`BarOrPub`,
 * - Adresse et tel cliquables, deeplinks itinéraire.
 *
 * À mettre à jour avec les vraies infos client (téléphone, mail, réseaux,
 * géo précis, horaires définitifs).
 */
export interface OpeningHours {
  /** Format ISO court : "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su". */
  days: ('Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su')[]
  open: string // "08:00"
  close: string // "23:00"
}

export interface Venue {
  name: string
  legalName: string
  description: string
  address: {
    street: string
    locality: string
    postalCode: string
    region: string
    country: string
    countryCode: string
  }
  geo: { lat: number; lng: number }
  telephone: string
  telephoneHref: string | null
  email: string | null
  website: string
  socials: { platform: string; url: string | null }[]
  cuisine: string[]
  priceRange: string
  hours: OpeningHours[]
  hoursLabel: string
  /** Services / aménités (terrasse, accessibilité, etc.). */
  amenities: ('terrace' | 'accessible' | 'wifi' | 'reservation')[]
  /** Bâtiment dans lequel se trouve l'établissement (Google "Located in"). */
  locatedIn: string | null
}

export function useVenue(): Venue {
  return {
    name: 'Le Meynadier',
    legalName: 'Le Meynadier',
    description:
      'Brasserie · Pizzeria · Pub au cœur du vieux Cannes. Pizzas signatures, bières pression, cocktails maison.',
    address: {
      street: '1 rue Meynadier (angle 5 rue du Maréchal Joffre)',
      locality: 'Cannes',
      postalCode: '06400',
      region: "Provence-Alpes-Côte d'Azur",
      country: 'France',
      countryCode: 'FR',
    },
    // Coordonnées exactes 1 rue Meynadier · Cannes
    // (angle Maréchal Joffre, bâtiment "Résidence d'Azur").
    geo: { lat: 43.5512, lng: 7.0129 },
    telephone: '04 93 30 23 12',
    telephoneHref: 'tel:+33493302312',
    email: null,
    website: 'https://lemeynadier.fr',
    socials: [
      { platform: 'Instagram', url: null },
      { platform: 'Facebook', url: null },
    ],
    cuisine: ['Pizza', 'Italian', 'French', 'Brasserie'],
    priceRange: '€€',
    // Ouvert 7 j/7 jusqu'à 00h30 (Google Business : "Closes 12:30 AM").
    hours: [{ days: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'], open: '08:00', close: '00:30' }],
    hoursLabel: 'Tous les jours · 8h – 00h30',
    // Service : terrasse extérieure
    amenities: ['terrace'],
    // Repère "located in" Google Business
    locatedIn: "Résidence d'Azur",
  }
}

/** Construit le JSON-LD pour Schema.org `BarOrPub` + `Restaurant`. */
export function venueJsonLd(venue: Venue) {
  const sameAs = venue.socials.map((s) => s.url).filter((u): u is string => !!u)
  return {
    '@context': 'https://schema.org',
    '@type': ['BarOrPub', 'Restaurant'],
    name: venue.name,
    legalName: venue.legalName,
    description: venue.description,
    url: venue.website,
    telephone: venue.telephoneHref ? venue.telephoneHref : undefined,
    email: venue.email ?? undefined,
    image: `${venue.website}/og/og-fr.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: venue.address.street,
      addressLocality: venue.address.locality,
      postalCode: venue.address.postalCode,
      addressRegion: venue.address.region,
      addressCountry: venue.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: venue.geo.lat,
      longitude: venue.geo.lng,
    },
    servesCuisine: venue.cuisine,
    priceRange: venue.priceRange,
    openingHoursSpecification: venue.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days.map(
        (d) =>
          ({
            Mo: 'Monday',
            Tu: 'Tuesday',
            We: 'Wednesday',
            Th: 'Thursday',
            Fr: 'Friday',
            Sa: 'Saturday',
            Su: 'Sunday',
          })[d],
      ),
      opens: h.open,
      closes: h.close,
    })),
    sameAs: sameAs.length ? sameAs : undefined,
  }
}
