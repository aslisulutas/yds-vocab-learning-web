import type { VocabularyWord } from '@/data/words';

export type GameKind = 'choice' | 'fill' | 'matching';

export interface Score {
  correct: number;
  total: number;
  missed: string[];
}

export const emptyScore: Score = { correct: 0, total: 0, missed: [] };

export function recordAnswer(score: Score, word: string, isCorrect: boolean): Score {
  return {
    correct: score.correct + (isCorrect ? 1 : 0),
    total: score.total + 1,
    missed: isCorrect ? score.missed : [...score.missed, word],
  };
}

export interface GameProps {
  words: VocabularyWord[];
  onScore: (score: Score) => void;
  onFinish: (score: Score) => void;
}

export const ROUND_SIZE = 8;
export const MATCH_SIZE = 5;

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export interface ChoiceQuestion {
  word: VocabularyWord;
  options: string[];
}

export function buildChoiceQuestions(pool: VocabularyWord[], count: number): ChoiceQuestion[] {
  return shuffle(pool)
    .slice(0, count)
    .map((word) => {
      const distractors = shuffle(pool.filter((other) => other.meaning !== word.meaning))
        .slice(0, 3)
        .map((other) => other.meaning);
      return { word, options: shuffle([word.meaning, ...distractors]) };
    });
}
