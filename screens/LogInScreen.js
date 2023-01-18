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

const LogInScreen = ({ navigation }) => {
  const [cedula, setCedula] = useState();
  const [loading, setLoading] = useState(false);
  const loadingAnimation = useRef(null);
  const insets = useSafeAreaInsets();
  const handleSubmit = () => {
    setLoading(true);
    const url =
      "https://proyectofinalprogii.onrender.com/api/usuarios/" + cedula;
    axios
      .get(url)
      .then((response) => {
        setLoading(false);
        const data = response.data;
        navigation.replace("Voting", { data });
        console.log(data);
      })
      .catch(() => {
        setLoading(false);
        Alert.alert("Error", "Esta cedula no esta registrada en el sistema.");
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
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogInScreen;
