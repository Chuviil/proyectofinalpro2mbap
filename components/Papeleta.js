import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import Candidato from "../classes/Candidato.class";

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

const Papeleta = ({
  nombrePartido,
  dignidad,
  dignidades,
  seleccionado,
  numeroLista,
  onPress,
}) => {
  const [dignidadObj, setDignidadObj] = useState(null);
  const [dignidadesObjs, setDignidadesObjs] = useState(null);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ flex: 1, alignItems: "center", margin: 15 }}>
        <Text style={styles.title}>{nombrePartido}</Text>
        <Text style={{ fontSize: 18 }}>{numeroLista}</Text>
        {dignidad && (
          <Text>
            {dignidad.nombres.join(" ") + " " + dignidad.apellidos.join(" ")}
          </Text>
        )}
        <Checkbox value={seleccionado} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Papeleta;
