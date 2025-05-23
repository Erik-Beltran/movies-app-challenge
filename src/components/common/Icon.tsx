import Ionicons from '@react-native-vector-icons/Ionicons';

type IconProps = {
  name: string;
  size?: number;
  color?: string;
};

const Icon = ({name, size = 24, color = '#000'}: IconProps) => {
  return <Ionicons name={name as any} size={size} color={color} />;
};

export default Icon;
