import { Text, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import VerticalContainer from "../components/VerticalContainer";
import HorizontalContainer from "../components/HorizontalContainer";
import Eleccion from "../classes/Eleccion.class";

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const styles = StyleSheet.create({
  numbers: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

const ResultsScreen = ({ route }) => {
  const {
    data: { fechaInicio, fechaFin, votosElectronicos },
  } = route.params;
  const eleccion = new Eleccion();
  eleccion.establecerFechaInicio(new Date(fechaInicio));
  eleccion.establecerFechaFin(new Date(fechaFin));
  votosElectronicos.forEach((votoElectronico) => {/*TODO crear clase votoElectronico y añadir f*/})
  const [timeGap, setTimeGap] = useState(eleccion.obtenerFechaFin().getTime() - new Date().getTime());
  useEffect(() => {
    if (timeGap > 0) {
      let intervalId = setInterval(() => {
        const hoy = new Date().getTime();
        setTimeGap(eleccion.obtenerFechaFin().getTime() - hoy);
      }, 1000);
      return () => clearInterval(intervalId);
    }
    console.log("timer hit 0");
  }, [timeGap]);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {timeGap > 0 ? (
        <>
          <Text style={{ marginBottom: 25, width: "75%", textAlign: "center" }}>
            Podras revisar los resultados una vez finalize el proceso electoral
          </Text>
          <HorizontalContainer>
            <VerticalContainer>
              <Text style={styles.numbers}>{Math.floor(timeGap / day)}</Text>
              <Text>Dias</Text>
            </VerticalContainer>
            <VerticalContainer>
              <Text style={styles.numbers}>
                {Math.floor((timeGap % day) / hour)}
              </Text>
              <Text>Horas</Text>
            </VerticalContainer>
            <VerticalContainer>
              <Text style={styles.numbers}>
                {Math.floor((timeGap % hour) / minute)}
              </Text>
              <Text>Minutos</Text>
            </VerticalContainer>
            <VerticalContainer>
              <Text style={styles.numbers}>
                {Math.floor((timeGap % minute) / second)}
              </Text>
              <Text>Segundos</Text>
            </VerticalContainer>
          </HorizontalContainer>
        </>
      ) : (
        <>
          <Text>Resultados</Text>
        </>
      )}
    </View>
  );
};

export default ResultsScreen;
