import React from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../theme/colors';

type PageIndicatorProps = {
  total: number;
  index: number;
};

export const PageIndicator = ({total, index}: PageIndicatorProps) => (
  <View style={styles.indicatorRow}>
    {Array.from({length: total}).map((_, itemIndex) => (
      <View
        key={itemIndex}
        style={[
          styles.indicatorDot,
          itemIndex === index && styles.indicatorDotActive,
        ]}
      />
    ))}
  </View>
);

type OnboardingPageViewProps = {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  index: number;
  total: number;
  onNext: () => void;
  onSkip: () => void;
};

export const OnboardingPageView = ({
  image,
  title,
  subtitle,
  index,
  total,
  onNext,
  onSkip,
}: OnboardingPageViewProps) => (
  <ImageBackground source={image} resizeMode="cover" style={styles.root}>
    <View style={styles.topShade} />
    <View style={styles.bottomShade} />
    <Pressable onPress={onSkip} style={styles.skipButton} hitSlop={10}>
      <Text style={styles.skipText}>Skip</Text>
    </Pressable>
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.goldDivider}>
        <View style={styles.goldLine} />
        <View style={styles.goldDiamond} />
        <View style={styles.goldLine} />
      </View>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <PageIndicator total={total} index={index} />
      <Pressable
        onPress={onNext}
        style={({pressed}) => [styles.nextButton, pressed && styles.pressed]}>
        <Text style={styles.nextText}>
          {index === total - 1 ? 'Begin Your Journey' : 'Next'}
        </Text>
        <Text style={styles.nextArrow}>›</Text>
      </Pressable>
    </View>
  </ImageBackground>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#14051F',
  },
  topShade: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 130,
    backgroundColor: 'rgba(11, 4, 20, 0.05)',
  },
  bottomShade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 330,
    backgroundColor: 'rgba(8, 3, 14, 0.34)',
  },
  skipButton: {
    position: 'absolute',
    right: 22,
    top: 56,
    minHeight: 36,
    paddingHorizontal: 14,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(14, 4, 29, 0.24)',
    borderWidth: 1,
    borderColor: 'rgba(242, 207, 115, 0.36)',
  },
  skipText: {
    color: colors.card,
    fontSize: 13,
    fontWeight: '800',
  },
  content: {
    paddingHorizontal: 34,
    paddingBottom: 80,
    alignItems: 'center',
  },
  title: {
    color: colors.card,
    fontSize: 21,
    lineHeight: 27,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.82)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 8,
  },
  goldDivider: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  goldLine: {
    width: 92,
    height: 1,
    backgroundColor: 'rgba(214, 162, 58, 0.76)',
  },
  goldDiamond: {
    width: 10,
    height: 10,
    borderWidth: 2,
    borderColor: colors.primaryGold,
    transform: [{rotate: '45deg'}],
  },
  subtitle: {
    marginTop: 20,
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    lineHeight: 22,
    fontStyle: 'italic',
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.84)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 8,
  },
  indicatorRow: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  indicatorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(15, 8, 25, 0.7)',
    borderWidth: 1,
    borderColor: colors.primaryGold,
  },
  indicatorDotActive: {
    backgroundColor: '#F151D7',
    borderColor: colors.softGold,
  },
  nextButton: {
    marginTop: 30,
    minHeight: 58,
    alignSelf: 'stretch',
    borderRadius: 29,
    borderWidth: 1.5,
    borderColor: colors.softGold,
    backgroundColor: colors.royalViolet,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.royalViolet,
    shadowOpacity: 0.52,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: 8},
    elevation: 7,
  },
  pressed: {
    opacity: 0.84,
    transform: [{scale: 0.99}],
  },
  nextText: {
    color: colors.card,
    fontSize: 18,
    fontWeight: '900',
  },
  nextArrow: {
    position: 'absolute',
    right: 25,
    color: colors.softGold,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '900',
  },
});
