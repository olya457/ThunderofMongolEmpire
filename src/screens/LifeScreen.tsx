import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {ArtifactCard} from '../components/contentCards';
import {
  SectionHeader,
  SoftBadge,
  contentBottomPadding,
  screenHorizontalPadding,
  screenTopPadding,
} from '../components/layout';
import {lifeItems} from '../data/lifeItems';
import {shareEducationalText} from '../utils/share';

export const LifeScreen = () => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.content}>
    <SectionHeader
      title="Mongol Life"
      subtitle="A museum collection of everyday objects, tools, and cultural details."
      action={<SoftBadge label="20 artifacts" tone="gold" />}
    />
    {lifeItems.map(item => (
      <ArtifactCard
        key={item.id}
        item={item}
        onShare={() => shareEducationalText(item.name, item.fact)}
      />
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: screenHorizontalPadding,
    paddingTop: screenTopPadding,
    paddingBottom: contentBottomPadding,
  },
});
