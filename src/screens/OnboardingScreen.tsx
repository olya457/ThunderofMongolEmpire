import React, {useState} from 'react';
import {images} from '../assets';
import {OnboardingPageView} from '../components/onboarding';

const pages = [
  {
    title: 'Discover the Mongol Empire',
    subtitle:
      'Explore the story of the largest contiguous empire in human history through interactive historical content.',
    image: images.onboardingDiscovery,
  },
  {
    title: 'Read Historical Stories',
    subtitle:
      'Learn about rulers, battles, expansion, culture, and the legacy of the Mongol Empire through illustrated articles.',
    image: images.onboardingArticles,
  },
  {
    title: 'Test Your Knowledge',
    subtitle:
      'Answer quiz questions based on the articles and see how much you remember from each historical chapter.',
    image: images.onboardingQuiz,
  },
  {
    title: 'Follow the Expansion',
    subtitle:
      'Move through the timeline and watch the Mongol Empire grow across the Eurasian continent.',
    image: images.onboardingMap,
  },
  {
    title: 'Explore Culture & Places',
    subtitle:
      'Discover everyday Mongol artifacts, traditional life, and real historical sites connected to the empire.',
    image: images.onboardingCulture,
  },
];

type OnboardingScreenProps = {
  onComplete: () => void;
};

export const OnboardingScreen = ({onComplete}: OnboardingScreenProps) => {
  const [index, setIndex] = useState(0);
  const page = pages[index];

  const next = () => {
    if (index === pages.length - 1) {
      onComplete();
      return;
    }

    setIndex(current => current + 1);
  };

  return (
    <OnboardingPageView
      image={page.image}
      title={page.title}
      subtitle={page.subtitle}
      index={index}
      total={pages.length}
      onNext={next}
      onSkip={onComplete}
    />
  );
};
