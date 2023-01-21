import { View, Button, Text, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import Usuario from "../classes/Usuario.class";
import CardButton from "../components/CardButton";

const cards = {
  vote: {
    image: require("../assets/votebtn.png"),
    title: "Votar",
    description: "Realiza tu votacion",
    color: "#09936e"
  },
  resultados: {
    image: require("../assets/resultsbtn.png"),
    title: "Resultados",
    description: "Revisa los resultados de las votaciones",
    color: "#f3eb66"
  },
  certificado: {
    image: require("../assets/certificadobtn.png"),
    title: "Certificado",
    description: "Visualiza tu certificado de votacion",
    color: "#f3eb66"
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

const VotingScreen = ({ route }) => {
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
        <CardButton card={cards.vote} onPress={handlePress} />
        <CardButton card={cards.resultados} onPress={handlePress} />
        <CardButton card={cards.certificado} onPress={handlePress} />
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

export default VotingScreen;
