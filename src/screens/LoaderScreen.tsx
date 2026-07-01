import React, {useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {images} from '../assets';
import {colors} from '../theme/colors';

type LoaderScreenProps = {
  onFinished: () => void;
};

export const LoaderScreen = ({onFinished}: LoaderScreenProps) => {
  const drift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(drift, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(drift, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();
    const timer = setTimeout(onFinished, 5000);

    return () => {
      animation.stop();
      clearTimeout(timer);
    };
  }, [drift, onFinished]);

  const translateY = drift.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <ImageBackground source={images.loaderBackground} style={styles.root} resizeMode="cover">
      <View style={styles.topShade} />
      <View style={styles.bottomShade} />
      <View style={styles.particles}>
        {Array.from({length: 14}).map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              {
                left: `${7 + ((index * 19) % 84)}%`,
                top: `${8 + ((index * 29) % 78)}%`,
                transform: [{translateY}],
              },
            ]}
          />
        ))}
      </View>
      <View style={styles.loadingPanel}>
        <ActivityIndicator color={colors.softGold} size="small" />
        <Text style={styles.loadingText}>Loading historical guide</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#12071F',
  },
  topShade: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 150,
    backgroundColor: 'rgba(12, 5, 22, 0.18)',
  },
  bottomShade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 220,
    backgroundColor: 'rgba(10, 4, 18, 0.58)',
  },
  particles: {
    ...StyleSheet.absoluteFillObject,
  },
  particle: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.primaryGold,
    opacity: 0.62,
  },
  loadingPanel: {
    marginBottom: 54,
    minHeight: 44,
    minWidth: 230,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(242, 207, 115, 0.74)',
    backgroundColor: 'rgba(24, 9, 43, 0.68)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  loadingText: {
    color: colors.card,
    fontSize: 13,
    fontWeight: '800',
  },
});
