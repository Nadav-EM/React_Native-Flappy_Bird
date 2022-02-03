import {
	TouchableOpacity,
	Text,
	View,
	SafeAreaView,
	Dimensions,
} from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

const FlappyBird = () => {
	const screenWidth = Dimensions.get("screen").width;
	const screenHeight = Dimensions.get("screen").height / 50;
	const [gravity, setGravity] = React.useState(0);
	let Time;

	React.useEffect(() => {
		if (gravity < 775) {
			Time = setInterval(() => {
				setGravity(prev => prev + 3);
			}, 1);

			return () => {
				clearInterval(Time);
			};
		}
		setGravity(0);
	}, [gravity]);

	const handleUp = () => {
		setGravity(prev => prev - 100);
	};
	console.log(gravity);
	return (
		<SafeAreaView>
			<View style={{ position: "absolute" }}>
				<View
					style={{
						width: 50,
						height: 50,
						left: screenWidth / 2,
						top: screenHeight + gravity,
						transform: [{ rotateX: "45deg" }, { rotateZ: "45deg" }],
					}}
				>
					<FontAwesome5 name="kiwi-bird" size={24} color="black" />
				</View>
			</View>

			<TouchableOpacity
				onPress={handleUp}
				style={{
					justifyContent: "center",
					alignItems: "center",
					position: "absolute",
					top: 700,
					right: 25,
					width: 60,
					height: 60,
					backgroundColor: "#151C26",
					borderRadius: 50,
				}}
			>
				<Text style={{ color: "white" }}>Jump</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default FlappyBird;
