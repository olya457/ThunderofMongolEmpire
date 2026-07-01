import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, {Marker, Polygon, PROVIDER_DEFAULT, type LatLng} from 'react-native-maps';
import {colors} from '../theme/colors';
import {isSmallScreen, isTinyScreen, metric} from '../theme/metrics';
import type {MapStage} from '../types/content';

type EmpireMapViewProps = {
  stageIndex: number;
  stage: MapStage;
};

const eurasiaRegion = {
  latitude: 47,
  longitude: 79,
  latitudeDelta: 44,
  longitudeDelta: 102,
};

const expansionPolygons: LatLng[][] = [
  [
    {latitude: 52.8, longitude: 91},
    {latitude: 54.4, longitude: 103},
    {latitude: 50.4, longitude: 116},
    {latitude: 44.8, longitude: 116},
    {latitude: 41.5, longitude: 103},
    {latitude: 43.5, longitude: 91},
    {latitude: 48.2, longitude: 84},
  ],
  [
    {latitude: 53.8, longitude: 88},
    {latitude: 55.4, longitude: 105},
    {latitude: 49.8, longitude: 122},
    {latitude: 37.8, longitude: 119},
    {latitude: 36.4, longitude: 103},
    {latitude: 42.2, longitude: 87},
  ],
  [
    {latitude: 55.2, longitude: 57},
    {latitude: 56.4, longitude: 89},
    {latitude: 51.2, longitude: 119},
    {latitude: 36.2, longitude: 118},
    {latitude: 35.2, longitude: 74},
    {latitude: 39.4, longitude: 56},
  ],
  [
    {latitude: 56.4, longitude: 47},
    {latitude: 58, longitude: 83},
    {latitude: 52.6, longitude: 122},
    {latitude: 34.8, longitude: 119},
    {latitude: 32.2, longitude: 77},
    {latitude: 37.6, longitude: 48},
  ],
  [
    {latitude: 57.2, longitude: 28},
    {latitude: 59, longitude: 70},
    {latitude: 54.5, longitude: 123},
    {latitude: 35.5, longitude: 119},
    {latitude: 32.4, longitude: 72},
    {latitude: 39.6, longitude: 32},
  ],
  [
    {latitude: 58.4, longitude: 24},
    {latitude: 59.8, longitude: 68},
    {latitude: 55.2, longitude: 125},
    {latitude: 31, longitude: 121},
    {latitude: 28.6, longitude: 66},
    {latitude: 36.4, longitude: 25},
  ],
  [
    {latitude: 58.2, longitude: 24},
    {latitude: 60, longitude: 70},
    {latitude: 55.5, longitude: 126},
    {latitude: 23.2, longitude: 121},
    {latitude: 25.4, longitude: 83},
    {latitude: 30.5, longitude: 55},
    {latitude: 37.4, longitude: 25},
  ],
  [
    {latitude: 58.6, longitude: 22},
    {latitude: 60.4, longitude: 68},
    {latitude: 56.4, longitude: 128},
    {latitude: 23.2, longitude: 122},
    {latitude: 24, longitude: 81},
    {latitude: 29.5, longitude: 50},
    {latitude: 38.2, longitude: 22},
  ],
];

const cityMarkers = [
  {label: 'Karakorum', minStage: 0, coordinate: {latitude: 47.1975, longitude: 102.8238}},
  {label: 'Zhongdu', minStage: 1, coordinate: {latitude: 39.9042, longitude: 116.4074}},
  {label: 'Samarkand', minStage: 2, coordinate: {latitude: 39.6542, longitude: 66.9597}},
  {label: 'Bukhara', minStage: 2, coordinate: {latitude: 39.7681, longitude: 64.4556}},
  {label: 'Kiev', minStage: 4, coordinate: {latitude: 50.4501, longitude: 30.5234}},
  {label: 'Tabriz', minStage: 5, coordinate: {latitude: 38.0962, longitude: 46.2738}},
  {label: 'Dadu', minStage: 6, coordinate: {latitude: 39.9042, longitude: 116.4074}},
  {label: 'Hangzhou', minStage: 6, coordinate: {latitude: 30.2741, longitude: 120.1551}},
];

