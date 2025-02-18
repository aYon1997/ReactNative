
import { Provider } from '@ant-design/react-native';
import { loadAsync } from 'expo-font';
import { useEffect } from 'react';
import { useState } from 'react';
import { Dimensions, Image, PixelRatio, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';


export default function App() {

  const [ isReady, setReadyState ] = useState(false);

  const loadAsyncAll = () => Promise.all([
    loadAsync(
      'antoutline',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antoutline.ttf')
    ),
    loadAsync(
      'antfill',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antfill.ttf')
    )
  ]);

  useEffect(() => {
    loadAsyncAll().then(res => setReadyState(true));
  }, [])

  if(isReady) {
    return <Provider>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    </Provider>
  }

  return (
    <View>
      <Text>loading...</Text>
    </View>
  )
}
