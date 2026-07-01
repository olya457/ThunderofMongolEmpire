import React, {useEffect, useRef, useState} from 'react';
import {Platform, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {AppGradientBackground} from '../components/layout';
import {articleById} from '../data/articles';
import {siteById} from '../data/sites';
import {localStore} from '../storage/localStore';
import type {TabKey} from '../types/content';
import {EmpireMapScreen} from '../screens/EmpireMapScreen';
import {FavoritesScreen} from '../screens/FavoritesScreen';
import {ArticleDetailView, HistoryScreen} from '../screens/HistoryScreen';
import {LifeScreen} from '../screens/LifeScreen';
import {QuizScreen} from '../screens/QuizScreen';
import {SiteDetailView, SitesScreen} from '../screens/SitesScreen';
import {BottomTabBar} from './BottomTabBar';

type DetailRoute =
  | {type: 'article'; id: string}
  | {type: 'site'; id: string}
  | null;

export const AppNavigator = () => {
  const [selectedTab, setSelectedTab] = useState<TabKey>('history');
  const [favoriteArticleIds, setFavoriteArticleIds] = useState<string[]>([]);
  const [favoriteSiteIds, setFavoriteSiteIds] = useState<string[]>([]);
  const [detailRoute, setDetailRoute] = useState<DetailRoute>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const loadSavedState = async () => {
      const [articleIds, siteIds, tab] = await Promise.all([
        localStore.getFavoriteArticles(),
        localStore.getFavoriteSites(),
        localStore.getSelectedTab(),
      ]);
      setFavoriteArticleIds(articleIds);
      setFavoriteSiteIds(siteIds);
      setSelectedTab(tab);
    };

    loadSavedState();

    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
    };
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  };

  const changeTab = (tab: TabKey) => {
    setSelectedTab(tab);
    setDetailRoute(null);
    localStore.setSelectedTab(tab);
  };

  const toggleArticleFavorite = (id: string) => {
    setFavoriteArticleIds(current => {
      const saved = current.includes(id);
      const next = saved
        ? current.filter(articleId => articleId !== id)
        : [...current, id];
      localStore.setFavoriteArticles(next);
      showToast(saved ? 'Removed from favorites' : 'Saved to favorites');
      return next;
    });
  };

  const toggleSiteFavorite = (id: string) => {
    setFavoriteSiteIds(current => {
      const saved = current.includes(id);
      const next = saved ? current.filter(siteId => siteId !== id) : [...current, id];
      localStore.setFavoriteSites(next);
      showToast(saved ? 'Removed from favorites' : 'Saved to favorites');
      return next;
    });
  };

  const goToArticles = () => {
    setSelectedTab('history');
    setDetailRoute(null);
    localStore.setSelectedTab('history');
  };

  const renderContent = () => {
    if (detailRoute?.type === 'article') {
      const article = articleById[detailRoute.id];
      return (
        <ArticleDetailView
          article={article}
          favorite={favoriteArticleIds.includes(article.id)}
          toast={toast}
          onBack={() => setDetailRoute(null)}
          onToggleFavorite={() => toggleArticleFavorite(article.id)}
        />
      );
    }

    if (detailRoute?.type === 'site') {
      const site = siteById[detailRoute.id];
      return (
        <SiteDetailView
          site={site}
          favorite={favoriteSiteIds.includes(site.id)}
          toast={toast}
          onBack={() => setDetailRoute(null)}
          onToggleFavorite={() => toggleSiteFavorite(site.id)}
        />
      );
    }

    switch (selectedTab) {
      case 'history':
        return (
          <HistoryScreen
            favoriteArticleIds={favoriteArticleIds}
            toast={toast}
            onOpenArticle={id => setDetailRoute({type: 'article', id})}
            onToggleFavorite={toggleArticleFavorite}
          />
        );
      case 'quiz':
        return <QuizScreen onBackToArticles={goToArticles} />;
      case 'map':
        return <EmpireMapScreen />;
      case 'life':
        return <LifeScreen />;
      case 'sites':
        return (
          <SitesScreen
            favoriteSiteIds={favoriteSiteIds}
            toast={toast}
            onOpenSite={id => setDetailRoute({type: 'site', id})}
            onToggleFavorite={toggleSiteFavorite}
          />
        );
      case 'favorites':
        return (
          <FavoritesScreen
            favoriteArticleIds={favoriteArticleIds}
            favoriteSiteIds={favoriteSiteIds}
            toast={toast}
            onOpenArticle={id => setDetailRoute({type: 'article', id})}
            onOpenSite={id => setDetailRoute({type: 'site', id})}
            onToggleArticleFavorite={toggleArticleFavorite}
            onToggleSiteFavorite={toggleSiteFavorite}
            onExploreArticles={goToArticles}
          />
        );
    }
  };

  return (
    <AppGradientBackground>
      <StatusBar barStyle="light-content" backgroundColor="#12071F" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.frame}>{renderContent()}</View>
      </SafeAreaView>
      <BottomTabBar selectedTab={selectedTab} onSelect={changeTab} />
    </AppGradientBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  frame: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});
