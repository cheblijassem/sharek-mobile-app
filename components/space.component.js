import React, { Component } from 'react';
import { View, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import { Spinner, Text, Icon, Layout, OverflowMenu, TopNavigation, TopNavigationAction, Drawer, DrawerGroup, DrawerItem, MenuItem } from '@ui-kitten/components';
import Login from './Login.component';
import TextNavigator from './text-navigator.component';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../actions/authActions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import axios from 'axios';
const LogoutIcon = (props) => (
    <Icon {...props} name='log-out' style={{ width: 25, height: 25, tintColor: "#262626" }} />
);
const MenuIcon = (props) => (
    <Icon {...props} name='more-vertical' style={{ width: 25, height: 25, tintColor: "#262626" }} />
);


const SmartphoneIcon = (props) => (
    <Icon {...props} name='smartphone-outline' />
);
const PersonIcon = (props) => (
    <Icon {...props} name='person' />
);
const PinIcon = (props) => (
    <Icon {...props} name='pin' />
);
const BookmarkIcon = (props) => (
    <Icon {...props} name='bookmark' />
);

const ColorPaletteIcon = (props) => (
    <Icon {...props} name='color-palette-outline' />
);

const StarIcon = (props) => (
    <Icon {...props} name='star' />
);

const ArrowIcon = (props) => (
    <Icon {...props} name='arrow-right' />
);

class Space extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            menuVisible: false,
            selectedIndex: null,
            loading: true,
            Actions: []
        }
        this.handler = this.handler.bind(this)
    }

    handler() {
        this.setState({ isAuthenticated: true })
    }

    getActions = () => {
        AsyncStorage.getItem('jwtToken').then((token) => {
            if (token) {
                // Set auth token header auth
                // Decode token and get user info and exp
                const decoded = jwt_decode(token);
                axios.get(`https://sharek-it-back.herokuapp.com/api/dont/searchByUser/` + decoded.id)
                    .then(({ data }) => {
                        this.setState({ Actions: data, loading: false });
                    }).catch(err => console.log(err))
            }
        })
    }
    componentDidMount() {
        this.getActions();
        if (this.props.auth.isAuthenticated) {
            this.setState({ isAuthenticated: true })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.getActions();
        if (nextProps.auth.isAuthenticated) {
            this.setState({ isAuthenticated: true })
        }
    }
    onLogout = () => {
        this.props.logoutUser();
        this.setState({ isAuthenticated: false })

    };

    toggleMenu = () => {
        this.setState({
            menuVisible: !this.state.menuVisible
        });
    };
    setSelectedIndex = (index) => {
        this.setState({
            selectedIndex: index
        });
    };
    renderMenuAction = () => (
        <TopNavigationAction icon={MenuIcon} onPress={this.toggleMenu} />
    );

    renderRightActions = () => (
        <React.Fragment>
            {(this.state.isAuthenticated) &&
                <OverflowMenu
                    anchor={this.renderMenuAction}
                    visible={this.state.menuVisible}
                    onBackdropPress={this.toggleMenu}
                    style={{ marginTop: 30 }}>
                    <MenuItem accessoryLeft={LogoutIcon} onPress={this.onLogout} style={{ backgroundColor: "#f1c40f" }} title={evaProps => <Text {...evaProps} style={styles.subtext}>Logout</Text>} />
                </OverflowMenu>}

        </React.Fragment>
    );
    render() {

        return (

            <>
                {/* <Layout style={styles.container} level='1'>
                    <TopNavigation
                        title={evaProps => <Text {...evaProps} style={styles.text}>Mes Actions</Text>}
                        accessoryRight={this.renderRightActions}
                    />
                </Layout> */}

                {(this.props.auth.isAuthenticated) && (this.state.loading) &&
                    <Layout style={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                        width: '100%',
                        height: '100%',
                    }}>
                        <View style={styles.controlContainer}>
                            <Spinner status='primary' />
                        </View>
                    </Layout>
                }

                {
                    (this.props.auth.isAuthenticated) && !(this.state.loading) && !(this.state.Actions.length > 0) &&
                    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Layout style={{
                            flex: 1,
                            padding: 10,
                            width: '90%',
                            marginTop: 100,
                            marginBottom: 90,
                            overflow: 'hidden',
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: 'center',
                            borderWidth: 0,
                            borderRadius: 50,
                            backgroundColor: '#f1c40f',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 10,
                            },
                            shadowOpacity: 0.51,
                            shadowRadius: 13.16,
                            elevation: 20,
                        }}>
                            <View style={{ position: "absolute", bottom: 140, right: -100, height: 100, width: 150, borderRadius: 5, zIndex: -3, backgroundColor: '#4d4d4d', transform: [{ skewY: "45deg" }] }} />
                            <View style={{ position: "absolute", bottom: 0, right: -100, height: 100, width: 150, borderRadius: 5, zIndex: -3, backgroundColor: '#262626', transform: [{ skewY: "45deg" }] }} />
                            <View style={{ position: "absolute", top: 0, left: -200, height: 200, width: 300, borderRadius: 50, zIndex: -3, backgroundColor: 'orange', transform: [{ skewY: "45deg" }] }} />
                            <Layout style={{
                                flex: 1,
                                padding: 10,
                                paddingTop: 10,
                                marginBottom: 20,
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 0,
                                borderTopEndRadius: 20,
                                borderTopStartRadius: 20,
                                borderBottomEndRadius: 20,
                                borderBottomStartRadius: 20,
                                marginTop: 50,
                                width: '100%',
                                backgroundColor: '#f6f6f6'
                            }}>
                                <Text style={[styles.subtext, { color: "#888888" }]}>Pas d'actions</Text>
                                <TextNavigator></TextNavigator>
                            </Layout>
                        </Layout>
                    </Layout>
                }

                {
                    (this.props.auth.isAuthenticated) && !(this.state.loading) && (this.state.Actions.length > 0) &&
                    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Layout style={{
                            flex: 1,
                            padding: 10,
                            width: '90%',
                            marginTop: 100,
                            marginBottom: 90,
                            overflow: 'hidden',
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: 'center',
                            borderWidth: 0,
                            borderRadius: 50,
                            backgroundColor: '#f1c40f',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 10,
                            },
                            shadowOpacity: 0.51,
                            shadowRadius: 13.16,
                            elevation: 20,
                        }}>
                            <View style={{ position: "absolute", bottom: 140, right: -100, height: 100, width: 150, borderRadius: 5, zIndex: -3, backgroundColor: '#4d4d4d', transform: [{ skewY: "45deg" }] }} />
                            <View style={{ position: "absolute", bottom: 0, right: -100, height: 100, width: 150, borderRadius: 5, zIndex: -3, backgroundColor: '#262626', transform: [{ skewY: "45deg" }] }} />
                            <View style={{ position: "absolute", top: 0, left: -200, height: 200, width: 300, borderRadius: 50, zIndex: -3, backgroundColor: 'orange', transform: [{ skewY: "45deg" }] }} />
                            <Layout style={{
                                flex: 1,
                                padding: 10,
                                paddingTop: 10,
                                marginBottom: 20,
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 0,
                                borderTopEndRadius: 20,
                                borderTopStartRadius: 20,
                                borderBottomEndRadius: 20,
                                borderBottomStartRadius: 20,
                                marginTop: 50,
                                width: '100%',
                                backgroundColor: '#f6f6f6'
                            }}>
                                <Drawer style={{
                                    backgroundColor: '#f6f6f6'
                                }}
                                    selectedIndex={this.state.selectedIndex}
                                    onSelect={index => this.setSelectedIndex(index)}>
                                    {this.state.Actions.map((item) => {
                                        return (
                                            <DrawerGroup style={{ backgroundColor: '#f6f6f6' }} key={item._id} title={item.produitName} accessoryLeft={BookmarkIcon}>


                                                <DrawerItem style={{ backgroundColor: '#f6f6f6' }} title={`Nom: ` + item.nom} accessoryLeft={PersonIcon} />
                                                <DrawerItem style={{ backgroundColor: '#f6f6f6' }} title={`Prenom: ` + item.prenom} accessoryLeft={ArrowIcon} />
                                                <DrawerItem style={{ backgroundColor: '#f6f6f6' }} title={`Tel: ` + item.tel} accessoryLeft={ArrowIcon} />
                                                <DrawerItem style={{ backgroundColor: '#f6f6f6' }} title={`Email: ` + item.Email} accessoryLeft={ArrowIcon} />

                                                <DrawerItem style={{ backgroundColor: '#f6f6f6' }} title={`Detail: ` + item.modele} accessoryLeft={SmartphoneIcon} />
                                                <DrawerItem style={{ backgroundColor: '#f6f6f6' }} title={`Etat: ` + item.etat} accessoryLeft={ArrowIcon} />
                                                <DrawerItem style={{ backgroundColor: '#f6f6f6' }} title={`Ville: ` + item.ville} accessoryLeft={PinIcon} />
                                                <DrawerItem style={{ backgroundColor: '#f6f6f6' }} title={`Adresse: ` + item.adresse} accessoryLeft={ArrowIcon} />


                                            </DrawerGroup>
                                        )
                                    })}
                                </Drawer>
                                {/* <Menu style={{
                        }}
                            selectedIndex={this.state.selectedIndex}
                            onSelect={index => this.setSelectedIndex(index)}>

                            {this.state.Actions.map((item) => {
                                return (
                                    <MenuGroup key={item._id} title={item.produitName} accessoryLeft={SmartphoneIcon}>
                                        <MenuItem title={item.etat} accessoryLeft={StarIcon} />
                                        <MenuItem title={item.adresse} accessoryLeft={StarIcon} />
                                    </MenuGroup>

                                )
                            })}
                        </Menu> */}

                            </Layout>
                        </Layout>
                    </Layout>
                }
                {
                    !(this.props.auth.isAuthenticated) &&
                    <Login deviceLocale="fr" handling={this.handler}></Login>
                }

            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 25,
        minHeight: 80,
        maxHeight: 80,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
    },
    text: {
        fontSize: 18,
        lineHeight: 21,
        color: '#262626',
        fontFamily: 'Lato_400Regular'
    },
    subtext: {
        fontSize: 14,
        lineHeight: 21,
        color: '#262626',
        fontFamily: 'Lato_400Regular'
    },
    controlContainer: {
        borderRadius: 50,
        padding: 12,
        backgroundColor: '#f1c40f',
    },
});
Space.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(Space);