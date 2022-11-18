import { View } from "react-native";
import CustomText from "./CustomText";

const Section = ({ children, style, title, fontSize = 28 }) => {
  return (
    <View
      style={[
        style,
        { marginTop: 35, display: "flex", flexDirection: "column" },
      ]}
    >
      <CustomText
        style={{
          textDecorationLine: "underline",
          marginBottom: 10,
        }}
        fontSize={fontSize}
        title={title}
      />
      {children}
    </View>
  );
};

export default Section;
