import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Papeleta from "../components/Papeleta";
import { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import axios from "axios";
import Lista from "../classes/Lista.class";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const VotingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [listas, setListas] = useState();
  const [alcaldeSeleccionado, setAlcaldeSeleccionado] = useState(null);
  const loadingAnimation = useRef(null);
  useEffect(() => {
    console.log("changed loading");
    if (loading) {
      loadingAnimation.current?.play();
      const url = "https://proyectofinalprogii.onrender.com/api/listas";
      const config = {
        method: "GET",
        url,
      };
      axios(config).then((response) => {
        const listasData = response.data;
        const listasObj = listasData.map((lista) => {
          const {
            nombrePartido,
            numero,
            candidatoAlcalde,
            candidatoPrefecto,
            candidatosConsejal,
          } = lista;
          const listaObj = new Lista(nombrePartido, numero);
          listaObj.establecerCandidatoAlcalde(candidatoAlcalde);
          listaObj.establecerCandidatoPrefecto(candidatoPrefecto);
          candidatosConsejal.forEach((concejal) => {
            listaObj.agregarConcejal(concejal);
          });
          return listaObj;
        });
        setListas(listasObj);
        setLoading(false);
      });
    }
  }, [loading]);
  if (loading) {
    return (
      <View style={styles.container}>
        <LottieView
          autoPlay
          autoSize
          source={require("../assets/mbloading.json")}
        />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      {listas?.map((lista) => {
        console.log("rerender")
        return (
          <Papeleta
            key={lista.numero}
            nombrePartido={lista.obtenerNombrePartido()}
            numeroLista={lista.obtenerNumero()}
            seleccionado={alcaldeSeleccionado === lista.obtenerNumero()}
            onPress={() => {
              setAlcaldeSeleccionado(lista.obtenerNumero());
            }}
            dignidad={lista.obtenerCandidatoAlcalde()}
          />
        );
      })}
      <TouchableOpacity style={{ position: "absolute", bottom: 20, right: 20 }}>
        <Text>Siguiente Papeleta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VotingScreen;
