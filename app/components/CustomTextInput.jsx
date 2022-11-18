import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import IonIcon from "react-native-vector-icons/Ionicons";
import { Divider } from "@react-native-material/core";

const CustomTextInput = ({
  onChange = () => {},
  onSubmit = () => {},
  value = undefined,
  placeHolder,
  keyboardType = "default",
  textContentType = "name",
  style = {},
  placeholderTextColor = "",
  borderColor = "",
  password = false,
  width = undefined,
  contentContainerStyle = {},
  blurOnSubmit = true,
  maxLength = 70,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { darkMode } = useSelector((state) => state.settings);

  const handleChange = (text) => {
    !value && setInputValue(text);

    onChange(text);
  };

  const handleSubmit = ({ nativeEvent: { text } }) => {
    onSubmit(text);
    !value && setInputValue("");
  };

  return (
    <View>
      <View
        style={[
          {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            justifyContent: "space-between",
          },
          contentContainerStyle,
        ]}
      >
        <TextInput
          placeholder={placeHolder}
          keyboardType={keyboardType}
          maxLength={maxLength}
          onChangeText={handleChange}
          value={value || inputValue}
          textContentType={textContentType}
          textAlign="left"
          blurOnSubmit={blurOnSubmit}
          secureTextEntry={password ? !showPassword : false}
          style={[
            {
              width: !width ? (password ? 220 : 250) : width,
              fontFamily: "eroded2",
              fontSize: 20,
              padding: 5,
              color: darkMode ? "white" : "black",
            },
            style,
          ]}
          placeholderTextColor={
            placeholderTextColor.length
              ? placeholderTextColor
              : darkMode
              ? "white"
              : "black"
          }
          onSubmitEditing={handleSubmit}
        />
        {password && (
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <IonIcon
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color={darkMode ? "white" : "black"}
            />
          </TouchableOpacity>
        )}
      </View>
      <Divider
        color={borderColor.length ? borderColor : darkMode ? "white" : "black"}
        style={{ marginBottom: 15 }}
      />
    </View>
  );
};

export default CustomTextInput;
