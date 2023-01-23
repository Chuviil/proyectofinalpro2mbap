import { View, Button, Text, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import Usuario from "../classes/Usuario.class";
import CardButton from "../components/CardButton";

const cards = {
  vote: {
    SVG: require("../assets/votesvgbtn.svg").default,
    title: "Votar",
    description: "Realiza tu votacion",
    color: "#09936e",
  },
  resultados: {
    SVG: require("../assets/resultsvgbtn.svg").default,
    title: "Resultados",
    description: "Revisa los resultados de las votaciones",
    color: "#f3eb66",
  },
  certificado: {
    SVG: require("../assets/certificatesvgbtn.svg").default,
    title: "Certificado",
    description: "Visualiza tu certificado de votacion",
    color: "#4653cb",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: "bold",
  },
  btnContainer:{
    marginTop: 25,
  }
});

const MainScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {
    data: {
      nombres,
      apellidos,
      cedula,
      candidato,
      fechaNacimiento,
      genero,
      voto,
      contrasenia,
    },
  } = route.params;
  const usuario = new Usuario(
    nombres,
    apellidos,
    cedula,
    candidato,
    fechaNacimiento,
    genero,
    voto,
    contrasenia
  );
  const handlePress = () => {
    console.log("Votar Screen");
  };
  const handleCertificatePress = () => {
    navigation.navigate("Certificate", {usuario})
  }
  const handleResultPress = () => {
    navigation.navigate("Results", {usuario})
  }
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingRight: insets.right + 8,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left + 8,
        },
      ]}
    >
      <ScrollView>
        <Text style={styles.title}>
          {usuario.genero ? "Bienvenido" : "Bienvenida"},
        </Text>
        <Text style={{ fontSize: 14 }}>{usuario.obtenerNombreCompleto()}</Text>
        <View style={styles.btnContainer}>
          <CardButton card={cards.vote} onPress={handlePress} />
          <CardButton card={cards.resultados} onPress={handleResultPress} />
          <CardButton card={cards.certificado} onPress={handleCertificatePress} />
        </View>
      </ScrollView>
      <Button
        title={"UNSEEN"}
        onPress={() => {
          dispatch({ type: "UNSEEN" });
        }}
      />
    </View>
  );
};

export default MainScreen;
