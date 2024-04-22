/* eslint-disable react/react-in-jsx-scope */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {SafeAreaView, StatusBar, useColorScheme, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  ThemeProvider,
} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import MainNavigator from './src/routes/Router';
import LoginProvider from './src/context/LoginProvider';
import {Home, Welcome, Live, Navigation} from './src/screens';


export default function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const colorScheme = useColorScheme();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
    <StatusBar
      barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      backgroundColor={backgroundStyle.backgroundColor}
    />
    <LoginProvider>
      <MainNavigator />
      {/* <Home/> */}
    </LoginProvider>
  </NavigationContainer>
  );
}
