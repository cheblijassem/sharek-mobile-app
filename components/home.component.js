import React, { Component } from 'react';
import { StyleSheet, Image, View, ScrollView } from 'react-native';
import { Spinner, Card, Layout, Text, Button, Icon, Modal } from '@ui-kitten/components';
import ProgressCircle from "react-native-progress-circle";
import Profiter from './profiter.component';
import { WebView } from 'react-native-webview';
const gift = (props) => (
  <Icon {...props} name='gift' style={{ width: 25, height: 25, tintColor: "#262626" }} />
);

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visible1: false,
      nbrDon: 0,
      nbrProfit: 0,
      nbrUsers: 0,
      loading1: true,
      loading2: true,
      loading3: true
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };
  hideModal = () => {
    this.setState({
      visible: false
    });
  };
  showModal1 = () => {
    this.setState({
      visible1: true
    });
  };
  hideModal1 = () => {
    this.setState({
      visible1: false
    });
  };

  getNbrDon() {
    return fetch("https://sharek-it-back.herokuapp.com/api/dont/NbrDons")
      .then((res) => res.json())
      .then((responseJson) => {
        this.setState({
          loading1: false,
          nbrDon: responseJson,
        });
      })
      .catch((error) => { });
  }
  getNbrProfit() {
    return fetch("https://sharek-it-back.herokuapp.com/api/profits/NbrDemands")
      .then((res) => res.json())
      .then((responseJson) => {
        this.setState({
          loading2: false,
          nbrProfit: responseJson,
        });
      })
      .catch((error) => { });
  }
  getNbrUsers() {
    return fetch("https://sharek-it-back.herokuapp.com/api/users/NbrUsers")
      .then((res) => res.json())
      .then((responseJson) => {
        this.setState({
          loading3: false,
          nbrUsers: responseJson,
        });
      })
      .catch((error) => { });
  }

  componentDidMount() {
    this.getNbrDon();
    this.getNbrProfit();
    this.getNbrUsers();
  }

  render() {

    return (
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <View style={{ position: "absolute", top: 50, left: -125, height: 200, width: 200, borderRadius: 400, zIndex: -4, backgroundColor: '#4d4d4d' }}>

        </View>
        <View style={{ position: "absolute", top: 40, left: -150, height: 200, width: 200, borderRadius: 400, zIndex: -3, backgroundColor: '#262626' }}>

        </View>


        <View style={{ position: "absolute", bottom: 150, right: -125, height: 200, width: 200, borderRadius: 400, zIndex: -4, backgroundColor: '#4d4d4d' }}>

        </View>
        <View style={{ position: "absolute", bottom: 140, right: -150, height: 200, width: 200, borderRadius: 400, zIndex: -3, backgroundColor: '#262626' }}>

        </View>
        {/* <Image source={require('../assets/bg.png')} style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '100%',
          width: '100%',
          zIndex: -1,
          resizeMode: 'contain'
        }}
          resizeMode="contain"
          resizeMethod="resize" /> */}

        <Image source={require('../assets/Logo_Black.png')} style={{ marginTop: 70, height: 80, resizeMode: 'contain', marginBottom: 10 }}
          resizeMode="contain"
          resizeMethod="resize" />
        <View style={styles.wrap}>
          {/* <View style={{ position: "absolute", top: 50, left: -75, height: 200, width: 200, borderRadius: 400, zIndex: -4, backgroundColor: '#bdc3c7' }}>

          </View>
          <View style={{ position: "absolute", top: 40, left: -100, height: 200, width: 200, borderRadius: 400, zIndex: -3, backgroundColor: '#7f8c8d' }}>

          </View>


          <View style={{ position: "absolute", bottom: 50, right: -75, height: 200, width: 200, borderRadius: 400, zIndex: -4, backgroundColor: '#bdc3c7' }}>

          </View>
          <View style={{ position: "absolute", bottom: 40, right: -100, height: 200, width: 200, borderRadius: 400, zIndex: -3, backgroundColor: '#7f8c8d' }}>

          </View> */}
          <View style={{ position: "absolute", bottom: -50, left: -75, height: 300, width: 300, borderRadius: 400, zIndex: -4, backgroundColor: '#4d4d4d' }}>

          </View>
          <View style={{ position: "absolute", bottom: -40, left: -100, height: 300, width: 300, borderRadius: 400, zIndex: -3, backgroundColor: '#262626' }}>

          </View>

          {/* <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 30, color: "#262626", fontFamily: 'Lato_400Regular' }}>
            شارك في صنع المستقبل
          </Text> */}

          {(this.state.loading1) && (this.state.loading2) && (this.state.loading3) &&

            <View style={styles.widgetbig}>
              <View style={styles.widget}>
                <Image source={require('../assets/bubbleTop.png')} style={{
                  position: 'absolute',
                  resizeMode: 'contain',
                  left: 0,
                  top: -15,
                  width: 100,
                  height: 100
                }}
                  resizeMode="contain"
                  resizeMethod="resize" />
                <Image source={require('../assets/bubbleBottom.png')} style={{
                  position: 'absolute',
                  resizeMode: 'contain',
                  right: 0,
                  bottom: -15,
                  width: 100,
                  height: 100
                }}
                  resizeMode="contain"
                  resizeMethod="resize" />
                <View style={styles.content}>
                  <ProgressCircle style={styles.circle}
                    percent={0}
                    radius={40}
                    borderWidth={5}
                    color="#b2b2b2"
                    shadowColor="#f1c40f"
                    bgColor="#fff"
                  >
                    <Text style={{ fontSize: 25, fontWeight: "bold", color: "#4d4d4d" }}>{0}<Text style={{ fontSize: 13, color: "#4d4d4d" }}>{"%"}</Text></Text>
                  </ProgressCircle>
                  <View style={styles.stats}>
                    <Text style={styles.h2}>Appareils</Text>
                    <Text style={styles.h1}>collectées</Text>
                    <View style={styles.controlContainer}>
                      <Spinner status='primary' />
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.widgetWrap}>
                <View style={styles.widget1}>
                  <Image source={require('../assets/bubble.png')} style={{
                    position: 'absolute',
                    resizeMode: 'contain',
                    left: 0,
                    top: -15,
                    width: 100,
                    height: 100
                  }}
                    resizeMode="contain"
                    resizeMethod="resize" />
                  <View style={styles.content2}>
                    < Icon name='person' style={{ width: 20, height: 20, tintColor: '#f1c40f', fontSize: 12 }} />
                    <View style={styles.stats}>
                      <View style={styles.controlContainer}>
                        <Spinner status='primary' />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.widget1}>
                  <Image source={require('../assets/bubble.png')} style={{
                    position: 'absolute',
                    resizeMode: 'contain',
                    left: 0,
                    top: -15,
                    width: 100,
                    height: 100
                  }}
                    resizeMode="contain"
                    resizeMethod="resize" />
                  <View style={styles.content2}>
                    < Icon name='file' style={{ width: 20, height: 20, tintColor: '#f1c40f', fontSize: 12 }} />
                    <View style={styles.stats}>
                      <View style={styles.controlContainer}>
                        <Spinner status='primary' />
                      </View>
                    </View>
                  </View>
                </View>

              </View>

            </View>



          }
          {!(this.state.loading1) && !(this.state.loading2) && !(this.state.loading3) &&
            <View style={styles.widgetbig}>
              <View style={styles.widget}>
                <Image source={require('../assets/bubbleTop.png')} style={{
                  position: 'absolute',
                  resizeMode: 'contain',
                  left: 0,
                  top: -15,
                  width: 100,
                  height: 100
                }}
                  resizeMode="contain"
                  resizeMethod="resize" />
                <Image source={require('../assets/bubbleBottom.png')} style={{
                  position: 'absolute',
                  resizeMode: 'contain',
                  right: 0,
                  bottom: -15,
                  width: 100,
                  height: 100
                }}
                  resizeMode="contain"
                  resizeMethod="resize" />
                <View style={styles.content}>
                  <ProgressCircle style={styles.circle}
                    percent={Math.round((this.state.nbrDon / 3000) * 100, 1)}
                    radius={40}
                    borderWidth={5}
                    color="#b2b2b2"
                    shadowColor="#f1c40f"
                    bgColor="#fff"
                  >
                    <Text style={{ fontSize: 25, fontWeight: "bold", color: "#4d4d4d" }}>{Math.round((this.state.nbrDon / 3000) * 100, 1)}<Text style={{ fontSize: 13, color: "#4d4d4d" }}>{"%"}</Text></Text>
                  </ProgressCircle>
                  <View style={styles.stats}>
                    <Text style={styles.h2}>Appareils</Text>
                    <Text style={styles.h1}>collectées</Text>
                    <Text style={styles.h2}>{this.state.nbrDon}/3000</Text>
                  </View>
                </View>
              </View>

              <View style={styles.widgetWrap}>
                <View style={styles.widget1}>
                  <Image source={require('../assets/bubble.png')} style={{
                    position: 'absolute',
                    resizeMode: 'contain',
                    left: 0,
                    top: -15,
                    width: 100,
                    height: 100
                  }}
                    resizeMode="contain"
                    resizeMethod="resize" />
                  <View style={styles.content2}>
                    < Icon name='person' style={{ width: 20, height: 20, tintColor: '#f1c40f', fontSize: 12 }} />
                    <View style={styles.stats}>
                      <Text style={styles.h1b}>{this.state.nbrUsers}</Text>
                      <Text style={styles.h2b}>Donateurs</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.widget1}>
                  <Image source={require('../assets/bubble.png')} style={{
                    position: 'absolute',
                    resizeMode: 'contain',
                    left: 0,
                    top: -15,
                    width: 100,
                    height: 100
                  }}
                    resizeMode="contain"
                    resizeMethod="resize" />
                  <View style={styles.content2}>
                    < Icon name='file' style={{ width: 20, height: 20, tintColor: '#f1c40f', fontSize: 12 }} />
                    <View style={styles.stats}>
                      <Text style={styles.h1b}>{this.state.nbrProfit}</Text>
                      <Text style={styles.h2b}>Demandes</Text>
                    </View>
                  </View>
                </View>

              </View>

            </View>
          }<View style={styles.action}>

            <Button
              style={styles.btnbesoin} status='control' accessoryRight={gift} onPress={() => this.showModal()}
            >
              {evaProps => <Text {...evaProps} style={styles.help}>J'ai un besoin</Text>}
            </Button>




            <Modal scrollable={true}
              visible={this.state.visible}
              backdropStyle={styles.backdrop}
              onBackdropPress={this.hideModal}
              style={{ width: "90%", borderRadius: 50, height: '80%' }} scrollable={true}>

              <Card disabled={true} style={styles.modalCard} scrollable={true}>
                <View style={{ position: "absolute", bottom: -40, right: -15, height: 200, width: 200, borderRadius: 400, zIndex: -4, backgroundColor: '#4d4d4d' }}>

                </View>
                <View style={{ position: "absolute", bottom: -60, right: -15, height: 200, width: 200, borderRadius: 400, zIndex: -3, backgroundColor: '#262626' }}>

                </View>
                <Button onPress={this.hideModal} style={{ position: 'absolute', right: 5, top: 5, backgroundColor: "transparent", borderWidth: 0, zIndex: 100 }}>
                  <Icon name='close' style={{ width: 20, height: 20, tintColor: '#262626', fontSize: 12, margin: 0, padding: 0 }} />
                </Button>
                <ScrollView style={{ margin: 0, padding: 0, height: '100%' }}>
                  <Profiter></Profiter>

                </ScrollView>
              </Card>
            </Modal>

            <Modal scrollable={true}
              visible={this.state.visible1}
              backdropStyle={styles.backdrop}
              onBackdropPress={this.hideModal1}
              style={{ width: "95%", borderRadius: 15, height: '85%', }} scrollable={true}>
              <Button onPress={this.hideModal1} style={{ position: 'absolute', right: 11, top: 12.5, backgroundColor: "transparent", borderWidth: 0, zIndex: 100 }}>
                <Icon name='close' style={{ width: 20, height: 20, tintColor: '#262626', fontSize: 12, margin: 0, padding: 0 }} />
              </Button>
              <WebView style={{}} source={{ uri: 'http://sharek-it.byethost31.com/' }} />
            </Modal>
          </View>
          {/* <Button
            style={{
              position: 'absolute', padding: 30, top: 5, right: -20, borderRadius: 50, backgroundColor: '#262626', zIndex: 1000, borderWidth: 0, shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.51,
              shadowRadius: 13.16,
              elevation: 20,
            }} size='tiny' status='control' accessoryRight={message} onPress={() => this.showModal1()}
          >
            {evaProps => <Text {...evaProps} style={styles.tawk}>Contactez nous</Text>}
          </Button> */}
        </View>
      </Layout>
    );
  }
}


