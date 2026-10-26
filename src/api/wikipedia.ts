export interface WikipediaInfo {
extract: string
image: string | null
url: string
}



// Landmärken för fler länder
const countryLandmarks: Record<string, string> = {
  France: 'Eiffel Tower',
  Italy: 'Leaning Tower of Pisa',
  Japan: 'Itsukushima Shrine',
  India: 'Taj Mahal',
  Egypt: 'Pyramids of Giza',
  Greece: 'Acropolis of Athens',
  Brazil: 'Christ the Redeemer',
  'United States': 'Statue of Liberty',
  'United Kingdom': 'Big Ben',
  Australia: 'Sydney Opera House',
  Thailand: 'Wat Phra Kaew',
  Turkey: 'Hagia Sophia',
  China: 'Great Wall of China',
  Germany: 'Brandenburg Gate',
  Spain: 'Sagrada Familia',
  Sweden: 'Stockholm City Hall',
  Norway: 'Heddal Stave Church',
  Finland: 'Helsinki Cathedral',
  Denmark: 'The Little Mermaid',
  Netherlands: 'Dom Tower of Utrecht',
  Canada: 'CN Tower',
  Mexico: 'Chichen Itza',
  Peru: 'Machu Picchu',
  Jordan: 'Petra',
  Cambodia: 'Angkor Wat',
  Indonesia: 'Borobudur',
  Malaysia: 'Petronas Towers',
  Singapore: 'Marina Bay Sands',
  'South Korea': 'Gyeongbokgung Palace',
  Nepal: 'Boudhanath Stupa',
  Pakistan: 'Faisal Mosque',
  'New Zealand': 'Sky Tower',
  Ireland: 'Dublin Castle',
  Portugal: 'Sintra',
  Austria: 'Schönbrunn Palace',
  Switzerland: 'Chapel Bridge',
  Belgium: 'Atomium',
  Poland: 'St. Mary’s Basilica, Kraków',
  Czechia: 'Prague Castle',
  Hungary: 'Hungarian Parliament Building',
  Iceland: 'Hallgrimskirkja',
  Russia: "Saint Basil's Cathedral",
  Morocco: 'Koutoubia Mosque',
  'South Africa': 'Voortrekker Monument',
  Nigeria: 'Zuma Rock',
  Kenya: 'Uhuru Gardens',
  Tanzania: 'Mount Kilimanjaro',
  Ethiopia: 'Lion of Judah Monument',
  Argentina: 'National Congress of Argentina',
  Chile: 'Easter Island',
  Colombia: 'Las Lajas Sanctuary',
  Cuba: 'El Capitolio',
  Afghanistan: 'Kart-e Sakhi Mosque',
  Bangladesh: 'Jatiyo Smriti Soudho',
  Vietnam: 'Golden Bridge',
  Philippines: 'Rizal Monument',
  Iraq: 'Great Mosque of Samarra',
  Iran: 'Azadi Tower',
  Israel: 'Dome of the Rock',
  Lebanon: 'Mohammad Al-Amin Mosque',
  'Saudi Arabia': 'Kaaba',
  'United Arab Emirates': 'Burj Khalifa',
  Qatar: 'Pearl Monument',
  Oman: 'Nakhal Fort',
  Uzbekistan: 'Bibi-Khanym Mosque',
  Kazakhstan: 'Bayterek Tower',
  Ukraine: 'Motherland Monument',
  Romania: 'Palace of the Parliament',
  Bulgaria: 'Alexander Nevsky Cathedral',
  Croatia: 'Dubrovnik Walls',
  Serbia: 'Church of Saint Sava',
  Slovenia: 'Bled Castle',
  Slovakia: 'Bratislava Castle',
  Estonia: 'St. Olaf’s Church',
  Latvia: 'House of the Blackheads',
  Lithuania: 'Trakai Island Castle',
  Luxembourg: 'Vianden Castle',
  Malta: 'St. John’s Co-Cathedral',
  Cyprus: 'Tombs of the Kings',
  Albania: 'Skanderbeg Monument',
  Armenia: 'Sewanawank',
  Georgia: 'Gergeti Trinity Church',
  Azerbaijan: 'Flame Towers',
  Taiwan: 'Taipei 101',
  Laos: 'Pha That Luang',
  Myanmar: 'Shwedagon Pagoda',
 'Sri Lanka': 'Sigiriya',
  Bhutan: 'Tiger’s Nest',
  Maldives: 'Old Friday Mosque',
  Mongolia: 'Genghis Khan Equestrian Statue',
  Uruguay: 'Palacio Salvo',
  Paraguay: 'Palacio de López',
  Bolivia: 'Cristo de la Concordia',
  Ecuador: 'Mitad del Mundo',
  Guatemala: 'Tikal',
  Honduras: 'Basilica de Suyapa',
  Nicaragua: 'Cathedral of Granada',
  'El Salvador': 'Monument to the Savior of the World',
  Panama: 'F&F Tower',
  Jamaica: 'Rose Hall',
  Haiti: 'Citadelle Laferrière',
  'Dominican Republic': 'Monument to the Heroes of the Restoration',
  'Costa Rica': 'National Theatre of Costa Rica',
  'Ivory Coast': 'Basilica of Our Lady of Peace',
  Senegal: 'African Renaissance Monument',
  Mali: 'Great Mosque of Djenné',
  Niger: 'Grand Mosque of Niamey',
  Cameroon: 'Reunification Monument',
  'Democratic Republic of the Congo': 'Nyiragongo',
  Angola: 'Mausoleum of Agostinho Neto',
  Zimbabwe: 'Great Zimbabwe',
  Zambia: 'National Heroes Monument',
  Botswana: 'Three Dikgosi Monument',
  Namibia: 'Lutheran Christ Church',
  Madagascar: 'Queen’s Palace',
  Mauritius: 'Fort Adelaide',
  Seychelles: 'Clock Tower, Victoria',
  Rwanda: 'Camp Kigali Memorial',
  Uganda: 'Independence Monument, Kampala',
  Mozambique: 'Maputo Railway Station',
  Benin: 'Monument Amazone',
  Togo: 'Independence Monument, Lomé',
  Gambia: 'Arch 22',
  Guinea: 'Grand Mosque of Conakry',
  Mauritania: 'Chinguetti',
  Somalia: 'Mogadishu Cathedral',
  Sudan: 'Pyramids of Meroë',
  Libya: 'Sabratha',
  Tunisia: 'El Jem Amphitheatre',
  Algeria: 'Maqam Echahid',
  Eritrea: 'Asmara Cathedral',
  Djibouti: 'Hamoudi Mosque',
  Burundi: 'Independence Monument, Bujumbura',
  Lesotho: 'Thaba Bosiu',
  Eswatini: 'Mantenga Cultural Village',
  Malawi: 'Independence Monument, Lilongwe',
  'Papua New Guinea': 'Madang Lighthouse',
  Fiji: 'Sri Siva Subramaniya Temple',
  Samoa: 'Fetu Ao Lima',
  Tonga: 'Ha’amonga ʻa Maui',
  Vanuatu: 'Ambrym',
  Kiribati: 'Independence Monument, Tarawa',
  Tuvalu: 'Government Building, Funafuti',
  Palau: 'National Capitol of Palau',
  Nauru: 'Parliament House, Yaren',
  Micronesia: 'Nan Madol',
  'Marshall Islands': 'Alele Museum',
  'Solomon Islands': 'National Parliament of Solomon Islands',
  'Sao Tome and Principe': 'Pico Cão Grande',
  Comoros: 'Old Friday Mosque',
  'Cape Verde': 'Our Lady of Grace Cathedral',
  Andorra: 'Church of Sant Esteve',
  Monaco: 'Monte Carlo Casino',
  Liechtenstein: 'Vaduz Castle',
  'San Marino': 'Guaita Tower',
  Montenegro: 'Perast Islands',
  'North Macedonia': 'Monument of Alexander the Great',
  Moldova: 'Triumphal Arch, Chișinău',
  Belarus: 'Mir Castle',
  Palestine: 'Church of the Nativity',
  'Vatican City': "St Peter's Basilica",
  'Antigua and Barbuda': "Betty's Hope",
  'Saint Lucia': 'Petit Piton',
  'Trinidad and Tobago': 'Temple in the Sea',
  Grenada: 'Fort George',
  Dominica: 'Morne Bruce',
  'Saint Vincent and the Grenadines': 'Kingstown Cathedral',
  'Saint Kitts and Nevis': 'Brimstone Hill Fortress',
  'Equatorial Guinea': 'Malabo Cathedral',
  'Central African Republic': 'Notre-Dame of Bangui',
  Gabon: 'Hassan II Mosque',
  Chad: "Grand Mosque of N'Djamena",
  'Burkina Faso': 'Grand Mosque of Bobo-Dioulasso',
  'Guinea-Bissau': 'Fortaleza de Amura',
  'South Sudan': 'John Garang Mausoleum',
  Kosovo: 'Newborn Monument',
  Aruba: 'California Lighthouse',
Bahrain: 'Bahrain World Trade Center',
Barbados: 'George Washington House',
Belize: 'Great Blue Hole',
Brunei: 'Sultan Omar Ali Saifuddien Mosque',
'North Korea': 'Juche Tower',
'Western Sahara': 'Dakhla',
'Timor-Leste': 'Cristo Rei of Dili',
'Congo': 'Basilica of Saint Anne, Brazzaville',
'United States Virgin Islands': 'Blackbeard Castle',
'British Virgin Islands': 'The Baths',
'Turks and Caicos Islands': 'Chalk Sound',
'Cayman Islands': 'Pedro St. James Castle',
Bermuda: 'Gibb’s Hill Lighthouse',
Greenland: 'Ilulissat Icefjord',
'Faroe Islands': 'Múlafossur Waterfall',
'French Polynesia': 'Mount Otemanu',
'New Caledonia': 'Amedee Lighthouse',
'Cook Islands': 'Te Rua Manga',
'American Samoa': 'Mount Alava',
'Northern Mariana Islands': 'Banzai Cliff',
  Bahamas: 'Atlantis Paradise Island',
  'Federated States of Micronesia': 'Nan Madol',
  'Republic of the Congo': 'Basilica of Saint Anne, Brazzaville',
  'United States Minor Outlying Islands': 'Wake Island',
  'Christmas Island': 'Flying Fish Cove',
  'Cocos (Keeling) Islands': 'Direction Island',
  'Norfolk Island': 'Norfolk Island Pines',
  'Heard Island and McDonald Islands': 'Big Ben',
  'Bouvet Island': 'Bouvet Island',
  'South Georgia': 'King Edward Point',
  'British Indian Ocean Territory': 'Diego Garcia',

}

