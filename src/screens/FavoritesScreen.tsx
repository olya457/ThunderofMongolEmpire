import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  ArticleCard,
  EmptyFavoritesView,
  FavoriteSegmentedControl,
  SiteCard,
} from '../components/contentCards';
import {ConfirmationToast, SectionHeader, contentBottomPadding} from '../components/layout';
import {articles} from '../data/articles';
import {historicalSites} from '../data/sites';
import {shareEducationalText} from '../utils/share';

type FavoritesScreenProps = {
  favoriteArticleIds: string[];
  favoriteSiteIds: string[];
  onOpenArticle: (id: string) => void;
  onOpenSite: (id: string) => void;
  onToggleArticleFavorite: (id: string) => void;
  onToggleSiteFavorite: (id: string) => void;
  onExploreArticles: () => void;
  toast: string | null;
};

export const FavoritesScreen = ({
  favoriteArticleIds,
  favoriteSiteIds,
  onOpenArticle,
  onOpenSite,
  onToggleArticleFavorite,
  onToggleSiteFavorite,
  onExploreArticles,
  toast,
}: FavoritesScreenProps) => {
  const [segment, setSegment] = useState<'articles' | 'sites'>('articles');
  const favoriteArticles = articles.filter(article =>
    favoriteArticleIds.includes(article.id),
  );
  const favoriteSites = historicalSites.filter(site => favoriteSiteIds.includes(site.id));
  const activeEmpty =
    segment === 'articles'
      ? favoriteArticles.length === 0
      : favoriteSites.length === 0;

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <SectionHeader
          title="Favorites"
          subtitle="Your saved articles and historical locations in one place."
        />
        <FavoriteSegmentedControl value={segment} onChange={setSegment} />
        {activeEmpty ? (
          <EmptyFavoritesView onExploreArticles={onExploreArticles} />
        ) : null}
        {segment === 'articles'
          ? favoriteArticles.map(article => (
              <ArticleCard
                key={article.id}
                article={article}
                favorite
                onOpen={() => onOpenArticle(article.id)}
                onShare={() =>
                  shareEducationalText(article.title, article.shortDescription)
                }
                onToggleFavorite={() => onToggleArticleFavorite(article.id)}
              />
            ))
          : favoriteSites.map(site => (
              <SiteCard
                key={site.id}
                site={site}
                favorite
                onOpen={() => onOpenSite(site.id)}
                onShare={() =>
                  shareEducationalText(
                    site.name,
                    `${site.coordinates}\n${site.shortDescription}`,
                  )
                }
                onToggleFavorite={() => onToggleSiteFavorite(site.id)}
              />
            ))}
      </ScrollView>
      <ConfirmationToast message={toast} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: contentBottomPadding,
  },
});
