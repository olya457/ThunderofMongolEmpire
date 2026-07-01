import {images} from '../assets';
import type {HistoricalSite} from '../types/content';

export const historicalSites: HistoricalSite[] = [
  {
    id: 'kharkhorin',
    name: 'Kharkhorin, Mongolia',
    coordinates: '47.1975° N, 102.8238° E',
    shortDescription: 'Ancient capital of empire',
    image: images.siteKharkhorin,
    mapQuery: '47.1975,102.8238',
    paragraphs: [
      'Kharkhorin stands near the site of ancient Karakorum, the capital associated with the Mongol Empire during the thirteenth century. Leaders, merchants, diplomats, and religious figures from many regions gathered in this important city. Its position reflected the empire\'s wide connections across Eurasia. Although much of the original city has disappeared, its historical importance remains immense.',
      'Today, visitors can explore archaeological remains and learn about one of history\'s great imperial centers. Excavations continue to reveal streets, workshops, and building traces beneath the ground. The surrounding landscape preserves the open atmosphere of the Mongolian steppe. Kharkhorin remains one of Mongolia\'s most meaningful historical destinations.',
    ],
  },
  {
    id: 'erdene-zuu',
    name: 'Erdene Zuu Monastery',
    coordinates: '47.2006° N, 102.8425° E',
    shortDescription: 'Sacred walls near Karakorum',
    image: images.siteErdeneZuu,
    mapQuery: '47.2006,102.8425',
    paragraphs: [
      'Built in 1586, Erdene Zuu is Mongolia\'s oldest surviving Buddhist monastery. It was constructed near ancient Karakorum and used stones linked to the old imperial city. White walls and beautiful temples surround courtyards filled with history. The monastery became an important religious center after the age of the empire.',
      'Today it remains one of Mongolia\'s most visited cultural landmarks. Visitors admire its traditional architecture, colorful artwork, and historic temples. The site connects imperial heritage with later Buddhist traditions. It is recognized as part of the Orkhon Valley UNESCO World Heritage landscape.',
    ],
  },
  {
    id: 'orkhon-valley',
    name: 'Orkhon Valley Cultural Landscape',
    coordinates: '47.5567° N, 102.8264° E',
    shortDescription: 'Heartland of steppe empires',
    image: images.siteOrkhon,
    mapQuery: '47.5567,102.8264',
    paragraphs: [
      'The Orkhon Valley served as a political and cultural center for steppe empires over many centuries. Fertile grasslands and rivers made it valuable for seasonal settlement and herding. During the Mongol Empire, the valley supported the capital region of Karakorum. Its history reflects the long development of nomadic state traditions.',
      'Today the valley is protected as a UNESCO World Heritage Site. Visitors can explore archaeological remains, ancient monuments, and wide natural scenery. Traditional nomadic families still live in the region. The landscape combines deep history with living culture.',
    ],
  },
  {
    id: 'burkhan-khaldun',
    name: 'Burkhan Khaldun Mountain',
    coordinates: '48.7586° N, 109.0097° E',
    shortDescription: 'Sacred mountain of Genghis',
    image: images.siteBurkhan,
    mapQuery: '48.7586,109.0097',
    paragraphs: [
      'Burkhan Khaldun is one of Mongolia\'s most sacred mountains and is closely connected with traditions about Genghis Khan. According to historical memory, he sought refuge in this region during his youth. The mountain symbolizes protection, strength, and respect for the natural world. It remains deeply significant in Mongolian culture.',
      'The area is surrounded by forests, rivers, and remote wilderness. Access is carefully protected to preserve its cultural and environmental importance. Visitors appreciate both its historical legacy and dramatic scenery. The region continues to inspire respect for ancient Mongolian traditions.',
    ],
  },
  {
    id: 'genghis-statue',
    name: 'Genghis Khan Statue Complex',
    coordinates: '47.8079° N, 107.5369° E',
    shortDescription: 'Modern tribute to founder',
    image: images.siteStatue,
    mapQuery: '47.8079,107.5369',
    paragraphs: [
      'The Genghis Khan Statue Complex features one of the world\'s largest equestrian statues. The stainless-steel monument honors the founder of the Mongol Empire in a modern architectural form. Exhibitions at the site introduce visitors to Mongolian history and culture. It has become one of the country\'s most recognizable landmarks.',
      'Visitors can climb inside the statue for panoramic views of the surrounding steppe. Museum displays present artifacts, maps, and historical information. The complex combines modern design with national heritage. It is a popular destination for travelers from around the world.',
    ],
  },
  {
    id: 'avarga-ruins',
    name: 'Avarga Ruins',
    coordinates: '47.6350° N, 111.1700° E',
    shortDescription: 'Early seat of Genghis',
    image: images.siteAvarga,
    mapQuery: '47.6350,111.1700',
    paragraphs: [
      'Avarga is believed to have been one of Genghis Khan\'s early headquarters before Karakorum became the imperial capital. Archaeologists have uncovered remains that help explain the early years of Mongol state formation. The site reflects a transition from tribal leadership toward imperial administration. Its discoveries continue to expand historical knowledge.',
      'Only foundations and archaeological traces remain visible today. Visitors experience the quiet atmosphere of the open steppe while imagining the empire\'s beginnings. Informational displays explain why the location matters to Mongolian heritage. Avarga remains an essential place for understanding the rise of Mongol power.',
    ],
  },
  {
    id: 'kherlen-river',
    name: 'Kherlen River Region',
    coordinates: '48.0000° N, 110.0000° E',
    shortDescription: 'Steppe routes and homeland',
    image: images.siteKherlen,
    mapQuery: '48.0000,110.0000',
    paragraphs: [
      'The Kherlen River region is traditionally associated with the homeland of Genghis Khan and early Mongol tribes. Fertile grasslands supported horses and livestock that formed the basis of nomadic life. Rivers provided fresh water for people, animals, and seasonal movement. This landscape helped shape the culture that later built a vast empire.',
      'Today the region remains one of Mongolia\'s beautiful natural areas. Visitors can experience open plains, traditional settlements, and expansive steppe views. Many legends and historical memories are connected to these lands. The peaceful scenery offers a glimpse into the world of the early Mongols.',
    ],
  },
  {
    id: 'national-museum',
    name: 'National Museum of Mongolia',
    coordinates: '47.9214° N, 106.9186° E',
    shortDescription: 'Artifacts of Mongol history',
    image: images.siteMuseum,
    mapQuery: '47.9214,106.9186',
    paragraphs: [
      'The National Museum of Mongolia houses major collections dedicated to Mongolian history and culture. Exhibits cover prehistoric communities, the Mongol Empire, nomadic life, and modern Mongolia. Artifacts, clothing, tools, and historical documents help tell the nation\'s story. The museum offers an excellent introduction to Mongolia\'s rich heritage.',
      'Modern displays make the collections accessible for visitors of many ages. Educational exhibits explain the rise of the Mongol Empire and its wider influence. The museum preserves important historical treasures for future generations. It is one of the best places to begin exploring Mongolia\'s past.',
    ],
  },
];

export const siteById = Object.fromEntries(
  historicalSites.map(site => [site.id, site]),
) as Record<string, HistoricalSite>;
