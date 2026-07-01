import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {colors} from '../theme/colors';
import {metric} from '../theme/metrics';

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const PrimaryPurpleButton = ({
  title,
  onPress,
  disabled,
  style,
}: ButtonProps) => (
  <Pressable
    accessibilityRole="button"
    disabled={disabled}
    onPress={onPress}
    style={({pressed}) => [
      styles.primary,
      pressed && styles.pressed,
      disabled && styles.disabled,
      style,
    ]}>
    <Text style={styles.primaryText}>{title}</Text>
  </Pressable>
);

export const SecondaryGoldButton = ({
  title,
  onPress,
  disabled,
  style,
}: ButtonProps) => (
  <Pressable
    accessibilityRole="button"
    disabled={disabled}
    onPress={onPress}
    style={({pressed}) => [
      styles.secondary,
      pressed && styles.pressed,
      disabled && styles.disabled,
      style,
    ]}>
    <Text style={styles.secondaryText}>{title}</Text>
  </Pressable>
);

export const GhostButton = ({title, onPress, disabled, style}: ButtonProps) => (
  <Pressable
    accessibilityRole="button"
    disabled={disabled}
    onPress={onPress}
    style={({pressed}) => [
      styles.ghost,
      pressed && styles.ghostPressed,
      disabled && styles.disabled,
      style,
    ]}>
    <Text style={styles.ghostText}>{title}</Text>
  </Pressable>
);

type IconButtonProps = {
  title: string;
  icon: string;
  onPress: () => void;
  active?: boolean;
  compact?: boolean;
};

export const ShareButton = ({onPress, compact}: Omit<IconButtonProps, 'title' | 'icon'>) => (
  <PillIconButton icon="↗" title="Share" compact={compact} onPress={onPress} />
);

export const FavoriteButton = ({
  active,
  onPress,
  compact,
}: Omit<IconButtonProps, 'title' | 'icon'>) => (
  <PillIconButton
    active={active}
    compact={compact}
    icon={active ? '★' : '☆'}
    title={active ? 'Saved' : 'Save'}
    onPress={onPress}
  />
);

export const PillIconButton = ({
  title,
  icon,
  onPress,
  active,
  compact,
}: IconButtonProps) => (
  <Pressable
    accessibilityRole="button"
    hitSlop={8}
    onPress={onPress}
    style={({pressed}) => [
      styles.pill,
      active && styles.pillActive,
      compact && styles.pillCompact,
      pressed && styles.pressed,
    ]}>
    <Text style={[styles.pillIcon, active && styles.pillIconActive]}>{icon}</Text>
    {!compact ? (
      <Text style={[styles.pillText, active && styles.pillTextActive]}>
        {title}
      </Text>
    ) : null}
  </Pressable>
);

export const ButtonRow = ({children}: {children: React.ReactNode}) => (
  <View style={styles.row}>{children}</View>
);

const styles = StyleSheet.create({
  primary: {
    minHeight: metric.primaryButtonHeight,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: metric.cardPadding + 2,
    backgroundColor: colors.primaryPurple,
    shadowColor: colors.primaryPurple,
    shadowOpacity: 0.22,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: 8},
    elevation: 3,
  },
  primaryText: {
    color: colors.card,
    fontSize: metric.bodyFont,
    fontWeight: '800',
  },
  secondary: {
    minHeight: metric.secondaryButtonHeight,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: metric.cardPadding,
    backgroundColor: '#392653',
    borderWidth: 1,
    borderColor: colors.primaryGold,
  },
  secondaryText: {
    color: colors.primaryText,
    fontSize: metric.bodyFont - 1,
    fontWeight: '800',
  },
  ghost: {
    minHeight: metric.ghostButtonHeight,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: metric.cardPadding,
  },
  ghostPressed: {
    backgroundColor: '#392653',
  },
  ghostText: {
    color: colors.softGold,
    fontSize: metric.bodyFont - 1,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.82,
    transform: [{scale: 0.99}],
  },
  disabled: {
    opacity: 0.46,
  },
  pill: {
    minHeight: metric.ghostButtonHeight - 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 999,
    paddingHorizontal: metric.cardPadding - 2,
    backgroundColor: '#342247',
    borderWidth: 1,
    borderColor: colors.divider,
  },
  pillActive: {
    backgroundColor: '#463052',
    borderColor: colors.softGold,
  },
  pillCompact: {
    width: metric.ghostButtonHeight - 4,
    paddingHorizontal: 0,
  },
  pillIcon: {
    color: colors.accentViolet,
    fontSize: metric.bodyFont,
    fontWeight: '900',
  },
  pillIconActive: {
    color: colors.warmBronze,
  },
  pillText: {
    color: colors.secondaryText,
    fontSize: metric.bodyFont - 4,
    fontWeight: '800',
  },
  pillTextActive: {
    color: colors.warmBronze,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
