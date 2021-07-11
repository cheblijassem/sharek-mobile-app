import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

// ...
class Chat extends Component {
    render() {
        return <WebView style={{ height: 500 }} source={{ uri: 'http://sharek-it.byethost31.com/' }} />;
    }
}

export default Chat