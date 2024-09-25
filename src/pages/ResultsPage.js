import {useNavigation} from "@react-navigation/native";
import {GradientBackgroundLayout} from "../layouts/GradientBackgroundLayout";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {theme} from "../theme/theme";
import React from "react";
import {useSelector} from "react-redux";
import {IconButton} from "../components/UI/IconButton";


export const ResultsPage = ({route}) => {
    const {teams} = useSelector(state => state.game)

    const { rounds, teamScores } = route.params

    const navigation = useNavigation()
    return (
        <GradientBackgroundLayout >
            <View style={styles.headerBtnWrapper}>
                <IconButton
                    sizeWrapper={50}
                    size={40}
                    color={theme.secondary}
                    iconName={'close'}
                    onPress={() => navigation.navigate('HomePage')}
                />
            </View>

            <ScrollView style={styles.wrapper}>

                <View style={styles.roundWrapper}>
                    <Text style={styles.roundText}>Score</Text>
                    <View style={{ width: '100%', marginTop: 10}}>
                        <View style={teams.length > 2 ? styles.teamsScoreWrapperList : styles.teamsScoreWrapperRow}>
                            {
                                teams && teams.map((el, idx) => {
                                    return (
                                        <View key={idx} style={ teams.length > 2 ? styles.teamScoreItemlist : styles.teamScoreItemRow}>
                                            <Text style={styles.teamName}>{el.name}</Text>
                                            <Text style={styles.teamScore}>{teamScores[idx]}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>

                </View>
                {
                    rounds && rounds.map(round => {
                        return (
                            <View key={round.round} style={styles.roundWrapper}>
                                <Text style={styles.roundText}>Round №{round.round}</Text>

                                {
                                    round.results.map(result => {
                                        return (
                                            <View key={result.team} style={styles.teamWrapper}>
                                                <Text style={styles.teamText}>{result.team}</Text>
                                                <View style={styles.wordsWrapper}>
                                                    <View style={styles.wordsBlockLeft}>
                                                        <Text style={styles.wordsTitle}>Guessed</Text>
                                                        {
                                                            result.guessedWords.map(word => {
                                                                return <Text key={word.id} style={styles.word}>- {word.word}</Text>
                                                            })
                                                        }
                                                    </View>
                                                    <View style={styles.wordsBlock}>
                                                        <Text style={styles.wordsTitle}>Skipped</Text>
                                                        {
                                                            result.missedWords.map(word => {
                                                                return <Text key={word.id} style={styles.word}>- {word.word}</Text>
                                                            })
                                                        }
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
            </ScrollView>
        </GradientBackgroundLayout>
    )
}

const styles = StyleSheet.create({
    headerBtnWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    wrapper: {
        flex: 1,
        marginTop: 10
    },

    roundWrapper: {
        width: '100%',
        backgroundColor: theme.light,
        borderRadius: 20,
        padding: 20,
        marginBottom: 20
    },
    roundText: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#280A82'
    },

    teamWrapper: {
        marginTop: 10,
        backgroundColor: theme.green,
        padding: 20,
        borderRadius: 10

    },
    teamText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.light,
        marginBottom: 7
    },


    wordsWrapper: {
        flexDirection: 'row',
    },
    wordsTitle: {
        textAlign: 'center',
        fontSize: 18,
        color: theme.light,
        fontWeight: 'bold',
        marginBottom: 5
    },
    word: {
        fontSize: 16,
        marginBottom: 3
    },
    wordsBlockLeft: {
        padding: 10,
        flex: 1,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderTopWidth: 2,
        borderColor: theme.light,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    wordsBlock: {
        padding: 10,
        flex: 1,
        borderWidth: 2,
        borderColor: theme.light,
        borderTopRightRadius: 10,
    },




    teamsScoreWrapperList: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between'
    },

    teamsScoreWrapperRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    teamScoreItemRow: {
        alignItems: 'center',
        marginBottom: 10
    },

    teamScoreItemlist: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },

    teamName: {
        fontSize: 18,
        color: theme.orange,
        fontWeight: 'bold'
    },

    teamScore: {
        fontSize: 26,
        color: theme.orange,
        fontWeight: 'bold'
    },
})



