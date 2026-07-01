import React from 'react';
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {images} from '../assets';
import {colors} from '../theme/colors';
import {metric} from '../theme/metrics';

type ChildrenProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const AppGradientBackground = ({children, style}: ChildrenProps) => (
  <ImageBackground
    source={images.appBackground}
    resizeMode="cover"
    style={[styles.gradientRoot, style]}
    imageStyle={styles.backgroundImage}>
    <View style={styles.topLayer} />
    <View style={styles.middleLayer} />
    <View style={styles.bottomLayer} />
    <View style={styles.silkWashOne} />
    <View style={styles.silkWashTwo} />
    <OrnamentBackground />
    {children}
  </ImageBackground>
);

export const OrnamentBackground = () => (
  <View pointerEvents="none" style={StyleSheet.absoluteFill}>
    <View style={[styles.ornamentCircle, styles.ornamentCircleOne]} />
    <View style={[styles.ornamentCircle, styles.ornamentCircleTwo]} />
    <View style={[styles.ornamentLine, styles.ornamentLineOne]} />
    <View style={[styles.ornamentLine, styles.ornamentLineTwo]} />
    <View style={styles.ornamentDots}>
      {Array.from({length: 18}).map((_, index) => (
        <View key={index} style={styles.ornamentDot} />
      ))}
    </View>
  </View>
);

export const ScreenFrame = ({children, style}: ChildrenProps) => (
  <AppGradientBackground>
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.screenFrame, style]}>{children}</View>
    </SafeAreaView>
  </AppGradientBackground>
);

export const PremiumCard = ({children, style}: ChildrenProps) => (
  <View style={[styles.card, style]}>{children}</View>
);

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  compact?: boolean;
};

export const SectionHeader = ({
  title,
  subtitle,
  action,
  compact,
}: SectionHeaderProps) => (
  <View style={[styles.header, compact && styles.headerCompact]}>
    <View style={styles.headerTextWrap}>
      <Text style={[styles.headerTitle, compact && styles.headerTitleCompact]}>
        {title}
      </Text>
      {subtitle ? <Text style={styles.headerSubtitle}>{subtitle}</Text> : null}
    </View>
    {action}
  </View>
);

type BadgeProps = {
  label: string;
  tone?: 'purple' | 'gold' | 'turquoise';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export const SoftBadge = ({label, tone = 'purple', style, textStyle}: BadgeProps) => {
  const palette = {
    purple: [colors.transparentPurple, colors.primaryPurple],
    gold: [colors.transparentGold, colors.warmBronze],
    turquoise: ['rgba(50, 184, 198, 0.14)', colors.turquoise],
  } as const;

  return (
    <View style={[styles.badge, {backgroundColor: palette[tone][0]}, style]}>
      <Text style={[styles.badgeText, {color: palette[tone][1]}, textStyle]}>
        {label}
      </Text>
    </View>
  );
};

type ToastProps = {
  message: string | null;
};

export const ConfirmationToast = ({message}: ToastProps) => {
  if (!message) {
    return null;
  }

  return (
    <View pointerEvents="none" style={styles.toast}>
      <Text style={styles.toastText}>{message}</Text>
    </View>
  );
};

export const screenHorizontalPadding = metric.horizontalPadding;
export const screenTopPadding = metric.screenTopPadding;
export const detailTopPadding = metric.detailTopPadding;
export const contentBottomPadding = metric.contentBottomPadding;
export const floatingNavBottom = metric.floatingNavBottom;

const styles = StyleSheet.create({
  gradientRoot: {
    flex: 1,
    backgroundColor: '#12071F',
    overflow: 'hidden',
  },
  backgroundImage: {
    opacity: 0.92,
  },
  topLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '44%',
    backgroundColor: 'rgba(14, 6, 26, 0.12)',
  },
  middleLayer: {
    position: 'absolute',
    top: '18%',
    left: -30,
    right: -30,
    height: '58%',
    borderRadius: 140,
    backgroundColor: 'rgba(109, 60, 245, 0.10)',
    transform: [{rotate: '-4deg'}],
  },
  bottomLayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '54%',
    backgroundColor: 'rgba(7, 3, 13, 0.26)',
  },
  silkWashOne: {
    position: 'absolute',
    top: 92,
    left: -80,
    width: 260,
    height: 420,
    borderRadius: 130,
    backgroundColor: 'rgba(214, 162, 58, 0.10)',
    transform: [{rotate: '-22deg'}],
  },
  silkWashTwo: {
    position: 'absolute',
    right: -96,
    bottom: 68,
    width: 290,
    height: 460,
    borderRadius: 145,
    backgroundColor: 'rgba(109, 60, 245, 0.16)',
    transform: [{rotate: '18deg'}],
  },
  ornamentCircle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(214, 162, 58, 0.34)',
    borderRadius: 999,
  },
  ornamentCircleOne: {
    width: 180,
    height: 180,
    top: 84,
    right: -84,
  },
  ornamentCircleTwo: {
    width: 220,
    height: 220,
    bottom: 120,
    left: -120,
  },
  ornamentLine: {
    position: 'absolute',
    height: 1,
    backgroundColor: 'rgba(155, 124, 255, 0.24)',
    transform: [{rotate: '-16deg'}],
  },
  ornamentLineOne: {
    width: 260,
    top: 178,
    left: -72,
  },
  ornamentLineTwo: {
    width: 300,
    bottom: 210,
    right: -100,
  },
  ornamentDots: {
    position: 'absolute',
    right: 24,
    top: 126,
    width: 90,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    opacity: 0.42,
  },
  ornamentDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primaryGold,
  },
  safeArea: {
    flex: 1,
  },
  screenFrame: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.divider,
    shadowColor: '#000000',
    shadowOpacity: 0.28,
    shadowRadius: 18,
    shadowOffset: {width: 0, height: 10},
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 18,
  },
  headerCompact: {
    marginBottom: 12,
  },
  headerTextWrap: {
    flex: 1,
  },
  headerTitle: {
    color: '#F8F4FF',
    fontSize: metric.sectionTitleFont,
    fontWeight: '800',
    lineHeight: metric.sectionTitleLine,
  },
  headerTitleCompact: {
    fontSize: metric.sectionTitleFont - 6,
    lineHeight: metric.sectionTitleLine - 6,
  },
  headerSubtitle: {
    marginTop: metric.screenTopPadding <= 10 ? 5 : 8,
    color: '#D8D0E8',
    fontSize: metric.sectionSubtitleFont,
    lineHeight: metric.sectionSubtitleLine,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  toast: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: floatingNavBottom + 88,
    alignItems: 'center',
  },
  toastText: {
    overflow: 'hidden',
    borderRadius: 999,
    backgroundColor: colors.deepPurple,
    color: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 13,
    fontWeight: '700',
  },
});
