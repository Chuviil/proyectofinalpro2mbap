import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import axios from "axios";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 5,
    width: "60%",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ddd",
    width: "60%",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    width: "60%",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

const RegisterScreen = ({ navigation }) => {
  const [cedula, setCedula] = useState();
  const [nombres, setNombres] = useState([]);
  const [apellidos, setApellidos] = useState([]);
  const [contrasenia, setContrasenia] = useState();
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [genero, setGenero] = useState("MASCULINO");
  const [dignidad, setDignidad] = useState("ALCALDE");
  const [parroquia, setParroquia] = useState("NANEGAL");
  const [loading, setLoading] = useState(false);
  const [esCandidato, setEsCandidato] = useState(false);
  const loadingAnimation = useRef(null);
  const insets = useSafeAreaInsets();
  const handleSubmit = () => {
    setLoading(true);
    const url = "https://proyectofinalprogii.onrender.com/api/personas/";
    const dataB = esCandidato
      ? {
          nombres,
          apellidos,
          fechaNacimiento,
          cedula,
          contrasenia,
          genero,
          parroquia,
          dignidad,
        }
      : {
          nombres,
          apellidos,
          fechaNacimiento,
          cedula,
          contrasenia,
          genero,
          parroquia,
        };
    const config = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      url,
      data: dataB,
    };
    console.log(dataB);
    axios(config)
      .then(() => {
        setLoading(false);
        navigation.goBack();
      })
      .catch(() => {
        setLoading(false);
        Alert.alert("Error", "Datos ingresados no validos");
      });
  };

  const fechaNacimientoChange = (e, selectedDate) => {
    console.log(`Selected Date: ${selectedDate}`);
    setFechaNacimiento(selectedDate);
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      mode: "date",
      onChange: fechaNacimientoChange,
      value: fechaNacimiento,
      is24Hour: true,
    });
  };

  useEffect(() => {
    console.log("changed loading");
    loadingAnimation.current?.play();
  }, [loading]);
  if (loading) {
    return (
      <View style={styles.container}>
        <LottieView
          autoPlay
          ref={loadingAnimation}
          autoSize
          source={require("../assets/mbloading.json")}
        />
      </View>
    );
  }
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TextInput
        placeholder="Cedula"
        keyboardType="numeric"
        value={cedula}
        onChangeText={setCedula}
        style={styles.input}
      />
      <TextInput
        placeholder="Nombres"
        value={nombres.join(" ")}
        onChangeText={(value) => {
          setNombres(value.split(" "));
        }}
        style={styles.input}
      />
      <TextInput
        placeholder="Apellidos"
        style={styles.input}
        value={apellidos.join(" ")}
        onChangeText={(value) => {
          setApellidos(value.split(" "));
        }}
      />
      <TouchableOpacity
        style={[
          styles.input,
          { flexDirection: "row", justifyContent: "space-between" },
        ]}
        onPress={showDatePicker}
      >
        <Text>{fechaNacimiento.toLocaleDateString()}</Text>
        <FontAwesomeIcon icon={faCalendar} />
      </TouchableOpacity>
      <View style={styles.picker}>
        <Picker
          selectedValue={genero}
          onValueChange={(seleccionado) => {
            setGenero(seleccionado);
          }}
        >
          <Picker.Item label="Masculino" value="MASCULINO" />
          <Picker.Item label="Femenino" value="FEMENINO" />
        </Picker>
      </View>
      <TextInput
        placeholder="Contraseña"
        value={contrasenia}
        onChangeText={setContrasenia}
        style={styles.input}
      />
      <View style={styles.picker}>
        <Picker
          selectedValue={parroquia}
          onValueChange={(seleccionado) => {
            setParroquia(seleccionado);
          }}
        >
          <Picker.Item label="Nanegal" value="NANEGAL" />
          <Picker.Item label="Pacto" value="PACTO" />
          <Picker.Item label="Gualea y Nanegalito" value="GUALEA_Y_NANEGALITO" />
          <Picker.Item label="El Condado" value="EL_CONDADO" />
          <Picker.Item label="Ponceano" value="PONCEANO" />
          <Picker.Item
            label="San Antonio de Pichincha"
            value="SAN_ANTONIO_DE_PICHINCHA"
          />
          <Picker.Item label="Nono" value="NONO" />
          <Picker.Item label="Cotocollao" value="COTOCOLLAO" />
          <Picker.Item label="Pomasqui" value="POMASQUI" />
          <Picker.Item label="Calacali" value="CALACALI" />
          <Picker.Item label="Comite del Pueblo" value="COMITE_DEL_PUEBLO" />
          <Picker.Item label="Carcelen" value="CARCELEN" />
          <Picker.Item label="Calderon" value="CALDERON" />
          <Picker.Item label="Llano Chico" value="LLANO_CHICO" />
          <Picker.Item label="Nayon" value="NAYON" />
          <Picker.Item label="Zambiza" value="ZAMBIZA" />
          <Picker.Item label="Puellaro" value="PUELLARO" />
          <Picker.Item label="Chavezpamba" value="CHAVEZPAMBA" />
          <Picker.Item label="Atahualpa" value="ATAHUALPA" />
          <Picker.Item label="San Jose de Minas" value="SAN_JOSE_DE_MINAS" />
          <Picker.Item
            label="Perucho y Guayllabamba"
            value="PERUCHO_Y_GUAYLLABAMBA"
          />
          <Picker.Item label="La Concepcion" value="LA_CONCEPCION" />
          <Picker.Item label="Mariscal Sucre" value="MARISCAL_SUCRE" />
          <Picker.Item label="Belisario Quevedo" value="BELISARIO_QUEVEDO" />
          <Picker.Item
            label="San Isidro del Inca"
            value="SAN_ISIDRO_DEL_INCA"
          />
          <Picker.Item label="Rumipamba" value="RUMIPAMBA" />
          <Picker.Item label="Kennedy" value="KENNEDY" />
          <Picker.Item label="Iniaquito" value="INIAQUITO" />
          <Picker.Item label="Centro Historico" value="CENTRO_HISTORICO" />
          <Picker.Item
            label="Cochapamba y Jipijapa"
            value="COCHAPAMBA_Y_JIPIJAPA"
          />
          <Picker.Item label="Puengasi" value="PUENGASI" />
          <Picker.Item label="San Juan" value="SAN_JUAN" />
          <Picker.Item
            label="La Libertad e Itchimbia"
            value="LA_LIBERTAD_E_ITCHIMBIA"
          />
          <Picker.Item label="Chilibulo" value="CHILIBULO" />
          <Picker.Item label="San Bartolo" value="SAN_BARTOLO" />
          <Picker.Item label="Chimbacalle" value="CHIMBACALLE" />
          <Picker.Item label="La Argelia" value="LA_ARGELIA" />
          <Picker.Item label="Solanda" value="SOLANDA" />
          <Picker.Item label="Lloa" value="LLOA" />
          <Picker.Item label="La Mena" value="LA_MENA" />
          <Picker.Item label="La Magdalena" value="LA_MAGDALENA" />
          <Picker.Item label="La Ferroviaria" value="LA_FERROVIARIA" />
          <Picker.Item label="Chillogallo" value="CHILLOGALLO" />
          <Picker.Item label="Guamani" value="GUAMANI" />
          <Picker.Item label="Quitumbe" value="QUITUMBE" />
          <Picker.Item label="Turubamba" value="TURUBAMBA" />
          <Picker.Item label="La Ecuatoriana" value="LA_ECUATORIANA" />
          <Picker.Item label="Conocoto" value="CONOCOTO" />
          <Picker.Item label="Pintag" value="PINTAG" />
          <Picker.Item label="Amaguania" value="AMAGUANIA" />
          <Picker.Item label="Alangasi" value="ALANGASI" />
          <Picker.Item
            label="Guangopolo y la Merced"
            value="GUANGOPOLO_Y_LA_MERCED"
          />
          <Picker.Item label="Tumbaco" value="TUMBACO" />
          <Picker.Item label="Cumbaya" value="CUMBAYA" />
          <Picker.Item label="Pifo" value="PIFO" />
          <Picker.Item label="Yaruqui" value="YARUQUI" />
          <Picker.Item label="El Quinche" value="EL_QUINCHE" />
          <Picker.Item label="Puembo" value="PUEMBO" />
          <Picker.Item label="Checa y Tababela" value="CHECA_Y_TABABELA" />
        </Picker>
      </View>
      <View
        style={{
          width: "60%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>Es candidato?</Text>
        <Checkbox value={esCandidato} onValueChange={setEsCandidato} />
      </View>
      {esCandidato && (
        <View style={styles.picker}>
          <Picker
            selectedValue={dignidad}
            onValueChange={(seleccionado) => {
              setDignidad(seleccionado);
            }}
          >
            <Picker.Item label="Alcalde" value="ALCALDE" />
            <Picker.Item label="Prefecto" value="PREFECTO" />
            <Picker.Item label="Concejal" value="CONCEJAL" />
          </Picker>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
