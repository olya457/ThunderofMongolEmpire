import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {articles} from '../data/articles';
import {colors} from '../theme/colors';
import type {Article} from '../types/content';
import {shareEducationalText} from '../utils/share';
import {ArticleCard} from '../components/contentCards';
import {
  ConfirmationToast,
  PremiumCard,
  SectionHeader,
  SoftBadge,
  contentBottomPadding,
} from '../components/layout';
import {localStore} from '../storage/localStore';
import {ButtonRow, FavoriteButton, GhostButton, ShareButton} from '../components/buttons';

type HistoryScreenProps = {
  favoriteArticleIds: string[];
  onOpenArticle: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  toast: string | null;
};

export const HistoryScreen = ({
  favoriteArticleIds,
  onOpenArticle,
  onToggleFavorite,
  toast,
}: HistoryScreenProps) => {
  const [dailyArticle, setDailyArticle] = useState<Article | null>(null);

  useEffect(() => {
    const loadDailyArticle = async () => {
      const today = new Date().toISOString().slice(0, 10);
      const stored = await localStore.getDailyArticle();
      if (stored?.date === today) {
        setDailyArticle(articles.find(article => article.id === stored.articleId) ?? articles[0]);
        return;
      }

      const next = articles[Math.floor(Math.random() * articles.length)];
      await localStore.setDailyArticle({date: today, articleId: next.id});
      setDailyArticle(next);
    };

    loadDailyArticle();
  }, []);

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <SectionHeader
          title="History Articles"
          subtitle="Explore twelve illustrated chapters about the Mongol Empire."
          action={<SoftBadge label="12 stories" tone="gold" />}
        />
        {dailyArticle ? (
          <PremiumCard style={styles.dailyCard}>
            <View style={styles.dailyCopy}>
              <SoftBadge label="Daily scroll" tone="turquoise" />
              <Text style={styles.dailyTitle}>{dailyArticle.title}</Text>
              <Text style={styles.dailyText}>{dailyArticle.shortDescription}</Text>
            </View>
            <GhostButton title="Read" onPress={() => onOpenArticle(dailyArticle.id)} />
          </PremiumCard>
        ) : null}
        {articles.map(article => (
          <ArticleCard
            key={article.id}
            article={article}
            favorite={favoriteArticleIds.includes(article.id)}
            onOpen={() => onOpenArticle(article.id)}
            onShare={() =>
              shareEducationalText(article.title, article.shortDescription)
            }
            onToggleFavorite={() => onToggleFavorite(article.id)}
          />
        ))}
      </ScrollView>
      <ConfirmationToast message={toast} />
    </View>
  );
};

type ArticleDetailViewProps = {
  article: Article;
  favorite: boolean;
  onBack: () => void;
  onToggleFavorite: () => void;
  toast: string | null;
};

export const ArticleDetailView = ({
  article,
  favorite,
  onBack,
  onToggleFavorite,
  toast,
}: ArticleDetailViewProps) => (
  <View style={styles.root}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.detailContent}>
      <GhostButton title="Back" onPress={onBack} style={styles.backButton} />
      <PremiumCard style={styles.detailCard}>
        <View style={styles.heroImageFrame}>
          <Image source={article.image} style={styles.heroImage} resizeMode="cover" />
        </View>
        <View style={styles.detailBody}>
          <Text style={styles.detailTitle}>{article.title}</Text>
          <Text style={styles.detailSubtitle}>{article.shortDescription}</Text>
          <ButtonRow>
            <ShareButton
              onPress={() =>
                shareEducationalText(article.title, article.paragraphs.join('\n\n'))
              }
            />
            <FavoriteButton active={favorite} onPress={onToggleFavorite} />
          </ButtonRow>
          {article.paragraphs.map(paragraph => (
            <Text key={paragraph} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>
      </PremiumCard>
    </ScrollView>
    <ConfirmationToast message={toast} />
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: contentBottomPadding,
  },
  dailyCard: {
    padding: 14,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#2D1D3B',
  },
  dailyCopy: {
    flex: 1,
  },
  dailyTitle: {
    marginTop: 8,
    color: colors.primaryText,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '900',
  },
  dailyText: {
    marginTop: 3,
    color: colors.secondaryText,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  detailContent: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: contentBottomPadding,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  detailCard: {
    overflow: 'hidden',
  },
  heroImageFrame: {
    alignSelf: 'stretch',
    width: '100%',
    aspectRatio: 1.84,
    overflow: 'hidden',
    backgroundColor: '#1A1024',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  detailBody: {
    padding: 18,
  },
  detailTitle: {
    color: colors.primaryText,
    fontSize: 31,
    lineHeight: 37,
    fontWeight: '900',
  },
  detailSubtitle: {
    marginTop: 6,
    marginBottom: 14,
    color: colors.warmBronze,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '800',
  },
  paragraph: {
    marginTop: 18,
    color: colors.primaryText,
    fontSize: 16,
    lineHeight: 26,
  },
});
