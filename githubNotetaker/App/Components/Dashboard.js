/**
 * Created by ydurur on 06/03/17.
 */

import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native';

var Profile = require('./Profile');
var Repositories = require('./Repositories');
var Notes = require('./Notes');
var api = require('../Utils/Api');

const userReposData = {};

const styles = StyleSheet.create({
    container: {
        marginTop: 65,
        flex: 1
    },
    image: {
        height: 350
    },
    buttonText: {
        fontSize: 24,
        color: '#fff',
        alignSelf: 'center',
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
    }
});


class Dashboard extends React.Component {
    makeBg(btn){
        var obj = {
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'stretch',
            flex: 1
        };

        if (btn === 0) {
            obj.backgroundColor = '#48BBEC';
        } else if (btn === 1) {
            obj.backgroundColor = '#E77AAE';
        } else {
            obj.backgroundColor = '#75BBF4';
        }

        return obj;
    }
    goToProfile(){
        this.props.navigator.push({
            title: 'Profile Page',
            component: Profile,
            passProps: {userInfo: this.props.userInfo}
        });
    }
    goToRepos(){
        if (userReposData[this.props.userInfo.login] == null) {
            api.getRepos(this.props.userInfo.login)
                .then((res) => {
                    userReposData[this.props.userInfo.login] = res;
                    this.props.navigator.push({
                        title: 'Repositories',
                        component: Repositories,
                        passProps: {
                            userInfo: this.props.userInfo,
                            repos: res
                        }
                    });
                });
        } else {
            this.props.navigator.push({
                title: 'Repositories',
                component: Repositories,
                passProps: {
                    userInfo: this.props.userInfo,
                    repos: userReposData[this.props.userInfo.login]
                }
            });
        }

    }
    goToNotes(){

        var userInfo = this.props.userInfo;
        api.getNotes(userInfo.login)
            .then((userData) => {
                userData = userData || {};
                this.props.navigator.push({
                    title: 'Notes',
                    component: Notes,
                    passProps: {
                        userInfo: userInfo,
                        notes: userData
                    }
                });
            })
            .catch((err) => {
                console.log('Error: ' + err);
                this.setState({
                    error: {error }
                });
            })

    }
    render(){
        return (
            <View style={styles.container}>
                <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image} />
                <TouchableHighlight
                    style={this.makeBg(0)}
                    onPress={this.goToProfile.bind(this)}
                    underlayColor="gray">
                    <Text style={styles.buttonText}>View Profile</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={this.makeBg(1)}
                    onPress={this.goToRepos.bind(this)}
                    underlayColor="gray">
                    <Text style={styles.buttonText}>User Repos</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={this.makeBg(2)}
                    onPress={this.goToNotes.bind(this)}
                    underlayColor="gray">
                    <Text style={styles.buttonText}>Notes</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

module.exports = Dashboard;