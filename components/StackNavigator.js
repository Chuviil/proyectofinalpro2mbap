import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirstTimeScreen from "../screens/FirstTimeScreen";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LogInScreen from "../screens/LogInScreen";
import VotanteScreen from "../screens/VotanteScreen";
import CertificateScreen from "../screens/CertificateScreen";
import ResultsScreen from "../screens/ResultsScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CandidatoScreen from "../screens/CandidatoScreen";
import VotingScreen from "../screens/VotingScreen";
import InscribirseScreen from "../screens/InscribirseScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const firstTime = useSelector((state) => state.state);
  const [firstTimeValue, setFirstTimeValue] = useState(false);
  useEffect(() => {
    setFirstTimeValue(firstTime);
  }, [firstTime]);
  return (
      <Stack.Navigator>
        {!firstTimeValue ? (
            <>
              <Stack.Screen
                  name="FirstTime"
                  component={FirstTimeScreen}
                  options={{ headerShown: false }}
              />
            </>
        ) : (
            <>
              <Stack.Screen name="LogIn" component={LogInScreen} options={{headerShown: false}}/>
              <Stack.Screen name="Register" component={RegisterScreen} options={{title: "Registrarse"}}/>
              <Stack.Screen name="VotanteScreen" component={VotanteScreen} options={{headerShown: false}}/>
              <Stack.Screen name="VotingScreen" component={VotingScreen} options={{title: "Votar"}}/>
              <Stack.Screen name="Certificate" component={CertificateScreen} options={{title:"Certificado"}}/>
              <Stack.Screen name="Results" component={ResultsScreen} options={{title:"Resultados"}}/>
              <Stack.Screen name="CandidatoScreen" component={CandidatoScreen} options={{headerShown: false}}/>
              <Stack.Screen name="InscribirseScreen" component={InscribirseScreen} options={{title: "Inscribirse"}}/>
            </>
        )}
      </Stack.Navigator>
  );
}
