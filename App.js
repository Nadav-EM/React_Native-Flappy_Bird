import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screens/HomeScreen";
import MoviesCarousle from "./Screens/MoviesCarousle";
import MoviesScreen from "./Screens/MoviesScreen";
import FlappyBird from "./Screens/FlappyBird";
import GameScreen from "./Screens/GameScreen";
import SplashScreen from "./Screens/SplashScreen";
const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
				<Stack.Screen
					name="SplashScreen"
					component={SplashScreen}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="GameScreen"
					component={GameScreen}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="FlappyBird"
					component={FlappyBird}
					options={{
						title: "FlappyBird",
						headerStyle: { backgroundColor: "#151C26" },
						headerTitleStyle: { color: "white" },
						headerTitleAlign: "left",
					}}
				/>
				<Stack.Screen
					name="MoviesScreen"
					component={MoviesScreen}
					options={{
						title: "Movies",
						headerStyle: { backgroundColor: "#151C26" },
						headerTitleStyle: { color: "white" },
						headerTitleAlign: "left",
					}}
				/>
				<Stack.Screen
					name="MoviesCarousle"
					component={MoviesCarousle}
					options={{ title: "Welcome" }}
				/>
				<Stack.Screen
					name="HomeScreen"
					component={HomeScreen}
					options={{ title: "Welcome" }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
