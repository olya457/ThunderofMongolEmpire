import AsyncStorage from '@react-native-async-storage/async-storage';
import type {QuizResult, QuizSession, TabKey} from '../types/content';

const keys = {
  onboarding: 'tme.onboarding.completed.v1',
  favoriteArticles: 'tme.favorites.articles.v1',
  favoriteSites: 'tme.favorites.sites.v1',
  mapStage: 'tme.map.stage.v1',
  quizSession: 'tme.quiz.session.v1',
  quizResult: 'tme.quiz.result.v1',
  selectedTab: 'tme.navigation.selectedTab.v1',
  dailyArticle: 'tme.history.dailyArticle.v1',
};

const readJson = async <T,>(key: string, fallback: T): Promise<T> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = async (key: string, value: unknown) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const localStore = {
  keys,
  getOnboardingCompleted: async () =>
    (await AsyncStorage.getItem(keys.onboarding)) === 'true',
  setOnboardingCompleted: async () =>
    AsyncStorage.setItem(keys.onboarding, 'true'),
  getFavoriteArticles: () => readJson<string[]>(keys.favoriteArticles, []),
  setFavoriteArticles: (ids: string[]) => writeJson(keys.favoriteArticles, ids),
  getFavoriteSites: () => readJson<string[]>(keys.favoriteSites, []),
  setFavoriteSites: (ids: string[]) => writeJson(keys.favoriteSites, ids),
  getMapStage: () => readJson<number>(keys.mapStage, 0),
  setMapStage: (index: number) => writeJson(keys.mapStage, index),
  getQuizSession: () => readJson<QuizSession | null>(keys.quizSession, null),
  setQuizSession: (session: QuizSession | null) =>
    session
      ? writeJson(keys.quizSession, session)
      : AsyncStorage.removeItem(keys.quizSession),
  getQuizResult: () => readJson<QuizResult | null>(keys.quizResult, null),
  setQuizResult: (result: QuizResult | null) =>
    result
      ? writeJson(keys.quizResult, result)
      : AsyncStorage.removeItem(keys.quizResult),
  getSelectedTab: () => readJson<TabKey>(keys.selectedTab, 'history'),
  setSelectedTab: (tab: TabKey) => writeJson(keys.selectedTab, tab),
  getDailyArticle: () =>
    readJson<{date: string; articleId: string} | null>(keys.dailyArticle, null),
  setDailyArticle: (value: {date: string; articleId: string}) =>
    writeJson(keys.dailyArticle, value),
};
