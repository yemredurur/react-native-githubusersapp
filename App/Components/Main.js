/**
 * Created by ydurur on 06/03/17.
 */

import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';

var api = require('../Utils/Api');
var Dashboard = require('./Dashboard');
const userData = {};
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 30,
        marginTop: 65,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#48BBEC'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#fff'
    },
    searchInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white'
    },
    buttonText: {
        fontSize: 18,
        padding: 10,
        marginTop: 10,
        color: '#111',
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        textAlign: 'center'
    },
    button: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center',
        alignSelf: 'stretch'
    },
    errorText: {
        color: 'red'
    }
});

class Main extends React.Component {
    constructor(proos){
        super(proos);
        this.state = {
            username: '',
            isLoading: false,
            error: false
        }
    }
    handleChange(event){
        this.setState({
            username: event.nativeEvent.text
        })
    }
    handleSubmit(event){
        this.setState({
            isLoading: true
        });

        if (userData[this.state.username] == null) {
        api.getBio(this.state.username)
            .then((res) => {
                if (res.message === 'Not Found') {
                    this.setState({
                        error: 'User not found',
                        isLoading: false
                    });
                } else {
                    userData[this.state.username] = res;
                    this.props.navigator.push({
                        title: res.name || 'Select an option',
                        component: Dashboard,
                        passProps: {userInfo: res}
                    });
                    this.setState({
                        isLoading: false,
                        error: false,
                        username: ''
                    });
                }
            });
        } else {
            this.props.navigator.push({
                title: userData[this.state.username].name || 'Select an option',
                component: Dashboard,
                passProps: {userInfo: userData[this.state.username]}
            });
            this.setState({
                isLoading: false,
                error: false,
                username: ''
            });
        }
    }
    render(){
        var showErr = (
            this.state.error ? <Text>{this.state.error}</Text> : <View></View>
        );
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Search for a github user</Text>
                <TextInput
                    style={styles.searchInput}
                    value={this.state.username}
                    onChange={this.handleChange.bind(this)}
                />
                <TouchableHighlight
                    stlye={styles.button}
                    onPress={this.handleSubmit.bind(this)}
                    underlayColor="white">
                    <Text style={styles.buttonText}>SEARCH</Text>
                </TouchableHighlight>
                <ActivityIndicator
                    animating={this.state.isLoading}
                    color="#111"
                    size="large"></ActivityIndicator>
                {showErr}
            </View>
        )
    }
}

module.exports = Main;