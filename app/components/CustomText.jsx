import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const CustomText = ({
  title = "",
  style = {},
  darkmode = true,
  fontSize = 23,
  color = undefined,
  children,
  fontFamily = undefined,
  onPress = null,
  alignChildren = "left",
  childrenContainerStyle = {},
}) => {
  const { darkMode } = useSelector((state) => state.settings);

  const alignLeft = alignChildren === "left";

  return (
    <Text
      onPress={onPress}
      style={[
        fontFamily ? { fontFamily } : styles.font,
        style,
        !darkmode || color ? {} : { color: darkMode ? "#eaeaea" : "black" },
        { fontSize },
        color && { color },
      ]}
    >
      {alignLeft && <View style={childrenContainerStyle}>{children}</View>}
      {title}
      {!alignLeft && <View style={childrenContainerStyle}>{children}</View>}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  font: {
    fontFamily: "header",
  },
});
