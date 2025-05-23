import {View, Text} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParams} from '../navigation/HomeStackNavigator';

interface Props extends StackScreenProps<HomeStackParams, 'Details'> {}

const DetailsScreen = ({route}: Props) => {
  const {movieId} = route.params;
  return (
    <View>
      <Text>DetailsScreen</Text>
      <Text>{movieId}</Text>
    </View>
  );
};

export default DetailsScreen;
