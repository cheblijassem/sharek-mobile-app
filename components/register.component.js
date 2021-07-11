import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card, Title, Input } from '@ui-kitten/components';
import { SafeAreaView, ScrollView } from 'react-native';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";

import ValidationComponent from 'react-native-form-validator';


class Register extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            errors: {}
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (Object.keys(nextProps.errors).length === 0) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    componentDidMount() {
        console.log(this.props.auth.isAuthenticated)
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        this.validate({
            name: { minlength: 3, required: true },
            email: { email: true },
        });
        const userData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        this.props.registerUser(userData);
    };
    handleName = (text) => {
        this.setState({ name: text },() => {
            this.validate({
                name: {required: true},
            })
        })
    }
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }
    /* getInitialState() {
        // our *state* dictates what the component renders
        return {
            show: false
        };
    }
    maybeRenderElement() {
        if (this.state.show) {
            // depending on our state, our conditional component may be part of the tree
            return (
                <ActionStack />
            );
        }
        return null;
    } */
    render() {
        const { errors } = this.state;
        return (
            <>
                <FormTest deviceLocale="fr" />
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    alignContent: "center"
                }}>
                    <SafeAreaView style={{ flex: 1, flexDirection: "row", backgroundColor: '#262626', margin: 50, padding: 10 }}>
                        <ScrollView >
                            <Input size='small' style={styles.input}
                                label="Name"
                                value={this.state.name}
                                onChangeText={this.handleName}
                                ref="name"
                            />
                            {this.isFieldInError('lastName') && this.getErrorsInField('lastName').map(errorMessage => <Text style={styles.error}>{errorMessage}</Text>)}
                            <Input size='small' style={styles.input}
                                label="Email"
                                value={this.state.email}
                                onChangeText={this.handleEmail}
                                ref="email"
                            />
                            <Input size='small' style={styles.input}
                                label="Password"
                                value={this.state.password}
                                onChangeText={this.handlePassword}
                            />
                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={this.onSubmit}>
                                <Text style={styles.submitButtonText}> Submit </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.logoutButton}
                                onPress={this.onLogout}>
                                <Text style={styles.submitButtonText}> Logout </Text>
                            </TouchableOpacity>
                            <Text style={{ color: 'yellow' }}>{this.props.auth.isAuthenticated + ""}</Text>
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </>
        )
        const buttonTextStyle = {
            color: '#333333'
        };

    }

}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column"

    },
    input: {
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 20
    },
    submitButton: {
        backgroundColor: '#f9a826',
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius: 50
    },
    logoutButton: {
        backgroundColor: '#666666',
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius: 50
    },
    submitButtonText: {
        color: 'white'
    },
    radio: {
        flexDirection: "row",
        justifyContent: "center"
    },
    textArea: {
        margin: 15,
    },
    close: {
        position: "absolute",
        top: 0,
        right: 0,
        color: "#000000",
        backgroundColor: "transparent",
        zIndex: 1000
    },
});

Login.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { registerUser }
)(Register);