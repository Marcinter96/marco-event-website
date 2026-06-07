export interface Photo {
  url: string;
  alt: string;
}

export interface Destination {
  id: string;
  city: string;
  name: string;
  tag: string;
  tagline: string;
  about: string[];
  heroImage: string;
  photos: Photo[];
  isRosesCity: boolean;
}

// Wikimedia Commons stable image URL. Pass the exact File: name (without the
// "File:" prefix). Special:FilePath redirects to the underlying image and
// serves it at the requested width, so we never need the internal hash path.
const COMMONS = "https://commons.wikimedia.org/wiki/Special:FilePath/";
export function commonsImage(filename: string, width = 1200): string {
  return `${COMMONS}${encodeURIComponent(filename)}?width=${width}`;
}

export const destinations: Destination[] = [
  {
    id: "zurich",
    city: "Zurich",
    name: "Weekend in Zurich",
    tag: "Marco's city",
    tagline: "Alpine city life, lake swims & homecooked dinner",
    about: [
      "Wander through the Altstadt and the winding Niederdorf lanes",
      "Hike up to Uetliberg — sweeping views of the city and the lake",
      "Swim in Lake Zurich, one of the cleanest lakes in Europe",
      "Homemade dinner at Marco's — wine most definitely included",
    ],
    heroImage: commonsImage("Zürichsee - Uetliberg IMG 0833.JPG"),
    photos: [
      {
        url: commonsImage(
          "Aah, die Limmat in Zürich ... Ansicht von der 'Quaibrücke' auf einige Sehenswürdigkeiten der Altstadt 2012-03-27 17-09-57 (P7000).JPG",
          800
        ),
        alt: "The Limmat river and Zurich old town",
      },
      {
        url: commonsImage(
          "Zürich - Friesenberg - Werd - Uetlibergturm IMG 1568.JPG",
          800
        ),
        alt: "View from the Uetliberg tower over Zurich",
      },
      {
        url: commonsImage("Zürichsee - Uetliberg IMG 0833.JPG", 800),
        alt: "Lake Zurich seen from Uetliberg",
      },
      {
        url: "/images/zurich-spa.jpg",
        alt: "Rooftop thermal spa pool at sunset over the city",
      },
    ],
    isRosesCity: false,
  },
  {
    id: "crans",
    city: "Crans Montana",
    name: "Weekend in Crans Montana",
    tag: "Mountain escape",
    tagline: "Alpine hiking, tennis & sushi with a view",
    about: [
      "Hike the mountain trails above the resort — fresh air guaranteed",
      "Hit the tennis courts at altitude (spoiler: it's harder than you think)",
      "Dinner at a sushi restaurant overlooking the Alps — yes, sushi in the mountains",
      "Gondola rides, alpine sunsets and absolutely zero city noise",
    ],
    heroImage: "/images/crans-montana-summer-impressions-8.jpg",
    photos: [
      {
        url: "/images/crans-bridge.jpg",
        alt: "Suspension footbridge over the valley near Crans Montana",
      },
      {
        url: "/images/crans-bisse.jpg",
        alt: "Cliffside bisse walkway with alpine views",
      },
      {
        url: commonsImage("Château de Crans.JPG", 800),
        alt: "Château de Crans with the Alps behind",
      },
      {
        url: commonsImage("Le Luisin (2786 m) Valais, Switzerland.JPG", 800),
        alt: "Alpine peaks in the Valais region",
      },
    ],
    isRosesCity: false,
  },
  {
    id: "milan",
    city: "Milan",
    name: "Weekend in Milan",
    tag: "Italian city break",
    tagline: "The Duomo, pasta, and golden hour spritz",
    about: [
      "Stroll through the historic centre — the Duomo up close is something else",
      "Wander the Navigli canals on a Sunday morning",
      "Long pasta lunch, no rush — the Italian way",
      "Aperitivo spritz at golden hour because it would be wrong not to",
    ],
    heroImage: commonsImage("Cathedrale duomo, Milan.JPG"),
    photos: [
      {
        url: commonsImage("Cathedrale duomo, Milan.JPG", 800),
        alt: "Milan Duomo cathedral",
      },
      {
        url: commonsImage("Galleria Vitt.Emanuele Milano.jpg", 800),
        alt: "Galleria Vittorio Emanuele II",
      },
      {
        url: commonsImage(
          "Cerchia dei navigli, Milano, Italy - panoramio (30).jpg",
          800
        ),
        alt: "The Navigli canals in Milan",
      },
      {
        url: commonsImage("Castello sforzesco, milano.JPG", 800),
        alt: "Castello Sforzesco",
      },
      {
        url: "/images/milan-cacio-e-pepe.jpg",
        alt: "A bowl of cacio e pepe pasta",
      },
    ],
    isRosesCity: false,
  },
  {
    id: "paris",
    city: "Paris",
    name: "Weekend in Paris",
    tag: "Rose's city",
    tagline: "Your turf, your rules — you plan this one",
    about: [],
    heroImage: commonsImage("Eiffel Tower Paris 01.JPG"),
    photos: [
      {
        url: commonsImage("Eiffel Tower Paris 01.JPG", 800),
        alt: "The Eiffel Tower",
      },
      {
        url: commonsImage(
          "Paris Sacré-Cœur de Montmartre Eiffel Tower.JPG",
          800
        ),
        alt: "Paris rooftops seen from Montmartre",
      },
      {
        url: commonsImage(
          "Le pont Alexandre III, Alexander III bridge Paris 1.JPG",
          800
        ),
        alt: "Pont Alexandre III over the Seine",
      },
    ],
    isRosesCity: true,
  },
];
