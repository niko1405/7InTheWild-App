import { Avatar } from "@react-native-material/core";
import { useSelector } from "react-redux";
import IonIcon from "react-native-vector-icons/Ionicons";
import { TouchableWithoutFeedback, View } from "react-native";

const CustomAvatar = ({
  uri,
  size = 80,
  personColor = undefined,
  borderWidth = 1.5,
  borderColor = undefined,
  style = {},
  imageContainerStyle = {},
  onPress = null,
}) => {
  const { darkMode } = useSelector((state) => state.settings);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        {uri?.length > 0 ? (
          <Avatar
            image={{ uri }}
            size={size}
            style={[
              {
                borderWidth,
                borderColor: borderColor || darkMode ? "white" : "black",
                overflow: "hidden",
              },
              style,
            ]}
            imageContainerStyle={[
              {
                justifyContent: "center",
                alignItems: "center",
              },
              imageContainerStyle,
            ]}
          />
        ) : (
          <Avatar
            icon={(props) => <IonIcon {...props} name="person" />}
            color={personColor || "#b6b6b6"}
            size={size}
            style={[
              {
                borderWidth,
                borderColor: borderColor || darkMode ? "white" : "black",
              },
              style,
            ]}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomAvatar;
