import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import PropTypes, { any } from 'prop-types';
import { Radio, RadioGroup, Layout, Card, Input, Text } from '@ui-kitten/components';
import ValidationComponent from 'react-native-form-validator';

class Don extends ValidationComponent {
    constructor(props) {
        super(props);
        this.labels = {
            qte: 'Quantité',
            don: 'Don',
            nom: 'Nom',
            prenom: 'Prénom',
            email: 'Email',
            tel: 'Numéro téléphone',
            typeDon: 'Type des appareils',
            descriptionDon: 'Dscription',
        };
        this.pp = React.createRef();
        this.state = {
            qte: '1',
            dons: [],
            don: any,
            nom: '',
            prenom: '',
            email: '',
            tel: '',
            msg: '',
            myVar: 0,
            typeDon: '',
            descriptionDon: '',
            selectedValue: '',
            activeStep: 0
        }
    }
    handlemsg = (text) => {
        this.setState({ msg: text })
    }
    handleQte = (text) => {
        this.setState({ qte: text }, () => {
            this.checkvalidation();
            this.errors.filter(function (error) {
                if (error.fieldName !== 'qte') {
                    error.messages = []
                }
            });
        })
    }
    handleNom = (text) => {
        this.setState({ nom: text }, () => {
            this.checkvalidation();
            this.errors.filter(function (error) {
                if (error.fieldName !== 'nom') {
                    error.messages = []
                }
            });
        })
    }
    handlePrenom = (text) => {
        this.setState({ prenom: text }, () => {
            this.checkvalidation();
            this.errors.filter(function (error) {
                if (error.fieldName !== 'prenom') {
                    error.messages = []
                }
            });
        })
    }
    handleEmail = (text) => {
        this.setState({ email: text }, () => {
            this.checkvalidation();
            this.errors.filter(function (error) {
                if (error.fieldName !== 'email') {
                    error.messages = []
                }
            });
        })
    }
    handleTel = (text) => {
        this.setState({ tel: text }, () => {
            this.checkvalidation();
            this.errors.filter(function (error) {
                if (error.fieldName !== 'tel') {
                    error.messages = []
                }
            });

        })
    }
    TypeDon = (text) => {
        this.setState({ typeDon: text }, () => {
            this.checkvalidation();
            this.errors.filter(function (error) {
                if (error.fieldName !== 'typeDon') {
                    error.messages = []
                }
            });

        })
    }
    DescriptionDon = (text) => {
        this.setState({ descriptionDon: text })
    }
    checkvalidation = () => {
        this.validate({
            qte: { required: true, numbers: true },
            typeDon: { required: true },
            nom: { minlength: 3, required: true },
            prenom: { minlength: 3, required: true },
            email: { email: true, required: true },
            tel: { required: true },
        });
    }

    reset = () => {
        this.setState({
            qte: '1',
            dons: [],
            don: any,
            nom: '',
            prenom: '',
            email: '',
            tel: '',
            msg: '',
            myVar: 0,
            typeDon: '',
            descriptionDon: '',
            selectedValue: ''
        }, () => this.pp.current.setState({
            activeStep: this.state.activeStep
        }, () => this.checkvalidation()));
    }

    step1Validation = () => {
        if (!(!(this.isFieldInError('typeDon')) && !(this.isFieldInError('qte')))) {
            this.checkvalidation();
        } else {
            this.errors.filter(function (error) { return error.messages = []; });
        }
    }

    step2Validation = () => {
        if (!(!(this.isFieldInError('nom')) && !(this.isFieldInError('prenom')) && !(this.isFieldInError('email ')) && !(this.isFieldInError('tel')))) {
            this.checkvalidation();
        } else {
            this.errors.filter(function (error) { return error.messages = []; });
        }
    }

