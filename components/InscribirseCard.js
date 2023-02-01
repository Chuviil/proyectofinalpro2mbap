import {
  Button,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

const InscribirseCard = ({ nombrePartido, numeroLista, onPress, disponible }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", margin: 15 }}>
      <Text style={styles.title}>{nombrePartido}</Text>
      <Text style={{ fontSize: 18 }}>{numeroLista}</Text>
      <Button title={"Inscribirse"} onPress={onPress} disabled={!disponible()}/>
    </View>
  );
};

export default InscribirseCard;
