import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {EvilIcons, FontAwesome, FontAwesome5} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {TeamsListItem} from "./TeamsListItem";
import {PrimaryButton} from "../UI/PrimaryButton";
import {theme} from "../../theme/theme";
import {BottomBorderInput} from "../UI/BottomBorderInput";
import {useMemo, useState} from "react";
import {addNewTeam} from "../../store/GameSlice";
import {useNavigation} from "@react-navigation/native";

export const TeamsList = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const {teams} = useSelector(state => state.game)

    const [newTeamName, setNewTeamName] = useState( '')

    const [isAddTeamForm, setIsAddTeamForm] = useState(false)

    const isShowBtnNext = useMemo(() => {
        return teams && teams.length >= 2 && !isAddTeamForm
    }, [teams, isAddTeamForm])

    const create = () => {
        if (newTeamName.trim()) {
            dispatch(addNewTeam({id: Date.now().toString(), name: newTeamName}))
            setNewTeamName('')
            setIsAddTeamForm(false)
        } else {
            Alert.alert(
                "Warning",
                "You have not entered a team name",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        }

    }

    return (
            <View style={styles.wrapper}>
                <View>
                    {
                        (teams && teams.length)
                            ? teams.map(el => {
                                return (
                                    <TeamsListItem key={el.id} teamData={el} />
                                )
                            })
                            : <Text style={styles.notExist}>You must have at least 2 teams</Text>
                    }
                    <View>
                        {
                            isAddTeamForm
                                ?
                                <View style={styles.createFormWrapper}>
                                    <View style={{flex: 1}}>
                                        <BottomBorderInput
                                            onChange={(text) => setNewTeamName(text)}
                                            value={newTeamName}
                                        />
                                    </View>

                                    <View style={styles.btnWrapper}>
                                        <TouchableOpacity onPress={create}>
                                            <FontAwesome name="save" size={24} color={theme.light} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => setIsAddTeamForm(false)}
                                        >
                                            <EvilIcons name="close" size={30} color={theme.light} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                : <PrimaryButton
                                    bgColor={theme.secondary}
                                    onPress={() => setIsAddTeamForm(true)}
                                    text={'Add team'}
                                />
                        }
                    </View>
                </View>

                {
                    !!isShowBtnNext &&
                    <PrimaryButton
                        customStyles={{marginTop: 15}}
                        onPress={() => navigation.navigate('CategoriesPage')}
                        text={'Next'}
                    />
                }
            </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "space-between"
    },

    notExist: {
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 16,
        color: theme.light
    },

    createFormWrapper: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        gap: 15,
        padding: 15,
        backgroundColor: theme.secondary,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: theme.light
    },


    btnWrapper: {
        flexDirection: "row",
        alignItems: 'center',
        gap: 20,
    }
})