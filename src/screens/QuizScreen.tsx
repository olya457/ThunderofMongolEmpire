import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {QuizIntroView, QuizQuestionCard, QuizResultView} from '../components/quiz';
import {
  SectionHeader,
  contentBottomPadding,
  screenHorizontalPadding,
  screenTopPadding,
} from '../components/layout';
import {quizQuestionById, quizQuestions} from '../data/quizQuestions';
import {localStore} from '../storage/localStore';
import type {QuizQuestion, QuizResult, QuizSession} from '../types/content';

type QuizMode = 'loading' | 'intro' | 'question' | 'result';

type QuizScreenProps = {
  onBackToArticles: () => void;
};

export const QuizScreen = ({onBackToArticles}: QuizScreenProps) => {
  const [mode, setMode] = useState<QuizMode>('loading');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const loadQuiz = async () => {
      const activeSession = await localStore.getQuizSession();
      if (activeSession) {
        const restored = activeSession.questionIds
          .map(id => quizQuestionById[id])
          .filter(Boolean);
        if (restored.length === 10) {
          setQuestions(restored);
          setCurrentIndex(activeSession.currentIndex);
          setScore(activeSession.score);
          setSelectedIndex(activeSession.selectedIndex);
          setLocked(activeSession.locked);
          setMode('question');
          return;
        }
      }

      const storedResult = await localStore.getQuizResult();
      if (storedResult) {
        setResult(storedResult);
        setScore(storedResult.score);
        setMode('result');
        return;
      }

      setMode('intro');
    };

    loadQuiz();
  }, []);

  const persistSession = async (nextSession: QuizSession) => {
    await localStore.setQuizSession(nextSession);
  };

  const startQuiz = async () => {
    const selected = [...quizQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    const session: QuizSession = {
      questionIds: selected.map(question => question.id),
      currentIndex: 0,
      score: 0,
      selectedIndex: null,
      locked: false,
    };

    setQuestions(selected);
    setCurrentIndex(0);
    setScore(0);
    setSelectedIndex(null);
    setLocked(false);
    setResult(null);
    setMode('question');
    await localStore.setQuizResult(null);
    await persistSession(session);
  };

  const selectAnswer = async (answerIndex: number) => {
    if (locked || !questions[currentIndex]) {
      return;
    }

    const correct = answerIndex === questions[currentIndex].answerIndex;
    const nextScore = score + (correct ? 1 : 0);
    setSelectedIndex(answerIndex);
    setLocked(true);
    setScore(nextScore);
    await persistSession({
      questionIds: questions.map(question => question.id),
      currentIndex,
      score: nextScore,
      selectedIndex: answerIndex,
      locked: true,
    });
  };

  const nextQuestion = async () => {
    if (currentIndex === questions.length - 1) {
      const nextResult: QuizResult = {
        score,
        total: questions.length,
        completedAt: new Date().toISOString(),
      };
      setResult(nextResult);
      setMode('result');
      await localStore.setQuizResult(nextResult);
      await localStore.setQuizSession(null);
      return;
    }

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setSelectedIndex(null);
    setLocked(false);
    await persistSession({
      questionIds: questions.map(question => question.id),
      currentIndex: nextIndex,
      score,
      selectedIndex: null,
      locked: false,
    });
  };

  if (mode === 'loading') {
    return <View style={styles.root} />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      <SectionHeader
        title="Quiz"
        subtitle="Ten questions are selected randomly from a forty-question history pool."
      />
      {mode === 'intro' ? (
        <QuizIntroView onStart={startQuiz} lastScore={result?.score ?? null} />
      ) : null}
      {mode === 'question' && questions[currentIndex] ? (
        <QuizQuestionCard
          question={questions[currentIndex]}
          current={currentIndex + 1}
          total={questions.length}
          selectedIndex={selectedIndex}
          locked={locked}
          onSelect={selectAnswer}
          onNext={nextQuestion}
        />
      ) : null}
      {mode === 'result' ? (
        <QuizResultView
          score={result?.score ?? score}
          total={result?.total ?? 10}
          onRetry={startQuiz}
          onBackToArticles={onBackToArticles}
        />
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingHorizontal: screenHorizontalPadding,
    paddingTop: screenTopPadding,
    paddingBottom: contentBottomPadding,
  },
});
