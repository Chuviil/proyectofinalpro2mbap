import { Alert, StyleSheet, Text, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import axios from "axios";
import Lista from "../classes/Lista.class";
import InscribirseCard from "../components/InscribirseCard";
import Eleccion from "../classes/Eleccion.class";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const InscribirseScreen = ({
  navigation,
  route: {
    params: { usuario },
  },
}) => {
  const [eleccion, setEleccion] = useState(new Eleccion());
  const [timeGap, setTimeGap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listas, setListas] = useState(null);
  const loadingAnimation = useRef(null);

  useEffect(() => {
    console.log("changedLoading");
    if (loading) {
      loadingAnimation.current?.play();
      if (listas === null) {
        let url = "https://proyectofinalprogii.onrender.com/api/listas";
        let config = {
          method: "GET",
          url,
        };
        axios(config)
          .then((response) => {
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
          })
          .catch((e) => {
            console.log(e);
          });

        url = "https://proyectofinalprogii.onrender.com/api/elecciones/";
        config = {
          method: "GET",
          url,
        };
        axios(config)
          .then((response) => {
            const { fechaInicio } = response.data;
            eleccion.establecerFechaInicio(new Date(fechaInicio));
            console.log(eleccion);
            setTimeGap(
              eleccion.obtenerFechaInicio().getTime() - new Date().getTime()
            );
          })
          .catch(() => {});
        setLoading(false);
      }
    }
  }, [loading]);

  if (loading) {
    return (
      <View style={styles.container}>
        <LottieView
          autoPlay
          autoSize
          ref={loadingAnimation}
          source={require("../assets/mbloading.json")}
        />
      </View>
    );
  }

  if (usuario.obtenerLista() !== null) {
    return (
      <View style={styles.container}>
        <LottieView
          autoPlay
          autoSize
          source={require("../assets/mbvote.json")}
          // TODO Modificar animacion a ya voto
        />
        <Text style={{ width: "65%", textAlign: "center" }}>
          Ya estas registrado en un partido dirigete a Informacion Lista para
          visualizar informacion de tu partido.
        </Text>
      </View>
    );
  }

  if (timeGap <= 0 && timeGap!== null) {
    return (
      <View style={styles.container}>
        <LottieView
          autoPlay
          autoSize
          source={require("../assets/mbvote.json")}
          // TODO Modificar animacion a ya voto
        />
        <Text style={{ width: "65%", textAlign: "center" }}>
          El tiempo de inscripcion ya finalizo.
        </Text>
      </View>
    );
  }

  const handleInscribirse = (lista) => {
    setLoading(true);
    const config = {
      method: "PATCH",
      url: `https://proyectofinalprogii.onrender.com/api/personas/candidato/${usuario.obtenerCedula()}`,
      params: { numero: lista },
    };
    console.log(config);
    axios(config)
      .then(() => {
        Alert.alert(
          "Exito!",
          "Gracias por inscribirte a tu partido, vuelve a iniciar sesion"
        );
        navigation.replace("LogIn");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      {listas?.map((lista) => {
        return (
          <InscribirseCard
            key={lista.numero}
            nombrePartido={lista.obtenerNombrePartido()}
            numeroLista={lista.obtenerNumero()}
            disponible={() => {
              switch (usuario.obtenerTipoDignidad()) {
                case "ALCALDE":
                  return lista.puedeInscribirseAlcalde();
                case "PREFECTO":
                  return lista.puedeInscribirsePrefecto();
                case "CONCEJAL":
                  return lista.puedeInscribirseConcejal();
              }
            }}
            onPress={() => {
              handleInscribirse(lista.obtenerNumero());
            }}
          />
        );
      })}
    </View>
  );
};

export default InscribirseScreen;
