import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { useLocalSearchParams } from "expo-router";

// Import local background image
import bgImage from "../assets/images/background.png";  

export default function ResultScreen() {
    const { image, result } = useLocalSearchParams();
    const parsedResult = JSON.parse(result); // Convert JSON string to object

    return (
        <ImageBackground source={bgImage} style={styles.background} resizeMode="cover">
            <View style={styles.overlay}>
                <Text style={styles.title}>Prediction Result</Text>

                <Image source={{ uri: image }} style={styles.image} />

                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}> Quality: <Text style={styles.bold}>{parsedResult["Predicted Quality"]}</Text></Text>
                    <Text style={styles.resultText}> Confidence: <Text style={styles.bold}>{parsedResult["Confidence Score"]}</Text></Text>
                </View>

                {/* Separate Decision Box */}
                <View style={styles.decisionBox}>
                    <Text style={styles.decisionText}>DECISION:</Text>
                    <Text style={styles.decision}>{parsedResult["Decision"]}</Text>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        backgroundColor: "rgba(255, 255, 255, 0)",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#000800",
        bottom:50,
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 15,
        marginBottom: 20,
    },
    resultContainer: {
        width: "100%",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        elevation: 5,
        alignItems: "center",
        bottom: 270,
    },
    resultText: {
        fontSize: 18,
        color: "rgba(0, 0, 0, 0.98)",
        marginBottom: 5,
    },
    decisionBox: {
        backgroundColor: "#f4a261", // Warm color for attention
        paddingVertical: 20, // More height for spaciousness
        paddingHorizontal: 30, // More width for better readability
        borderRadius: 15, // Rounded corners
        marginTop: -180, // Adjust position
        alignItems: "center",
        width: "85%", // Increase width
        bottom:60,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    decisionText: {
        fontSize: 24, 
        fontWeight: "bold",
        color: "#fff", // White for contrast
        letterSpacing: 1.5, // Adds spacing between letters
        textTransform: "uppercase", // Makes it bold and clear
    },
    decision: {
        fontSize: 10, 
        fontWeight: "600",
        color: "#000", // Darker text for contrast
        textAlign: "center",
        paddingTop: 5, // Adds some space between heading and text
        lineHeight: 28, // Increases spacing between lines
    },
    
    bold: {
        fontWeight: "bold",
        color: "#000",
    },
});
