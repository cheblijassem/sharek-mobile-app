import React, { Component } from 'react';
import { Text, StyleSheet, View, ActivityIndicator, Picker, TouchableOpacity, ScrollView, Image } from 'react-native';
/* import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button' */
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Radio, RadioGroup, Input } from '@ui-kitten/components';
import ValidationComponent from 'react-native-form-validator';
class Profiter extends ValidationComponent {

    constructor(props) {
        super(props);
        this.labels = {
            nom: 'Nom',
            prenom: 'Prénom',
            email: 'Email',
            tel: 'Numéro téléphone',
            nomEcole: 'Nom d\'école',
            niveauEtudeEcole: 'Niveau d\'étude',
            universite: 'Université',
            specialiteUniv: 'Specialité',
            NiveauEtudeUniv: 'Niveau d\'étude',
            besoin: 'Besoin',
            DetailBesoin: 'Detail de Besoin',
        };
        this.pp = React.createRef();
        this.state = {
            nom: '',
            prenom: '',
            email: '',
            tel: '',
            myVar: 0,
            nomEcole: '',
            niveauEtudeEcole: '',
            universite: '',
            specialiteUniv: '',
            NiveauEtudeUniv: '',
            besoin: '',
            DetailBesoin: '',
            canada: '',
            selectedValue: '',
            country: 'uk'
        }
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
    NomEcole = (text) => {
        this.setState({ nomEcole: text }, () => {
            this.checkvalidation();
            this.errors.filter(function (error) {
                if (error.fieldName !== 'nomEcole') {
                    error.messages = []
                }
            });
        })
    }
    niveauEtudeEcole = (text) => {
        this.setState({ niveauEtudeEcole: text }, () => {
            this.checkvalidation();
            this.errors.filter(function (error) {
                if (error.fieldName !== 'niveauEtudeEcole') {
                    error.messages = []
                }
            });
        })
    }
    Universite = (text) => {
        this.setState({ universite: text }, () => {
            this.checkvalidation();
            this.errors.filter(function (error) {
                if (error.fieldName !== 'universite') {
                    error.messages = []
                }
            });
        })
    }
    specialiteUniv = (text) => {
        this.setState({ specialiteUniv: text }, () => {
            this.checkvalidation();
            this.errors.filter(function (error) {
                if (error.fieldName !== 'specialiteUniv') {
                    error.messages = []
                }
            });
        })
    }
    NiveauEtudeUniv = (text) => {
        this.setState({ NiveauEtudeUniv: text }, () => {
            this.checkvalidation();
            this.errors.filter(function (error) {
                if (error.fieldName !== 'NiveauEtudeUniv') {
                    error.messages = []
                }
            });
        })
    }
    Besoin = (text) => {
        this.setState({ besoin: text }, () => {
            this.checkvalidation();
            this.errors.filter(function (error) {
                if (error.fieldName !== 'besoin') {
                    error.messages = []
                }
            });
        })
    }
    DetailBesoin = (text) => {
        this.setState({ DetailBesoin: text }, () => {
            this.checkvalidation();
            this.errors.filter(function (error) {
                if (error.fieldName !== 'DetailBesoin') {
                    error.messages = []
                }
            });
        })
        console.log(text)
    }

    checkvalidation = () => {
        this.validate({
            nom: { minlength: 3, required: true },
            prenom: { minlength: 3, required: true },
            email: { email: true, required: true },
            tel: { required: true },
        });
    }

    reset = () => {
        this.setState({
            nom: '',
            prenom: '',
            email: '',
            tel: '',
            myVar: 0,
            nomEcole: '',
            niveauEtudeEcole: '',
            universite: '',
            specialiteUniv: '',
            NiveauEtudeUniv: '',
            besoin: '',
            DetailBesoin: '',
            canada: '',
            selectedValue: '',
            country: 'uk'
        }, () => this.pp.current.setState({
            activeStep: this.state.activeStep
        }, () => this.checkvalidation()));
    }

    login = (nom, prenom, Email, tel, etablissement, niveau_scolarite, nom_universite, specialite, ville, besoin, detail) => {
        fetch("https://sharek-it-back.herokuapp.com/api/profits/ajouter", {
            method: "post",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                nom, prenom, Email, tel, etablissement, niveau_scolarite, nom_universite, specialite, ville, besoin, detail
            })
        }).then(res => res.json()).then(data => {
            console.log(data);

        })
    }
    componentDidMount() {
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
            <View style={{ flex: 1 }}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {/* <Button accessoryLeft={FacebookIcon}>Login with Facebook</Button> */}

                    <Image source={require('../assets/imgtuto2.png')} style={{ height: 150, resizeMode: 'contain' }}
                        resizeMode="contain"
                        resizeMethod="resize" />
                </View>
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 20,
                        fontFamily: 'Lato_400Regular'
                    }}
                >
                    Profiter
                </Text>

                <ProgressSteps marginBottom={20} progressBarColor={'#4d4d4d'} activeStepIconBorderColor={'#f6f6f6'}
                    completedProgressBarColor={'#f6f6f6'} completedStepIconColor={'#aaaaaa'}
                    disabledStepIconColor={'#4d4d4d'} labelColor={'#4d4d4d'} completedLabelColor={'#f6f6f6'}
                    activeLabelColor={'#f6f6f6'} activeStepNumColor={'#4d4d4d'} labelFontSize={9} >

                    <ProgressStep nextBtnText={"Suivant"} finishBtnText={"Terminer"} label="Vos Informations" nextBtnTextStyle={buttonTextStyle} nextBtnStyle={buttonStyle} scrollable={true}>
                        <View style={{ alignItems: 'center' }}>
                            <Input size='small' style={styles.input}
                                label="Nom"
                                value={this.state.nom}
                                onChangeText={this.handleNom} />

                            <Input size='small' style={styles.input}
                                label="Prenom"
                                value={this.state.prenom}
                                onChangeText={this.handlePrenom}
                            />
                            <Input size='small' style={styles.input}
                                label="Email"
                                value={this.state.email}
                                onChangeText={this.handleEmail}
                            />
                            <Input size='small' style={styles.input}
                                label="Tel"
                                value={this.state.tel}
                                onChangeText={this.handleTel}
                            />
                            <RadioGroup style={{
                                flexDirection: 'row',
                                marginTop: 10,
                                padding: 2,
                                backgroundColor: '#f6f6f6',
                                borderRadius: 50
                            }}
                                selectedIndex={this.state.myVar}
                                onChange={index => this.setState({ myVar: index })}>

                                <Radio status='basic' style={{ margin: 2 }}>Ecole</Radio>
                                <Radio status='basic' style={{ margin: 2 }}>Université</Radio>

                            </RadioGroup>
                            {this.state.myVar === 0 &&
                                <View style={{ alignItems: 'center' }}>

                                    <Input size='small' style={styles.input}
                                        label="Nom de l'ecole"
                                        value={this.state.nomEcole}
                                        onChangeText={this.NomEcole}
                                    />

                                    <Input size='small' style={styles.input}
                                        label="Niveau d'etude"
                                        value={this.state.niveauEtudeEcole}
                                        onChangeText={this.niveauEtudeEcole}
                                    />
                                </View>
                            }
                            {this.state.myVar === 1 &&
                                <View style={{ alignItems: 'center' }}>
                                    <Input size='small' style={styles.input}
                                        label="Université "
                                        value={this.state.universite}
                                        onChangeText={this.Universite}
                                    />

                                    <Input size='small' style={styles.input}
                                        label="Specialité"
                                        value={this.state.specialiteUniv}
                                        onChangeText={this.specialiteUniv}
                                    />

                                    <Input size='small' style={styles.input}
                                        label="Niveau d'etude "
                                        value={this.state.NiveauEtudeUniv}
                                        onChangeText={this.NiveauEtudeUniv}
                                    />
                                </View>
                            }
                        </View>
                    </ProgressStep>
                    <ProgressStep label="Le besoin" nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle} nextBtnStyle={buttonStyle} previousBtnStyle={buttonStyle} scrollable={true}>
                        <View style={{ alignItems: 'center' }}>
                            <Input size='small' style={styles.input}

                                label="besoin "
                                value={this.state.besoin}
                                onChangeText={this.Besoin}
                            />
                            <Input size='small' style={styles.textArea}
                                value={this.state.DetailBesoin}
                                label="Detail Besoin "
                                multiline={true}
                                numberOfLines={5}
                                onChangeText={this.DetailBesoin}
                            />
                        </View>
                    </ProgressStep>
                    <ProgressStep label="Vos coordonnées de récupération" nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle} nextBtnStyle={buttonStyle} previousBtnStyle={buttonStyle} scrollable={true}>
                        <View style={{ alignItems: 'center' }}>
                            <Picker
                                selectedValue={this.state.selectedValue}
                                style={styles.input}
                                onValueChange={(itemValue, itemIndex) => {
                                    console.log(itemValue)
                                    this.setState({ selectedValue: itemValue })
                                }
                                }
                            >
                                {options.map((item, index) => {
                                    return (<Picker.Item label={item} value={item} key={index} />)
                                })}
                            </Picker>
                        </View>
                    </ProgressStep>
                    <ProgressStep label="Suivant" nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle} nextBtnStyle={buttonStyle} previousBtnStyle={buttonStyle} scrollable={true}>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={
                                    () => this.login(this.state.nom,
                                        this.state.prenom,
                                        this.state.email,
                                        this.state.tel,

                                        this.state.nomEcole,
                                        this.state.niveauEtudeEcole,

                                        this.state.universite,
                                        this.state.specialiteUniv,
                                        this.state.selectedValue,
                                        this.state.besoin,
                                        this.state.DetailBesoin
                                    )
                                }>
                                <Text style={styles.submitButtonText}> Submit </Text>
                            </TouchableOpacity>
                        </View>
                    </ProgressStep>

                </ProgressSteps>
            </View >
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
    marginBottom: 0,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "space-between",
    borderWidth: 1


};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        height: "60%"
    },
    input: {
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 20

    },
    submitButton: {
        backgroundColor: '#262626',
        padding: 10,
        marginTop: 100,
        borderRadius: 20,
    },
    submitButtonText: {
        color: 'white'
    },
    radio: {
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
export default Profiter;