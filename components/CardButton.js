import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    height: 180,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 4,
  },
});

const CardButton = ({
  card: { image, title, description, color },
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, {backgroundColor: color}]}>
      <Image source={image} style={{ height: 90, width: 90 }} />
      <Text style={styles.title}>{title}</Text>
      <Text>{description}</Text>
    </TouchableOpacity>
  );
};

export default CardButton;
