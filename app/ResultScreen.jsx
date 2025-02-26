import { View, Text, Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ResultScreen() {
    const { image, result } = useLocalSearchParams(); // Get params

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Prediction Result</Text>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.resultText}>{result}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    resultText: {
        fontSize: 18,
        textAlign: "center",
    },
});
