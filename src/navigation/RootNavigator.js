import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {HomePage} from "../pages/HomePage";
import {SettingsPage} from "../pages/SettingsPage";
import {TeamsPage} from "../pages/TeamsPage";
import {CategoriesPage} from "../pages/CategoriesPage";
import {GamePage} from "../pages/GamePage";
import {ResultsPage} from "../pages/ResultsPage";
import {RulesPage} from "../pages/RulesPage";

const Stack = createStackNavigator();

const navTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'transparent',
    },
};

export const RootNavigator = () => {
    return (
        <NavigationContainer theme={navTheme}>
            <Stack.Navigator
                initialRouteName={'HomePage'}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="HomePage" component={HomePage} />
                <Stack.Screen name="SettingsPage" component={SettingsPage} />
                <Stack.Screen name="TeamsPage" component={TeamsPage} />
                <Stack.Screen name="CategoriesPage" component={CategoriesPage} />
                <Stack.Screen name="GamePage" component={GamePage} />
                <Stack.Screen name="ResultsPage" component={ResultsPage} />
                <Stack.Screen name="RulesPage" component={RulesPage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}