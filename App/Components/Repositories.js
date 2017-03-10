/**
 * Created by ydurur on 08/03/17.
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableHighlight
} from 'react-native';

var Badge = require('./Badge');
var Separator = require('./Helpers/Separator');
var Web_View = require('./Helpers/Web_View');

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    name: {
        fontSize: 18,
        paddingBottom: 5,
        color: '#48bbec'
    },
    rowContainer: {
        flexDirection: 'column',
        flex: 1,
        padding: 10
    },
    stars: {
        color: '#48BBEC',
        fontSize: 14,
        paddingBottom: 5
    },
    description: {
        fontSize: 14,
        paddingBottom: 5
    }
});


class Repositories extends React.Component {
    openPage(url){
        this.props.navigator.push({
            title: 'Web View',
            component: Web_View,
            passProps: {url}
        });
    }
    render(){
        var repos = this.props.repos;
        var list = repos.map((item, index) => {
            var desc = repos[index].description ? <Text style={styles.description}> {repos[index].description} </Text> : <View />;
            return (
                <View key={index}>
                    <View style={styles.rowContainer}>
                        <TouchableHighlight
                            onPress={this.openPage.bind(this, repos[index].html_url)}
                            underlayColor="transparent">
                            <Text style={styles.name}>{repos[index].name}</Text>
                        </TouchableHighlight>
                        <Text style={styles.stars}>Stars: {repos[index].stargazers_count}</Text>
                        {desc}
                    </View>
                    <Separator />
                </View>
            )
        });
        return(
            <ScrollView style={styles.container}>
                <Badge userInfo={this.props.userInfo}></Badge>
                {list}
            </ScrollView>
        )
    }
}

Badge.propTypes = {
    userInfo: React.PropTypes.object.isRequired,
    repos: React.PropTypes.array.isRequired
};

module.exports = Repositories;