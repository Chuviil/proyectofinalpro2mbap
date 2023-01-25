import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import HorizontalContainer from "../components/HorizontalContainer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

const CertificateScreen = ({
  route: {
    params: { usuario },
  },
}) => {
  const animationRef = useRef(null);
  useEffect(() => {
    animationRef.current?.play();
    console.log("animationRef cambiado");
  }, [animationRef]);
  return (
    <View style={styles.container}>
      {usuario.yaVoto() ? (
        <>
          <HorizontalContainer>
            <Text style={{ fontWeight: "bold", marginRight: 5 }}>
              Nombre Completo:
            </Text>
            <Text>{usuario.obtenerNombreCompleto()}</Text>
          </HorizontalContainer>
        </>
      ) : (
        <>
          <LottieView
            source={require("../assets/mbnovoted.json")}
            autoPlay
            ref={animationRef}
            style={{ width: 350, height: 350 }}
          />
          <Text style={{ width: "65%", textAlign: "center", fontSize: 18 }}>
            Primero realiza tu votacion para visualizar tu certificado
          </Text>
        </>
      )}
    </View>
  );
};

export default CertificateScreen;
