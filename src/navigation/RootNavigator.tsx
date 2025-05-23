import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeStackNavigator from './HomeStackNavigator';
import SearchScreen from '../screens/SearchScreen';
import WatchListScreen from '../screens/WatchListScreen';

export type BottomTabParams = {
  Home: undefined;
  Search: undefined;
  WatchList: undefined;
};
const Tab = createBottomTabNavigator<BottomTabParams>();

const RootNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="WatchList" component={WatchListScreen} />
    </Tab.Navigator>
  );
};

export default RootNavigator;
