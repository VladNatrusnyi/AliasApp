import {Image, StyleSheet, Text, View, Button, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {GradientBackgroundLayout} from "../layouts/GradientBackgroundLayout";
import {theme} from "../theme/theme";
import {PrimaryButton} from "../components/UI/PrimaryButton";
import React, {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setAllSettings} from "../store/SettingsSlice";
import {useDispatch} from "react-redux";
import {IconButton} from "../components/UI/IconButton";


export const HomePage = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()


    const loadSettings = async () => {
        try {
            const savedSettings = await AsyncStorage.getItem('settings');

            if (savedSettings) {
                const parsedSettings = JSON.parse(savedSettings);
                dispatch(setAllSettings(parsedSettings))
            } else {
                const defaultSettings = {
                    wordsGoalNumber: 30,
                    roundDuration: 60,
                    isPenaltyForSkipping: true
                };
                await AsyncStorage.setItem('settings', JSON.stringify(defaultSettings));
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    };

    useEffect(() => {
        loadSettings()
    }, [])


    return (
        <GradientBackgroundLayout >
            <View style={styles.headerBtnWrapper}>
                <IconButton
                    sizeWrapper={60}
                    size={40}
                    color={theme.secondary}
                    iconName={'info-outline'}
                    onPress={() => navigation.navigate('RulesPage')}
                />

                <IconButton
                    sizeWrapper={60}
                    size={40}
                    color={theme.secondary}
                    iconName={'settings'}
                    onPress={() => navigation.navigate('SettingsPage')}
                />
            </View>


            <View style={styles.titleWrapper}>
                <Image
                    style={{width: '100%', resizeMode: 'contain', height: '60%'}}
                    source={require('../../assets/aaa.png')}
                />
            </View>


            <View style={styles.startBtnWrapper}>
                <PrimaryButton
                  customStyles={{marginVertical: 10}}
                  bgColor={theme.secondary}
                  onPress={() => navigation.navigate('TeamsPage') }
                  text={'Start'}
                />
            </View>
        </GradientBackgroundLayout>
    )
}

const styles = StyleSheet.create({
    buttonWrapper: {
        height: 65,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.secondary,
        borderRadius: 20,
        borderColor: theme.light,
        borderWidth: 4
    },
    btnText: {
        color: theme.light,
        fontSize: 22,
        fontWeight: 'bold'
    },

    headerBtnWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },


    titleWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    title: {
        fontSize: 46,
        fontWeight: 'bold',
        color: theme.light
    },


    startBtnWrapper: {
    },
})
