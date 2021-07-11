import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text, Button, Icon } from '@ui-kitten/components';
import { default as theme } from './custom-theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './components/bottom-navigation.component';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './components/custom-tab.component';
import AppLoading from 'expo-app-loading';
import { useFonts, Lato_400Regular } from '@expo-google-fonts/lato';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import WebView from 'react-native-webview';




export default function App() {

  AsyncStorage.getItem('jwtToken').then((token) => {
    if (token) {
      // Set auth token header auth
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Set user and isAuthenticated
      store.dispatch(setCurrentUser(decoded));
      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
      }
    }
  })

  let [fontsLoaded] = useFonts({
    Lato_400Regular,
  });

  if (WebView.defaultProps == null) WebView.defaultProps = {};
  WebView.defaultProps.useWebKit = true;

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
}
