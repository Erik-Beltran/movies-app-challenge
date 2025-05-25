import 'react-native-gesture-handler';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {StatusBar} from 'react-native';

const queryClient = new QueryClient();

const MyDarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#080E24',
  },
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={MyDarkTheme}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
