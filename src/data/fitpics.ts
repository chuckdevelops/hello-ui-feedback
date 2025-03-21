
import { FitPic } from '@/types/fitpics';

// Available eras for fit pics
export const eras = [
  'Pre-Die Lit',
  'Die Lit Era',
  'WLR V1',
  'WLR V2',
  'WLR V3',
  'Post-WLR',
  'Narcissist'
];

// Types of fit pics
export const picTypes = [
  'Photoshoot',
  'Concert',
  'Candid',
  'Interview',
  'Music Video',
  'Event'
];

// Quality ratings
export const qualities = [
  'HQ',
  'Good',
  'Medium',
  'Low'
];

// Sample fit pics data
export const fitpics: FitPic[] = [
  {
    id: 1,
    caption: "Rick Owens Outfit at Paris Fashion Week",
    thumbnail: "https://i.imgur.com/JfFjYV4.jpg",
    release_date: "2022-01-15",
    photographer: "Unknown",
    pic_type: "Event",
    quality: "HQ",
    era: "Post-WLR",
    portion: "Full Body",
    notes: "Carti was spotted wearing a full Rick Owens outfit during Paris Fashion Week.",
    source_links: ["https://twitter.com/playboicarti/status/1483141997772738562"]
  },
  {
    id: 2,
    caption: "Dior Fashion Show",
    thumbnail: "https://i.imgur.com/8jGXvNH.jpg",
    release_date: "2021-06-25",
    photographer: "Paolo Roversi",
    pic_type: "Photoshoot",
    quality: "HQ",
    era: "Post-WLR",
    portion: "Full Body",
    notes: "Photoshoot for Dior Homme campaign featuring Carti in all-black attire.",
    source_links: ["https://www.vogue.com/fashion-shows/spring-2022-menswear/dior-homme"]
  },
  {
    id: 3,
    caption: "Rolling Loud Miami",
    thumbnail: "https://i.imgur.com/P5dqYvQ.jpg",
    release_date: "2021-07-24",
    photographer: "Rolling Loud",
    pic_type: "Concert",
    quality: "Good",
    era: "Post-WLR",
    portion: "Full Body",
    notes: "Performance at Rolling Loud Miami 2021 showing the iconic WLR tour outfit.",
    source_links: ["https://www.rollingstone.com/music/music-news/rolling-loud-miami-2021-highlights-1198429/"]
  },
  {
    id: 4,
    caption: "Givenchy Fashion Show",
    thumbnail: "https://i.imgur.com/YgH3nrb.jpg",
    release_date: "2021-10-03",
    photographer: "Givenchy",
    pic_type: "Event",
    quality: "HQ",
    era: "Post-WLR",
    portion: "Full Body",
    notes: "Carti attending the Givenchy Spring/Summer 2022 show in Paris.",
    source_links: ["https://www.vogue.com/fashion-shows/spring-2022-ready-to-wear/givenchy"]
  },
  {
    id: 5,
    caption: "XXL Photoshoot",
    thumbnail: "https://i.imgur.com/3XfCQHr.jpg",
    release_date: "2017-06-13",
    photographer: "XXL Magazine",
    pic_type: "Photoshoot",
    quality: "HQ",
    era: "Pre-Die Lit",
    portion: "Full Body",
    notes: "XXL Freshman cover photoshoot featuring Carti.",
    source_links: ["https://xxlmag.com/2017-xxl-freshman-class/"]
  },
  {
    id: 6,
    caption: "WLR Album Cover Shoot",
    thumbnail: "https://i.imgur.com/fUvpbmQ.jpg",
    release_date: "2020-12-25",
    photographer: "Art Dealer",
    pic_type: "Photoshoot",
    quality: "HQ",
    era: "WLR V3",
    portion: "Upper Body",
    notes: "Iconic photoshoot for the Whole Lotta Red album cover.",
    source_links: ["https://www.instagram.com/p/CJNfYZcAGeD/"]
  },
  {
    id: 7,
    caption: "Narcissist Tour Announcement",
    thumbnail: "https://i.imgur.com/Lq5n5y7.jpg",
    release_date: "2021-09-01",
    photographer: null,
    pic_type: "Promotional",
    quality: "Medium",
    era: "Narcissist",
    portion: "Full Body",
    notes: "Image used for the Narcissist tour announcement.",
    source_links: ["https://www.instagram.com/p/CTSfwKtrJV2/"]
  },
  {
    id: 8,
    caption: "Magnolia Music Video",
    thumbnail: "https://i.imgur.com/5WzGJBj.jpg",
    release_date: "2017-04-14",
    photographer: null,
    pic_type: "Music Video",
    quality: "Good",
    era: "Pre-Die Lit",
    portion: "Full Body",
    notes: "Screenshot from the Magnolia music video.",
    source_links: ["https://www.youtube.com/watch?v=oCveByMXd_0"]
  }
];
