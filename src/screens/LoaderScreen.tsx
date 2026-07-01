import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {images} from '../assets';
import {colors} from '../theme/colors';
import {isSmallScreen, isTinyScreen} from '../theme/metrics';

type LoaderScreenProps = {
  onFinished: () => void;
};

const loaderWebHtml = `
<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <style>
      html, body {
        margin: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: transparent;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      .wrap {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border: 1px solid rgba(242, 207, 115, 0.72);
        border-radius: 999px;
        background: rgba(24, 9, 43, 0.72);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.42);
      }
      .ring {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid rgba(242, 207, 115, 0.35);
        border-top-color: #F2CF73;
        animation: spin 0.9s linear infinite;
      }
      .copy {
        color: #FFFFFF;
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 0.2px;
      }
      .bar {
        position: absolute;
        left: 18%;
        right: 18%;
        bottom: 10px;
        height: 3px;
        border-radius: 8px;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.16);
      }
      .fill {
        width: 46%;
        height: 100%;
        border-radius: 8px;
        background: linear-gradient(90deg, #7E57FF, #F2CF73);
        animation: load 1.25s ease-in-out infinite;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      @keyframes load {
        0% { transform: translateX(-120%); }
        100% { transform: translateX(260%); }
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="ring"></div>
      <div class="copy">Loading historical guide</div>
      <div class="bar"><div class="fill"></div></div>
    </div>
  </body>
</html>`;

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
      <Animated.View style={[styles.titleWrap, {transform: [{translateY}]}]}>
        <Image source={images.brandEmblem} style={styles.titleImage} resizeMode="contain" />
      </Animated.View>
      <View style={styles.webViewPanel}>
        <WebView
          originWhitelist={['*']}
          source={{html: loaderWebHtml}}
          style={styles.webView}
          scrollEnabled={false}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
        />
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
    height: isTinyScreen ? 84 : isSmallScreen ? 108 : 150,
    backgroundColor: 'rgba(12, 5, 22, 0.18)',
  },
  titleWrap: {
    position: 'absolute',
    top: isTinyScreen ? 46 : isSmallScreen ? 56 : 68,
    left: 18,
    right: 18,
    alignItems: 'center',
  },
  titleImage: {
    width: isTinyScreen ? 286 : isSmallScreen ? 322 : 352,
    height: isTinyScreen ? 160 : isSmallScreen ? 180 : 198,
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
  webViewPanel: {
    marginBottom: isTinyScreen ? 28 : isSmallScreen ? 36 : 54,
    width: isTinyScreen ? 250 : isSmallScreen ? 278 : 306,
    height: isTinyScreen ? 50 : isSmallScreen ? 54 : 60,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
