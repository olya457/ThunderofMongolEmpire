import React, {useCallback, useState} from 'react';
import {LoaderScreen} from './screens/LoaderScreen';
import {OnboardingScreen} from './screens/OnboardingScreen';
import {localStore} from './storage/localStore';
import {AppNavigator} from './navigation/AppNavigator';

type AppPhase = 'loader' | 'onboarding' | 'main';

export const AppRoot = () => {
  const [phase, setPhase] = useState<AppPhase>('loader');

  const finishLoader = useCallback(async () => {
    const completed = await localStore.getOnboardingCompleted();
    setPhase(completed ? 'main' : 'onboarding');
  }, []);

  const completeOnboarding = async () => {
    await localStore.setOnboardingCompleted();
    setPhase('main');
  };

  if (phase === 'loader') {
    return <LoaderScreen onFinished={finishLoader} />;
  }

  if (phase === 'onboarding') {
    return <OnboardingScreen onComplete={completeOnboarding} />;
  }

  return <AppNavigator />;
};
