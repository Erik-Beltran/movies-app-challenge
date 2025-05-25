import {ComponentProps} from 'react';
import Icon from '@react-native-vector-icons/ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';

import HomeStackNavigator, {HomeStackParams} from './HomeStackNavigator';
import SearchScreen from '../screens/SearchScreen';
import WatchListScreen from '../screens/WatchListScreen';
import defaultStackOptions from './stackOptions';

export type RootSatckParams = {
  HomeStackNavigator: NavigatorScreenParams<HomeStackParams>;
  Search: undefined;
  WatchList: undefined;
};
type IconProps = ComponentProps<typeof Icon>;
type IconName = IconProps['name'];

type TabIconProps = {
  color: string;
  size: number;
  focused: boolean;
};

const Tab = createBottomTabNavigator<RootSatckParams>();

const createTabIcon = (iconNameOutline: IconName, iconNameFilled: IconName) => {
  return ({color, size, focused}: TabIconProps) => {
    const nameToUse = focused ? iconNameFilled : iconNameOutline;
    return <Icon name={nameToUse} size={size} color={color} />;
  };
};

const RootNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopColor: 'transparent',
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#aaa',
        ...defaultStackOptions,
      }}>
      <Tab.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: createTabIcon('home-outline', 'home'),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: createTabIcon('search-outline', 'search'),
        }}
      />
      <Tab.Screen
        name="WatchList"
        component={WatchListScreen}
        options={{
          tabBarIcon: createTabIcon('film-outline', 'film'),
          title: 'Watch List',
        }}
      />
    </Tab.Navigator>
  );
};

export default RootNavigator;
