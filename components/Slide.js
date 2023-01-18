import { Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: "5%",
  },
});

const Slide = ({ slide: { animation, title, description } }) => {
  return (
    <>
      <LottieView autoPlay source={animation} style={{width: 400, height: 400}} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </>
  );
};

export default Slide;
