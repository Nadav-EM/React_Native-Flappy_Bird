import * as React from "react";
import {
	StatusBar,
	Text,
	View,
	StyleSheet,
	FlatList,
	Image,
	Dimensions,
	Animated,
	TextInput,
	TouchableOpacity,
	Platform,
} from "react-native";

const { width, height } = Dimensions.get("window");
// import { getMovies } from './api';
// import Genres from './Genres';
// import Rating from './Rating';
import { LinearGradient } from "expo-linear-gradient";

const SPACING = 10;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const Loading = () => (
	<View style={styles.loadingContainer}>
		<Text style={styles.paragraph}>Loading...</Text>
	</View>
);

const Backdrop = ({ movies, scrollX }) => {
	return (
		<View style={{ height: BACKDROP_HEIGHT, width, position: "absolute" }}>
			<FlatList
				data={movies.reverse()}
				keyExtractor={item => {
					// console.log(item.key + "-backdrop");
					return item.key + "-backdrop";
				}}
				removeClippedSubviews={false}
				contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
				renderItem={({ item, index }) => {
					console.log(item.poster);
					if (!item.backdrop) {
						return null;
					}
					const translateX = scrollX.interpolate({
						inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
						outputRange: [0, width],
						// extrapolate:'clamp'
					});
					return (
						<Animated.View
							removeClippedSubviews={false}
							style={{
								position: "absolute",
								width: translateX,
								height,
								overflow: "hidden",
							}}
						>
							<Image
								source={{ uri: item.poster }}
								style={{
									width,
									height: BACKDROP_HEIGHT,
									position: "absolute",
								}}
							/>
						</Animated.View>
					);
				}}
			/>
			<LinearGradient
				colors={["rgba(0, 0, 0, 0)", "white"]}
				style={{
					height: BACKDROP_HEIGHT,
					width,
					position: "absolute",
					bottom: 0,
				}}
			/>
		</View>
	);
};

const MoviesCarousle = () => {
	// const [movies, setMovies] = React.useState([]);
	const [moviesList, setMoviesList] = React.useState([]);
	const [searchInput, setSearchInput] = React.useState("all");
	const scrollX = React.useRef(new Animated.Value(0)).current;

	const fetchMoviesDataBase = () => {
		fetch(
			`https://movie-database-imdb-alternative.p.rapidapi.com/?s=${searchInput}&r=json&page=1`,
			{
				method: "GET",
				headers: {
					"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
					"x-rapidapi-key":
						"e061fe5152mshb38542ae7c98ea5p137149jsnf82c641b1ee5",
				},
			}
		)
			.then(response => {
				return response.json();
			})
			.then(data => {
				const { Search } = data;

				setMoviesList([
					{ Poster: "empty-left" },
					...Search,
					{ Poster: "empty-right" },
				]);
				console.log(moviesList);
			})
			.catch(err => {
				console.error(err);
			});
	};

	React.useEffect(() => {
		fetchMoviesDataBase();
	}, [searchInput]);

	if (moviesList.length === 0) {
		return <Loading />;
	}

	return (
		<View style={styles.container}>
			{/* <Backdrop movies={movies} scrollX={scrollX} /> */}
			<StatusBar hidden />
			<View style={{ justifyContent: "center", alignItems: "center" }}>
				<TextInput
					style={styles.textInput}
					placeholder="Search Movie"
					onChangeText={text => setSearchInput(text)}
				/>
			</View>
			<Animated.FlatList
				showsHorizontalScrollIndicator={false}
				data={moviesList}
				keyExtractor={item => item.Poster}
				horizontal
				bounces={false}
				decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
				renderToHardwareTextureAndroid
				contentContainerStyle={{ alignItems: "center" }}
				snapToInterval={ITEM_SIZE}
				snapToAlignment="start"
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: false }
				)}
				scrollEventThrottle={16}
				renderItem={({ item, index }) => {
					if (item.Poster == "empty-left" || item.Poster == "empty-right")
						return <View style={{ width: EMPTY_ITEM_SIZE }} />;

					const inputRange = [
						(index - 2) * ITEM_SIZE,
						(index - 1) * ITEM_SIZE,
						index * ITEM_SIZE,
					];

					const translateY = scrollX.interpolate({
						inputRange,
						outputRange: [100, 50, 100],
						extrapolate: "clamp",
					});

					return (
						<View style={{ width: ITEM_SIZE }}>
							<Animated.View
								style={{
									marginHorizontal: SPACING,
									padding: SPACING * 2,
									alignItems: "center",
									transform: [{ translateY }],
									backgroundColor: "white",
									borderRadius: 34,
								}}
							>
								<Image
									source={{ uri: item.Poster }}
									style={styles.posterImage}
								/>
								<Text style={{ fontSize: 24 }} numberOfLines={1}>
									{item.Title}
								</Text>
								<Text style={{ fontSize: 12 }} numberOfLines={3}>
									{item.Year}
								</Text>
							</Animated.View>
						</View>
					);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	container: {
		flex: 1,
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
	},
	posterImage: {
		width: "100%",
		height: ITEM_SIZE * 1.2,
		resizeMode: "cover",
		borderRadius: 24,
		margin: 0,
		marginBottom: 10,
	},
	textInput: {
		width: 200,
		height: 40,
		borderWidth: 1,
		borderColor: "black",
		justifyContent: "flex-start",
		textAlign: "left",
		paddingRight: 10,
		alignItems: "flex-start",
		borderRadius: 10,
		marginTop: 20,
	},
});

export default MoviesCarousle;