export async function getWikipediaInfo(
  countryName: string
): Promise<WikipediaInfo> {
  const landmark = countryLandmarks[countryName]

  // 1. Hämta landets beskrivning från Wikipedias API.
  let extract = ''

  const wikipediaTitles = [
    countryName,
    ...(landmark ? [landmark] : []),
  ]

  for (const title of wikipediaTitles) {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          title.replace(/ /g, '_')
        )}`
      )

      if (!response.ok) continue

      const data = await response.json()

      if (data.extract) {
        extract = data.extract
        break
      }
    } catch (error) {
      console.error(`Description failed for ${title}:`, error)
    }
  }

  // 2. Sök efter en bild av landmärket eller landet.
  const searches = landmark
    ? [`"${landmark}"`, `${landmark} ${countryName}`, countryName]
    : [`${countryName} landmark`, countryName]

  for (const searchTerm of searches) {
    try {
      const searchUrl = new URL(
        'https://commons.wikimedia.org/w/api.php'
      )

      searchUrl.search = new URLSearchParams({
        action: 'query',
        generator: 'search',
        gsrsearch: searchTerm,
        gsrnamespace: '6',
        gsrlimit: '20',
        prop: 'imageinfo',
        iiprop: 'url',
        iiurlwidth: '800',
        format: 'json',
        origin: '*',
      }).toString()

      const response = await fetch(searchUrl.toString())

      if (!response.ok) continue

      const data = await response.json()

      const pages = Object.values(
        data.query?.pages || {}
      ) as Array<{
        title: string
        imageinfo?: Array<{
          thumburl?: string
          url?: string
        }>
      }>

      if (pages.length === 0) continue

      const normalize = (value: string) =>
        value
          .toLowerCase()
          .replace(/^file:/, '')
          .replace(/\.[a-z0-9]+$/i, '')
          .replace(/[^a-z0-9]+/g, ' ')
          .trim()

      const landmarkWords = landmark
        ? normalize(landmark)
            .split(' ')
            .filter((word) => word.length > 2)
        : []

      const rankedPages = pages
        .filter((page) =>
          Boolean(
            page.imageinfo?.[0]?.thumburl ||
            page.imageinfo?.[0]?.url
          )
        )
        .map((page) => {
          const title = normalize(page.title)

          const landmarkMatches = landmarkWords.filter(
            (word) => title.includes(word)
          ).length

          const countryMatches = normalize(countryName)
            .split(' ')
            .filter(
              (word) => word.length > 2 && title.includes(word)
            ).length

          return {
            page,
            score: landmarkMatches * 2 + countryMatches,
          }
        })
        .sort((a, b) => b.score - a.score)

      // När ett landmärke finns, prioritera bildnamn som matchar det.
      // Annars kan vi använda en bild som matchar landets namn.
      const bestMatch = rankedPages.find((item) =>
        landmark
          ? item.score > 0
          : item.score > 0
      )

      if (bestMatch) {
        const page = bestMatch.page
        const image =
          page.imageinfo?.[0]?.thumburl ||
          page.imageinfo?.[0]?.url ||
          null

        if (image) {
          return {
            extract: extract || landmark || `Explore ${countryName}.`,
            image,
            url: `https://commons.wikimedia.org/wiki/${encodeURIComponent(
              page.title.replace(/ /g, '_')
            )}`,
          }
        }
      }
    } catch (error) {
      console.error(`Image search failed for ${countryName}:`, error)
    }
  }

  // 3. Om ingen bild hittas, behåll beskrivningen och en relevant länk.
  return {
    extract:
      extract ||
      (landmark
        ? `Landmark: ${landmark}.`
        : `Explore ${countryName} and learn about its landmarks.`),
    image: null,
    url: `https://en.wikipedia.org/wiki/${encodeURIComponent(countryName)}`,
  }
}

