import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {images} from '../assets';
import {articleById} from '../data/articles';
import {colors} from '../theme/colors';
import type {QuizQuestion} from '../types/content';
import {PrimaryPurpleButton, SecondaryGoldButton} from './buttons';
import {PremiumCard, SoftBadge} from './layout';

type QuizIntroViewProps = {
  onStart: () => void;
  lastScore?: number | null;
};

export const QuizIntroView = ({onStart, lastScore}: QuizIntroViewProps) => (
  <PremiumCard style={styles.introCard}>
    <Image source={images.onboardingQuiz} style={styles.introImage} resizeMode="contain" />
    <Text style={styles.introTitle}>Mongol Empire Quiz</Text>
    <Text style={styles.introSubtitle}>
      Answer 10 random questions based on the history articles and test your
      knowledge of the empire.
    </Text>
    {typeof lastScore === 'number' ? (
      <SoftBadge label={`Last score ${lastScore}/10`} tone="gold" />
    ) : null}
    <PrimaryPurpleButton title="Start Quiz" onPress={onStart} style={styles.introButton} />
  </PremiumCard>
);

type QuizProgressViewProps = {
  current: number;
  total: number;
};

export const QuizProgressView = ({current, total}: QuizProgressViewProps) => (
  <View style={styles.progressShell}>
    <View style={styles.progressTop}>
      <Text style={styles.progressText}>
        Question {current} of {total}
      </Text>
      <Text style={styles.progressText}>{Math.round((current / total) * 100)}%</Text>
    </View>
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, {width: `${(current / total) * 100}%`}]} />
    </View>
  </View>
);

type QuizQuestionCardProps = {
  question: QuizQuestion;
  current: number;
  total: number;
  selectedIndex: number | null;
  locked: boolean;
  onSelect: (index: number) => void;
  onNext: () => void;
};

export const QuizQuestionCard = ({
  question,
  current,
  total,
  selectedIndex,
  locked,
  onSelect,
  onNext,
}: QuizQuestionCardProps) => {
  const article = articleById[question.articleId];

  return (
    <PremiumCard style={styles.questionCard}>
      <View style={styles.questionImageFrame}>
        <Image source={article.image} style={styles.questionImage} resizeMode="cover" />
      </View>
      <View style={styles.questionBody}>
        <QuizProgressView current={current} total={total} />
        <Text style={styles.questionTitle}>{question.question}</Text>
        <View style={styles.options}>
          {question.options.map((option, index) => (
            <QuizOptionButton
              key={`${question.id}-${option}`}
              label={option}
              index={index}
              selected={selectedIndex === index}
              correct={locked && index === question.answerIndex}
              incorrect={
                locked &&
                selectedIndex === index &&
                selectedIndex !== question.answerIndex
              }
              disabled={locked}
              onPress={() => onSelect(index)}
            />
          ))}
        </View>
        {locked ? (
          <PrimaryPurpleButton
            title={current === total ? 'Show Result' : 'Next'}
            onPress={onNext}
            style={styles.nextButton}
          />
        ) : null}
      </View>
    </PremiumCard>
  );
};

type QuizOptionButtonProps = {
  label: string;
  index: number;
  selected: boolean;
  correct: boolean;
  incorrect: boolean;
  disabled: boolean;
  onPress: () => void;
};

export const QuizOptionButton = ({
  label,
  index,
  selected,
  correct,
  incorrect,
  disabled,
  onPress,
}: QuizOptionButtonProps) => (
  <SecondaryGoldButton
    title={`${String.fromCharCode(65 + index)}. ${label}`}
    disabled={disabled && !selected && !correct}
    onPress={onPress}
    style={[
      styles.option,
      selected && styles.optionSelected,
      correct && styles.optionCorrect,
      incorrect && styles.optionIncorrect,
    ]}
  />
);

type QuizResultViewProps = {
  score: number;
  total: number;
  onRetry: () => void;
  onBackToArticles: () => void;
};

