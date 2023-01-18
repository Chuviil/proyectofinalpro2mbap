import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

const VotingScreen = ({ route }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { data } = route.params;
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingRight: insets.right + 8,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left + 8,
        },
      ]}
    >
      <ScrollView>
        <Text style={styles.title}>{data.cedula.genero ? "Bienvenido" : "Bienvenida"},</Text>
        <Text style={{fontSize: 14}}>{data.cedula.nombre}</Text>
      </ScrollView>
      {/*<Button title={"UNSEEN"} onPress={()=>{dispatch({type: "UNSEEN"})}}/>*/}
    </View>
  );
};

export default VotingScreen;
