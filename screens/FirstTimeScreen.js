import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Slide from "../components/Slide";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faArrowRight, faUsersRays } from "@fortawesome/free-solid-svg-icons";

const slides = [
  {
    animation: require("../assets/mbvote.json"),
    title: "Votacion Online",
    description:
      "Realiza tu votacion online desde la aplicación movil y evita salir de casa.",
  },
  {
    animation: require("../assets/mbsecurity.json"),
    title: "Votacion Segura",
    description:
      "Tu votacion es secreta y ni siquiera nosotros podremos verla, todos tus datos esta encriptados.",
  },
  {
    animation: require("../assets/mbresults.json"),
    title: "Resultados",
    description:
      "Una vez finalizada la votacion podras visualizar los resultados en la aplicacion movil.",
  },
];

function FirstTimeScreen() {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);
  const prev = slides[index - 1];
  const next = slides[index + 1];
  const handleSeen = () => {
    dispatch({ type: "SEEN" });
  };
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Slide slide={slides[index]}></Slide>
      {prev && (
        <TouchableOpacity
          style={styles.anteriorbtn}
          onPress={() => {
            setIndex(index - 1);
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <Text style={{ marginLeft: 5 }}>Anterior</Text>
        </TouchableOpacity>
      )}
      {next && (
        <TouchableOpacity
          style={styles.siguientebtn}
          onPress={() => {
            setIndex(index + 1);
          }}
        >
          <Text style={{ marginRight: 5 }}>Siguiente</Text>
          <FontAwesomeIcon icon={faArrowRight} />
        </TouchableOpacity>
      )}
      {!next && (
        <TouchableOpacity style={styles.siguientebtn} onPress={handleSeen}>
          <Text style={{marginRight: 5}}>Empezar</Text>
          <FontAwesomeIcon icon={faUsersRays} />
        </TouchableOpacity>
      )}
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
  siguientebtn: {
    position: "absolute",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    bottom: 20,
    right: 20,
  },
  anteriorbtn: {
    position: "absolute",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    bottom: 20,
    left: 20,
  },
});

export default FirstTimeScreen;
