import { Divider } from "@react-native-material/core";
import React, { useState } from "react";
import {
  Easing,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BottomDrawer from "react-native-modalbox";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import "moment/locale/de";
import Toast from "react-native-tiny-toast";
import * as toast from "../../constants/toastOptions";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import CustomText from "../../components/CustomText";
import EmptyContent from "../../components/EmptyContent";
import Loading from "../../components/Loading";
import images from "../../constants/images";
import CustomAvatar from "../../components/CustomAvatar";
import { Button, Dialog, Portal, Searchbar } from "react-native-paper";
import { chatAction, getChatsAction } from "../../features/chat/chatActions";
import { searchProfilesAction } from "../../features/profile/profileActions";
import { clearProfile } from "../../features/profile/profileSlice";
import { clear } from "../../features/chat/chatSlice";
import AdComponent from "../../components/AdComponent";

const getLastMessage = (chat, user) => {
  if (!chat?.messages?.length) return "Keine Nachrichten";
  const lastMessage = chat?.messages[chat?.messages?.length - 1];

  const msg = `${
    lastMessage.userId === user?._id ? "Du" : lastMessage.userName
  }:  ${lastMessage.content}`;

  return limitMsg(msg);
};

const limitMsg = (msg) => {
  return msg.length <= 22 ? msg : `${msg.slice(0, 22)}..`;
};

const getLatestMessage = (user, latestMessages) => {
  if (!latestMessages) return;

  const lastEl = latestMessages[latestMessages.length - 1];
  const userName = lastEl.userName === user?.userName ? "Du" : lastEl.userName;
  return limitMsg(`${userName}: ${lastEl.message}`);
};

const getChatUser = (chat, user) => {
  return chat?.participants?.filter((part) => part._id !== user?._id)[0];
};

const getLatestMessages = (user, chat) => {
  if (!user || !chat) return [];

  return user.latestMessages.filter((msg) => msg.chatId === chat._id);
};

const defaultWarning = {
  visible: false,
  content: "",
  subject: "",
  chatId: "",
};

const FeedScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const info = useRef();

  const { darkMode } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.user);
  const { chats } = useSelector((state) => state.chat);
  const { profiles } = useSelector((state) => state.profile);

  const [loading, setLoading] = useState(user ? true : false);
  const [showChatSettings, setShowChatSettings] = useState("");
  const [warning, setWarning] = useState(defaultWarning);
  const [searchQuery, setSearchQuery] = useState("");
  const [adError, setAdError] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setShowChatSettings("");

      if (user) {
        if (!loading && !chats.length) setLoading(true);
        dispatch(
          getChatsAction(user._id, () => !chats.length && setLoading(false))
        );
      }

      return () => {
        dispatch(clearProfile());
        dispatch(clear());
      };
    }, [])
  );

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleSubmitSearch = () => {
    if (!searchQuery.trim()) return;

    setLoading(true);

    dispatch(searchProfilesAction(searchQuery, () => setLoading(false)));
  };

  const handleClickInfo = () => {
    info.current.open();
  };

  const handleClickChat = (chatId, userName) => {
    navigation.navigate("MessageStack", {
      screen: "Message",
      params: { userName, chatId },
    });
  };

  const handleLongClickChat = (chatId) => {
    if (showChatSettings === chatId) return setShowChatSettings("");

    setShowChatSettings(chatId);
  };

  const handleDeleteChat = (chatId) => {
    setWarning({
      visible: true,
      content:
        "Willst du diesen Chat wirklich löschen? \n\nAnmerkung: Der Chat kann nicht wiederhergestellt werden!",
      chatId,
      subject: "delete",
    });
  };

  const handleClearChat = (chat) => {
    if (!chat?.messages?.length) return;

    setWarning({
      visible: true,
      content:
        "Willst du diesen Chat wirklich leeren? \n\nAnmerkung: Der Chat wird für alle Chat-Teilnehmenden geleert!",
      chatId: chat?._id,
      subject: "clear",
    });
  };

  const handleChatAction = (subject, chatId) => {
    setWarning(defaultWarning);
    setShowChatSettings("");

    setLoading(true);
    dispatch(chatAction(chatId, user?._id, subject, () => setLoading(false)));
  };

  const handleProfileMessage = (userName, profileId) => {
    if (!user)
      return Toast.show("Du bist nicht angemeldet!", toast.warningOptions);

    setSearchQuery("");

    navigation.navigate("MessageStack", {
      screen: "Message",
      params: { userName, profileId },
    });
  };

  const handleProfileClick = (profileId) => {
    setSearchQuery("");

    navigation.navigate("FeedProfileStack", {
      screen: "Profile",
      params: { profileId },
    });
  };

  return (
    <View
      style={[
        styles.scrollContainer,
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
      <View style={{ padding: 5, marginTop: 10 }}>
        <Searchbar
          placeholder="Suchen.."
          value={searchQuery}
          onChangeText={handleSearch}
          icon={() => (
            <IonIcon
              name="md-search"
              size={22}
              color={darkMode ? "white" : "black"}
              style={{ marginLeft: -10 }}
            />
          )}
          style={styles.searchBar}
          inputStyle={styles.searchBarInput}
          onIconPress={handleSubmitSearch}
          onSubmitEditing={handleSubmitSearch}
        />
        <View style={styles.chats}>
          <CustomText
            title={searchQuery.length > 0 ? "Profil Suchen" : "Chats"}
            fontSize={30}
          />
          {searchQuery.length <= 0 && (
            <TouchableOpacity
              onPress={handleClickInfo}
              style={{ position: "absolute", right: 0 }}
            >
              <FeatherIcon
                name="info"
                size={22}
                color={darkMode ? "white" : "black"}
              />
            </TouchableOpacity>
          )}
        </View>
        <Divider color={darkMode ? "white" : "black"} />
        <View style={styles.chatContainer}>
          {loading ? (
            <Loading size={25} />
          ) : searchQuery.length > 0 ? (
            profiles.length > 0 ? (
              <FlatList
                data={profiles}
                style={{ width: "100%" }}
                renderItem={({ item, index }) => (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => handleProfileClick(item._id)}
                    style={{ marginBottom: 10 }}
                  >
                    <View style={styles.chatInnerContainer}>
                      <CustomAvatar uri={item.profileImg?.uri} size={45} />
                      <CustomText
                        title={item.userName}
                        style={{ marginLeft: 15 }}
                        fontFamily="eroded2"
                      />
                      {user?._id !== item._id && (
                        <TouchableOpacity
                          onPress={() =>
                            handleProfileMessage(item.userName, item._id)
                          }
                          style={styles.messageBtn}
                        >
                          <CommunityIcon
                            name="message-reply-text-outline"
                            size={20}
                            color={"white"}
                          />
                          <CustomText
                            title="Nachricht"
                            color="black"
                            fontSize={14}
                            style={{
                              padding: 9,
                            }}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                )}
              />
            ) : (
              <EmptyContent title="Keine Ergebnisse" />
            )
          ) : chats?.length > 0 ? (
            <FlatList
              data={chats}
              style={{ width: "100%" }}
              renderItem={({ item: chat, index }) => (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() =>
                    handleClickChat(chat?._id, getChatUser(chat, user).userName)
                  }
                  onLongPress={() => handleLongClickChat(chat?._id)}
                  style={styles.chatOuterContainer}
                >
                  <View
                    style={[
                      styles.chatInnerContainer,
                      {
                        backgroundColor:
                          showChatSettings === chat?._id
                            ? darkMode
                              ? "#106545"
                              : "#4b9685"
                            : "transparent",
                      },
                    ]}
                  >
                    <CustomAvatar
                      uri={getChatUser(chat, user).profileImg?.uri}
                      size={45}
                      onPress={() =>
                        navigation.navigate("FeedProfileStack", {
                          screen: "Profile",
                          params: { profileId: getChatUser(chat, user)._id },
                        })
                      }
                    />
                    <View style={{ marginLeft: 15 }}>
                      <CustomText
                        title={getChatUser(chat, user).userName}
                        fontSize={25}
                        fontFamily="eroded2"
                      />
                      <CustomText
                        title={
                          getLatestMessages(user, chat).length > 0
                            ? getLatestMessage(
                                user,
                                getLatestMessages(user, chat)
                              )
                            : getLastMessage(chat, user)
                        }
                        fontSize={18}
                        fontFamily="eroded2"
                        style={
                          getLatestMessages(user, chat).length > 0
                            ? { fontWeight: "bold" }
                            : {}
                        }
                      />
                    </View>
                    <View style={styles.chatContent}>
                      {showChatSettings === chat?._id ? (
                        <>
                          <TouchableOpacity
                            onPress={() => handleClearChat(chat)}
                            style={{ marginLeft: 3 }}
                          >
                            <CommunityIcon
                              name="delete-empty-outline"
                              size={28}
                              color={
                                chat?.messages?.length > 0 ? "#ffaa00" : "gray"
                              }
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => handleDeleteChat(chat?._id)}
                          >
                            <CommunityIcon
                              name="delete"
                              size={25}
                              color="#994c40"
                            />
                          </TouchableOpacity>
                        </>
                      ) : getLatestMessages(user, chat).length > 0 ? (
                        <View style={{ position: "relative" }}>
                          <View style={styles.latestMessage}>
                            <CustomText
                              title={getLatestMessages(user, chat).length}
                              fontFamily="eroded2"
                              fontSize={15}
                              color="white"
                            />
                          </View>
                          {getLatestMessages(user, chat).length > 99 && (
                            <CustomText
                              title="+"
                              fontFamily="eroded2"
                              fontSize={15}
                              color="white"
                              style={{ position: "absolute", right: 0 }}
                            />
                          )}
                        </View>
                      ) : (
                        chat?.messages?.length > 0 && (
                          <CustomText
                            title={moment(
                              chat?.messages[chat?.messages?.length - 1]
                                ?.createdAt
                            ).fromNow()}
                            fontSize={15}
                            fontFamily="eroded2"
                          />
                        )
                      )}
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          ) : (
            <EmptyContent title="Keine Chats" />
          )}
        </View>
      </View>

      {!adError && !user?.premium && (
        <AdComponent
          containerStyle={{ position: "absolute", bottom: 0 }}
          showText={false}
          AdElement={
            <BannerAd
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
              unitId={TestIds.BANNER}
              onAdFailedToLoad={() => setAdError(true)}
            />
          }
        />
      )}

      <BottomDrawer
        ref={info}
        position="bottom"
        easing={Easing.elastic(0)}
        coverScreen={false}
        animationDuration={300}
        entry="bottom"
        useNativeDriver={false}
        style={{
          height: 350,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: darkMode ? "#3c3c3c" : "white",
        }}
      >
        <View style={styles.infoContainer} />
        <ScrollView contentContainerStyle={styles.infoContentContainer}>
          <FeatherIcon
            name="info"
            size={30}
            color={darkMode ? "white" : "black"}
            style={{ marginBottom: 10 }}
          />
          <View style={{ alignItems: "flex-start" }}>
            <CustomText
              fontFamily="eroded2"
              fontSize={21}
              title="Hier werden alle Chats mit den Personen angezeigt, die du - oder diejenige Person dich - angeschrieben ha(s)t. Erstelle neue Chats, indem du bei dem Profil deiner Wahl eine Nachricht hinterlässt."
            />
            <CustomText
              title="Um einen Chat zu entfernen oder zu leeren, mache einen langen Klick auf den gewünschten Chat."
              fontFamily="eroded2"
              fontSize={21}
              style={{ marginTop: 10 }}
            />
          </View>
        </ScrollView>
      </BottomDrawer>
      <Portal>
        <Dialog
          visible={warning.visible}
          onDismiss={() => setWarning(defaultWarning)}
        >
          <Dialog.Title style={styles.dialogTitle}>
            <CustomText title="Warnung" fontSize={25} color="#aba865" />
          </Dialog.Title>
          <Dialog.Content>
            <CustomText
              title={warning.content}
              fontSize={20}
              fontFamily="eroded2"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => setWarning(defaultWarning)}
              style={{ marginRight: 5 }}
            >
              <CustomText title="Abbrechen" color="gray" fontSize={21} />
            </Button>
            <Button
              onPress={() => handleChatAction(warning.subject, warning.chatId)}
            >
              <CustomText title="Ja!" color="#4b9685" fontSize={21} />
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  infoContentContainer: {
    alignItems: "center",
    marginTop: 5,
    padding: 15,
    height: "100%",
  },
  dialogTitle: {
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  infoContainer: {
    backgroundColor: "gray",
    height: 5,
    marginTop: 10,
    width: 100,
    alignSelf: "center",
    borderRadius: 20,
  },
  chatContent: {
    position: "absolute",
    right: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  chatInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    width: "100%",
    padding: 5,
    borderRadius: 5,
  },
  chatOuterContainer: {
    marginBottom: 20,
    width: "100%",
  },
  chatContainer: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    width: "100%",
  },
  chats: {
    alignItems: "center",
    position: "relative",
    flexDirection: "row",
  },
  imageBg: {
    height: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    display: "flex",
    padding: 0,
    position: "relative",
    flex: 1,
    paddingBottom: 50,
  },
  latestMessage: {
    width: 28,
    height: 28,
    borderRadius: 28 / 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4b9685",
    padding: 6,
  },
  searchBar: {
    width: "70%",
    height: 40,
    borderRadius: 8,
    padding: 3,
    marginBottom: 20,
  },
  searchBarInput: {
    fontFamily: "eroded2",
    fontSize: 20,
    marginLeft: -15,
  },
  messageBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4b9685",
    borderRadius: 5,
    justifyContent: "center",
    width: 110,
    position: "absolute",
    right: 0,
  },
});
