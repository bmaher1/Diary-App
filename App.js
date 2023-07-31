import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainFeedScreen from './screens/MainFeedScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="MainFeed" component={MainFeedScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
