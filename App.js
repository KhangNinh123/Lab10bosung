import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import { createStackNavigator } from '@react-navigation/stack'; // Import Stack Navigator
import store from './redux/store'; // Import Redux store

import WelcomeScreen from './components/WelcomeScreen'; // Import WelcomeScreen
import MainPage from './components/MainPage'; // Import MainPage

// Tạo Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomeScreen">
          {/* Màn hình Welcome */}
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }} // Ẩn thanh tiêu đề
          />
          {/* Màn hình chính (Main Page) */}
          <Stack.Screen
            name="MainPage"
            component={MainPage}
            options={{ title: 'Main Page' }} // Tiêu đề hiển thị
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
