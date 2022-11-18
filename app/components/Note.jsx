import { View } from "react-native";
import { useSelector } from "react-redux";
import FeatherIcon from "react-native-vector-icons/Feather";

import CustomText from "./CustomText";

const Note = ({
  title = "",
  containerStyle = {},
  titleStyle = {},
  titleFontSize = 13,
  titleFontFamily = "eroded2",
  titleColor = undefined,
  iconColor = undefined,
  iconSize = 15,
}) => {
  const { darkMode } = useSelector((state) => state.settings);

  return (
    <View
      style={[
        {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        },
        containerStyle,
      ]}
    >
      <FeatherIcon
        name="info"
        size={iconSize}
        color={iconColor ? iconColor : darkMode ? "white" : "black"}
        style={{ marginRight: 5 }}
      />
      <CustomText
        color={titleColor ? titleColor : darkMode ? "white" : "black"}
        fontSize={titleFontSize}
        fontFamily={titleFontFamily}
        title={title}
        style={titleStyle}
      />
    </View>
  );
};

export default Note;
