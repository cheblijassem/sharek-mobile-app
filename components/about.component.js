import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json
import Constants from 'expo-constants';
import { Layout, Card, Text } from '@ui-kitten/components';
import * as Linking from 'expo-linking';
import { Icon } from '@ui-kitten/components';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.6);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const DATA = [];
for (let i = 0; i < 10; i++) {
  DATA.push(i)
}

class About extends Component {

  state = {
    index: 0,
    isLoadingDonateur: true,
    isLoadingCoordinateur: true,
    isLoadingPartenariat: true,
    isLoadingSponsoringst: true,
    dataDonateur: [],
    dataCoordinateur: [],
    dataPartenariat: [],
    dataSponsorings: [],
    activeIndex: 0,
    carouselItems: [
      {
        title: "Item 1",
        text: "Text 1",
      },
      {
        title: "Item 2",
        text: "Text 2",
      },
      {
        title: "Item 3",
        text: "Text 3",
      },
      {
        title: "Item 4",
        text: "Text 4",
      },
      {
        title: "Item 5",
        text: "Text 5",
      },
    ]
  }

  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);

  }

  getDonateur() {
    return fetch('http://sharek-it-back.herokuapp.com/api/donateur')
      .then((res) => res.json())
      .then((responseJson) => {
        // console.log(responseJson);
        this.setState({
          isLoadingDonateur: false,
          dataDonateur: responseJson
        })
      })
      .catch((error) => {
        console.log(error)
      });
  }

  getcoordinateur() {
    return fetch('http://sharek-it-back.herokuapp.com/api/coordinateur')
      .then((res) => res.json())
      .then((responseJson) => {
        //  console.log(responseJson);
        this.setState({
          isLoadingCoordinateur: false,
          dataCoordinateur: responseJson
        })
      })
      .catch((error) => {
        console.log(error)
      });
  }

  getPartenariat() {
    return fetch('http://sharek-it-back.herokuapp.com/api/partenariat')
      .then((res) => res.json())
      .then((responseJson) => {
        // console.log(responseJson);
        this.setState({
          isLoadingPartenariat: false,
          dataPartenariat: responseJson
        })
      })
      .catch((error) => {
        console.log(error)
      });
  }
  getSponsorings() {
    return fetch('http://sharek-it-back.herokuapp.com/api/sponsorings')
      .then((res) => res.json())
      .then((responseJson) => {
        // console.log(responseJson);
        this.setState({
          isLoadingSponsoringst: false,
          dataSponsorings: responseJson
        })
      })
      .catch((error) => {
        console.log(error)
      });
  }
  componentDidMount() {
    this.getSponsorings();
    this.getDonateur();
    this.getPartenariat();
    this.getcoordinateur();
  }

  _renderItem({ item, index }) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'

      }}>
        <Image source={{ uri: 'https://sharek-it.tn/' + item.image }}
          style={styles.itemContainer}
          resizeMode="contain"
        />

      </View>

    )
  }

  _handlePressFb = () => {
    Linking.openURL('fb://page/Sharek.tn');
    this.props.onPress && this.props.onPress();
  };
  _handlePressIg = () => {
    Linking.openURL('https://www.instagram.com/sharek.tn/');
    this.props.onPress && this.props.onPress();
  };
  _handlePressIn = () => {
    Linking.openURL('https://www.linkedin.com/in/sharek-it/');
    this.props.onPress && this.props.onPress();
  }; _handlePressTw = () => {
    Linking.openURL('https://twitter.com/SharekTunisie');
    this.props.onPress && this.props.onPress();
  };
  _handlePressEm = () => {
    Linking.openURL('mailto: contact@sharek-it.tn');
    this.props.onPress && this.props.onPress();
  }; _handlePressTl = () => {
    Linking.openURL('tel:22515559');
    this.props.onPress && this.props.onPress();
  };

  render() {
    return (
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: "center" }}>
        <View style={{ position: "absolute", bottom: -40, left: -100, height: 300, width: 300, borderRadius: 50, zIndex: -3, backgroundColor: '#4d4d4d', transform: [{ skewY: "-45deg" }] }} />
        <View style={{ position: "absolute", top: -40, right: -100, height: 300, width: 300, borderRadius: 50, zIndex: -3, backgroundColor: '#262626', transform: [{ skewY: "-45deg" }] }} />


        <SafeAreaView style={{
          flex: 1,
          paddingTop: 50,
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 0,
          borderRadius: 50,
          marginTop: 50,
          marginBottom: 90,
        }}>
          <ScrollView>

            <View style={[styles.wrap, { backgroundColor: '#f6f6f6' }]}>
              <Text style={styles.itemLabel}>Suivez nous sur:</Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: "space-between", alignItems: "flex-start" }}>
                <TouchableOpacity style={styles.facebook} onPress={this._handlePressFb}>
                  <Image source={require('../assets/fb.png')} style={{
                    resizeMode: 'contain',
                    width: 30,
                    height: 30
                  }} />
                </TouchableOpacity >
                <TouchableOpacity style={styles.instagram} onPress={this._handlePressIg}>
                  <Image source={require('../assets/ig.png')} style={{
                    resizeMode: 'contain',
                    width: 30,
                    height: 30
                  }} />
                </TouchableOpacity >
                <TouchableOpacity style={styles.twitter} onPress={this._handlePressTw}>
                  <Image source={require('../assets/tw.png')} style={{
                    resizeMode: 'contain',
                    width: 30,
                    height: 30
                  }} />
                </TouchableOpacity >
                <TouchableOpacity style={styles.linkedin} onPress={this._handlePressIn}>
                  <Image source={require('../assets/in.png')} style={{
                    resizeMode: 'contain',
                    width: 30,
                    height: 30
                  }} />
                </TouchableOpacity >

              </View>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: "space-between", alignItems: "center", marginTop: 20 }}>

                <TouchableOpacity style={[styles.twitter, { backgroundColor: "#f1c40f", flexDirection: 'row', marginBottom: 10 }]} onPress={this._handlePressEm}>
                  < Icon name='email' style={{ width: 20, height: 20, tintColor: '#262626', fontSize: 12 }} />
                  <Text style={[styles.itemLabel, { marginTop: 0, marginBottom: 0 }]}>    contact@sharek-it.tn</Text>
                </TouchableOpacity >
                <TouchableOpacity style={[styles.twitter, { backgroundColor: "#f1c40f", flexDirection: 'row' }]} onPress={this._handlePressTl}>
                  < Icon name='phone-call' style={{ width: 20, height: 20, tintColor: '#262626', fontSize: 12 }} />
                  <Text style={[styles.itemLabel, { marginTop: 0, marginBottom: 0 }]}>    22515559</Text>
                </TouchableOpacity >

              </View>
            </View>
            <View style={styles.wrap}>
              <Text style={styles.itemLabel}>Donateur Entreprise</Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>

                <Carousel
                  autoplayDelay={600}
                  loop={true}
                  enableSnap={true}
                  lockScrollWhileSnapping={true}
                  autoplay={true}
                  inactiveSlideOpacity={1}
                  inactiveSlideScale={1}
                  layout={'default'} layoutCardOffset={0}
                  ref={ref => this.carousel = ref}
                  data={this.state.dataDonateur}
                  sliderWidth={270}
                  itemWidth={90}
                  renderItem={this._renderItem}
                  onSnapToItem={index => this.setState({ activeIndex: index })} />


              </View>
            </View>

            <View style={styles.wrap}>
              <Text style={styles.itemLabel}>Coordination et support</Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                <Carousel
                  autoplayDelay={900}
                  loop={true}
                  enableSnap={true}
                  lockScrollWhileSnapping={true}
                  autoplay={true}
                  inactiveSlideOpacity={1}
                  inactiveSlideScale={1}
                  layout={'default'} layoutCardOffset={0}
                  ref={ref => this.carousel = ref}
                  data={this.state.dataCoordinateur}
                  sliderWidth={270}
                  itemWidth={90}
                  renderItem={this._renderItem}
                  onSnapToItem={index => this.setState({ activeIndex: index })} />


              </View>
            </View>

            <View style={styles.wrap}>

              <Text style={styles.itemLabel}>Partenaire Logistique et Media</Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                <Carousel
                  autoplayDelay={1200}
                  loop={true}
                  enableSnap={true}
                  lockScrollWhileSnapping={true}
                  autoplay={true}
                  inactiveSlideOpacity={1}
                  inactiveSlideScale={1}
                  layout={'default'} layoutCardOffset={0}
                  ref={ref => this.carousel = ref}
                  data={this.state.dataSponsorings}
                  sliderWidth={270}
                  itemWidth={90}
                  renderItem={this._renderItem}
                  onSnapToItem={index => this.setState({ activeIndex: index })} />


              </View>
            </View>

            <View style={styles.wrap}>

              <Text style={styles.itemLabel}>Partenariat et collaboration</Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                <Carousel
                  autoplayDelay={1500}
                  loop={true}
                  enableSnap={true}
                  lockScrollWhileSnapping={true}
                  autoplay={true}
                  inactiveSlideOpacity={1}
                  inactiveSlideScale={1}
                  layout={'default'} layoutCardOffset={0}
                  ref={ref => this.carousel = ref}
                  data={this.state.dataPartenariat}
                  sliderWidth={270}
                  itemWidth={90}
                  renderItem={this._renderItem}
                  onSnapToItem={index => this.setState({ activeIndex: index })} />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Layout>

      /*   <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        {this.state.dataSponsorings && this.state.dataSponsorings.map((prop, key) => {
              // console.log('sharek-it.tn/'+prop.image);
              return (
                <Image key={key} source={{ uri: 'https://sharek-it.tn/' + prop.image }}
                  style={{ width: 300, height: 200 }}
                  resizeMode="contain"
                />
              );
            })}
        </ScrollView>
      </SafeAreaView> */
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    margin: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: "#f1c40f",
    padding: 15,
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 8,
  },
  itemContainer: {
    width: 60,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  itemLabel: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Lato_400Regular',
    color: "#262626"
  },
  counter: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
  facebook: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#1877F2',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 8,
  },
  instagram: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#E4405F',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 8,
  },
  twitter: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#1DA1F2',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 8,
  },
  linkedin: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#0A66C2',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 8,
  },
});
export default About;