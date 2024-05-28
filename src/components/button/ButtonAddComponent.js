import { Text } from "@rneui/themed";
import { TouchableHighlight, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ButtonAddComponent({ navigateTo, titleBtn }) {
  return (
    <TouchableHighlight
      onPress={navigateTo}
      style={{ backgroundColor: "#EF6C32" }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Ionicons
          name="basketball"
          size={15}
          color="#FF9A62"
          style={{ marginRight: 5 }}
        />
        <Text
          style={{ fontWeight: "bold", color: "white", letterSpacing: 0.5 }}
        >
          {titleBtn}
        </Text>
      </View>
    </TouchableHighlight>
  );
}
