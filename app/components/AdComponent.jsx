import { StyleSheet, View } from "react-native";
import CustomText from "./CustomText";

const AdComponent = ({
  containerStyle = {},
  titleStyle = {},
  AdElement,
  showText = true,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {showText && (
        <View style={styles.textContainer}>
          <CustomText
            childrenContainerStyle={titleStyle}
            fontFamily="eroded2"
            title="Anzeige"
            style={{ position: "absolute", right: 20, top: 0 }}
            fontSize={14}
          />
        </View>
      )}
      {AdElement}
    </View>
  );
};

export default AdComponent;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  textContainer: {
    width: "100%",
    marginBottom: 20,
  },
});
