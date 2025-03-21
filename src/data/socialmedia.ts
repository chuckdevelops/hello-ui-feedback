
import { SocialMediaAccount } from '@/types/socialmedia';

export const socialMediaAccounts: SocialMediaAccount[] = [
  {
    id: 1,
    username: "@playboicarti",
    platform: "Instagram",
    era: "Whole Lotta Red",
    last_post: "2023-12-15",
    still_used: true,
    notes: "Carti's primary Instagram account with over 7 million followers. Known for sparse, cryptic posts and promotional content.",
    link: "https://www.instagram.com/playboicarti/",
    thumbnail: null
  },
  {
    id: 2,
    username: "@cashcarti",
    platform: "Twitter",
    era: "Whole Lotta Red",
    last_post: "2023-11-20",
    still_used: true,
    notes: "Official Twitter account where Carti occasionally shares updates about music releases and tour dates.",
    link: "https://twitter.com/playboicarti",
    thumbnail: null
  },
  {
    id: 3,
    username: "Playboi Carti",
    platform: "Facebook",
    era: "Die Lit",
    last_post: "2022-01-10",
    still_used: false,
    notes: "Rarely updated official Facebook page, mostly contains reposts from other platforms.",
    link: "https://www.facebook.com/playboicarti/",
    thumbnail: null
  },
  {
    id: 4,
    username: "@opium_00pium",
    platform: "Instagram",
    era: "Whole Lotta Red",
    last_post: "2023-10-05",
    still_used: true,
    notes: "Opium label account run by Carti and his team, featuring artists signed to his label.",
    link: "https://www.instagram.com/opium_00pium/",
    thumbnail: null
  },
  {
    id: 5,
    username: "@cartier",
    platform: "Snapchat",
    era: "Self-Titled",
    last_post: "2019-05-22",
    still_used: false,
    notes: "Old Snapchat account that Carti used during his Self-Titled era. No longer active.",
    link: null,
    thumbnail: null
  },
  {
    id: 6,
    username: "playboicarti",
    platform: "SoundCloud",
    era: "Self-Titled",
    last_post: "2020-12-25",
    still_used: true,
    notes: "Official SoundCloud page where Carti occasionally uploads singles and freestyles.",
    link: "https://soundcloud.com/playboicarti",
    thumbnail: null
  },
  {
    id: 7,
    username: "@playboicarti",
    platform: "TikTok",
    era: "Whole Lotta Red",
    last_post: "2022-09-14",
    still_used: true,
    notes: "Verified TikTok account with occasional posts related to music releases.",
    link: "https://www.tiktok.com/@playboicarti",
    thumbnail: null
  },
  {
    id: 8,
    username: "playboicarti",
    platform: "YouTube",
    era: "Whole Lotta Red",
    last_post: "2023-02-28",
    still_used: true,
    notes: "Official YouTube channel for music videos and official releases.",
    link: "https://www.youtube.com/channel/UC652oRUvX1onwrrZ8ADJRPw",
    thumbnail: null
  },
  {
    id: 9,
    username: "@playboicarti16",
    platform: "Instagram",
    era: "Pre Self-Titled",
    last_post: "2016-04-18",
    still_used: false,
    notes: "Old Instagram account from before Carti blew up. Abandoned after gaining popularity.",
    link: "Deleted",
    thumbnail: null
  }
];

export const platforms = Array.from(new Set(socialMediaAccounts.map(account => account.platform)));
export const eras = Array.from(new Set(socialMediaAccounts.map(account => account.era)));
