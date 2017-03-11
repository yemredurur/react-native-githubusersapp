/**
 * Created by ydurur on 08/03/17.
 */
import React, { Component } from 'react';

import {
    View,
    StyleSheet
} from 'react-native';

var styles = StyleSheet.create({
    separator: {
        backgroundColor: '#e3e3e3',
        height: 1,
        flex: 1
    }
});

class Separator extends React.Component {
    render() {
        return (
            <View style={styles.separator} />
        )
    }
}

module.exports = Separator;