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

// Unsplash image URLs — update photo IDs to your preferred images
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
    heroImage:
      "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=1200&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
        alt: "Zurich old town",
      },
      {
        url: "https://images.unsplash.com/photo-1580711508419-c1d5f3b50e66?auto=format&fit=crop&w=800&q=80",
        alt: "Lake Zurich",
      },
      {
        url: "https://images.unsplash.com/photo-1571539170232-b8e22c4a5d39?auto=format&fit=crop&w=800&q=80",
        alt: "Uetliberg view",
      },
      {
        url: "https://images.unsplash.com/photo-1563620915-0e2c82571234?auto=format&fit=crop&w=800&q=80",
        alt: "Zurich city",
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
    heroImage:
      "https://images.unsplash.com/photo-1527489377706-5bf97e608852?auto=format&fit=crop&w=1200&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=800&q=80",
        alt: "Mountain hiking trail",
      },
      {
        url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80",
        alt: "Alpine mountains",
      },
      {
        url: "https://images.unsplash.com/photo-1510797215324-95aa89f43c33?auto=format&fit=crop&w=800&q=80",
        alt: "Mountain gondola",
      },
      {
        url: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?auto=format&fit=crop&w=800&q=80",
        alt: "Alpine sunset",
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
    heroImage:
      "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?auto=format&fit=crop&w=1200&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee?auto=format&fit=crop&w=800&q=80",
        alt: "Milan Duomo",
      },
      {
        url: "https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=800&q=80",
        alt: "Navigli canal",
      },
      {
        url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
        alt: "Italian pasta",
      },
      {
        url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80",
        alt: "Milan street",
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
    heroImage:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1499856374479-3b223f78c8a0?auto=format&fit=crop&w=800&q=80",
        alt: "Paris Eiffel Tower",
      },
      {
        url: "https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=800&q=80",
        alt: "Paris rooftops",
      },
      {
        url: "https://images.unsplash.com/photo-1508050919630-b135583b29ab?auto=format&fit=crop&w=800&q=80",
        alt: "Paris café",
      },
      {
        url: "https://images.unsplash.com/photo-1564594985645-4427056e22e2?auto=format&fit=crop&w=800&q=80",
        alt: "Paris market",
      },
    ],
    isRosesCity: true,
  },
];
