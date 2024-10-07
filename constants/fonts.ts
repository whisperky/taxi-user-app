import { useFonts } from 'expo-font';

export const useGlobalFonts = () => {
  const [fontsLoaded] = useFonts({
    'Alexandria-Thin': require('../assets/fonts/Alexandria-Thin.ttf'),
    'Alexandria-Light': require('../assets/fonts/Alexandria-Light.ttf'),
    'Alexandria-Regular': require('../assets/fonts/Alexandria-Regular.ttf'),
    'Alexandria-Bold': require('../assets/fonts/Alexandria-Bold.ttf'),
  });

  return fontsLoaded;
};