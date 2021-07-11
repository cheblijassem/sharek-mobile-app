import React, { Component } from 'react';
import { TouchableWithoutFeedback, StyleSheet, View, TouchableOpacity, ToastAndroid } from 'react-native';
import { Text, Card, Title, Input, Button, Icon, ViewPager, Layout } from '@ui-kitten/components';
import { SafeAreaView, ScrollView } from 'react-native';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser, logoutUser, registerUser } from "../actions/authActions";

import ValidationComponent from 'react-native-form-validator';



const ArrowIcon = (props) => (
    <View style={styles.controlContainer}>
        <Icon {...props} name='arrow-forward' />
    </View>

);

class Login extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            nom: "",
            email: "",
            password: "",
            errors: {},
            isAuthenticated: false,
            secureTextEntry: true,
            selectedIndex: 0,
            isRegistred: false
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.auth.isAuthenticated) {
            this.setState({
                isAuthenticated: true
            });
        }
        if (!(nextProps.auth.isAuthenticated) && (nextProps.auth.isRegistred)) {
            this.setState({
                isRegistred: true
            });
            this.goToLogin();
            this.showToast();
            console.log(this.state.isRegistred)
        }
        if (Object.keys(nextProps.errors).length === 0) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    componentDidMount() {
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData);
        this.setState({ isAuthenticated: this.props.auth.isAuthenticated })
    };
    onSubmitRegister = e => {
        e.preventDefault();
        const userData = {
            name: this.state.nom,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password
        };
        this.props.registerUser(userData);

    };

    onLogout = e => {
        e.preventDefault();
        this.props.logoutUser();
        this.props.rerenderParentCallback();
    };
    handleEmail = (text) => {
        this.setState({ email: text }, () => {
            this.validate({
                email: { email: true },
            })
        })
    }
    handleNom = (text) => {
        this.setState({ nom: text }, () => {
            this.validate({
                nom: { minlength: 3, required: true },
            })
        })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }

    toggleSecureEntry = (text) => {
        this.setState({ secureTextEntry: !this.state.secureTextEntry })
    }
    renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={this.toggleSecureEntry}>
            <Icon {...props} name={this.state.secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

    goToRegister = () => {
        this.setState({ selectedIndex: 1, nom: "", email: "", password: "", secureTextEntry: true, errors: {} })
    }
    goToLogin = () => {
        this.setState({ selectedIndex: 0, nom: "", email: "", password: "", secureTextEntry: true, errors: {} })
    }
    setSelectedIndex = (index) => {
        this.setState({ selectedIndex: index, nom: "", email: "", password: "", secureTextEntry: true, errors: {} })
    }
    showToast = () => {
        ToastAndroid.show("Inscription terminée avec succès !", ToastAndroid.SHORT);
    };
    render() {
        return (

            <ViewPager style={{ height: '100%' }}
                selectedIndex={this.state.selectedIndex}
                onSelect={index => this.setSelectedIndex(index)}>
                <Layout level='2' style={{
                    flex: 1,
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    alignContent: "center",
                    width: "100%",
                    height: 400,
                    backgroundColor: "#4d4d4d"

                }}>
                    <SafeAreaView style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", alignContent: "space-around", alignItems: "center", backgroundColor: '#f1c40f', width: "100%", height: "100%", padding: 40, }}>
                        <View style={{ position: "absolute", top: 140, right: -100, height: 100, width: 150, borderRadius: 5, zIndex: -3, backgroundColor: '#4d4d4d', transform: [{ skewY: "-45deg" }] }} />
                        <View style={{ position: "absolute", top: 0, right: -100, height: 100, width: 150, borderRadius: 5, zIndex: -3, backgroundColor: '#262626', transform: [{ skewY: "-45deg" }] }} />
                        <View style={{ position: "absolute", bottom: 0, left: -200, height: 200, width: 300, borderRadius: 50, zIndex: -3, backgroundColor: 'orange', transform: [{ skewY: "-45deg" }] }} />
                        <ScrollView >

                            <Text style={{ marginBottom: 20, fontSize: 18, textTransform: "uppercase", textAlign: "center" }}>
                                content de te revoir!
                            </Text>
                            <Text style={{ marginBottom: 30, fontSize: 22, textTransform: "uppercase", textAlign: "center", fontWeight: "bold" }}>
                                Se connecter
                            </Text>
                            <Input style={styles.input}
                                label={<Text style={styles.placeholder}>Email</Text>}
                                value={this.state.email}
                                onChangeText={this.handleEmail}
                                ref="email"
                            />
                            {this.isFieldInError('email') && this.getErrorsInField('email').map(errorMessage => <Text style={styles.error} status='danger' key={errorMessage}>{errorMessage}</Text>)}
                            <Text style={styles.error} status='danger'>{this.state.errors.email}</Text>
                            <Text style={styles.error} status='danger'>{this.state.errors.emailnotfound}</Text>


                            <Input style={styles.input}
                                label={<Text style={styles.placeholder}>Mot de pass</Text>}
                                value={this.state.password}
                                onChangeText={this.handlePassword}
                                accessoryRight={this.renderIcon}
                                secureTextEntry={this.state.secureTextEntry}
                            />
                            <Text style={styles.error} status='danger'>{this.state.errors.password}</Text>
                            <Text style={styles.error} status='danger'>{this.state.errors.passwordincorrect}</Text>

                            <Button style={styles.submitButton2}
                                onPress={this.onSubmit} accessoryRight={ArrowIcon}>
                                <Text style={styles.submitButtonText}> Connexion </Text>
                            </Button>
                            <Text style={{ marginTop: 20, marginBottom: 5, fontSize: 14, textTransform: "uppercase", textAlign: "center" }}>
                                Tu n'as pas de compte ?
                                <Button style={[styles.submitButton2, { backgroundColor: "#f1c40f", padding: 2, flex: 1, justifyContent: "center" }]}
                                    onPress={this.goToRegister}>
                                    <Text style={[styles.submitButtonText, { fontSize: 14, color: "#262626", textAlign: 'center' }]}>  Rejoignez-nous ici </Text>
                                </Button>
                            </Text>

                        </ScrollView>
                    </SafeAreaView>
                </Layout>
                <Layout level='2' style={{
                    flex: 1,
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    alignContent: "center",
                    width: "100%",
                    height: 400,
                    backgroundColor: "#4d4d4d",
                    overflow: "hidden"

                }}>
                    <SafeAreaView style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", alignContent: "space-around", alignItems: "center", backgroundColor: '#f1c40f', width: "100%", height: "100%", padding: 40, }}>
                        <View style={{ position: "absolute", bottom: 140, right: -100, height: 100, width: 150, borderRadius: 5, zIndex: -3, backgroundColor: '#4d4d4d', transform: [{ skewY: "45deg" }] }} />
                        <View style={{ position: "absolute", bottom: 0, right: -100, height: 100, width: 150, borderRadius: 5, zIndex: -3, backgroundColor: '#262626', transform: [{ skewY: "45deg" }] }} />
                        <View style={{ position: "absolute", top: 0, left: -200, height: 200, width: 300, borderRadius: 50, zIndex: -3, backgroundColor: 'orange', transform: [{ skewY: "45deg" }] }} />
                        <ScrollView >

                            <Text style={{ marginBottom: 20, fontSize: 18, textTransform: "uppercase", textAlign: "center" }}>

                                Bienvenue
                            </Text>
                            <Text style={{ marginBottom: 30, fontSize: 22, textTransform: "uppercase", textAlign: "center", fontWeight: "bold" }}>
                                S'inscrire
                            </Text>

                            <Input style={styles.input}
                                label={<Text style={styles.placeholder}>Nom</Text>}
                                value={this.state.nom}
                                onChangeText={this.handleNom}
                                ref="nom"
                            />
                            {this.isFieldInError('nom') && this.getErrorsInField('nom').map(errorMessage => <Text style={styles.error} status='danger' key={errorMessage}>{errorMessage}</Text>)}
                            <Text style={styles.nom} status='danger'>{this.state.errors.name}</Text>


                            <Input style={styles.input}
                                label={<Text style={styles.placeholder}>Email</Text>}
                                value={this.state.email}
                                onChangeText={this.handleEmail}
                                ref="email"
                            />
                            {this.isFieldInError('email') && this.getErrorsInField('email').map(errorMessage => <Text style={styles.error} status='danger' key={errorMessage}>{errorMessage}</Text>)}
                            <Text style={styles.error} status='danger'>{this.state.errors.email}</Text>

                            <Input style={styles.input}
                                label={<Text style={styles.placeholder}>Mot de pass</Text>}
                                value={this.state.password}
                                onChangeText={this.handlePassword}
                                accessoryRight={this.renderIcon}
                                secureTextEntry={this.state.secureTextEntry}
                            />
                            <Text style={styles.error} status='danger'>{this.state.errors.password}</Text>

                            <Button style={styles.submitButton2}
                                onPress={this.onSubmitRegister} accessoryRight={ArrowIcon}>
                                <Text style={styles.submitButtonText}> Connexion </Text>
                            </Button>
                            <Text style={{ marginTop: 20, marginBottom: 5, fontSize: 14, textTransform: "uppercase", textAlign: "center" }}>
                                Avez vous déjà un compte ?
                                <Button style={[styles.submitButton2, { backgroundColor: "#f1c40f", padding: 2, flex: 1, justifyContent: "center" }]}
                                    onPress={this.goToLogin}>
                                    <Text style={[styles.submitButtonText, { fontSize: 14, color: "#262626", textAlign: 'center' }]}>  Cliquez ici pour vous identifier </Text>
                                </Button>
                            </Text>
                            {/* <Text>
                            {this.getErrorMessages()}
                        </Text> */}
                            {/* <TouchableOpacity
                            style={styles.logoutButton}
                            onPress={this.onLogout}>
                            <Text style={styles.submitButtonText}> Logout </Text>
                        </TouchableOpacity> */}
                        </ScrollView>
                    </SafeAreaView>
                </Layout>

            </ViewPager>
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
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "space-around"

    },
    input: {
        borderRadius: 20,
        borderColor: "#262626",
        color: "#262626",
        fontFamily: 'Lato_400Regular',
        backgroundColor: "#f1c40f"

    },
    placeholder: {
        fontSize: 12,
        color: "#262626",
        fontFamily: 'Lato_400Regular'

    },
    submitButton: {
        backgroundColor: '#262626',
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius: 50
    },
    submitButton2: {
        backgroundColor: '#262626',
        padding: 0,
        margin: 10,
        height: 40,
        borderRadius: 50,
        justifyContent: "space-between"
    },
    logoutButton: {
        backgroundColor: '#666666',
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius: 50
    },
    submitButtonText: {
        color: 'white',
        fontFamily: 'Lato_400Regular'
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
    controlContainer: {
        borderRadius: 50,
        padding: 5,
        backgroundColor: '#f1c40f',
    },
    error: {
        fontSize: 14,
        fontFamily: 'Lato_400Regular'
    }
});

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
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
    { loginUser, logoutUser, registerUser }
)(Login);