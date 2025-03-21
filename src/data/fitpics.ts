
import { FitPic } from "../types/fitpics";

export const fitPicsData: FitPic[] = [
  {
    id: 1,
    caption: "Carti at Paris Fashion Week",
    thumbnail: "https://cache.umusic.com/_sites/playboicarti.com/images/products/carti-fashion1.jpg",
    release_date: "2022-01-15",
    photographer: "Fashion Weekly",
    pic_type: "Event",
    quality: "HD",
    era: "Narcissist",
    portion: "Full Body",
    notes: "Carti wearing Rick Owens full ensemble at Paris Fashion Week",
    source_links: ["https://example.com/carti-paris"]
  },
  {
    id: 2,
    caption: "Carti Studio Session",
    thumbnail: "https://cache.umusic.com/_sites/playboicarti.com/images/products/carti-studio.jpg",
    release_date: "2021-05-20",
    photographer: "Complex Magazine",
    pic_type: "Candid",
    quality: "Medium",
    era: "Whole Lotta Red",
    portion: "Half Body",
    notes: "In studio with leather jacket and sunglasses",
    source_links: ["https://example.com/carti-studio"]
  },
  {
    id: 3,
    caption: "Rolling Loud Performance",
    thumbnail: "https://cache.umusic.com/_sites/playboicarti.com/images/products/carti-rl.jpg",
    release_date: "2021-12-10",
    photographer: "Rolling Loud",
    pic_type: "Performance",
    quality: "HD",
    era: "Whole Lotta Red",
    portion: "Full Body",
    notes: "Wearing custom Givenchy leather outfit",
    source_links: ["https://example.com/rolling-loud"]
  },
  {
    id: 4,
    caption: "Magazine Cover Shoot",
    thumbnail: "https://cache.umusic.com/_sites/playboicarti.com/images/products/carti-magazine.jpg",
    release_date: "2020-09-05",
    photographer: "GQ Magazine",
    pic_type: "Photoshoot",
    quality: "HD",
    era: "Die Lit",
    portion: "Full Body",
    notes: "Featured on cover of September issue",
    source_links: ["https://example.com/gq-cover"]
  },
  {
    id: 5,
    caption: "Backstage with A$AP Rocky",
    thumbnail: "https://cache.umusic.com/_sites/playboicarti.com/images/products/carti-asap.jpg",
    release_date: "2019-08-12",
    photographer: "Tour Photographer",
    pic_type: "Candid",
    quality: "Medium",
    era: "Die Lit",
    portion: "Half Body",
    notes: "Backstage during tour with A$AP Rocky",
    source_links: ["https://example.com/backstage"]
  },
  {
    id: 6,
    caption: "Album Release Party",
    thumbnail: "https://cache.umusic.com/_sites/playboicarti.com/images/products/carti-release.jpg",
    release_date: "2020-12-25",
    photographer: "Complex",
    pic_type: "Event",
    quality: "Low",
    era: "Whole Lotta Red",
    portion: "Full Body",
    notes: "At the WLR release party",
    source_links: ["https://example.com/wlr-party"]
  },
  {
    id: 7,
    caption: "Music Video Shoot",
    thumbnail: "https://cache.umusic.com/_sites/playboicarti.com/images/products/carti-mv.jpg",
    release_date: "2018-05-11",
    photographer: "AWGE",
    pic_type: "Behind The Scenes",
    quality: "HD",
    era: "Self Titled",
    portion: "Full Body",
    notes: "Behind the scenes of 'Magnolia' music video",
    source_links: ["https://example.com/magnolia-bts"]
  },
  {
    id: 8,
    caption: "Carti x Balmain",
    thumbnail: "https://cache.umusic.com/_sites/playboicarti.com/images/products/carti-balmain.jpg",
    release_date: "2022-03-02",
    photographer: "Balmain",
    pic_type: "Advertisement",
    quality: "HD",
    era: "Narcissist",
    portion: "Full Body",
    notes: "Campaign with Balmain Spring Collection",
    source_links: ["https://example.com/balmain"]
  },
  {
    id: 9,
    caption: "Concert in New York",
    thumbnail: "https://cache.umusic.com/_sites/playboicarti.com/images/products/carti-ny.jpg",
    release_date: "2021-07-18",
    photographer: null,
    pic_type: "Performance",
    quality: "Medium",
    era: "Whole Lotta Red",
    portion: "Half Body",
    notes: "New York stop on the King Vamp tour",
    source_links: ["https://example.com/ny-concert"]
  }
];

// Extracting unique values for filter options
export const getUniqueEras = (): string[] => {
  return [...new Set(fitPicsData.map(pic => pic.era))];
};

export const getUniquePicTypes = (): string[] => {
  return [...new Set(fitPicsData.map(pic => pic.pic_type))];
};

export const getUniqueQualities = (): string[] => {
  return [...new Set(fitPicsData.map(pic => pic.quality))];
};

// Function to apply filters and get filtered data
export const getFilteredFitPics = (filters: {
  era?: string;
  type?: string;
  quality?: string;
  query?: string;
}): FitPic[] => {
  return fitPicsData.filter(pic => {
    // Apply era filter
    if (filters.era && pic.era !== filters.era) {
      return false;
    }
    
    // Apply type filter
    if (filters.type && pic.pic_type !== filters.type) {
      return false;
    }
    
    // Apply quality filter
    if (filters.quality && pic.quality !== filters.quality) {
      return false;
    }
    
    // Apply search query
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const searchIn = [
        pic.caption, 
        pic.era, 
        pic.pic_type, 
        pic.photographer || '', 
        pic.notes || ''
      ].map(field => field.toLowerCase());
      
      if (!searchIn.some(field => field.includes(query))) {
        return false;
      }
    }
    
    return true;
  });
};
