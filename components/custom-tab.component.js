import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Image, Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Layout, Text, Icon } from '@ui-kitten/components';
import Home from './home.component';
import PostsStack from './PostsStack.component';
import Don from './don.component';
import About from './about.component';
import Space from './space.component';
import TopTab from './top-tab.component';



const labels = {
    qte: 'Quantité',
    don: 'Don',
    nom: 'Nom',
    prenom: 'Prénom',
    email: 'Email',
    tel: 'Numéro téléphone',
    typeDon: 'Type de Don',
    descriptionDon: 'Dscription',
};


/* const LogoutIcon = (props) => (
    <Icon {...props} name='log-out' style={{ width: 25, height: 25, tintColor: "#262626" }} />
);
const MenuIcon = (props) => (
    <Icon {...props} name='more-vertical' style={{ width: 25, height: 25, tintColor: "#262626" }} />
);

const [menuVisible, setMenuVisible] = React.useState(false);

const toggleMenu = () => {
    setMenuVisible(!menuVisible);
};
const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
);

const renderRightActions = () => (
    <React.Fragment>
        {(this.state.isAuthenticated) &&
            <OverflowMenu
                anchor={renderMenuAction}
                visible={this.state.menuVisible}
                onBackdropPress={this.toggleMenu}
                style={{ marginTop: 30 }}>
                <MenuItem accessoryLeft={LogoutIcon} onPress={this.onLogout} style={{ backgroundColor: "#f1c40f" }} title={evaProps => <Text {...evaProps} style={styles.subtext}>Logout</Text>} />
            </OverflowMenu>}

    </React.Fragment>
); */


const HomeScreen = () => (
    <>
        {/* <Layout style={styles.topbar} level='1'>
            <TopNavigationAction icon={BackIcon} style={{ width: '100%' }} />
        </Layout> */}
        <StatusBar style="auto" />
        <TopTab title='Accueil'>
        </TopTab>
        <Home></Home>

    </>

);
const DonScreen = () => (
    <>
        <StatusBar style="auto" />
        <TopTab title='Faire un don'>
        </TopTab>
        <Don deviceLocale="fr"></Don>

    </>
);
const AboutScreen = () => (
    <>
        <StatusBar style="auto" />
        <TopTab title='A propos'>
        </TopTab>
        <About></About>

    </>
);
const SpaceScreen = () => (
    <>
        <StatusBar style="auto" />
        <TopTab title='Mon espace'>
        </TopTab>
        <Space></Space>
    </>
);

