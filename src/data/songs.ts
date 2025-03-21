
export interface Song {
  id: number;
  name: string;
  era: string;
  primary_tab_name: string;
  subsection_name: string | null;
  type: string;
  quality: string;
  leak_date: string;
  producer: string | null;
  features: string | null;
  year: string;
  popularity: string;
}

// Mock data for songs - in a real app, this would come from your data source
export const songs: Song[] = [
  { id: 1, name: "HOMIXIDE", era: "Music", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 15, 2023", producer: "F1LTHY", features: null, year: "2023", popularity: "High" },
  { id: 2, name: "BACKR00MS (ft. Travis Scott)", era: "Music", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 15, 2023", producer: "Wheezy", features: "Travis Scott", year: "2023", popularity: "High" },
  { id: 3, name: "KING BOB", era: "Music", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 15, 2023", producer: "F1LTHY", features: null, year: "2023", popularity: "Medium" },
  { id: 4, name: "H00DBYAIR", era: "Music", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 15, 2023", producer: "Art Dealer", features: null, year: "2023", popularity: "Medium" },
  { id: 5, name: "I'M SO CRAZY", era: "WLR V1", primary_tab_name: "⭐ Best Of", subsection_name: "Top Tier", type: "Studio Session", quality: "256kbps", leak_date: "November 27, 2023", producer: "Pi'erre Bourne", features: null, year: "2019", popularity: "High" },
  { id: 6, name: "XTCY", era: "Die Lit", primary_tab_name: "⭐ Best Of", subsection_name: "Top Tier", type: "CDQ", quality: "320kbps", leak_date: "October 15, 2023", producer: "Pi'erre Bourne", features: null, year: "2018", popularity: "Medium" },
  { id: 7, name: "PLACE", era: "WLR", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 25, 2020", producer: "Art Dealer", features: null, year: "2020", popularity: "High" },
  { id: 8, name: "SKY", era: "WLR", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 25, 2020", producer: "Art Dealer", features: null, year: "2020", popularity: "High" },
  { id: 9, name: "MOLLY", era: "WLR V1", primary_tab_name: "🏆 Grails", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "September 5, 2022", producer: "RonaBeats", features: null, year: "2019", popularity: "High" },
  { id: 10, name: "CANCUN", era: "WLR V1", primary_tab_name: "🏆 Grails", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "July 12, 2022", producer: "Richie Souf", features: null, year: "2019", popularity: "High" },
  { id: 11, name: "MONEY & DRUGS", era: "WLR V2", primary_tab_name: "🏆 Grails", subsection_name: null, type: "Snippet", quality: "128kbps", leak_date: "January 5, 2023", producer: "Jetson", features: "Post Malone", year: "2020", popularity: "Medium" },
  { id: 12, name: "PISSY PAMPER (ft. Young Nudy)", era: "WLR V1", primary_tab_name: "🏆 Grails", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "April 18, 2021", producer: "Pi'erre Bourne", features: "Young Nudy", year: "2019", popularity: "High" },
  { id: 13, name: "FELL IN LUV (ft. Bryson Tiller)", era: "Die Lit", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "May 11, 2018", producer: "Pi'erre Bourne", features: "Bryson Tiller", year: "2018", popularity: "Medium" },
  { id: 14, name: "FASHION KILLA", era: "WLR V1", primary_tab_name: "⭐ Best Of", subsection_name: "Top Tier", type: "LQ", quality: "96kbps", leak_date: "March 12, 2022", producer: "F1LTHY", features: null, year: "2019", popularity: "Low" },
  { id: 15, name: "ROCKSTAR MADE", era: "WLR", primary_tab_name: "Released", subsection_name: null, type: "CDQ", quality: "320kbps", leak_date: "December 25, 2020", producer: "F1LTHY", features: null, year: "2020", popularity: "High" }
];
