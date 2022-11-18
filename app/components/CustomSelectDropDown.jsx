import { View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useSelector } from "react-redux";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";

import CustomText from "./CustomText";

const CustomSelectDropDown = ({
  title = "",
  defaultValue,
  defaultButtonText,
  setOnSelect = (_) => {},
  onSelect = (_) => {},
  titleFontStyle = 22,
  titleFontFamily = "header",
  data = [],
  dataNames = [],
  showBorder = true,
}) => {
  const { darkMode } = useSelector((state) => state.settings);

  return (
    <View
      style={{
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {title.length > 0 && (
        <CustomText
          title={title}
          fontSize={titleFontStyle}
          fontFamily={titleFontFamily}
          style={{ paddingRight: 10 }}
        />
      )}
      <SelectDropdown
        data={data}
        onSelect={(selectedItem, index) => {
          setOnSelect(dataNames?.length ? dataNames[index] : selectedItem);
          onSelect(dataNames?.length ? dataNames[index] : selectedItem);
        }}
        defaultButtonText={defaultButtonText}
        defaultValue={defaultValue}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        buttonStyle={{
          borderRadius: 10,
          borderWidth: showBorder ? 1.5 : 0,
          borderColor: darkMode ? "white" : "black",
          backgroundColor: "transparent",
          height: 40,
        }}
        buttonTextStyle={{
          color: darkMode ? "white" : "black",
          textAlign: "left",
          fontFamily: "eroded2",
          fontSize: 20,
        }}
        renderDropdownIcon={(isOpened) => {
          return (
            <AwesomeIcon
              name={isOpened ? "chevron-up" : "chevron-down"}
              color={darkMode ? "white" : "#444"}
              size={18}
            />
          );
        }}
        dropdownIconPosition={"right"}
        dropdownStyle={{
          borderRadius: 10,
          borderWidth: 1.5,
          borderColor: darkMode ? "white" : "black",
          backgroundColor: "transparent",
        }}
        rowStyle={{ backgroundColor: darkMode ? "black" : "white" }}
        rowTextStyle={{
          color: darkMode ? "white" : "black",
          textAlign: "left",
          fontFamily: "eroded2",
          fontSize: 20,
        }}
      />
    </View>
  );
};

export default CustomSelectDropDown;
