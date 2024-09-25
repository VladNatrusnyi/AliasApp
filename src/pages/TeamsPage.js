import {StyleSheet, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {GradientBackgroundLayout} from "../layouts/GradientBackgroundLayout";
import {TeamsList} from "../components/teams/TeamsList";
import {KeyboardLayout} from "../layouts/KeyboardLayout";
import {IconButton} from "../components/UI/IconButton";

export const TeamsPage = () => {
    const navigation = useNavigation()

    return (
        <GradientBackgroundLayout>
            <KeyboardLayout>
                <IconButton
                    sizeWrapper={50}
                    size={40}
                    color={'transparent'}
                    iconName={'keyboard-arrow-left'}
                    onPress={() => navigation.goBack()}
                />

                <View style={styles.teamsWrapper}>
                    <TeamsList />
                </View>
            </KeyboardLayout>
        </GradientBackgroundLayout>
    )
}

const styles = StyleSheet.create({
    teamsWrapper: {
        flex: 1,
        marginVertical: 10
    },
});