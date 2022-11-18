import { Image, ImageBackground, StyleSheet, View } from "react-native";

import images from "../constants/images";
import CustomText from "./CustomText";

const NetworkError = ({
  title = "Internet-Verbindung ist abgebrochen",
  image = images.noWifi,
}) => {
  return (
    <ImageBackground source={images.banner} style={styles.container}>
      <Image style={styles.logo} source={images.logoStaffel1} />
      <Image style={styles.noWifi} source={image} />
      <View style={styles.textContainer}>
        <CustomText title={title} color="#934F5F" fontSize={19} />
      </View>
    </ImageBackground>
  );
};

export default NetworkError;

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
  noWifi: {
    marginTop: 60,
    marginBottom: 20,
    height: 80,
    width: 80,
  },
  textContainer: {
    padding: 15,
  },
});