export const EmpireMapView = ({stageIndex, stage}: EmpireMapViewProps) => {
  const visibleMarkers = cityMarkers.filter(city => stageIndex >= city.minStage);

  return (
    <View style={styles.mapShell}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.realMap}
        initialRegion={eurasiaRegion}
        region={eurasiaRegion}
        mapType="mutedStandard"
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        toolbarEnabled={false}>
        <Polygon
          coordinates={expansionPolygons[stageIndex]}
          fillColor="rgba(126, 87, 255, 0.36)"
          strokeColor="rgba(242, 207, 115, 0.95)"
          strokeWidth={2}
        />
        {visibleMarkers.map(marker => (
          <Marker
            key={marker.label}
            coordinate={marker.coordinate}
            title={marker.label}
            pinColor={colors.primaryGold}
          />
        ))}
      </MapView>
      <View pointerEvents="none" style={styles.mapTint} />
      <View pointerEvents="none" style={styles.mapBadge}>
        <Text style={styles.mapYear}>{stage.year}</Text>
        <Text style={styles.mapCaption}>{stage.title}</Text>
      </View>
    </View>
  );
};

type TimelineSliderProps = {
  stages: MapStage[];
  index: number;
  onChange: (index: number) => void;
};

export const TimelineSlider = ({stages, index, onChange}: TimelineSliderProps) => {
  const [width, setWidth] = useState(1);

  const updateByX = useCallback((x: number) => {
    const next = Math.max(
      0,
      Math.min(stages.length - 1, Math.round((x / width) * (stages.length - 1))),
    );
    onChange(next);
  }, [onChange, stages.length, width]);

  const responder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: event => updateByX(event.nativeEvent.locationX),
        onPanResponderMove: event => updateByX(event.nativeEvent.locationX),
      }),
    [updateByX],
  );

  const trackRef = useRef<View>(null);

  const onLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  const onPress = (event: GestureResponderEvent) => {
    trackRef.current?.measure((_x, _y, _w, _h, pageX) => {
      updateByX(event.nativeEvent.pageX - pageX);
    });
  };

  return (
    <View style={styles.timelineShell}>
      <Pressable
        ref={trackRef}
        onLayout={onLayout}
        onPress={onPress}
        style={styles.timelineHit}
        {...responder.panHandlers}>
        <View style={styles.timelineTrack}>
          <View
            style={[
              styles.timelineFill,
              {width: `${(index / (stages.length - 1)) * 100}%`},
            ]}
          />
        </View>
        <View style={styles.timelinePoints}>
          {stages.map((stage, stageIndex) => {
            const active = stageIndex <= index;
            return (
              <Pressable
                key={stage.id}
                onPress={() => onChange(stageIndex)}
                style={styles.pointWrap}>
                <View style={[styles.point, active && styles.pointActive]} />
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.7}
                  style={[styles.pointLabel, stageIndex === index && styles.pointLabelActive]}>
                  {stage.year}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  mapShell: {
    height: metric.mapHeight,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.divider,
    backgroundColor: '#1A1024',
    marginBottom: 16,
  },
  realMap: {
    ...StyleSheet.absoluteFillObject,
  },
  mapTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(37, 24, 48, 0.08)',
  },
  mapBadge: {
    position: 'absolute',
    left: isTinyScreen ? 10 : 14,
    top: isTinyScreen ? 10 : 14,
    maxWidth: '76%',
    paddingHorizontal: isTinyScreen ? 10 : 13,
    paddingVertical: isTinyScreen ? 8 : 10,
    borderRadius: 8,
    backgroundColor: 'rgba(31, 19, 43, 0.82)',
    borderWidth: 1,
    borderColor: 'rgba(242, 207, 115, 0.38)',
  },
  mapYear: {
    color: colors.softGold,
    fontSize: isTinyScreen ? 24 : isSmallScreen ? 27 : 30,
    fontWeight: '900',
  },
  mapCaption: {
    marginTop: 2,
    color: colors.primaryText,
    fontSize: isTinyScreen ? 12 : 14,
    fontWeight: '800',
  },
  timelineShell: {
    paddingVertical: 10,
  },
  timelineHit: {
    minHeight: isTinyScreen ? 58 : 72,
    justifyContent: 'center',
  },
  timelineTrack: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#21152E',
    marginHorizontal: 18,
  },
  timelineFill: {
    height: '100%',
    backgroundColor: colors.royalViolet,
  },
  timelinePoints: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  pointWrap: {
    width: isTinyScreen ? 36 : 44,
    alignItems: 'center',
  },
  point: {
    width: isTinyScreen ? 12 : 15,
    height: isTinyScreen ? 12 : 15,
    borderRadius: isTinyScreen ? 6 : 8,
    backgroundColor: colors.tintedCard,
    borderWidth: 2,
    borderColor: colors.divider,
  },
  pointActive: {
    backgroundColor: colors.softGold,
    borderColor: '#3A2750',
  },
  pointLabel: {
    marginTop: isTinyScreen ? 7 : 9,
    color: colors.mutedText,
    fontSize: isTinyScreen ? 9 : 10,
    fontWeight: '800',
  },
  pointLabelActive: {
    color: colors.softGold,
  },
});