const Posts = () => (
    <>
        <StatusBar style="auto" />
        <TopTab title='Blog'>
        </TopTab>
        <PostsStack></PostsStack>
    </>
);
const splash = () => (
    <Layout style={{ backgroundColor: "#262626", flex: 1, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
        <View style={{ position: "absolute", top: 140, right: -100, height: 100, width: 150, borderRadius: 5, zIndex: -3, backgroundColor: '#f1c40f', transform: [{ skewY: "-45deg" }] }} />
        <View style={{ position: "absolute", top: 0, right: -100, height: 100, width: 150, borderRadius: 5, zIndex: -3, backgroundColor: '#f1c40f', transform: [{ skewY: "-45deg" }] }} />
        <View style={{ position: "absolute", bottom: 0, left: -200, height: 200, width: 300, borderRadius: 50, zIndex: -3, backgroundColor: 'orange', transform: [{ skewY: "-45deg" }] }} />
        <Image source={require('../assets/Logo_Black.png')} style={{ height: 100, resizeMode: 'contain' }}
            resizeMode="contain"
            resizeMethod="resize" />
        <View style={{ width: '100%', flex: 1, justifyContent: "center", alignContent: "center", alignItems: "center", flexDirection: 'row', height: 50, bottom: 50, left: 0, position: "absolute", }}>
            <Text style={{
                fontSize: 16,
                color: "#f6f6f6",
                textAlign: "center",
                fontFamily: 'Lato_400Regular'
            }}>Powered by  <Image source={require('../assets/trust.png')} style={{ width: 100,height:20, resizeMode: 'contain' }}
                resizeMode="contain"
                resizeMethod="resize" /> </Text>
            {/* <View>
                <Image source={require('../assets/trust.png')} style={{ height: 20, resizeMode: 'contain' }}
                    resizeMode="contain"
                    resizeMethod="resize" /></View> */}
        </View>

    </Layout>
);










function Tabs() {


    const Tab = createBottomTabNavigator();

    const CustomButton = ({ children, onPress }) => (
        <TouchableOpacity
            style={{
                top: -15,
                justifyContent: 'center',
                alignItems: 'center',
                ...styles.shadow
            }}
            onPress={onPress}>
            <View style={{
                width: 95,
                height: 80,
                borderRadius: 50,
                backgroundColor: '#f2f2f2'
            }}>
                {children}
            </View>
        </TouchableOpacity>
    )


    return (
        <>

            <Tab.Navigator tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    /* bottom: 5, */
                    bottom: 9,
                    left: 15,
                    right: 15,
                    elevation: 0,
                    backgroundColor: '#262626',
                    borderRadius: 20,
                    height: 70,
                    paddingBottom: 20,
                    borderTopWidth: 0,
                    ...styles.shadow,
                }
            }}>
                <Tab.Screen name="Accueil" component={HomeScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Icon name='home' style={{ width: 25, height: 25, tintColor: focused ? '#f1c40f' : '#748c94', fontSize: 12 }} />
                            <Text style={{ color: focused ? '#f1c40f' : '#748c94', fontSize: 12, fontFamily: 'Lato_400Regular' }}>Accueil</Text>
                        </View>
                    )
                }}>
                </Tab.Screen>

                <Tab.Screen name="Blog" component={Posts} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Icon name='list' style={{ width: 25, height: 25, tintColor: focused ? '#f1c40f' : '#748c94', fontSize: 12 }} />
                            <Text style={{ color: focused ? '#f1c40f' : '#748c94', fontSize: 12, fontFamily: 'Lato_400Regular' }}>Blog</Text>
                        </View>
                    )
                }}>
                </Tab.Screen>

                <Tab.Screen name="Faire un don" component={DonScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (

                            /* <Image source={require('../assets/Logo_Black.png')} style={{ height: 80, width: 80 }}
                                resizeMode="contain"
                                resizeMethod="resize" /> */
                            /* < Icon name='plus-circle' style={{ width: 55, height: 55, tintColor: focused ? '#f1c40f' : '#f2f2f2', fontSize: 12 }} /> */

                            <View style={{ alignItems: 'center', justifyContent: 'center', width: 160, top: -15 }}>
                                <Pressable style={styles.button}>
                                    <Text style={styles.text}>Faire un don</Text>
                                </Pressable>
                                <Image source={require('../assets/Logo_Black.png')} style={{ height: 60, width: 60 }}
                                    resizeMode="contain"
                                    resizeMethod="resize" />
                            </View>
                        ),
                        tabBarButton: (props) => (
                            <CustomButton {...props} />
                        )
                    }}
                />
                <Tab.Screen name="A propos" component={AboutScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Icon name='info' style={{ width: 25, height: 25, tintColor: focused ? '#f1c40f' : '#748c94', fontSize: 12 }} />
                            <Text style={{ color: focused ? '#f1c40f' : '#748c94', fontSize: 12, fontFamily: 'Lato_400Regular' }}>A propos</Text>
                        </View>
                    )
                }}>
                </Tab.Screen>

                <Tab.Screen name="Mon espace" component={SpaceScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Icon name='person' style={{ width: 27, height: 27, tintColor: focused ? '#f1c40f' : '#748c94', fontSize: 12 }} />
                            <Text style={{ color: focused ? '#f1c40f' : '#748c94', fontSize: 10, fontFamily: 'Lato_400Regular' }}>Mon espace</Text>
                        </View>
                    )
                }}>
                </Tab.Screen>

            </Tab.Navigator>
        </>
    )
};

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7f5df0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    btdon2: {
        color: "#262626",
        backgroundColor: "#f2f2f2",
        height: 30,
        width: 130,
        top: 20
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        top: 22,
        backgroundColor: '#f2f2f2',
        width: 95
    },
    text: {
        fontSize: 14,
        lineHeight: 21,
        color: '#262626',
        fontFamily: 'Lato_400Regular'
    },

});


export default Tabs;