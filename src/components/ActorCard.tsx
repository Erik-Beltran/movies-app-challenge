import {Image, StyleSheet, Text, View} from 'react-native';
import {CastElement} from '../types/cast';

const ActorCard = ({actor}: {actor: CastElement}) => {
  const {profile_path, name, character} = actor;
  return (
    <View style={styles.container}>
      <Image source={{uri: profile_path}} style={styles.image} />
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.text}>
        {name}
      </Text>
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.character}>
        {' '}
        {character}
      </Text>
    </View>
  );
};

export default ActorCard;

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    alignItems: 'center',
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    maxWidth: 150,
  },

  character: {
    color: 'white',
    maxWidth: 150,
  },
});
