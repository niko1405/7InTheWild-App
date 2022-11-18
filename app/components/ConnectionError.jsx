import { View } from "react-native";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

import CustomText from "./CustomText";

const ConnectionError = ({
  title = "Keine Daten. Versuche es später erneut",
  containerStyle = {},
  titleStyle = {},
  iconStyle = {},
  iconSize = 25,
  iconColor = "#994c40",
  fontSize = 23,
  fontFamily = "eroded2",
}) => {
  return (
    <View
      style={[
        {
          displax: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        },
        containerStyle,
      ]}
    >
      <CommunityIcon
        name="wifi-off"
        size={iconSize}
        color={iconColor}
        style={[{ marginRight: 7 }, iconStyle]}
      />
      <CustomText
        title={title}
        fontFamily={fontFamily}
        fontSize={fontSize}
        style={titleStyle}
      />
    </View>
  );
};

export default ConnectionError;
