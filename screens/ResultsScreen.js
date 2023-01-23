import { Text, View } from "react-native";
import { useEffect, useState } from "react";

const fechaTest = new Date("2023-01-21T22:54:00").getTime();

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const ResultsScreen = () => {
  const [timeGap, setTimeGap] = useState(fechaTest - new Date().getTime());
  useEffect(() => {
    if (timeGap > 0) {
      console.log("time changing")
      let intervalId = setInterval(() => {
        const hoy = new Date().getTime();
        setTimeGap(fechaTest - hoy);
      }, 1000);
      return () => clearInterval(intervalId);
    }
    console.log("time hit 0")
  }, [timeGap]);
  return (
    <View>
      {timeGap > 0 ? (
        <>
          <Text>Dias: {Math.floor(timeGap / day)}</Text>
          <Text>Horas: {Math.floor((timeGap % day) / hour)}</Text>
          <Text>Minutos: {Math.floor((timeGap % hour) / minute)}</Text>
          <Text>Segundos: {Math.floor((timeGap % minute) / second)}</Text>
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
