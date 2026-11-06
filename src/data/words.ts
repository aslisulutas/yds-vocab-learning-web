import type { TranslationKey } from '@/i18n/translations';

export type TopicId = 'academic' | 'business' | 'science' | 'health';

export interface LocalizedText {
  en: string;
  tr: string;
}

export interface VocabularyWord {
  word: string;
  topic: TopicId;
  meaning: string;
  definition: LocalizedText;
  example: LocalizedText;
  synonyms: string[];
}

export const topicLabelKeys: Record<TopicId, TranslationKey> = {
  academic: 'topic.academic',
  business: 'topic.business',
  science: 'topic.science',
  health: 'topic.health',
};

export const topicIds = Object.keys(topicLabelKeys) as TopicId[];

export const vocabulary: VocabularyWord[] = [
  {
    word: 'analyze',
    topic: 'academic',
    meaning: 'analiz etmek',
    definition: {
      en: 'To examine something in detail in order to understand it.',
      tr: 'Bir şeyi anlamak için ayrıntılı biçimde incelemek.',
    },
    example: {
      en: 'The researchers analyzed the data over three months.',
      tr: 'Araştırmacılar verileri üç ay boyunca analiz etti.',
    },
    synonyms: ['examine', 'evaluate'],
  },
  {
    word: 'hypothesis',
    topic: 'academic',
    meaning: 'hipotez, varsayım',
    definition: {
      en: 'A proposed explanation that can be tested through research.',
      tr: 'Araştırma yoluyla sınanabilen önerilen bir açıklama.',
    },
    example: {
      en: 'The experiment was designed to test her hypothesis.',
      tr: 'Deney, onun hipotezini sınamak için tasarlandı.',
    },
    synonyms: ['assumption', 'theory'],
  },
  {
    word: 'substantial',
    topic: 'academic',
    meaning: 'önemli, kayda değer',
    definition: {
      en: 'Large in amount or size; important and significant.',
      tr: 'Miktar ya da boyut olarak büyük; önemli ve anlamlı.',
    },
    example: {
      en: 'The study made a substantial contribution to the field.',
      tr: 'Çalışma, bu alana önemli bir katkı sağladı.',
    },
    synonyms: ['considerable', 'significant'],
  },
  {
    word: 'comprehensive',
    topic: 'academic',
    meaning: 'kapsamlı',
    definition: {
      en: 'Including everything that is necessary; complete.',
      tr: 'Gerekli olan her şeyi içeren; eksiksiz.',
    },
    example: {
      en: 'The report offers a comprehensive review of recent literature.',
      tr: 'Rapor, son dönem literatürün kapsamlı bir incelemesini sunuyor.',
    },
    synonyms: ['thorough', 'complete'],
  },
  {
    word: 'inherent',
    topic: 'academic',
    meaning: 'doğuştan var olan, özünde bulunan',
    definition: {
      en: 'Existing as a natural or essential part of something.',
      tr: 'Bir şeyin doğal ya da temel bir parçası olarak var olan.',
    },
    example: {
      en: 'There is an inherent risk in every new experiment.',
      tr: 'Her yeni deneyde doğal bir risk bulunur.',
    },
    synonyms: ['intrinsic', 'innate'],
  },
  {
    word: 'revenue',
    topic: 'business',
    meaning: 'gelir, hasılat',
    definition: {
      en: 'Income that a business generates from its activities.',
      tr: 'Bir işletmenin faaliyetlerinden elde ettiği gelir.',
    },
    example: {
      en: 'Annual revenue increased by twelve percent.',
      tr: 'Yıllık gelir yüzde on iki arttı.',
    },
    synonyms: ['income', 'earnings'],
  },
  {
    word: 'allocate',
    topic: 'business',
    meaning: 'tahsis etmek, ayırmak',
    definition: {
      en: 'To set aside resources for a particular purpose.',
      tr: 'Belirli bir amaç için kaynak ayırmak.',
    },
    example: {
      en: 'The board decided to allocate more funds to research.',
      tr: 'Yönetim kurulu, araştırmaya daha fazla fon ayırmaya karar verdi.',
    },
    synonyms: ['assign', 'distribute'],
  },
  {
    word: 'negotiate',
    topic: 'business',
    meaning: 'müzakere etmek, pazarlık etmek',
    definition: {
      en: 'To discuss something in order to reach an agreement.',
      tr: 'Bir anlaşmaya varmak için bir konuyu görüşmek.',
    },
    example: {
      en: 'The two companies negotiated the terms for several weeks.',
      tr: 'İki şirket şartlar üzerinde haftalarca müzakere etti.',
    },
    synonyms: ['bargain', 'discuss'],
  },
  {
    word: 'sustainable',
    topic: 'business',
    meaning: 'sürdürülebilir',
    definition: {
      en: 'Able to continue over a period of time without causing lasting harm.',
      tr: 'Kalıcı zarar vermeden uzun süre devam edebilen.',
    },
    example: {
      en: 'We need a sustainable plan for future growth.',
      tr: 'Gelecekteki büyüme için sürdürülebilir bir plana ihtiyacımız var.',
    },
    synonyms: ['viable', 'lasting'],
  },
  {
    word: 'incentive',
    topic: 'business',
    meaning: 'teşvik',
    definition: {
      en: 'Something that encourages a person to take a particular action.',
      tr: 'Birini belirli bir eylemde bulunmaya teşvik eden şey.',
    },
    example: {
      en: 'The government offered tax incentives to new businesses.',
      tr: 'Hükümet, yeni işletmelere vergi teşvikleri sundu.',
    },
    synonyms: ['motivation', 'reward'],
  },
  {
    word: 'observe',
    topic: 'science',
    meaning: 'gözlemlemek',
    definition: {
      en: 'To watch carefully, especially in order to learn something.',
      tr: 'Özellikle bir şey öğrenmek amacıyla dikkatle izlemek.',
    },
    example: {
      en: 'Scientists observed the behavior of the particles.',
      tr: 'Bilim insanları parçacıkların davranışını gözlemledi.',
    },
    synonyms: ['watch', 'monitor'],
  },
  {
    word: 'phenomenon',
    topic: 'science',
    meaning: 'olgu, fenomen',
    definition: {
      en: 'A fact or event that can be observed and studied.',
      tr: 'Gözlemlenebilen ve incelenebilen bir olgu ya da olay.',
    },
    example: {
      en: 'The northern lights are a natural phenomenon.',
      tr: 'Kuzey ışıkları doğal bir olgudur.',
    },
    synonyms: ['occurrence', 'event'],
  },
  {
    word: 'precise',
    topic: 'science',
    meaning: 'kesin, tam',
    definition: {
      en: 'Exact and accurate in every detail.',
      tr: 'Her ayrıntısıyla tam ve doğru.',
    },
    example: {
      en: 'The instrument gives precise measurements.',
      tr: 'Bu alet kesin ölçümler verir.',
    },
    synonyms: ['exact', 'accurate'],
  },
  {
    word: 'versatile',
    topic: 'science',
    meaning: 'çok yönlü',
    definition: {
      en: 'Able to adapt or be used for many different purposes.',
      tr: 'Birçok farklı amaç için uyarlanabilen ya da kullanılabilen.',
    },
    example: {
      en: 'Graphene is a versatile material with many applications.',
      tr: 'Grafen, birçok uygulaması olan çok yönlü bir malzemedir.',
    },
    synonyms: ['adaptable', 'flexible'],
  },
  {
    word: 'deteriorate',
    topic: 'science',
    meaning: 'bozulmak, kötüleşmek',
    definition: {
      en: 'To become worse in quality or condition.',
      tr: 'Kalite ya da durum bakımından kötüleşmek.',
    },
    example: {
      en: 'The equipment began to deteriorate after years of use.',
      tr: 'Ekipman yıllarca kullanıldıktan sonra bozulmaya başladı.',
    },
    synonyms: ['decline', 'worsen'],
  },
  {
    word: 'chronic',
    topic: 'health',
    meaning: 'kronik, süreğen',
    definition: {
      en: 'Lasting for a long time or constantly recurring.',
      tr: 'Uzun süre devam eden ya da sürekli tekrarlayan.',
    },
    example: {
      en: 'She has suffered from chronic back pain for years.',
      tr: 'Yıllardır kronik bel ağrısı çekiyor.',
    },
    synonyms: ['long-term', 'persistent'],
  },
  {
    word: 'immune',
    topic: 'health',
    meaning: 'bağışık',
    definition: {
      en: 'Protected from a particular disease or infection.',
      tr: 'Belirli bir hastalığa ya da enfeksiyona karşı korunan.',
    },
    example: {
      en: 'Children’s immune systems are still developing.',
      tr: 'Çocukların bağışıklık sistemleri hâlâ gelişmektedir.',
    },
    synonyms: ['resistant', 'protected'],
  },
  {
    word: 'prescribe',
    topic: 'health',
    meaning: 'reçete yazmak, önermek',
    definition: {
      en: 'To officially recommend or order a medicine or treatment.',
      tr: 'Bir ilaç ya da tedaviyi resmen önermek ya da yazmak.',
    },
    example: {
      en: 'The doctor prescribed antibiotics for the infection.',
      tr: 'Doktor, enfeksiyon için antibiyotik reçete etti.',
    },
    synonyms: ['recommend', 'order'],
  },
  {
    word: 'fatigue',
    topic: 'health',
    meaning: 'yorgunluk, bitkinlik',
    definition: {
      en: 'Extreme tiredness caused by physical or mental effort.',
      tr: 'Fiziksel ya da zihinsel çabadan kaynaklanan aşırı yorgunluk.',
    },
    example: {
      en: 'Chronic fatigue can affect every part of daily life.',
      tr: 'Kronik yorgunluk, günlük hayatın her alanını etkileyebilir.',
    },
    synonyms: ['exhaustion', 'weariness'],
  },
  {
    word: 'mitigate',
    topic: 'health',
    meaning: 'hafifletmek, azaltmak',
    definition: {
      en: 'To make something less severe or less harmful.',
      tr: 'Bir şeyi daha az ağır ya da daha az zararlı hâle getirmek.',
    },
    example: {
      en: 'Exercise can help mitigate the effects of stress.',
      tr: 'Egzersiz, stresin etkilerini hafifletmeye yardımcı olabilir.',
    },
    synonyms: ['reduce', 'alleviate'],
  },
];
