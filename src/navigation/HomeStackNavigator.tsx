import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import CategoryScreen from '../screens/CategoryScreen';
import defaultStackOptions from './stackOptions';

export type HomeStackParams = {
  Home: undefined;
  Details: {movieId: number};
  Category: {category: string};
};
const Stack = createStackNavigator<HomeStackParams>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{headerBackTitle: ''}}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{headerBackTitle: ''}}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
