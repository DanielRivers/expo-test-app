import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/useColorScheme';
import { KindeAuthProvider } from '@kinde/expo';
import { StyleSheet, View, Text } from 'react-native';
import Test from '@/components/Test';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://1fcc959cdf5e4b86850057a18b38ec2a@o4507175345455104.ingest.de.sentry.io/4507851221041232',

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // enableSpotlight: __DEV__,
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <KindeAuthProvider>
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />

          <Test></Test>
        </View>
    </KindeAuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