export const QuizResultView = ({
  score,
  total,
  onRetry,
  onBackToArticles,
}: QuizResultViewProps) => {
  const percentage = Math.round((score / total) * 100);
  const message =
    score <= 3
      ? 'Keep exploring the empire.'
      : score <= 6
        ? 'Good start, keep learning.'
        : score <= 9
          ? 'Great knowledge of history.'
          : 'Excellent, true steppe scholar.';

  return (
    <PremiumCard style={styles.resultCard}>
      <View style={styles.resultMedal}>
        <Text style={styles.resultMedalText}>★</Text>
      </View>
      <Text style={styles.resultTitle}>Your Result</Text>
      <Text style={styles.resultScore}>
        {score} / {total}
      </Text>
      <Text style={styles.resultPercent}>{percentage}%</Text>
      <Text style={styles.resultMessage}>{message}</Text>
      <PrimaryPurpleButton title="Retry Quiz" onPress={onRetry} style={styles.resultButton} />
      <SecondaryGoldButton title="Back to Articles" onPress={onBackToArticles} />
    </PremiumCard>
  );
};

const styles = StyleSheet.create({
  introCard: {
    overflow: 'hidden',
    paddingBottom: 20,
  },
  introImage: {
    width: '100%',
    height: 310,
    backgroundColor: '#1A1024',
  },
  introTitle: {
    marginTop: 18,
    paddingHorizontal: 18,
    color: colors.primaryText,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '900',
  },
  introSubtitle: {
    marginTop: 9,
    paddingHorizontal: 18,
    color: colors.secondaryText,
    fontSize: 16,
    lineHeight: 24,
  },
  introButton: {
    marginTop: 18,
    marginHorizontal: 18,
  },
  progressShell: {
    marginBottom: 16,
  },
  progressTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    color: colors.secondaryText,
    fontSize: 12,
    fontWeight: '800',
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#21152E',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: colors.primaryPurple,
  },
  questionCard: {
    overflow: 'hidden',
  },
  questionImageFrame: {
    alignSelf: 'stretch',
    width: '100%',
    aspectRatio: 1.84,
    overflow: 'hidden',
    backgroundColor: '#1A1024',
  },
  questionImage: {
    width: '100%',
    height: '100%',
  },
  questionBody: {
    padding: 16,
  },
  questionTitle: {
    color: colors.primaryText,
    fontSize: 21,
    lineHeight: 28,
    fontWeight: '900',
  },
  options: {
    marginTop: 16,
    gap: 10,
  },
  option: {
    minHeight: 50,
    justifyContent: 'center',
    backgroundColor: colors.tintedCard,
  },
  optionSelected: {
    borderColor: colors.primaryPurple,
    backgroundColor: '#392653',
  },
  optionCorrect: {
    borderColor: colors.success,
    backgroundColor: 'rgba(68, 194, 123, 0.14)',
  },
  optionIncorrect: {
    borderColor: colors.alert,
    backgroundColor: 'rgba(232, 92, 92, 0.12)',
  },
  nextButton: {
    marginTop: 18,
  },
  resultCard: {
    alignItems: 'center',
    padding: 22,
  },
  resultMedal: {
    width: 78,
    height: 78,
    borderRadius: 39,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparentGold,
    borderWidth: 1,
    borderColor: colors.softGold,
  },
  resultMedalText: {
    color: colors.warmBronze,
    fontSize: 34,
    fontWeight: '900',
  },
  resultTitle: {
    marginTop: 16,
    color: colors.primaryText,
    fontSize: 25,
    fontWeight: '900',
  },
  resultScore: {
    marginTop: 10,
    color: colors.softGold,
    fontSize: 44,
    fontWeight: '900',
  },
  resultPercent: {
    color: colors.warmBronze,
    fontSize: 18,
    fontWeight: '900',
  },
  resultMessage: {
    marginTop: 12,
    marginBottom: 18,
    color: colors.secondaryText,
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
  },
  resultButton: {
    alignSelf: 'stretch',
    marginBottom: 10,
  },
});