const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flex: 1,
    flexDirection: "column",
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#f1c40f",
    borderRadius: 50,
    marginBottom: 100,
    padding: 20,
    overflow: "hidden",
    flexWrap: "wrap",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 10,
  },
  /* widgetloader: {
    flex: 1,
    flexDirection: "column",
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 40,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  }, */
  widgetbig: {
    width: '100%',
    display: 'flex',
    flexDirection: "column",
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 40,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
  widget: {
    display: 'flex',
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 40,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
    overflow: 'hidden',
    padding: 0,
    marginBottom: 10
  },
  widgetWrap: {
    display: 'flex',
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 0,
    margin: 0
  },
  widget1: {
    display: 'flex',
    width: '45%',
    flexDirection: "row",
    justifyContent: "space-between",
    /* alignContent: "flex-start",
    alignItems: "flex-start", */
    borderRadius: 30,
    backgroundColor: "#262626",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 10,
    overflow: 'hidden',
    padding: 0,
    margin: 0
  },
  content: {
    display: 'flex',
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    overflow: 'hidden',
    alignItems: "center",
    alignContent: 'center'
  },
  content2: {
    display: 'flex',
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    padding: 5,
    overflow: 'hidden'
  },

  stats: {
    flex: 1,
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
  },
  help: {
    fontSize: 16,
    color: "#555555",
    textAlign: "center",
    fontFamily: 'Lato_400Regular'
  },
  /* tawk: {
    fontSize: 12,
    color: "#f1c40f",
    textAlign: "center",
    fontFamily: 'Lato_400Regular'
  }, */
  h1: {
    fontSize: 15,
    color: "#555555",
    textAlign: "center",
    fontFamily: 'Lato_400Regular'
  },
  h2: {
    fontSize: 13,
    color: "#555555",
    textAlign: "center",
    fontFamily: 'Lato_400Regular'
  },
  h1b: {
    fontSize: 15,
    color: "#f5f5f5",
    textAlign: "center",
    fontFamily: 'Lato_400Regular'
  },
  h2b: {
    fontSize: 13,
    color: "#f5f5f5",
    textAlign: "center",
    fontFamily: 'Lato_400Regular'
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#ffffff"
  },
  wrappe2r: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#f1c40f",
    borderTopEndRadius: 70,
    borderTopStartRadius: 70,
    padding: 5,
  },

  container2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
  circle: {
    flex: 1,
    flexDirection: "row",
  },
  stats2: {

    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,

  },
  oldstats: {

    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignContent: "space-around",
    alignItems: "stretch",
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,

  },
  action1: {
    flex: 1,
    display: "flex",
    justifyContent: "space-evenly",
    alignContent: "space-around",
    alignItems: "stretch",
    flexDirection: "column",
    borderRadius: 40,
    backgroundColor: "#222222",
    margin: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
  action: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnbesoin: {
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
    margin: 10,
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 10,
  },

  top2: {
    flex: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 10,
  },

  statistics2: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#333333",
    justifyContent: "center",
    borderRadius: 40,
    margin: 40,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },
  h12: {
    fontSize: 15,
    color: "#555555",
    textAlign: "center",
    fontWeight: "bold",
  },
  h22: {
    fontSize: 15,
    color: "#555555",
    textAlign: "center",
  },
  don2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },

  container: {
    minHeight: 192,
  },
  /* backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }, */
  controlContainer: {
    borderRadius: 50,
    padding: 5,
    backgroundColor: '#f1c40f',
  },
  modalCard: {
    borderRadius: 35,
    backgroundColor: "#f1c40f",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
    borderWidth: 0
  }
});
export default Home;