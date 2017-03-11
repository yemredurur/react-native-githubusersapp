/**
 * Created by ydurur on 09/03/17.
 */

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    WebView
} from 'react-native';

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6EF',
        flexDirection: 'column'
    }
});

class Web_View extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <WebView url={this.props.url} />
            </View>
        )
    }
}

Web_View.propTypes = {
    url: React.PropTypes.object.isRequired
};

module.exports = Web_View;