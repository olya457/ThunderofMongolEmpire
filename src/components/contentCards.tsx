import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {images} from '../assets';
import {colors} from '../theme/colors';
import {isSmallScreen, isTinyScreen, metric} from '../theme/metrics';
import type {Article, Artifact, HistoricalSite, MapStage} from '../types/content';
import {FavoriteButton, PrimaryPurpleButton, ShareButton} from './buttons';
import {PremiumCard, SoftBadge} from './layout';

type ArticleCardProps = {
  article: Article;
  favorite: boolean;
  onOpen: () => void;
  onShare: () => void;
  onToggleFavorite: () => void;
};

export const ArticleCard = ({
  article,
  favorite,
  onOpen,
  onShare,
  onToggleFavorite,
}: ArticleCardProps) => (
  <PremiumCard style={styles.articleCard}>
    <Pressable onPress={onOpen} style={styles.imagePress}>
      <Image source={article.image} style={styles.articleImage} resizeMode="cover" />
      <View style={styles.imageGlow} />
    </Pressable>
    <View style={styles.cardBody}>
      <Text style={styles.cardTitle}>{article.title}</Text>
      <Text style={styles.cardSubtitle}>{article.shortDescription}</Text>
      <View style={styles.cardActions}>
        <PrimaryPurpleButton title="Read" onPress={onOpen} style={styles.readButton} />
        <ShareButton compact onPress={onShare} />
        <FavoriteButton compact active={favorite} onPress={onToggleFavorite} />
      </View>
    </View>
  </PremiumCard>
);

type ArtifactCardProps = {
  item: Artifact;
  onShare: () => void;
};

export const ArtifactCard = ({item, onShare}: ArtifactCardProps) => {
  const {width} = useWindowDimensions();
  const twoColumn = width >= 390;

  return (
    <PremiumCard style={[styles.artifactCard, twoColumn && styles.artifactCardGrid]}>
      <View
        style={[styles.artifactImageWrap, twoColumn && styles.artifactImageWrapGrid]}>
        <Image source={item.image} style={styles.artifactImage} resizeMode="contain" />
      </View>
      <View style={styles.artifactBody}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.factText}>{item.fact}</Text>
        <View style={styles.artifactAction}>
          <ShareButton onPress={onShare} />
        </View>
      </View>
    </PremiumCard>
  );
};

type SiteCardProps = {
  site: HistoricalSite;
  favorite: boolean;
  onOpen: () => void;
  onShare: () => void;
  onToggleFavorite: () => void;
};

export const SiteCard = ({
  site,
  favorite,
  onOpen,
  onShare,
  onToggleFavorite,
}: SiteCardProps) => (
  <PremiumCard style={styles.siteCard}>
    <Pressable onPress={onOpen} style={styles.imagePress}>
      <Image source={site.image} style={styles.siteImage} resizeMode="cover" />
    </Pressable>
    <View style={styles.cardBody}>
      <Text style={styles.cardTitle}>{site.name}</Text>
      <Text style={styles.coordinateText}>{site.coordinates}</Text>
      <Text style={styles.cardSubtitle}>{site.shortDescription}</Text>
      <View style={styles.cardActions}>
        <PrimaryPurpleButton title="Open" onPress={onOpen} style={styles.readButton} />
        <ShareButton compact onPress={onShare} />
        <FavoriteButton compact active={favorite} onPress={onToggleFavorite} />
      </View>
    </View>
  </PremiumCard>
);

type MapStageCardProps = {
  stage: MapStage;
};

export const MapStageCard = ({stage}: MapStageCardProps) => (
  <PremiumCard style={styles.stageCard}>
    <View style={styles.stageHeader}>
      <SoftBadge label={stage.year} />
      <SoftBadge label={stage.area} tone="gold" />
    </View>
    <Text style={styles.stageTitle}>{stage.title}</Text>
    <Text style={styles.stageDescription}>{stage.description}</Text>
  </PremiumCard>
);

type FavoriteSegmentedControlProps = {
  value: 'articles' | 'sites';
  onChange: (value: 'articles' | 'sites') => void;
};

export const FavoriteSegmentedControl = ({
  value,
  onChange,
}: FavoriteSegmentedControlProps) => (
  <View style={styles.segmentShell}>
    {(['articles', 'sites'] as const).map(segment => {
      const active = value === segment;
      return (
        <Pressable
          accessibilityRole="button"
          key={segment}
          onPress={() => onChange(segment)}
          style={[styles.segment, active && styles.segmentActive]}>
          <Text style={[styles.segmentText, active && styles.segmentTextActive]}>
            {segment === 'articles' ? 'Articles' : 'Sites'}
          </Text>
        </Pressable>
      );
    })}
  </View>
);

type EmptyFavoritesViewProps = {
  onExploreArticles: () => void;
};

