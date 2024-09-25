import {StyleSheet, Switch, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {GradientBackgroundLayout} from "../layouts/GradientBackgroundLayout";
import Slider from "@react-native-community/slider";
import {useDispatch, useSelector} from "react-redux";
import {theme} from "../theme/theme";
import {setIsPenaltyForSkipping, setRoundDuration, setWordsGoalNumber} from "../store/SettingsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {IconButton} from "../components/UI/IconButton";


const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};



export const SettingsPage = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const {wordsGoalNumber, roundDuration, isPenaltyForSkipping } = useSelector(state => state.settings)

    const setSettings = async (defaultSettings) => {
        try {
            await AsyncStorage.setItem('settings', JSON.stringify(defaultSettings));
        } catch (error) {
            console.error('Error setting default settings:', error);
        }
    };

    const toggleSwitch = async () => {
        dispatch(setIsPenaltyForSkipping(!isPenaltyForSkipping))
        await setSettings({
            roundDuration,
            wordsGoalNumber,
            isPenaltyForSkipping: !isPenaltyForSkipping
        })
    }

    return (
        <GradientBackgroundLayout>
            <IconButton
                sizeWrapper={50}
                size={40}
                color={'transparent'}
                iconName={'keyboard-arrow-left'}
                onPress={() => navigation.goBack()}
            />


            <View style={styles.wrapper}>
                <View style={styles.content}>

                    <Text style={styles.contentTitle}>Settings</Text>

                    <View style={styles.settingsBlock}>
                        <Text style={styles.settingsBlockTitle}>Round duration</Text>
                        <View style={styles.settingsBlockContent}>
                            <Slider
                                style={styles.slider}
                                minimumValue={10}
                                maximumValue={120}
                                value={roundDuration}
                                thumbTintColor={theme.green}
                                minimumTrackTintColor={theme.green}
                                maximumTrackTintColor={'lightgray'}
                                onValueChange={async (value) => {
                                    dispatch(setRoundDuration(Math.round(value)))
                                    await setSettings({
                                        roundDuration: Math.round(value),
                                        wordsGoalNumber,
                                        isPenaltyForSkipping,
                                    })
                                }}
                            />
                            <Text style={styles.sliderValue}>{formatTime(roundDuration)}</Text>
                        </View>
                    </View>


                    <View style={styles.settingsBlock}>
                        <Text style={styles.settingsBlockTitle}>Goal</Text>
                        <View style={styles.settingsBlockContent}>
                            <Slider
                                style={styles.slider}
                                minimumValue={10}
                                maximumValue={50}
                                value={wordsGoalNumber}
                                thumbTintColor={theme.green}
                                minimumTrackTintColor={theme.green}
                                maximumTrackTintColor={'lightgray'}
                                onValueChange={async (value) => {
                                    dispatch((setWordsGoalNumber(Math.round(value))))
                                    await setSettings({
                                        roundDuration,
                                        wordsGoalNumber: Math.round(value),
                                        isPenaltyForSkipping
                                    })
                                } }
                            />
                            <Text style={styles.sliderValue}>{wordsGoalNumber}</Text>
                        </View>
                    </View>


                    <View style={styles.settingsBlock}>
                        <Text style={styles.settingsBlockTitle}>Penalty</Text>
                        <View style={styles.settingsBlockContent}>
                            <Text style={styles.penaltyText}>Penalty for skipping</Text>
                            <Switch
                                trackColor={{false: theme.orange, true: theme.secondary}}
                                thumbColor={isPenaltyForSkipping ? theme.light : theme.secondary}
                                onValueChange={toggleSwitch}
                                value={isPenaltyForSkipping}
                            />
                        </View>
                    </View>

                </View>
            </View>

        </GradientBackgroundLayout>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: theme.light,
        padding: 20,
        width: '90%',
        borderRadius: 20
    },
    contentTitle: {
        textAlign: 'center',
        marginBottom: 15,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#280A82',
    },

    settingsBlock: {
        borderWidth: 2,
        padding: 15,
        borderRadius: 20,
        borderColor: theme.secondary,
        marginBottom: 15
    },
    settingsBlockTitle: {
        textAlign: 'center',
        color: '#280A82',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10
    },
    settingsBlockContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    slider: {
        flex: 1,
        height: 40
    },
    sliderValue: {
        width: 50,
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.secondary,
    },
    penaltyText: {
        flex: 1,
        fontSize: 18,
        color: theme.secondary,
        fontWeight: 'bold'
    }
})