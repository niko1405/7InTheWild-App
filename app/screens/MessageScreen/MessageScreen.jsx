import { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";

import CustomText from "../../components/CustomText";
import Loading from "../../components/Loading";
import images from "../../constants/images";
import { loadChatSettings } from "../../constants/helperFunctions";
import MessageContainer from "../../components/MessageContainer";
import React from "react";
import {
  removeLatestMessagesAction,
  searchChatAction,
} from "../../features/chat/chatActions";

const MessageScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const profileId = route?.params?.profileId;
  const chatId = route?.params?.chatId;

  const { user } = useSelector((state) => state.user);
  const { darkMode, chatSettings } = useSelector((state) => state.settings);
  const { chat } = useSelector((state) => state.chat);

  const [loading, setLoading] = useState(
    user?._id && profileId && !chatId ? true : false
  );

  const renderContainer = (chatId || profileId) && user?._id ? true : false;

  useFocusEffect(
    React.useCallback(() => {
      if (user?._id && profileId && !chatId) {
        if (!loading) setLoading(true);
        dispatch(
          searchChatAction([user?._id, profileId], () => setLoading(false))
        );
      }

      //delete latestMessages
      if (user && chatId) {
        if (user.latestMessages.filter((msg) => msg.chatId === chatId).length)
          dispatch(removeLatestMessagesAction(user._id, chatId));
      }
    }, [])
  );

  const { fontStyle, isDefaultTheme } = loadChatSettings(chatSettings);

  const handleClickUserName = (profileId) => {
    navigation.navigate("MessageProfileStack", {
      screen: "Profile",
      params: {
        profileId,
      },
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: darkMode ? "black" : "white",
        },
      ]}
    >
      <ImageBackground
        source={images.banner2}
        resizeMode="cover"
        style={styles.imageBg}
      />
      {loading ? (
        <Loading size={25} containerStyle={{ marginTop: 20 }} />
      ) : renderContainer ? (
        <MessageContainer
          chatId={chatId || chat?.chatId}
          fontStyle={fontStyle}
          isDefaultTheme={isDefaultTheme}
          participants={[profileId, user._id]}
          onClickUserName={handleClickUserName}
        />
      ) : (
        <View style={styles.errorContainer}>
          <MaterialIcon name="error-outline" size={27} color="#994c40" />
          <CustomText
            title="Ein Fehler ist aufgetreten, bitte versuche es erneut."
            fontFamily="eroded2"
            fontSize={19}
            style={{ marginLeft: 5 }}
          />
        </View>
      )}
    </View>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  imageBg: {
    height: 70,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  container: {
    display: "flex",
    padding: 0,
    position: "relative",
    flex: 1,
  },
});
