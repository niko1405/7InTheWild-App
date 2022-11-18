import { View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";

import CustomText from "./CustomText";

const EmptyContent = ({
  title = "",
  containerStyle = {},
  titleStyle = {},
  iconStyle = {},
  iconSize = 28,
  fontFamily = "header",
  fontSize = 20,
  iconColor = undefined,
  titleColor = undefined,
}) => {
  const { darkMode } = useSelector((state) => state.settings);

  return (
    <View
      style={[
        { justifyContent: "center", alignItems: "center", marginTop: 5 },
        containerStyle,
      ]}
    >
      <FontAwesome
        name="inbox"
        size={iconSize}
        color={iconColor || darkMode ? "white" : "black"}
        style={iconStyle}
      />
      {title.length > 0 && (
        <CustomText
          title={title}
          style={[{ marginTop: 5 }, titleStyle]}
          fontSize={fontSize}
          fontFamily={fontFamily}
          color={titleColor}
        />
      )}
    </View>
  );
};

export default EmptyContent;
