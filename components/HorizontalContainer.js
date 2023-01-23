import { View } from "react-native";

const HorizontalContainer = ({ children }) => {
  return <View style={{ flexDirection: "row" }}>{children}</View>;
};

export default HorizontalContainer;
