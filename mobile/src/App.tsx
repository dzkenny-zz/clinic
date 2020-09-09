/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashPage from './pages/login/splash';
import HomePage from './pages/home';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen
          name="Login"
          component={SplashPage}
          options={{
            animationTypeForReplace: 'pop'
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
