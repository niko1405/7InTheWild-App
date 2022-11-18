import { View, ImageBackground } from "react-native";
import { useSelector } from "react-redux";
import "moment/locale/de";

import Note from "../../components/Note";
import MessageContainer from "../../components/MessageContainer";
import images from "../../constants/images";
import { loadChatSettings } from "../../constants/helperFunctions";

const ChatScreen = ({ navigation }) => {
  const { darkMode, chatSettings } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.user);

  const { fontStyle, isDefaultTheme } = loadChatSettings(chatSettings);

  const handleClickUserName = (profileId) => {
    navigation.navigate("ChatProfileStack", {
      screen: "Profile",
      params: {
        profileId,
      },
    });
  };

  return (
    <View
      style={{
        display: "flex",
        padding: 0,
        backgroundColor: darkMode ? "black" : "white",
        position: "relative",
        flex: 1,
        overflowY: "scroll",
        position: "relative",
      }}
    >
      <ImageBackground
        source={images.banner2}
        resizeMode="cover"
        style={{
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!user?.userName && (
          <Note
            title="Du bist für andere als Unbekannt sichtbar"
            containerStyle={{ marginTop: 30 }}
            titleColor="white"
            iconColor="white"
          />
        )}
      </ImageBackground>
      <MessageContainer
        chatId="globalChat"
        fontStyle={fontStyle}
        isDefaultTheme={isDefaultTheme}
        globalChat
        onClickUserName={handleClickUserName}
      />
    </View>
  );
};

export default ChatScreen;
