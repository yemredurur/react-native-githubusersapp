/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
var Main = require('./App/Components/Main');
import {
    AppRegistry,
    StyleSheet,
    Text,
    NavigatorIOS,
    View
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111'
  }
});

class githubNotetaker extends React.Component {
  render() {
    return (
        <NavigatorIOS
            style={styles.container}
            initialRoute={{
              component: Main,
              title: 'Git hub note taker'
            }}
            style={{flex: 1}}
        />
    );
  }
}

AppRegistry.registerComponent('githubNotetaker', () => githubNotetaker);
