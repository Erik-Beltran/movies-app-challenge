import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={50} color="#FAC400" />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
