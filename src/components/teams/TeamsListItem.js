import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesome, FontAwesome5, MaterialIcons} from "@expo/vector-icons";
import {BottomBorderInput} from "../UI/BottomBorderInput";
import {theme} from "../../theme/theme";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {deleteTeam, editTeamName} from "../../store/GameSlice";

export const TeamsListItem = ({teamData}) => {
    const dispatch = useDispatch()

    const [teamName, setTeamName] = useState(teamData ? teamData.name : '')

    const [isEdit, setIsEdit] = useState(false)

    const saveChanges = () => {
        if (teamName.trim()) {
            dispatch(editTeamName({teamId: teamData.id, newName: teamName}))
            setIsEdit(false)
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

    const removeTeam = () => {
        dispatch(deleteTeam(teamData.id))
    }


    return (
        <View
            style={styles.teamItemWrapper}
        >
            <View style={styles.dataWrapper}>
                {
                    isEdit
                        ?  <BottomBorderInput
                            onChange={(text) => setTeamName(text)}
                            value={teamName}
                        />
                        : <Text style={styles.teamName}>{teamData.name}</Text>
                }
            </View>

            <View style={styles.teamBtnWrapper}>
                {
                    isEdit
                        ? <TouchableOpacity onPress={saveChanges}>
                            <FontAwesome name="save" size={24} color={theme.light} />
                        </TouchableOpacity>
                        : <>
                            <TouchableOpacity
                                onPress={() => setIsEdit(true)}
                            >
                                <FontAwesome5 name="edit" size={24} color={theme.light} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={removeTeam}
                            >
                                <MaterialIcons name="delete" size={24} color={theme.light} />
                            </TouchableOpacity>
                        </>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    teamItemWrapper: {
        padding: 20,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.green,
        marginBottom: 15,
        borderRadius: 20,
        gap: 20
    },
    dataWrapper: {
      flex: 1
    },
    teamName: {
        color: theme.light,
        fontSize: 20,
        fontWeight: 'bold'
    },
    teamBtnWrapper: {
        flexDirection: "row",
        alignItems: 'center',
        gap: 10
    }
});