import { View } from "react-native";

const VerticalContainer = ({ children }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {children}
    </View>
  );
};

export default VerticalContainer;
