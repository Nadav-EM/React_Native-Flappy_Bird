import {
	StyleSheet,
	Dimensions,
	Image,
	View,
	Text,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";

const size = Dimensions.get("screen").height / 2 - 150;

const startSound = require("../assets/slimejump.mp3");
const jumpSound = require("../assets/jumpSound.wav");

const GameScreen = () => {
	const [bottomScreen, setBottomScreen] = React.useState(size);
	const [flow, setFlow] = React.useState(true);
	const [startGame, setStartGame] = React.useState(false);
	const [displayBtn, setDisplayBtn] = React.useState("flex");
	const [cloud, setCloud] = React.useState(455);
	const [cloud2, setCloud2] = React.useState(455);
	const [object, setObject] = React.useState(-40);
	const [objectHeight, setObjectHeight] = React.useState(
		(Math.random() * Dimensions.get("screen").height) / 2 + 100
	);

	const [obstacleCoords, setObstacleCoords] = React.useState({ x: "", y: "" });
	const [birdCoords, setBirdCoords] = React.useState({ x: "", y: "" });
	const [points, setPoints] = React.useState(0);
	const [getPoints, setGetPoints] = React.useState(true);
	let Time, TimeTwo;

	async function playSound(currentSound) {
		const { sound } = await Audio.Sound.createAsync(currentSound);
		await sound.playAsync();
	}

	const gameOver = () => {
		clearInterval(Time);
		clearInterval(TimeTwo);
		setStartGame(false);
	};

	const Score = () => {
		return (
			<TouchableOpacity
				style={{
					zIndex: 2,
					top: Dimensions.get("screen").height - 200,
					height: 60,
					width: 50,
					borderColor: "white",
					borderWidth: 4,
					alignItems: "center",
					justifyContent: "center",
					left: 10,
					borderRadius: 100,
					opacity: 0.9,
				}}
			>
				<Text
					style={{
						color: "white",
						fontSize: 24,
						fontWeight: "bold",
					}}
				>
					{points}
				</Text>
			</TouchableOpacity>
		);
	};

	React.useEffect(() => {
		if (!startGame) {
			Time = setInterval(() => {
				if (bottomScreen <= size) setFlow(true);
				if (bottomScreen >= size + 50) setFlow(false);
				flow
					? setBottomScreen(prev => prev + 1)
					: setBottomScreen(prev => prev - 1);
			}, 3);
			return () => clearInterval(Time);
		}
	}, [bottomScreen]);

	//
	//after start button
	//

	React.useEffect(() => {
		if (startGame) {
			TimeTwo = setInterval(() => {
				//birdCoords.y < objectHeight

				if (
					birdCoords.x > obstacleCoords.x - 40 &&
					birdCoords.x < obstacleCoords.x &&
					birdCoords.y < objectHeight
				) {
					console.log("Game Over");
					return gameOver();
				}
				// console.log(
				// 	birdCoords.x > obstacleCoords.x - 40 &&
				// 		birdCoords.x < obstacleCoords.x &&
				// 		birdCoords.y < objectHeight
				// );

				if (
					startGame &&
					obstacleCoords.x < Dimensions.get("screen").width / 2 - 50
				) {
					setGetPoints(false);
					console.log(points);
				}

				setBottomScreen(prev => prev + 3);
				cloud == -50 ? setCloud(455) : setCloud(prev => prev - 1);
				cloud2 == -50 ? setCloud2(455) : setCloud2(prev => prev - 25);
				if (object >= Dimensions.get("screen").width) {
					if (!getPoints) {
						setGetPoints(true);
						setPoints(points => points + 1);
					}
					setObject(-40);
					setObjectHeight(
						(Math.random() * Dimensions.get("screen").height) / 2 + 100
					);
				} else {
					setObject(prev => prev + 3);
				}
			}, 1);
			return () => clearInterval(TimeTwo);
		}
	}, [bottomScreen, cloud, object]);

	const handStartGameButton = () => {
		playSound(startSound);
		setDisplayBtn("none");
		setStartGame(true);
	};

	const jump = () => {
		setBottomScreen(prev => prev - 50);
		playSound(jumpSound);
	};

	return (
		<View style={{ flex: 1, backgroundColor: "#70C5CE" }}>
			<View style={{ position: "absolute", marginTop: 50, right: cloud }}>
				<Ionicons name="md-cloudy" size={50} color="white" />
			</View>
			<View style={{ position: "absolute", marginTop: 100, right: cloud }}>
				<Ionicons name="md-cloudy" size={30} color="white" />
			</View>
			<View
				onLayout={event => {
					const layout = event.nativeEvent.layout;
					setBirdCoords({ x: layout.x, y: layout.y });
				}}
				style={{
					height: 70,
					width: 70,
					left: Dimensions.get("screen").width / 2 - 35,
					borderRadius: 50,
					top: bottomScreen,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{/* <FontAwesome5 name="fly" size={50} color="black" /> */}
				<Image
					style={{
						width: 70,
						height: 70,
						backgroundColor: "transparent",
					}}
					source={{
						uri: "https://thumbs.gfycat.com/ApprehensiveMistyItalianbrownbear-size_restricted.gif",
					}}
				/>
			</View>

			<TouchableOpacity
				onPress={handStartGameButton}
				style={{
					position: displayBtn == "flex" ? "absolute" : "relative",
					display: displayBtn,
					width: 200,
					alignItems: "center",
					justifyContent: "center",
					left: Dimensions.get("screen").width / 2 - 100,
					top: Dimensions.get("screen").height / 2 + 200,
					backgroundColor: "#FF1493",
					height: 100,
					borderRadius: 10,
					overflow: "hidden",
					shadowColor: "black",
					shadowRadius: 50,
					shadowOpacity: 1,
					elevation: 9,
				}}
			>
				<Text style={styles.startButtonText}>START</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={jump}
				style={{
					position: "relative",
					top: Dimensions.get("screen").height / 2 + 150,
					left: Dimensions.get("screen").width / 2 - 50,
					display: displayBtn == "flex" ? "none" : "flex",
				}}
			>
				<View
					style={{
						width: 100,
						height: 100,
						backgroundColor: "gray",
						justifyContent: "center",
						alignItems: "center",
						borderRadius: 50,
						opacity: 0.5,
					}}
				>
					<View
						style={{
							position: "absolute",
							height: 60,
							width: 60,
							backgroundColor: "white",
							borderRadius: 50,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<AntDesign name="caretup" size={35} color="#FF1493" />
					</View>
				</View>
			</TouchableOpacity>

			<LinearGradient
				onLayout={event => {
					const layout = event.nativeEvent.layout;
					setObstacleCoords({ x: layout.x, y: layout.y });
				}}
				colors={["green", "#228B22"]}
				style={{
					position: "absolute",
					height: objectHeight,
					width: 40,
					left: object,
					borderColor: "black",
					borderWidth: 1,
					borderBottomLeftRadius: 10,
					borderBottomRightRadius: 10,
					opacity: 0.95,
					alignItems: "center",
				}}
			>
				<View
					style={{
						height: 2,
						width: 38,
						backgroundColor: "black",
						borderRadius: 20,
						top: objectHeight - 15,
						opacity: 0.3,
					}}
				></View>
			</LinearGradient>
			<View
				style={{
					position: "absolute",
					height: 150,
					top: objectHeight,
					width: 40,
					left: object,
					backgroundColor: "transparent",
				}}
			></View>
			<LinearGradient
				colors={["green", "#228B22"]}
				style={{
					position: "absolute",
					height: Dimensions.get("screen").height - objectHeight - 50 - 150,
					bottom: 50,
					width: 40,
					left: object,
					borderColor: "black",
					borderWidth: 1,
					borderTopLeftRadius: 10,
					borderTopRightRadius: 10,
					opacity: 0.95,
					alignItems: "center",
				}}
			>
				<View
					style={{
						height: 2,
						width: 38,
						backgroundColor: "black",
						borderRadius: 20,
						top: 10,
						opacity: 0.3,
					}}
				></View>
			</LinearGradient>

			<Score />

			<LinearGradient
				// Button Linear Gradient
				colors={["greenyellow", "green", "#052517"]}
				style={{
					width: Dimensions.get("screen").width,
					height: 50,
					position: "absolute",
					top: Dimensions.get("screen").height - 50,
				}}
			>
				<View></View>
			</LinearGradient>
		</View>
	);
};

export default GameScreen;

const styles = StyleSheet.create({
	startButtonText: {
		fontSize: 24,
		color: "white",
		fontWeight: "bold",
	},
});
