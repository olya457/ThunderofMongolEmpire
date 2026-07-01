import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  ConfirmationToast,
  PremiumCard,
  SectionHeader,
  SoftBadge,
  contentBottomPadding,
  detailTopPadding,
  screenHorizontalPadding,
  screenTopPadding,
} from '../components/layout';
import {SiteCard} from '../components/contentCards';
import {historicalSites} from '../data/sites';
import type {HistoricalSite} from '../types/content';
import {openMapLocation, shareEducationalText} from '../utils/share';
import {colors} from '../theme/colors';
import {
  ButtonRow,
  FavoriteButton,
  GhostButton,
  PrimaryPurpleButton,
  ShareButton,
} from '../components/buttons';
import {isSmallScreen, isTinyScreen, metric} from '../theme/metrics';

type SitesScreenProps = {
  favoriteSiteIds: string[];
  onOpenSite: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  toast: string | null;
};

export const SitesScreen = ({
  favoriteSiteIds,
  onOpenSite,
  onToggleFavorite,
  toast,
}: SitesScreenProps) => (
  <View style={styles.root}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      <SectionHeader
        title="Historical Sites"
        subtitle="Real places connected with Mongol history and Mongolian heritage."
        action={<SoftBadge label="8 sites" tone="gold" />}
      />
      {historicalSites.map(site => (
        <SiteCard
          key={site.id}
          site={site}
          favorite={favoriteSiteIds.includes(site.id)}
          onOpen={() => onOpenSite(site.id)}
          onShare={() =>
            shareEducationalText(site.name, `${site.coordinates}\n${site.shortDescription}`)
          }
          onToggleFavorite={() => onToggleFavorite(site.id)}
        />
      ))}
    </ScrollView>
    <ConfirmationToast message={toast} />
  </View>
);

type SiteDetailViewProps = {
  site: HistoricalSite;
  favorite: boolean;
  onBack: () => void;
  onToggleFavorite: () => void;
  toast: string | null;
};

export const SiteDetailView = ({
  site,
  favorite,
  onBack,
  onToggleFavorite,
  toast,
}: SiteDetailViewProps) => (
  <View style={styles.root}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.detailContent}>
      <GhostButton title="Back" onPress={onBack} style={styles.backButton} />
      <PremiumCard style={styles.detailCard}>
        <View style={styles.heroImageFrame}>
          <Image source={site.image} style={styles.heroImage} resizeMode="cover" />
        </View>
        <View style={styles.detailBody}>
          <Text style={styles.detailTitle}>{site.name}</Text>
          <Text style={styles.coordinates}>{site.coordinates}</Text>
          <ButtonRow>
            <ShareButton
              onPress={() =>
                shareEducationalText(site.name, `${site.coordinates}\n\n${site.paragraphs.join('\n\n')}`)
              }
            />
            <FavoriteButton active={favorite} onPress={onToggleFavorite} />
          </ButtonRow>
          {site.paragraphs.map(paragraph => (
            <Text key={paragraph} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
          <PrimaryPurpleButton
            title="Show on Map"
            onPress={() => openMapLocation(site.mapQuery)}
            style={styles.mapButton}
          />
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
    paddingHorizontal: screenHorizontalPadding,
    paddingTop: screenTopPadding,
    paddingBottom: contentBottomPadding,
  },
  detailContent: {
    paddingHorizontal: screenHorizontalPadding,
    paddingTop: detailTopPadding,
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
    padding: metric.detailPadding,
  },
  detailTitle: {
    color: colors.primaryText,
    fontSize: isTinyScreen ? 24 : isSmallScreen ? 27 : 30,
    lineHeight: isTinyScreen ? 29 : isSmallScreen ? 33 : 36,
    fontWeight: '900',
  },
  coordinates: {
    marginTop: 7,
    marginBottom: 14,
    color: colors.warmBronze,
    fontSize: isTinyScreen ? 13 : 15,
    lineHeight: isTinyScreen ? 19 : 21,
    fontWeight: '900',
  },
  paragraph: {
    marginTop: isTinyScreen ? 14 : 18,
    color: colors.primaryText,
    fontSize: metric.bodyFont,
    lineHeight: metric.bodyLine,
  },
  mapButton: {
    marginTop: isTinyScreen ? 16 : 22,
  },
});
