import { View, ImageBackground, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { io } from "socket.io-client";
import moment from "moment";
import "moment/locale/de";
import { useFocusEffect } from "@react-navigation/native";

import CustomText from "../components/CustomText";
import * as serverInfo from "../constants/serverInfo";
import ChatInput from "./ChatInput";
import Loading from "./Loading";
import images from "../constants/images";
import EmptyContent from "./EmptyContent";
import { commentAction, getChatAction } from "../features/chat/chatActions";
import { changeSessionID } from "../features/user/userSlice";
import { clear } from "../features/chat/chatSlice";

const emptyReaction = {
  userName: "",
  message: "",
  sessionId: "",
  userId: "",
};

const MessageContainer = ({
  chatId = "",
  fontStyle = "eroded2",
  isDefaultTheme = true,
  globalChat = false,
  participants = [],
  onClickUserName = (_) => {},
}) => {
  const dispatch = useDispatch();
  const input = useRef();
  const socket = useRef();
  const scrollRef = useRef();

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [reaction, setReaction] = useState(emptyReaction);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const { user, sessionId } = useSelector((state) => state.user);
  const { chat } = useSelector((state) => state.chat);

  let refs = [];

  useFocusEffect(
    React.useCallback(() => {
      return () => dispatch(clear());
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (!sessionId) dispatch(changeSessionID());
      dispatch(getChatAction(chatId, () => setLoading(false)));
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (!socket.current) {
        socket.current = io(serverInfo.host);
        socket.current.emit("join-chat", chatId);
      }
    }, [])
  );

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (comment) => {
        setArrivalMessage(comment);
      });
    }
  }, [socket.current]);

  useEffect(() => {
    if (arrivalMessage) setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current.scrollToEnd({ animated: true });
    }, 10);
  }, [messages]);

  useEffect(() => {
    if (chat?.chatId) setMessages(chat.messages);
  }, [chat]);

  const isOwnMessage = (userName, msgSessionId) =>
    userName === user?.userName || msgSessionId === sessionId;

  const limitName = (userName, limit) =>
    userName.length >= limit ? `${userName.slice(0, limit)}..` : userName;

  const handleComment = (comment) => {
    if (!comment.length) return;

    const newComment = {
      userName: user?.userName || "Unbekannt",
      sessionId,
      userId: user?._id || "",
      content: comment,
      createdAt: new Date().toISOString(),
      reaction: reaction || {},
    };

    setMessages((msgs) => [...msgs, newComment]);

    socket.current.emit("send-msg-to-group", {
      chatId,
      comment: newComment,
    });

    dispatch(commentAction(newComment, chat?.chatId, globalChat, participants));

    scrollRef.current.scrollToEnd({ animated: true });

    setReaction(emptyReaction);
  };

  const handleMessageSwipe = (i) => {
    setReaction({
      userName: messages[i].userName,
      message: messages[i].content,
      sessionId: messages[i].sessionId,
      userId: messages[i].userId,
    });
    input.current.focus();

    scrollRef.current.scrollToEnd();
  };

  const handleReactionClose = () => {
    setReaction(emptyReaction);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={isDefaultTheme ? null : images.chatBackground4}
        resizeMode="cover"
        style={styles.imageBg}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{
            display: "flex",
            flexDirection: "column",
            marginTop: 10,
            padding: 5,
            paddingBottom: reaction.message.length > 0 ? 300 : 180,
          }}
        >
          {messages.length > 0 ? (
            messages.map((message, i) => (
              <Swipeable
                key={i}
                ref={(ref) => (refs[i] = ref)}
                useNativeAnimations
                renderLeftActions={() => <View style={{ width: 60 }} />}
                onSwipeableOpen={() => refs[i].close()}
                onEnded={() => refs[i].close()}
                onSwipeableWillOpen={() => handleMessageSwipe(i)}
                shouldCancelWhenOutside
                overshootFriction={8}
              >
                <View
                  style={{
                    padding: 5,
                    marginBottom: 15,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderRadius: 10,
                    minWidth: 200,
                    alignSelf: isOwnMessage(message.userName, message.sessionId)
                      ? "flex-end"
                      : "flex-start",
                    backgroundColor: isOwnMessage(
                      message.userName,
                      message.sessionId
                    )
                      ? "#08680b"
                      : "#3a3a3a",
                    position: "relative",
                    maxWidth: 280,
                  }}
                >
                  <CustomText
                    color={!message.userId ? "#101010" : "#8d7342"}
                    fontSize={17}
                    title={
                      isOwnMessage(message.userName, message.sessionId)
                        ? "Du"
                        : limitName(message.userName, 10)
                    }
                    style={{ marginRight: 10 }}
                    fontFamily={fontStyle}
                    onPress={() =>
                      message.userId && onClickUserName(message.userId)
                    }
                  />
                  {message.reaction.message?.length > 0 && (
                    <View
                      style={{
                        backgroundColor: isOwnMessage(
                          message.userName,
                          message.sessionId
                        )
                          ? "#205d22"
                          : "#2f2f2f",
                        minHeight: 50,
                        borderRadius: 15,
                        padding: 10,
                        paddingBottom: 15,
                        minWidth: 200,
                        maxHeight: 120,
                        overflow: "hidden",
                        marginTop: 5,
                      }}
                    >
                      <CustomText
                        title={
                          isOwnMessage(
                            message.reaction.userName,
                            message.reaction.sessionId
                          )
                            ? "Du"
                            : limitName(message.reaction.userName, 13)
                        }
                        fontSize={16}
                        color={!message.reaction.userId ? "#101010" : "#8d7342"}
                        style={{ marginBottom: 7 }}
                        fontFamily={fontStyle}
                      />
                      <CustomText
                        title={
                          message.reaction.message.length > 100
                            ? `${message.reaction.message.slice(0, 90)}..`
                            : message.reaction.message
                        }
                        fontSize={16}
                        color="#8d8d8d"
                        style={{ paddingBottom: 5 }}
                        fontFamily={fontStyle}
                      />
                    </View>
                  )}
                  <CustomText
                    color="white"
                    fontSize={16}
                    title={message.content}
                    style={{ marginTop: 5, paddingBottom: 10 }}
                    fontFamily={fontStyle}
                  />
                  <CustomText
                    color="white"
                    title={moment(message.createdAt).locale("de").fromNow()}
                    fontSize={14}
                    fontFamily={fontStyle !== "header" ? fontStyle : "eroded2"}
                    style={{ alignSelf: "flex-end" }}
                  />
                </View>
              </Swipeable>
            ))
          ) : (
            <View style={styles.noMessages}>
              {loading ? (
                <Loading />
              ) : (
                <EmptyContent
                  title="Keine Nachrichten. Starte eine Konversation!"
                  fontFamily={fontStyle}
                  titleColor="#12947f"
                  fontSize={19}
                />
              )}
            </View>
          )}
        </ScrollView>
      </ImageBackground>
      <ChatInput
        onComment={handleComment}
        input={input}
        reaction={reaction}
        isOwnMessage={isOwnMessage}
        onReactionClose={handleReactionClose}
        limitName={limitName}
        fontStyle={fontStyle}
        scrollRef={scrollRef}
        isDefaultTheme={isDefaultTheme}
      />
    </View>
  );
};

export default MessageContainer;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 0,
    position: "relative",
    flex: 1,
    overflowY: "scroll",
    position: "relative",
  },
  noMessages: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  imageBg: {
    height: "100%",
    width: "100%",
    borderTopWidth: 2,
    borderColor: "white",
  },
});
