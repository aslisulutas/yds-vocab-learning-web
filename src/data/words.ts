import { artWords } from '@/data/vocabulary/art';
import { academicWords } from '@/data/vocabulary/academic';
import { businessWords } from '@/data/vocabulary/business';
import { environmentWords } from '@/data/vocabulary/environment';
import { healthWords } from '@/data/vocabulary/health';
import { scienceWords } from '@/data/vocabulary/science';
import type { TranslationKey } from '@/i18n/translations';

export type TopicId = 'academic' | 'business' | 'science' | 'health' | 'environment' | 'art';

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
  environment: 'topic.environment',
  art: 'topic.art',
};

export const topicIds = Object.keys(topicLabelKeys) as TopicId[];

export const vocabulary: VocabularyWord[] = [
  ...academicWords,
  ...businessWords,
  ...scienceWords,
  ...healthWords,
  ...environmentWords,
  ...artWords,
];
