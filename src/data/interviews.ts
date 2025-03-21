
import { Interview } from '@/types/interviews';

// Available eras for interviews
export const eras = [
  'Pre-Die Lit',
  'Die Lit Era',
  'WLR V1',
  'WLR V2',
  'WLR V3',
  'Post-WLR',
  'Narcissist'
];

// Types of interviews
export const interviewTypes = [
  'Video',
  'Audio',
  'Written',
  'Photo',
  'Livestream'
];

// Sample interviews data
export const interviews: Interview[] = [
  {
    id: 1,
    title: "Whole Lotta Red Album Discussion",
    outlet: "Complex",
    subject_matter: "Discussing Whole Lotta Red Album Release",
    thumbnail: "https://i.imgur.com/KlMYQEU.jpg",
    date: "2021-01-05",
    interview_type: "Video",
    era: "Post-WLR",
    available: true,
    source_links: "https://www.youtube.com/watch?v=exampleCode1",
    archived_link: null,
    special_notes: "Carti discusses the creative process behind WLR and future plans.",
    link: "https://www.youtube.com/watch?v=exampleCode1"
  },
  {
    id: 2,
    title: "XXL Freshman Cover Interview",
    outlet: "XXL Magazine",
    subject_matter: "XXL Freshman Cover Interview",
    thumbnail: "https://i.imgur.com/C4rVJGw.jpg",
    date: "2017-06-15",
    interview_type: "Written",
    era: "Pre-Die Lit",
    available: true,
    source_links: "https://xxlmag.com/playboi-carti-interview-2017/",
    archived_link: "https://web.archive.org/web/20170620/https://xxlmag.com/playboi-carti-interview-2017/",
    special_notes: null,
    link: "https://xxlmag.com/playboi-carti-interview-2017/"
  },
  {
    id: 3,
    title: "Die Lit Release Discussion with Zane Lowe",
    outlet: "Beats 1 Radio",
    subject_matter: "Die Lit Release Discussion with Zane Lowe",
    thumbnail: "https://i.imgur.com/ZLWyY8R.jpg",
    date: "2018-05-12",
    interview_type: "Audio",
    era: "Die Lit Era",
    available: true,
    source_links: "https://music.apple.com/us/curator/beats-1/965341583",
    archived_link: null,
    special_notes: "Carti discusses the surprise release of Die Lit album.",
    link: "https://music.apple.com/us/curator/beats-1/965341583"
  },
  {
    id: 4,
    title: "Carti's Rise to Fame",
    outlet: "The FADER",
    subject_matter: "Carti's Rise to Fame",
    thumbnail: "https://i.imgur.com/FtYvjLY.jpg",
    date: "2019-06-12",
    interview_type: "Written",
    era: "Die Lit Era",
    available: true,
    source_links: "https://www.thefader.com/2019/06/12/playboi-carti-cover-story",
    archived_link: "https://web.archive.org/web/20190615/https://www.thefader.com/2019/06/12/playboi-carti-cover-story",
    special_notes: "In-depth profile of Carti's career trajectory.",
    link: "https://www.thefader.com/2019/06/12/playboi-carti-cover-story"
  },
  {
    id: 5,
    title: "WLR V1 Era Previews",
    outlet: "Instagram Live",
    subject_matter: "WLR V1 Era Previews",
    thumbnail: null,
    date: "2019-12-20",
    interview_type: "Livestream",
    era: "WLR V1",
    available: false,
    source_links: null,
    archived_link: "https://archived.example.com/carti-live-12-20-2019",
    special_notes: "Carti previewed several WLR V1 snippets during this livestream.",
    link: null
  },
  {
    id: 6,
    title: "Verified: Magnolia Lyrics Breakdown",
    outlet: "Genius",
    subject_matter: "Verified: Magnolia Lyrics Breakdown",
    thumbnail: "https://i.imgur.com/GXrY9ND.jpg",
    date: "2017-08-03",
    interview_type: "Video",
    era: "Pre-Die Lit",
    available: true,
    source_links: "https://www.youtube.com/watch?v=exampleCode2",
    archived_link: null,
    special_notes: "Carti explains the meaning behind Magnolia lyrics.",
    link: "https://www.youtube.com/watch?v=exampleCode2"
  },
  {
    id: 7,
    title: "Style Profile: Playboi Carti's Fashion Evolution",
    outlet: "GQ",
    subject_matter: "Style Profile: Playboi Carti's Fashion Evolution",
    thumbnail: "https://i.imgur.com/JYMNEbr.jpg",
    date: "2021-04-15",
    interview_type: "Photo",
    era: "Post-WLR",
    available: true,
    source_links: "https://www.gq.com/story/playboi-carti-style-profile",
    archived_link: null,
    special_notes: "Photoshoot and interview about Carti's fashion influences.",
    link: "https://www.gq.com/story/playboi-carti-style-profile"
  },
  {
    id: 8,
    title: "Narcissist Era Fashion and Music",
    outlet: "Highsnobiety",
    subject_matter: "Narcissist Era Fashion and Music",
    thumbnail: "https://i.imgur.com/NcR7MvY.jpg",
    date: "2021-09-20",
    interview_type: "Written",
    era: "Narcissist",
    available: true,
    source_links: "https://www.highsnobiety.com/p/playboi-carti-narcissist-interview/",
    archived_link: null,
    special_notes: "Discussion about the Narcissist era aesthetics and tour.",
    link: "https://www.highsnobiety.com/p/playboi-carti-narcissist-interview/"
  }
];
