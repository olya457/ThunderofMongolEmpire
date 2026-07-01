import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');
const shortSide = Math.min(width, height);
const longSide = Math.max(width, height);

export const isTinyScreen = shortSide <= 340 || longSide <= 670;
export const isSmallScreen = shortSide <= 390 || longSide <= 760;

export const metric = {
  horizontalPadding: isTinyScreen ? 14 : isSmallScreen ? 16 : 18,
  screenTopPadding: isTinyScreen ? 10 : isSmallScreen ? 14 : 18,
  detailTopPadding: isTinyScreen ? 8 : isSmallScreen ? 10 : 14,
  contentBottomPadding:
    Platform.OS === 'ios'
      ? isTinyScreen
        ? 98
        : isSmallScreen
          ? 106
          : 116
      : isTinyScreen
        ? 118
        : isSmallScreen
          ? 126
          : 136,
  floatingNavBottom: Platform.OS === 'ios' ? 20 : 30,
  navSideInset: isTinyScreen ? 10 : isSmallScreen ? 12 : 14,
  navMinHeight: isTinyScreen ? 64 : isSmallScreen ? 70 : 76,
  navVerticalPadding: isTinyScreen ? 5 : isSmallScreen ? 6 : 8,
  navHorizontalPadding: isTinyScreen ? 5 : isSmallScreen ? 6 : 8,
  navRadius: isTinyScreen ? 20 : 24,
  navIconBox: isTinyScreen ? 30 : isSmallScreen ? 32 : 36,
  navIconFont: isTinyScreen ? 15 : isSmallScreen ? 16 : 18,
  navLabelFont: isTinyScreen ? 8.5 : isSmallScreen ? 9 : 10,
  primaryButtonHeight: isTinyScreen ? 44 : isSmallScreen ? 48 : 52,
  secondaryButtonHeight: isTinyScreen ? 42 : isSmallScreen ? 45 : 48,
  ghostButtonHeight: isTinyScreen ? 38 : isSmallScreen ? 40 : 44,
  cardPadding: isTinyScreen ? 13 : isSmallScreen ? 14 : 16,
  detailPadding: isTinyScreen ? 15 : isSmallScreen ? 16 : 18,
  sectionTitleFont: isTinyScreen ? 27 : isSmallScreen ? 29 : 32,
  sectionTitleLine: isTinyScreen ? 32 : isSmallScreen ? 35 : 38,
  sectionSubtitleFont: isTinyScreen ? 13 : isSmallScreen ? 14 : 15,
  sectionSubtitleLine: isTinyScreen ? 19 : isSmallScreen ? 21 : 22,
  cardTitleFont: isTinyScreen ? 17 : isSmallScreen ? 18 : 19,
  cardTitleLine: isTinyScreen ? 22 : isSmallScreen ? 23 : 24,
  bodyFont: isTinyScreen ? 15 : 16,
  bodyLine: isTinyScreen ? 24 : 26,
  mapHeight: isTinyScreen ? 210 : isSmallScreen ? 236 : 276,
  quizIntroImageHeight: isTinyScreen ? 218 : isSmallScreen ? 252 : 310,
  emptyImageHeight: isTinyScreen ? 150 : isSmallScreen ? 170 : 190,
};
