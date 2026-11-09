import type { VocabularyWord } from '@/data/words';

export const environmentWords: VocabularyWord[] = [
  {
    word: 'biodiversity',
    topic: 'environment',
    meaning: 'biyoçeşitlilik',
    definition: {
      en: 'The variety of plant and animal life in an area.',
      tr: 'Bir bölgedeki bitki ve hayvan yaşamının çeşitliliği.',
    },
    example: {
      en: 'Deforestation threatens the biodiversity of the rainforest.',
      tr: 'Ormansızlaşma, yağmur ormanlarının biyoçeşitliliğini tehdit ediyor.',
    },
    synonyms: ['diversity', 'variety'],
  },
  {
    word: 'emission',
    topic: 'environment',
    meaning: 'emisyon, salım',
    definition: {
      en: 'Gas or other substance released into the air.',
      tr: 'Havaya salınan gaz ya da başka bir madde.',
    },
    example: {
      en: 'Factories must reduce their carbon emissions.',
      tr: 'Fabrikalar karbon emisyonlarını azaltmak zorundadır.',
    },
    synonyms: ['release', 'discharge'],
  },
  {
    word: 'conserve',
    topic: 'environment',
    meaning: 'korumak, saklamak',
    definition: {
      en: 'To protect something from harm or loss.',
      tr: 'Bir şeyi zarardan ya da kayıptan korumak.',
    },
    example: {
      en: 'Governments must conserve forests and wetlands.',
      tr: 'Hükümetler ormanları ve sulak alanları korumalıdır.',
    },
    synonyms: ['preserve', 'protect'],
  },
  {
    word: 'degrade',
    topic: 'environment',
    meaning: 'parçalanmak, bozulmak',
    definition: {
      en: 'To break down or reduce in quality.',
      tr: 'Parçalanmak ya da kalitesi düşmek.',
    },
    example: {
      en: 'Plastic can take centuries to degrade in the ocean.',
      tr: 'Plastik, okyanusta parçalanmak için yüzyıllar alabilir.',
    },
    synonyms: ['decompose', 'deteriorate'],
  },
  {
    word: 'erosion',
    topic: 'environment',
    meaning: 'erozyon, aşınma',
    definition: {
      en: 'The gradual wearing away of soil or rock.',
      tr: 'Toprağın ya da kayaların yavaş yavaş aşınması.',
    },
    example: {
      en: 'Heavy rain caused severe erosion on the hillside.',
      tr: 'Şiddetli yağmur, tepede ciddi erozyona yol açtı.',
    },
    synonyms: ['wear', 'abrasion'],
  },
  {
    word: 'pollutant',
    topic: 'environment',
    meaning: 'kirletici madde',
    definition: {
      en: 'A substance that makes air, water or soil dirty or harmful.',
      tr: 'Havayı, suyu ya da toprağı kirleten ya da zararlı hâle getiren madde.',
    },
    example: {
      en: 'Industrial pollutants have entered the river.',
      tr: 'Endüstriyel kirleticiler nehre karıştı.',
    },
    synonyms: ['contaminant', 'toxin'],
  },
  {
    word: 'renewable',
    topic: 'environment',
    meaning: 'yenilenebilir',
    definition: {
      en: 'Able to be replaced naturally and not run out.',
      tr: 'Doğal yollarla yenilenebilen ve tükenmeyen.',
    },
    example: {
      en: 'Wind and solar are renewable sources of energy.',
      tr: 'Rüzgâr ve güneş, yenilenebilir enerji kaynaklarıdır.',
    },
    synonyms: ['sustainable', 'inexhaustible'],
  },
  {
    word: 'habitat',
    topic: 'environment',
    meaning: 'yaşam alanı, habitat',
    definition: {
      en: 'The natural home of a plant or animal.',
      tr: 'Bir bitki ya da hayvanın doğal yaşam ortamı.',
    },
    example: {
      en: 'Wetlands provide a habitat for many birds.',
      tr: 'Sulak alanlar birçok kuşa yaşam alanı sağlar.',
    },
    synonyms: ['environment', 'ecosystem'],
  },
  {
    word: 'ecosystem',
    topic: 'environment',
    meaning: 'ekosistem',
    definition: {
      en: 'A community of living things and their environment.',
      tr: 'Canlılardan ve çevrelerinden oluşan topluluk.',
    },
    example: {
      en: 'Coral reefs form a fragile ecosystem.',
      tr: 'Mercan resifleri kırılgan bir ekosistem oluşturur.',
    },
    synonyms: ['habitat', 'biome'],
  },
  {
    word: 'drought',
    topic: 'environment',
    meaning: 'kuraklık',
    definition: {
      en: 'A long period with little or no rain.',
      tr: 'Çok az yağış ya da hiç yağış olmayan uzun dönem.',
    },
    example: {
      en: 'The drought destroyed crops across the region.',
      tr: 'Kuraklık, bölgedeki ürünleri yok etti.',
    },
    synonyms: ['dryness', 'water shortage'],
  },
  {
    word: 'fossil',
    topic: 'environment',
    meaning: 'fosil',
    definition: {
      en: 'Remains or traces of ancient plants or animals preserved in rock.',
      tr: 'Kayalarda korunmuş eski bitki ya da hayvan kalıntıları.',
    },
    example: {
      en: 'Fossil fuels such as coal release large amounts of carbon.',
      tr: 'Kömür gibi fosil yakıtlar büyük miktarda karbon salar.',
    },
    synonyms: ['remains', 'relic'],
  },
  {
    word: 'adapt',
    topic: 'environment',
    meaning: 'uyum sağlamak, uyarlamak',
    definition: {
      en: 'To adjust to new conditions.',
      tr: 'Yeni koşullara uyum sağlamak.',
    },
    example: {
      en: 'Farmers must adapt to changing rainfall patterns.',
      tr: 'Çiftçiler, değişen yağış düzenlerine uyum sağlamalıdır.',
    },
    synonyms: ['adjust', 'accommodate'],
  },
  {
    word: 'climate',
    topic: 'environment',
    meaning: 'iklim',
    definition: {
      en: 'The typical weather conditions of a region over time.',
      tr: 'Bir bölgenin uzun dönemdeki tipik hava koşulları.',
    },
    example: {
      en: 'Rising temperatures are changing the climate of the Arctic.',
      tr: 'Artan sıcaklıklar Arktik bölgesinin iklimini değiştiriyor.',
    },
    synonyms: ['weather pattern', 'environment'],
  },
  {
    word: 'deforestation',
    topic: 'environment',
    meaning: 'ormansızlaşma',
    definition: {
      en: 'Clearing of forests on a large scale.',
      tr: 'Ormanların geniş ölçüde yok edilmesi.',
    },
    example: {
      en: 'Deforestation has reduced the forest cover by a fifth.',
      tr: 'Ormansızlaşma, orman örtüsünü beşte bir oranında azalttı.',
    },
    synonyms: ['clearing', 'logging'],
  },
  {
    word: 'pristine',
    topic: 'environment',
    meaning: 'bozulmamış, saf',
    definition: {
      en: 'In its original, untouched condition.',
      tr: 'Özgün, dokunulmamış hâlinde.',
    },
    example: {
      en: 'The lake remains pristine because few people visit it.',
      tr: 'Göl hâlâ bozulmamış durumda; çok az kişi ziyaret ediyor.',
    },
    synonyms: ['unspoiled', 'untouched'],
  },
  {
    word: 'scarce',
    topic: 'environment',
    meaning: 'kıt, az bulunan',
    definition: {
      en: 'Existing in small amounts; hard to find.',
      tr: 'Az miktarda bulunan; bulunması zor.',
    },
    example: {
      en: 'Clean water is scarce in many dry areas.',
      tr: 'Temiz su, birçok kurak bölgede kıttır.',
    },
    synonyms: ['rare', 'limited'],
  },
  {
    word: 'sustain',
    topic: 'environment',
    meaning: 'sürdürmek, desteklemek',
    definition: {
      en: 'To keep something going over time; support life.',
      tr: 'Bir şeyi zaman içinde sürdürmek; yaşamı desteklemek.',
    },
    example: {
      en: 'The land can sustain only a small population.',
      tr: 'Bu toprak yalnızca küçük bir nüfusu besleyebilir.',
    },
    synonyms: ['maintain', 'support'],
  },
  {
    word: 'pesticide',
    topic: 'environment',
    meaning: 'pestisit, böcek ilacı',
    definition: {
      en: 'A chemical used to kill insects or pests.',
      tr: 'Böcekleri ya da zararlıları öldürmek için kullanılan kimyasal.',
    },
    example: {
      en: 'Excessive pesticide use harms bees and other insects.',
      tr: 'Aşırı pestisit kullanımı arıları ve diğer böcekleri zarar verir.',
    },
    synonyms: ['insecticide', 'chemical'],
  },
  {
    word: 'waste',
    topic: 'environment',
    meaning: 'atık, çöp',
    definition: {
      en: 'Material that is no longer needed and is thrown away.',
      tr: 'Artık gerekmeyen ve atılan malzeme.',
    },
    example: {
      en: 'The city recycles most of its household waste.',
      tr: 'Şehir, evsel atıklarının çoğunu geri dönüştürüyor.',
    },
    synonyms: ['refuse', 'garbage'],
  },
  {
    word: 'ozone',
    topic: 'environment',
    meaning: 'ozon',
    definition: {
      en: 'A layer of gas in the upper atmosphere that blocks harmful sunlight.',
      tr: 'Zararlı güneş ışınlarını engelleyen, üst atmosferdeki gaz tabakası.',
    },
    example: {
      en: 'Scientists observed a hole in the ozone layer above Antarctica.',
      tr: 'Bilim insanları, Antarktika üzerinde ozon tabakasında bir delik gözlemledi.',
    },
    synonyms: ['atmosphere', 'shield'],
  },
];
