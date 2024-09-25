
import React, {useState, useRef, useEffect, useMemo} from 'react';
import { StyleSheet, Text, View, Animated, Modal, TouchableOpacity, Alert } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import { GradientBackgroundLayout } from "../layouts/GradientBackgroundLayout";
import { theme } from "../theme/theme";
import { categories } from "../mock/categories";
import {useSelector} from "react-redux";
import {RoundResultModal} from "../components/RoundResultModal";
import {WinModal} from "../components/WinModal";
import {IconButton} from "../components/UI/IconButton";

function randomComparator() {
    return Math.random() - 0.5;
}

export const GamePage = ({route}) => {

    const {wordsGoalNumber, roundDuration, isPenaltyForSkipping } = useSelector(state => state.settings)

    const {categoryId} = route.params

    const {words, categoryName} = useMemo(() => {
        const item = categories.find((el => el.categoryId === categoryId))
        return {
            words: item.words.sort(randomComparator),
            categoryName: item.categoryName
        }
    }, [categoryId, categories])

    const {teams} = useSelector(state => state.game)
    const navigation = useNavigation();
    const [currentTeam, setCurrentTeam] = useState(0);
    const [wordIndex, setWordIndex] = useState(0);
    const [timer, setTimer] = useState(roundDuration);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [guessedWords, setGuessedWords] = useState([]);
    const [missedWords, setMissedWords] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const initialScores = teams.map(() => 0);
    const [teamScores, setTeamScores] = useState(initialScores);
    const [gameResults, setGameResults] = useState([]);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const [winnerTeam, setWinnerTeam] = useState('')


    const translateX = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;



    const [round, setRound] = useState(1);
    const [isRoundCompleted, setIsRoundCompleted] = useState(false);

    const currentScore = useMemo(() => {
        if (isPenaltyForSkipping) {
            return guessedWords.length - missedWords.length
        } else {
            return guessedWords.length
        }
    }, [guessedWords, missedWords, isPenaltyForSkipping])


    useEffect(() => {
        let interval;
        if (isGameStarted) {
            interval = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer === 1) {
                        endGame();
                        return 20;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isGameStarted]);


    useEffect(() => {
        if (isRoundCompleted && !showModal) {
            if (teamScores.some(score => score >= wordsGoalNumber)) {
                const winningTeam = teams[teamScores.findIndex(score => score >= wordsGoalNumber)].name;
                setWinnerTeam(winningTeam)
            } else {
                setRound(round + 1);
                setIsRoundCompleted(false);
            }
        }
    }, [isRoundCompleted, teamScores]);

    const resetGame = () => {
        setTeamScores([0, 0]);
        setWordIndex(0);
        setIsGameStarted(false);
        setWinnerTeam('')
        setGameResults([])
        navigation.navigate('HomePage')
    };

    const endGame = () => {
        setIsGameStarted(false);
        setShowModal(true);

        if ((currentTeam + 1) % teams.length === 0) {
            setIsRoundCompleted(true);
        }
    };


    const nextTeam = () => {
        setGameResults(prevResults => {
            const roundIndex = prevResults.findIndex(r => r.round === round);
            if (roundIndex !== -1) {
                prevResults[roundIndex].results.push({ team: teams[currentTeam].name, guessedWords, missedWords });
            } else {
                prevResults.push({
                    round: round,
                    results: [{ team: teams[currentTeam].name, guessedWords, missedWords }]
                });
            }
            return [...prevResults];
        });

        setTeamScores(scores => {
            let newScores = [...scores];
            newScores[currentTeam] += (currentScore);
            return newScores;
        });

        const nextTeamIndex = (currentTeam + 1) % teams.length;
        setCurrentTeam(nextTeamIndex);
        setGuessedWords([]);
        setMissedWords([]);

        if (nextTeamIndex === 0) {
            setIsRoundCompleted(true);
        }

        setShowModal(false);
    };


    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: translateX } }],
        { useNativeDriver: true }
    );


    const onHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {

            const { translationX } = event.nativeEvent;
            let isSwipeLeft = translationX < -80;
            let isSwipeRight = translationX > 80;

            let currentWord = words[wordIndex];
            let guessed = false;

            if (isSwipeRight) {
                setGuessedWords(prevWords => [...prevWords, currentWord]);
                guessed = true;
            } else if (isSwipeLeft) {
                setMissedWords(prevWords => [...prevWords, currentWord]);
                guessed = true;
            }

            if (guessed) {
                Animated.parallel([
                    Animated.timing(scaleAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true
                    }),
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true
                    })
                ]).start(() => {
                    setWordIndex(prevIndex => {
                        const nextIndex = (prevIndex + 1) % words.length;
                        if (nextIndex === 0) {
                            const shuffledWords = [...words].sort(randomComparator);
                            return 0;
                        }
                        return nextIndex;
                    });

                    translateX.setValue(0);
                    scaleAnim.setValue(1);
                    fadeAnim.setValue(1);
                });
            } else {
                translateX.setValue(0);
            }
        }
    };


    const startGame = () => {
        setIsGameStarted(true);
        setTimer(roundDuration);
        setGuessedWords([]);
        setMissedWords([]);
    };



    const progressBarWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {

        progressBarWidth.setValue(0);

        if (isGameStarted) {

            Animated.timing(progressBarWidth, {
                toValue: 1,
                duration: roundDuration * 1000,
                useNativeDriver: false,
            }).start();
        } else {

            progressBarWidth.stopAnimation();
        }


        return () => progressBarWidth.stopAnimation();
    }, [isGameStarted]);



    const widthInterpolation = progressBarWidth.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
    });


    const pulseAnim = useRef(new Animated.Value(1)).current;

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    useEffect(() => {
        if (timer <= 3 && timer > 0 && isGameStarted) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]),
                {
                    iterations: 3,
                }
            ).start();
        }
    }, [timer, isGameStarted]);



    return (
        <GradientBackgroundLayout>
            <View style={{flex: 1}}>
                <View style={styles.headerWrapper}>
                    <IconButton
                        sizeWrapper={50}
                        size={40}
                        color={theme.secondary}
                        iconName={'home'}
                        onPress={() => navigation.navigate('HomePage')}
                    />

                    <Text style={styles.goal}>Goal: {wordsGoalNumber}</Text>
                </View>


                <View style={styles.wrapper}>
                    <View style={styles.block}>

                        <View style={teams.length > 2 ? styles.teamsScoreWrapperList : styles.teamsScoreWrapperRow}>
                            {
                                teams.map((el, idx) => {
                                    return (
                                        <View key={idx} style={ teams.length > 2 ? styles.teamScoreItemlist : styles.teamScoreItemRow}>
                                            <Text style={styles.teamName}>{el.name}</Text>
                                            <Text style={styles.teamScore}>{teamScores[idx]}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>

                        <View style={styles.roundInfoWrapper}>
                            <Text style={styles.info}>Round: <Text style={styles.bold}>{round}</Text></Text>
                            <Text style={styles.info}>Team: <Text style={styles.bold}>{teams[currentTeam].name}</Text></Text>

                            <Text style={[styles.info, {marginTop: 10}]}>
                                Current Score
                            </Text>
                            <Text style={[styles.bold, {fontSize: 24}]}>{currentScore}</Text>

                        </View>

                    </View>

                    {isGameStarted ? (
                        <>
                            <View style={styles.gameFieldWrapper}>
                                <View style={styles.sectionLeft}>
                                    <Text style={styles.verticalTextLeft}>SKIPPED</Text>
                                </View>
                                <PanGestureHandler
                                    onGestureEvent={onGestureEvent}
                                    onHandlerStateChange={onHandlerStateChange}>
                                    <Animated.View
                                        style={[
                                            styles.gameItem,
                                            {
                                                transform: [{ translateX }, { scale: scaleAnim }],
                                                opacity: fadeAnim
                                            }
                                        ]}>
                                        <Text style={styles.activeWord}>{words[wordIndex] ? words[wordIndex].word : 'No more words'}</Text>
                                    </Animated.View>
                                </PanGestureHandler>
                                <View style={styles.sectionRight}>
                                    <Text style={styles.verticalTextRight}>GUESSED</Text>
                                </View>
                            </View>
                        </>
                    ) : (
                        <TouchableOpacity onPress={startGame} style={styles.startButton}>
                            <Text style={styles.startButtonText}>Start</Text>
                        </TouchableOpacity>
                    )}

                    {
                        isGameStarted
                            ? <Animated.View style={[styles.timeWrapper, { transform: [{ scale: pulseAnim }] }]}>
                                <Text style={[styles.timerText, {zIndex: 1000}]}>{formatTime(timer)}</Text>
                                <Animated.View style={[styles.progressBar, {width: widthInterpolation}]} >
                                </Animated.View>
                            </Animated.View>
                            : <View style={styles.blockTheme}>
                                <Text style={styles.timerText}>{categoryName}</Text>
                            </View>
                    }

                </View>

                <RoundResultModal
                    missedWords={missedWords}
                    guessedWords={guessedWords}
                    onClose={() => setShowModal(false)}
                    onPress={nextTeam}
                    showModal={showModal}
                    teamName={teams[currentTeam].name}
                    round={round}
                />

                <WinModal
                    teamName={winnerTeam}
                    visible={!!winnerTeam}
                    onAnaliticsBtnPress={() => {
                        setWinnerTeam('')
                        navigation.navigate('ResultsPage', { rounds: gameResults, teamScores: teamScores })}
                }
                    onHomeBtnPress={resetGame}
                />
             </View>

        </GradientBackgroundLayout>
    );
};

const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    goal: {
        fontSize: 22,
        color: theme.light,
        fontWeight: 'bold'
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    blockTheme: {
        width: '100%',
        height: 50,
        backgroundColor: theme.orange,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: theme.light,
        justifyContent: 'center',
        alignItems: 'center',
    },

    timeWrapper: {
        width: '100%',
        height: 50,
        backgroundColor: theme.orange,
        borderRadius: 20,
        borderColor: theme.light,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 2,
    },
    progressBar: {
        height: 50,
        backgroundColor: theme.secondary,
        position: 'absolute',
        left: 0,
        top: 0,
    },
    timerText: {
        color: theme.light,
        fontSize: 16,
        fontWeight: 'bold'
    },


    wrapper: {
        flex: 1,
        marginVertical: 10,
        justifyContent: "space-between",
    },

    block: {
        width: '100%',
        backgroundColor: theme.orange,
        justifyContent: 'center',
        padding: 15,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: theme.light
    },

    teamsScoreWrapperRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    teamsScoreWrapperList: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between'
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
        color: theme.light,
        fontWeight: 'bold'
    },

    teamScore: {
        fontSize: 26,
        color: theme.light,
        fontWeight: 'bold'
    },

    roundInfoWrapper: {
        alignItems: 'center'
    },
    info: {
        fontSize: 18,
        color: theme.light
    },
    bold: {
        color: theme.light,
        fontWeight: 'bold'
    },


    gameFieldWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    sectionRight: {
        width: 50,
        height: '90%',
        backgroundColor: 'transparent',
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
        borderLeftWidth: 2,
        borderColor: theme.light,

        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    sectionLeft: {
        width: 50,
        height: '90%',
        backgroundColor: 'transparent',
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
        borderRightWidth: 2,
        borderColor: theme.light,

        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    verticalTextLeft: {
        width: 200,
        textAlign: 'center',
        transform: [{ rotate: '90deg'}],
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.light,
    },

    verticalTextRight: {
        width: 200,
        textAlign: 'center',
        transform: [{ rotate: '-90deg'}],
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.light,
    },

    gameItem: {
        position: 'relative',
        zIndex: 100,
        height: 200,
        width: 200,
        backgroundColor: theme.green,
        alignSelf: 'center',
        borderRadius: 100,
        borderWidth: 4,
        borderColor: theme.light,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    startButton: {
        height: 200,
        width: 200,
        backgroundColor: theme.secondary,
        borderWidth: 4,
        borderColor: theme.light,
        alignSelf: 'center',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeWord: {
        color: theme.light,
        fontWeight: 'bold',
        fontSize: 20,
    },
    startButtonText: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold'
    },
});

