import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeStackNavigator from './HomeStackNavigator';
import SearchScreen from '../screens/SearchScreen';
import WatchListScreen from '../screens/WatchListScreen';

export type BottomTabParams = {
  HomeStackNavigator: undefined;
  Search: undefined;
  WatchList: undefined;
};
const Tab = createBottomTabNavigator<BottomTabParams>();

const RootNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
        options={{headerShown: false, title: 'Home'}}
      />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="WatchList" component={WatchListScreen} />
    </Tab.Navigator>
  );
};

export default RootNavigator;
