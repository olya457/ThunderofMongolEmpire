import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/colors';
import type {TabKey} from '../types/content';
import {floatingNavBottom} from '../components/layout';
import {metric} from '../theme/metrics';

const tabs: Array<{key: TabKey; label: string; icon: string}> = [
  {key: 'history', label: 'History', icon: '📖'},
  {key: 'quiz', label: 'Quiz', icon: '？'},
  {key: 'map', label: 'Map', icon: '🗺'},
  {key: 'life', label: 'Life', icon: '⛺'},
  {key: 'sites', label: 'Sites', icon: '📍'},
  {key: 'favorites', label: 'Favorites', icon: '♡'},
];

type BottomTabBarProps = {
  selectedTab: TabKey;
  onSelect: (tab: TabKey) => void;
};

export const BottomTabBar = ({selectedTab, onSelect}: BottomTabBarProps) => (
  <View style={styles.shell}>
    {tabs.map(tab => {
      const active = tab.key === selectedTab;

      return (
        <Pressable
          accessibilityRole="tab"
          accessibilityState={{selected: active}}
          key={tab.key}
          onPress={() => onSelect(tab.key)}
          style={({pressed}) => [styles.item, pressed && styles.pressed]}>
          <View style={[styles.iconBubble, active && styles.iconBubbleActive]}>
            <Text style={[styles.icon, active && styles.iconActive]}>
              {tab.icon}
            </Text>
          </View>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.78}
            style={[styles.label, active && styles.labelActive]}>
            {tab.label}
          </Text>
        </Pressable>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  shell: {
    position: 'absolute',
    left: metric.navSideInset,
    right: metric.navSideInset,
    bottom: floatingNavBottom,
    minHeight: metric.navMinHeight,
    paddingHorizontal: metric.navHorizontalPadding,
    paddingVertical: metric.navVerticalPadding,
    borderRadius: metric.navRadius,
    borderWidth: 1,
    borderColor: '#725197',
    backgroundColor: 'rgba(31, 19, 43, 0.96)',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.34,
    shadowRadius: 22,
    shadowOffset: {width: 0, height: 12},
    elevation: 8,
  },
  item: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: metric.navLabelFont < 9 ? 2 : 4,
  },
  pressed: {
    opacity: 0.78,
  },
  iconBubble: {
    width: metric.navIconBox,
    height: metric.navIconBox,
    borderRadius: metric.navIconBox / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBubbleActive: {
    backgroundColor: '#3B2854',
    borderWidth: 1,
    borderColor: '#7E57FF',
  },
  icon: {
    color: colors.mutedText,
    fontSize: metric.navIconFont,
    fontWeight: '800',
  },
  iconActive: {
    color: colors.softGold,
  },
  label: {
    color: colors.mutedText,
    fontSize: metric.navLabelFont,
    fontWeight: '800',
    maxWidth: '100%',
  },
  labelActive: {
    color: colors.softGold,
  },
});
