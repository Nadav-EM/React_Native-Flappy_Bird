import {
	StyleSheet,
	Text,
	Dimensions,
	View,
	Animated,
	ImageBackground,
} from "react-native";
import React from "react";

const ProgressBar = ({ step, steps, height }) => {
	const [width, setWidth] = React.useState(0);
	const animatedValue = React.useRef(new Animated.Value(-1000)).current;
	const reactive = React.useRef(new Animated.Value(-1000)).current;

	React.useEffect(() => {
		Animated.timing(animatedValue, {
			toValue: reactive,
			duration: 300,
			useNativeDriver: true,
		}).start();
	}, []);

	React.useEffect(() => {
		reactive.setValue(-width + (width * step) / steps);
	}, [step, width]);

	return (
		<>
			<Text
				style={{
					fontSize: 12,
					fontWeight: "bold",
					marginBottom: 8,
				}}
			>
				{step}/{steps}
			</Text>
			<View
				onLayout={e => {
					const newWidth = e.nativeEvent.layout.width;
					setWidth(newWidth);
				}}
				style={{
					height,
					backgroundColor: "rgba(1,1,1,0.1)",
					borderRadius: height,
					overflow: "hidden",
				}}
			>
				<Animated.View
					style={{
						height,
						width: "100%",
						borderRadius: height,
						backgroundColor: "rgba(1,1,1,0.5)",
						left: 0,
						top: 0,
						transform: [
							{
								translateX: animatedValue,
							},
						],
					}}
				/>
			</View>
		</>
	);
};

const SplashScreen = ({ navigation }) => {
	const [index, setIndex] = React.useState(0);

	React.useEffect(() => {
		const interval = setInterval(() => {
			setIndex((index + 1) % (10 + 1));
		}, 1000);

		return () => clearInterval(interval);
	}, [index]);

	React.useEffect(() => {
		setTimeout(() => {
			navigation.navigate("GameScreen");
		}, 11.5 * 1000);
	}, []);

	return (
		<View
			style={{
				flex: 1,
				padding: 20,
				backgroundColor: "#4EC0CA",
			}}
		>
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<ImageBackground
					resizeMode="contain"
					style={{
						flex: 2,
						width: Dimensions.get("screen").width,
						height: Dimensions.get("screen").height,
					}}
					source={{
						uri: "http://www.schieb.de/wp-content/uploads/2014/03/flappy-bird-logo.jpg",
					}}
				/>
				<Text
					style={{
						alignItems: "center",
						justifyContent: "center",
						fontWeight: "bold",
						color: "white",
					}}
				>
					NadavEM
				</Text>
			</View>
			<ProgressBar step={index} steps={10} height={20} />
		</View>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({});
