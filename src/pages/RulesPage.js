import {View, Text, ScrollView, StyleSheet} from "react-native";
import {GradientBackgroundLayout} from "../layouts/GradientBackgroundLayout";
import {theme} from "../theme/theme";
import {IconButton} from "../components/UI/IconButton";
import {useNavigation} from "@react-navigation/native";

export const RulesPage = () => {
    const navigation = useNavigation()

    return (
        <GradientBackgroundLayout>
            <IconButton
                sizeWrapper={50}
                size={40}
                color={'transparent'}
                iconName={'keyboard-arrow-left'}
                onPress={() => navigation.goBack()}
            />

            <ScrollView style={styles.container}>
                <Text style={styles.title}>Alias Game Rules</Text>
                <View style={styles.ruleSection}>
                    <Text style={styles.ruleTitle}>Preparation:</Text>
                    <Text style={styles.ruleText}>- The game requires at least 2 teams to play, with a minimum of two players per team.</Text>
                    <Text style={styles.ruleText}>- Use the app to generate words, keep time, and track scores.</Text>
                </View>
                <View style={styles.ruleSection}>
                    <Text style={styles.ruleTitle}>Game Rules:</Text>
                    <Text style={styles.ruleText}>1. Teams take turns selecting a player to explain the words generated by the app within a set time limit (e.g., 1 minute).</Text>
                    <Text style={styles.ruleText}>2. The explainer tries to describe the word without using the word itself or any part of it. No gestures or foreign languages are allowed.</Text>
                    <Text style={styles.ruleText}>3. Teammates guess the words. Once a word is correctly guessed, the explainer moves on to the next word.</Text>
                    <Text style={styles.ruleText}>4. The game settings allow for a penalty option where skipping a word subtracts a point from the team's score. This feature can also be disabled if preferred.</Text>
                </View>
                <View style={styles.ruleSection}>
                    <Text style={styles.ruleTitle}>Additional App Features:</Text>
                    <Text style={styles.ruleText}>- Category selection: The app may offer the ability to choose word categories for a more customized game experience.</Text>
                    <Text style={styles.ruleText}>- Time adjustment: The ability to set the duration of each round according to player preference.</Text>
                    <Text style={styles.ruleText}>- Leaderboard: Tracking of scores and leaderboards to follow the progress of teams throughout the game.</Text>
                </View>
            </ScrollView>
        </GradientBackgroundLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: theme.light,
        borderRadius: 20,
        marginTop: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    ruleSection: {
        marginBottom: 20,
    },
    ruleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 10,
    },
    ruleText: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
});