export const EmptyFavoritesView = ({onExploreArticles}: EmptyFavoritesViewProps) => (
  <PremiumCard style={styles.emptyCard}>
    <Image source={images.emptyArticles} style={styles.emptyImage} resizeMode="contain" />
    <Text style={styles.emptyTitle}>No favorites yet</Text>
    <Text style={styles.emptySubtitle}>
      Save articles and historical sites to build your personal Mongol Empire
      collection.
    </Text>
    <PrimaryPurpleButton title="Explore Articles" onPress={onExploreArticles} />
  </PremiumCard>
);

const styles = StyleSheet.create({
  articleCard: {
    overflow: 'hidden',
    marginBottom: 16,
  },
  imagePress: {
    alignSelf: 'stretch',
    width: '100%',
    aspectRatio: 1.84,
    overflow: 'hidden',
    backgroundColor: '#1A1024',
  },
  articleImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1A1024',
  },
  imageGlow: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 42,
    backgroundColor: 'rgba(109, 60, 245, 0.08)',
  },
  cardBody: {
    padding: metric.cardPadding,
  },
  cardTitle: {
    color: colors.primaryText,
    fontSize: metric.cardTitleFont,
    lineHeight: metric.cardTitleLine,
    fontWeight: '800',
  },
  cardSubtitle: {
    marginTop: 5,
    color: colors.secondaryText,
    fontSize: isTinyScreen ? 13 : 14,
    lineHeight: isTinyScreen ? 18 : 20,
    fontWeight: '600',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: isTinyScreen ? 8 : 10,
    marginTop: isTinyScreen ? 11 : 14,
  },
  readButton: {
    flex: 1,
    minHeight: 42,
  },
  artifactCard: {
    marginBottom: 14,
    overflow: 'hidden',
  },
  artifactCardGrid: {
    flexDirection: 'row',
  },
  artifactImageWrap: {
    minHeight: isTinyScreen ? 112 : isSmallScreen ? 124 : 136,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1D1228',
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  artifactImageWrapGrid: {
    width: isTinyScreen ? 112 : isSmallScreen ? 122 : 132,
    borderBottomWidth: 0,
    borderRightWidth: 1,
    borderRightColor: colors.divider,
  },
  artifactImage: {
    width: isTinyScreen ? 98 : isSmallScreen ? 110 : 122,
    height: isTinyScreen ? 98 : isSmallScreen ? 110 : 122,
  },
  artifactBody: {
    flex: 1,
    padding: metric.cardPadding,
  },
  factText: {
    marginTop: 7,
    color: colors.secondaryText,
    fontSize: isTinyScreen ? 13 : 14,
    lineHeight: isTinyScreen ? 19 : 21,
  },
  artifactAction: {
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  siteCard: {
    overflow: 'hidden',
    marginBottom: 16,
  },
  siteImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1A1024',
  },
  coordinateText: {
    marginTop: 5,
    color: colors.warmBronze,
    fontSize: isTinyScreen ? 12 : 13,
    lineHeight: isTinyScreen ? 17 : 18,
    fontWeight: '800',
  },
  stageCard: {
    padding: metric.cardPadding,
  },
  stageHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  stageTitle: {
    color: colors.primaryText,
    fontSize: isTinyScreen ? 19 : isSmallScreen ? 20 : 22,
    lineHeight: isTinyScreen ? 24 : isSmallScreen ? 26 : 28,
    fontWeight: '800',
  },
  stageDescription: {
    marginTop: 8,
    color: colors.secondaryText,
    fontSize: isTinyScreen ? 14 : 15,
    lineHeight: isTinyScreen ? 21 : 23,
  },
  segmentShell: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 8,
    backgroundColor: '#21152E',
    borderWidth: 1,
    borderColor: colors.divider,
    marginBottom: 16,
  },
  segment: {
    flex: 1,
    minHeight: isTinyScreen ? 34 : 40,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: '#3A2750',
    shadowColor: colors.deepPurple,
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 2,
  },
  segmentText: {
    color: colors.secondaryText,
    fontSize: isTinyScreen ? 13 : 14,
    fontWeight: '800',
  },
  segmentTextActive: {
    color: colors.softGold,
  },
  emptyCard: {
    alignItems: 'center',
    padding: isTinyScreen ? 16 : 22,
  },
  emptyImage: {
    width: isTinyScreen ? 134 : isSmallScreen ? 152 : 170,
    height: metric.emptyImageHeight,
    marginBottom: 4,
  },
  emptyTitle: {
    color: colors.primaryText,
    fontSize: isTinyScreen ? 19 : 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  emptySubtitle: {
    marginTop: 8,
    marginBottom: 18,
    color: colors.secondaryText,
    fontSize: isTinyScreen ? 14 : 15,
    lineHeight: isTinyScreen ? 20 : 22,
    textAlign: 'center',
  },
});
