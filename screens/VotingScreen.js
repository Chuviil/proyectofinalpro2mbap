import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

const VotingScreen = ({
  navigation,
  route: {
    params: { usuario },
  },
}) => {
  const [loading, setLoading] = useState(true);
  const [listas, setListas] = useState(null);
  const [alcaldeSeleccionado, setAlcaldeSeleccionado] = useState(null);
  const [prefectoSeleccionado, setPrefectoSeleccionado] = useState(null);
  const [listaconcejalesSeleccionado, setListaConcejalesSeleccionada] =
    useState(null);
  const [papeletaAMostrar, setPapeletaAMostrar] = useState(1);
  const loadingAnimation = useRef(null);
  useEffect(() => {
    console.log("changed loading");
    if (loading) {
      loadingAnimation.current?.play();
      if (listas === null) {
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
    }
  }, [loading]);

  const handleSiguienteBtn = () => {
    if (papeletaAMostrar >= 3) return;
    setPapeletaAMostrar(papeletaAMostrar + 1);
  };

  const handleAnteriorBtn = () => {
    if (papeletaAMostrar <= 1) return;
    setPapeletaAMostrar(papeletaAMostrar - 1);
  };

  const handleFinalizarVotacion = () => {
    setLoading(true);
    const url =
      "https://proyectofinalprogii.onrender.com/api/votosElectronicos";
    const body = {
      candidatoAlcalde:
        alcaldeSeleccionado > 0
          ? listas[alcaldeSeleccionado - 1].obtenerCandidatoAlcalde()?.cedula
          : null,
      candidatoPrefecto:
        prefectoSeleccionado > 0
          ? listas[alcaldeSeleccionado - 1].obtenerCandidatoPrefecto()?.cedula
          : null,
      listaConsejales:
        listaconcejalesSeleccionado > 0 ? listaconcejalesSeleccionado : null,
      fechaVotacion: new Date(),
      parroquia: usuario.obtenerParroquia(),
    };
    const config = {
      method: "POST",
      url,
      data: body,
    };
    axios(config)
      .then(async () => {
        await axios({
          method: "POST",
          url: `https://proyectofinalprogii.onrender.com/api/votosElectronicos/${usuario.obtenerCedula()}`,
        }).catch(() => {
          console.log("No se pudo modificar el estado de votacion del usuario");
        });
        Alert.alert(
          "Exito!",
          "Gracias, vuelve a iniciar sesion para visualizar tu certificado de votacion o para revisar los resultados"
        );
        navigation.replace("LogIn");
      })
      .catch(() => {});
  };

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

  if (!usuario.puedeVotar()) {
    return (
      <View style={styles.container}>
        <LottieView
          autoPlay
          autoSize
          source={require("../assets/mbvote.json")}
          // TODO Modificar animacion a ya voto
        />
        <Text style={{width: "65%", textAlign: "center"}}>
          Ya realizaste tu votacion ahora dirigete a certificado o resultados
        </Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      {papeletaAMostrar === 1 &&
        listas?.map((lista) => {
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
      {papeletaAMostrar === 2 &&
        listas?.map((lista) => {
          return (
            <Papeleta
              key={lista.numero}
              nombrePartido={lista.obtenerNombrePartido()}
              numeroLista={lista.obtenerNumero()}
              seleccionado={prefectoSeleccionado === lista.obtenerNumero()}
              onPress={() => {
                setPrefectoSeleccionado(lista.obtenerNumero());
              }}
              dignidad={lista.obtenerCandidatoAlcalde()}
            />
          );
        })}
      {papeletaAMostrar === 3 &&
        listas?.map((lista) => {
          return (
            <Papeleta
              key={lista.numero}
              nombrePartido={lista.obtenerNombrePartido()}
              numeroLista={lista.obtenerNumero()}
              seleccionado={
                listaconcejalesSeleccionado === lista.obtenerNumero()
              }
              onPress={() => {
                setListaConcejalesSeleccionada(lista.obtenerNumero());
              }}
              dignidad={lista.obtenerCandidatoAlcalde()}
            />
          );
        })}
      {papeletaAMostrar <= 2 && (
        <TouchableOpacity
          onPress={handleSiguienteBtn}
          style={{ position: "absolute", bottom: 20, right: 20 }}
        >
          <Text>Siguiente Papeleta</Text>
        </TouchableOpacity>
      )}
      {papeletaAMostrar > 1 && (
        <TouchableOpacity
          onPress={handleAnteriorBtn}
          style={{ position: "absolute", bottom: 20, left: 20 }}
        >
          <Text>Siguiente Papeleta</Text>
        </TouchableOpacity>
      )}
      {papeletaAMostrar === 3 && (
        <TouchableOpacity
          style={{ position: "absolute", bottom: 20, right: 20 }}
          onPress={handleFinalizarVotacion}
        >
          <Text>Finalizar Votacion</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VotingScreen;
