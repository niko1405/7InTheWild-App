import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
} from "@react-native-material/core";
import { View } from "react-native";
import { useSelector } from "react-redux";
import CustomText from "./CustomText";

const CustomDialog = ({
  error = true,
  headerTitle = "",
  headerTitleColor = "",
  onDismiss = (_) => {},
  visible = false,
  containerStyle = {},
  dividerStyle = {},
  dividerColor = "",
  message = "",
  messageStyle = {},
  messageColor = "",
  messageFontSize = 17,
  buttonTitle = "Ok",
  buttonVariant = "contained" || "text" || "outlined",
  buttonStyle = {},
  buttonTitleStyle = {},
  buttonColor = "#4b90ad",
  onPress = (_) => {},
  cancelButton = false,
  cancelVariant = "contained" || "text" || "outlined",
  cancelStyle = {},
  cancelTitleStyle = {},
  cancelColor = "gray",
  onCancelPress = (_) => {},
}) => {
  const { darkMode } = useSelector((state) => state.settings);

  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <View
        style={[
          {
            backgroundColor: darkMode ? "black" : "white",
            borderWidth: 1,
            borderColor: darkMode ? "white" : "black",
            padding: 5,
          },
          containerStyle,
        ]}
      >
        <CustomText
          title={headerTitle.length ? headerTitle : error ? "Fehler" : "Info"}
          color={
            headerTitleColor.length
              ? headerTitleColor
              : error
              ? "#994c40"
              : undefined
          }
        />
        <Divider
          color={dividerColor || "gray"}
          style={[{ marginTop: 5 }, dividerStyle]}
        />
        <DialogContent>
          <CustomText
            fontFamily="eroded2"
            title={message}
            style={[{ marginTop: 10, marginLeft: -10 }, messageStyle]}
            fontSize={messageFontSize}
            color={messageColor.length ? messageColor : undefined}
          />
        </DialogContent>
        <DialogActions>
          {cancelButton && (
            <Button
              title="Abbrechen"
              compact
              variant={cancelVariant}
              onPress={onCancelPress}
              style={cancelStyle}
              titleStyle={[
                { fontFamily: "header", fontSize: 18 },
                cancelTitleStyle,
              ]}
              color={cancelColor}
            />
          )}
          <Button
            title={buttonTitle}
            compact
            variant={buttonVariant}
            onPress={onPress}
            style={buttonStyle}
            titleStyle={[
              { fontFamily: "header", fontSize: 18 },
              buttonTitleStyle,
            ]}
            color={buttonColor}
          />
        </DialogActions>
      </View>
    </Dialog>
  );
};

export default CustomDialog;