    /* onNextButton = () => {
        this.setState({ activeStep: 0 })
        this.setState({ descriptionDon: JSON.stringify(this.state.activeStep) })
        this.validate({
            qte: { numbers: true },
            typeDon: { required: true },
            nom: { minlength: 3, required: true },
            prenom: { required: true },
            email: { email: true },
            tel: { required: true },
        });
        if ((this.isFieldInError(qte) && this.isFieldInError(typeDon))) {

        }
    } */
    login = (qte, produitName, modele, nom, prenom, Email, tel, ville, message) => {
        fetch("https://sharek-it-back.herokuapp.com/api/dont/addDon", {
            method: "post",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                qte, produitName, modele, nom, prenom, Email, tel, ville, message
            })
        }).then(res => res.json()).then(data => {
        })
    }
    componentDidMount() {
        this.checkvalidation();
        this.errors.filter(function (error) { return error.messages = []; });

    }

    render() {
        var options = ["Ariana", "Beja", "Ben Arous",
            "Bizerte", "Gabes", "Gafsa",
            "Jendouba", "Kairouan", "Kasserine",
            "Kebili", "Kef", "Mahdia",
            "Manouba", "Medenine", "Monastir",
            "Nabeul", "Sfax", "Sidi Bou Zid",
            "Siliana", "Sousse", "Tataouine",
            "Tozeur", "Tunis", "Zaghouan"];
        return (
            <View style={{ flex: 1, padding: 20, paddingBottom: 120, paddingTop: 100 }}>
                <View style={{ position: "absolute", top: 50, left: -125, height: 200, width: 200, borderRadius: 400, zIndex: -4, backgroundColor: '#4d4d4d' }} />

                <View style={{ position: "absolute", top: 40, left: -150, height: 200, width: 200, borderRadius: 400, zIndex: -3, backgroundColor: '#262626' }} />

                <View style={{ position: "absolute", bottom: 150, right: -125, height: 200, width: 200, borderRadius: 400, zIndex: -4, backgroundColor: '#4d4d4d' }} />

                <View style={{ position: "absolute", bottom: 140, right: -150, height: 200, width: 200, borderRadius: 400, zIndex: -3, backgroundColor: '#262626' }} />

                {/* <Layout style={styles.container} level='1'>
          <TopNavigation
            title={evaProps => <Text {...evaProps} style={styles.text}>Mes Actions</Text>}
            accessoryRight={renderRightActions}
          />
        </Layout> */}
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
                {/* <Button accessoryLeft={FacebookIcon}>Login with Facebook</Button> */}

                {/* <Image source={require('../assets/imgtuto1.png')} style={{ marginTop: 60, height: 120, resizeMode: 'contain' }}
                    resizeMode="contain"
                    resizeMethod="resize" /> */}
                <View style={styles.wrap}>
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: 20,
                            fontFamily: 'Lato_400Regular',
                            marginBottom: -10
                        }}
                    >
                        Faire un don
                    </Text>
                    <ProgressSteps ref={this.pp} activeStep={this.state.activeStep} marginBottom={30} progressBarColor={'#4d4d4d'} activeStepIconBorderColor={'#f6f6f6'}
                        completedProgressBarColor={'#f6f6f6'} completedStepIconColor={'#aaaaaa'}
                        disabledStepIconColor={'#4d4d4d'} labelColor={'#4d4d4d'} completedLabelColor={'#f6f6f6'}
                        activeLabelColor={'#f6f6f6'} activeStepNumColor={'#4d4d4d'} labelFontSize={9}>
                        <ProgressStep nextBtnText={"Suivant"} previousBtnText={"Précédent"} finishBtnText={"Terminer"} label="Votre don"
                            nextBtnTextStyle={buttonTextStyle} nextBtnStyle={buttonStyle} errors={!(!(this.isFieldInError('typeDon')) && !(this.isFieldInError('qte')))} onNext={this.step1Validation}>
                            <View style={{ alignItems: 'center' }}>
                                <Input size='small' style={styles.input}
                                    label="Quantité"
                                    value={this.state.qte}
                                    onChangeText={this.handleQte} />
                                {this.isFieldInError('qte') && this.getErrorsInField('qte').map(errorMessage => <Text style={styles.error} status='danger' key={errorMessage}>{errorMessage}</Text>)}
                                <Input size='small' style={styles.input}
                                    label="Type des appareils"
                                    value={this.state.typeDon}
                                    onChangeText={this.TypeDon}
                                    placeholder="Ex: Laptop , souris , imprimante..."
                                />
                                {this.isFieldInError('typeDon') && this.getErrorsInField('typeDon').map(errorMessage => <Text style={styles.error} status='danger' key={errorMessage}>{errorMessage}</Text>)}
                                <Input size='small' style={styles.input}
                                    label="Description de l'appareils"
                                    value={this.state.descriptionDon}
                                    onChangeText={this.DescriptionDon}
                                />
                                {/* <RadioForm style={styles.radio}
                                    radio_props={radio_props}
                                    onPress={(value) => {
                                        if (value == 1) {
                                            this.setState({ myVar: false })

                                        } else {
                                            this.setState({ myVar: true })
                                        }

                                    }} /> */}

                                <RadioGroup style={{
                                    flexDirection: 'row',
                                    marginTop: 10,
                                    padding: 2,
                                    backgroundColor: '#f6f6f6',
                                    borderRadius: 50
                                }}
                                    selectedIndex={this.state.myVar}
                                    onChange={index => this.setState({ myVar: index })}>

                                    <Radio status='basic' style={{ margin: 2 }}>Neuf</Radio>
                                    <Radio status='basic' style={{ margin: 2 }}>Occasion</Radio>

                                </RadioGroup>
                            </View>
                        </ProgressStep>
                        <ProgressStep nextBtnText={"Suivant"} previousBtnText={"Précédent"} finishBtnText={"Terminer"} label=" Informations personnelles"
                            nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle} nextBtnStyle={buttonStyle} previousBtnStyle={buttonStyle}
                            scrollable={true} errors={!(!(this.isFieldInError('nom')) && !(this.isFieldInError('prenom')) && !(this.isFieldInError('email')) && !(this.isFieldInError('tel')))}
                            onNext={this.step2Validation}>
                            <View style={{ alignItems: 'center' }}>
                                <Input size='small' style={styles.input}
                                    label="Nom"
                                    value={this.state.nom}
                                    onChangeText={this.handleNom} />
                                {this.isFieldInError('nom') && this.getErrorsInField('nom').map(errorMessage => <Text style={styles.error} status='danger' key={errorMessage}>{errorMessage}</Text>)}
                                <Input size='small' style={styles.input}
                                    label="Prenom"
                                    value={this.state.prenom}
                                    onChangeText={this.handlePrenom}
                                />
                                {this.isFieldInError('prenom') && this.getErrorsInField('prenom').map(errorMessage => <Text style={styles.error} status='danger' key={errorMessage}>{errorMessage}</Text>)}
                                <Input size='small' style={styles.input}
                                    label="Email"
                                    value={this.state.email}
                                    onChangeText={this.handleEmail}
                                />
                                {this.isFieldInError('email') && this.getErrorsInField('email').map(errorMessage => <Text style={styles.error} status='danger' key={errorMessage}>{errorMessage}</Text>)}
                                <Input size='small' style={styles.input}
                                    label="Tel"
                                    value={this.state.tel}
                                    onChangeText={this.handleTel}
                                />
                                {this.isFieldInError('tel') && this.getErrorsInField('tel').map(errorMessage => <Text style={styles.error} status='danger' key={errorMessage}>{errorMessage}</Text>)}
                            </View>
                        </ProgressStep>
                        <ProgressStep nextBtnText={"Suivant"} previousBtnText={"Précédent"} finishBtnText={"Terminer"} label="Coordonnées de récupération" nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle} nextBtnStyle={buttonStyle} previousBtnStyle={buttonStyle} scrollable={true}>
                            <View style={{ alignItems: 'center' }}>
                                <Picker
                                    selectedValue={this.state.selectedValue}
                                    style={styles.input}
                                    onValueChange={(itemValue, itemIndex) => {
                                        this.setState({ selectedValue: itemValue })
                                    }
                                    }
                                >
                                    {options.map((item, index) => {
                                        return (<Picker.Item label={item} value={item} key={index} />)
                                    })}
                                </Picker></View>
                        </ProgressStep>
                        <ProgressStep nextBtnText={"Suivant"} previousBtnText={"Précédent"} finishBtnText={"Terminer"} label="Laissez-nous un message" nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle} nextBtnStyle={buttonStyle} previousBtnStyle={buttonStyle} scrollable={true}>
                            <View style={{ alignItems: 'center' }}>
                                <Input size='small' style={styles.input}
                                    label="Message  (Optionnel)"
                                    value={this.state.msg}
                                    onChangeText={this.handlemsg}
                                /></View>
                        </ProgressStep>
                        <ProgressStep nextBtnText={"Suivant"} previousBtnText={"Précédent"} finishBtnText={"Terminer"} label="Suivant" nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle} nextBtnStyle={buttonStyle} previousBtnStyle={buttonStyle} scrollable={true}>
                            <View style={{
                                flex: 1, justifyContent: 'center', alignContent: 'space-around', alignItems: 'baseline', flexDirection: 'row'
                            }}>
                                <TouchableOpacity
                                    style={styles.submitButton}
                                    onPress={
                                        () => this.login(
                                            this.state.qte,
                                            this.state.typeDon,
                                            this.state.descriptionDon,
                                            this.state.nom,
                                            this.state.prenom,
                                            this.state.email,
                                            this.state.tel,
                                            this.state.selectedValue,
                                            this.state.msg
                                        )
                                    }>
                                    <Text style={styles.submitButtonText}> Submit </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.resetButton}
                                    onPress={this.reset
                                    }>
                                    <Text> Réinitialiser
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: 'red' }}>
                                {this.getErrorMessages()}
                            </Text>
                            <Text style={{ color: 'blue' }}>
                                {this.isFormValid()}
                            </Text>

                        </ProgressStep>

                    </ProgressSteps>
                    <View style={{ position: "absolute", bottom: -40, right: -15, height: 200, width: 200, borderRadius: 400, zIndex: -4, backgroundColor: '#4d4d4d' }} />

                    <View style={{ position: "absolute", bottom: -60, right: -15, height: 200, width: 200, borderRadius: 400, zIndex: -3, backgroundColor: '#262626' }} />

                </View >
            </View>
        )


    }

}
const buttonTextStyle = {
    color: '#333333',
    fontFamily: 'Lato_400Regular',
    fontSize: 12

};
const buttonStyle = {
    backgroundColor: "#f1c40f",
    borderRadius: 50,
    marginBottom: -10,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "space-between",
    borderWidth: 1


};
const styles = StyleSheet.create({
    wrap: {
        overflow: 'hidden',
        backgroundColor: "#f1c40f",
        borderRadius: 50,
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 10,

    },
    container: {
        flex: 1,
        backgroundColor: "transparent",
    },
    input: {
        /* marginTop: 20,
        marginBottom: 20,
        borderRadius: 20,
        paddingTop: 20,
        paddingBottom: 50, */
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 20,
        borderWidth: 1

    },
    submitButton: {
        backgroundColor: '#262626',
        padding: 10,
        marginTop: 100,
        borderRadius: 20,
    },
    resetButton: {
        backgroundColor: 'transparent',
        borderColor: '#262626',
        borderWidth: 1,
        padding: 9,
        margin: 20,
        marginTop: 100,
        borderRadius: 20
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
});
export default Don;