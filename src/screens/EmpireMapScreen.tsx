import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {MapStageCard} from '../components/contentCards';
import {EmpireMapView, TimelineSlider} from '../components/map';
import {PremiumCard, SectionHeader, contentBottomPadding} from '../components/layout';
import {mapStages} from '../data/mapStages';
import {localStore} from '../storage/localStore';
import {colors} from '../theme/colors';

export const EmpireMapScreen = () => {
  const [stageIndex, setStageIndex] = useState(0);
  const stage = mapStages[stageIndex];

  useEffect(() => {
    const loadStage = async () => {
      const stored = await localStore.getMapStage();
      setStageIndex(Math.min(Math.max(stored, 0), mapStages.length - 1));
    };

    loadStage();
  }, []);

  const changeStage = async (index: number) => {
    setStageIndex(index);
    await localStore.setMapStage(index);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      <SectionHeader
        title="Empire Map"
        subtitle="Move the timeline below to see how the Mongol Empire expanded across Eurasia."
      />
      <EmpireMapView stageIndex={stageIndex} stage={stage} />
      <PremiumCard style={styles.timelineCard}>
        <Text style={styles.timelineTitle}>Expansion timeline</Text>
        <TimelineSlider
          stages={mapStages}
          index={stageIndex}
          onChange={changeStage}
        />
      </PremiumCard>
      <MapStageCard stage={stage} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: contentBottomPadding,
  },
  timelineCard: {
    padding: 14,
    marginBottom: 16,
  },
  timelineTitle: {
    color: colors.primaryText,
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 6,
  },
});
