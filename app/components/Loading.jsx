import { ActivityIndicator } from "@react-native-material/core";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import images from "../constants/images";
import CustomText from "./CustomText";

const Loading = ({
  color = undefined,
  title = "",
  containerStyle = {},
  titleStyle = {},
  size = 25,
  fontSize = 21,
  fontFamily = "header",
  titleColor = undefined,
  fullScreen = false,
}) => {
  const { darkMode } = useSelector((state) => state.settings);

  if (fullScreen) {
    return (
      <ImageBackground source={images.banner} style={styles.container}>
        <Image style={styles.logo} source={images.logoStaffel1} />
        <View style={styles.loading}>
          <ActivityIndicator
            size={30}
            color="white"
            style={{ marginBottom: 20 }}
          />
          <CustomText title="Lade Daten.." color="white" fontSize={23} />
        </View>
      </ImageBackground>
    );
  }

  return (
    <View
      style={[
        {
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        },
        containerStyle,
      ]}
    >
      <ActivityIndicator
        size={size}
        color={color || darkMode ? "white" : "black"}
        style={title.length > 0 && { marginRight: 5 }}
      />
      {title.length > 0 && (
        <CustomText
          fontFamily={fontFamily}
          fontSize={fontSize}
          color={titleColor || darkMode ? "white" : "black"}
          style={titleStyle}
          title={title}
        />
      )}
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 200,
    width: 350,
    position: "absolute",
    top: 100,
  },
  loading: {
    display: "flex",
    alignItems: "center",
    marginTop: 40,
  },
});
