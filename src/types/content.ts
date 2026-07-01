import type {ImageSourcePropType} from 'react-native';

export type TabKey =
  | 'history'
  | 'quiz'
  | 'map'
  | 'life'
  | 'sites'
  | 'favorites';

export type Article = {
  id: string;
  title: string;
  shortDescription: string;
  image: ImageSourcePropType;
  paragraphs: string[];
};

export type Artifact = {
  id: string;
  name: string;
  fact: string;
  image: ImageSourcePropType;
};

export type HistoricalSite = {
  id: string;
  name: string;
  coordinates: string;
  shortDescription: string;
  image: ImageSourcePropType;
  mapQuery: string;
  paragraphs: string[];
};

export type MapStage = {
  id: string;
  year: string;
  title: string;
  area: string;
  description: string;
};

export type QuizQuestion = {
  id: string;
  articleId: string;
  question: string;
  options: string[];
  answerIndex: number;
};

export type QuizSession = {
  questionIds: string[];
  currentIndex: number;
  score: number;
  selectedIndex: number | null;
  locked: boolean;
};

export type QuizResult = {
  score: number;
  total: number;
  completedAt: string;
};
