import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirstTimeScreen from "../screens/FirstTimeScreen";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LogInScreen from "../screens/LogInScreen";
import MainScreen from "../screens/MainScreen";
import CertificateScreen from "../screens/CertificateScreen";
import ResultsScreen from "../screens/ResultsScreen";

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
              <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}}/>
              <Stack.Screen name="Certificate" component={CertificateScreen} options={{title:"Certificado"}}/>
              <Stack.Screen name="Results" component={ResultsScreen} options={{title:"Resultados"}}/>
            </>
        )}
      </Stack.Navigator>
  );
}
