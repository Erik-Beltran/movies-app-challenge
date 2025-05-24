import {StyleSheet, Text} from 'react-native';

const Chip = ({label}: {label: string}) => {
  return <Text style={styles.label}>{label}</Text>;
};

export default Chip;

const styles = StyleSheet.create({
  label: {
    backgroundColor: '#34353E',
    color: 'white',
    padding: 8,
    borderRadius: 10,
    marginRight: 8,
  },
});
