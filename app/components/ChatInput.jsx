import { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import IonIcon from "react-native-vector-icons/Ionicons";
import AntIcon from "react-native-vector-icons/AntDesign";

import CustomText from "./CustomText";

const limitString = (userName, limit) =>
  userName.length >= limit ? `${userName.slice(0, limit)}..` : userName;

const ChatInput = ({
  reaction = null,
  isOwnMessage = null,
  input,
  limitName = limitString,
  value = "",
  fontStyle = "eroded2",
  scrollRef = null,
  isDefaultTheme = true,
  onReactionClose = (_) => {},
  onComment = (_) => {},
}) => {
  const [comment, setComment] = useState("");

  const { darkMode } = useSelector((state) => state.settings);

  useEffect(() => {
    if (value?.length) setComment(value);
  }, [value]);

  const handleComment = () => {
    if (!comment.length) return;

    setComment("");

    onComment(comment);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          padding: 3,
          paddingTop: 7,
          backgroundColor: !isDefaultTheme
            ? "#0b1219"
            : darkMode
            ? "black"
            : "white",
          borderTopWidth: 1,
          borderColor: !isDefaultTheme ? "white" : darkMode ? "white" : "black",
        }}
      >
        <View style={styles.reactionContainer}>
          {reaction && reaction?.message?.length > 0 && (
            <View
              style={[
                styles.reaction,
                {
                  backgroundColor: darkMode ? "#2f2f2f" : "#494949",
                },
              ]}
            >
              <CustomText
                title={
                  isOwnMessage(reaction.userName, reaction.sessionId)
                    ? "Du"
                    : limitName(reaction.userName, 13)
                }
                fontSize={16}
                color={!reaction.userId ? "#101010" : "#8d7342"}
                style={{ marginBottom: 5 }}
                fontFamily={fontStyle}
              />
              <CustomText
                title={
                  reaction.message.length > 100
                    ? `${reaction.message.slice(0, 90)}..`
                    : reaction.message
                }
                fontSize={15}
                color="#747474"
                style={{ paddingBottom: 5 }}
                fontFamily={fontStyle}
              />
              <AntIcon
                name="closecircleo"
                style={{ position: "absolute", top: 0, right: 0, padding: 5 }}
                color="#747474"
                size={15}
                onPress={onReactionClose}
              />
            </View>
          )}
          <TextInput
            ref={input}
            placeholder="Nachricht.."
            style={{
              fontFamily: fontStyle,
              fontSize: 17,
              padding: 5,
              color: "white",
              maxHeight: 100,
            }}
            multiline
            maxLength={700}
            placeholderTextColor="white"
            onChangeText={(value) => setComment(value)}
            onFocus={() => scrollRef?.current?.scrollToEnd({ animated: true })}
            value={comment}
          />
        </View>
        <TouchableOpacity onPress={handleComment} style={styles.sendBtn}>
          <IonIcon
            name="send"
            size={20}
            style={{
              color: "white",
            }}
            color={darkMode ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "transparent",
  },
  sendBtn: {
    position: "absolute",
    right: 10,
    bottom: 8,
    backgroundColor: "#4b9685",
    borderRadius: 100,
    padding: 10,
  },
  reaction: {
    position: "relative",
    minHeight: 50,
    borderRadius: 15,
    padding: 10,
    paddingBottom: 15,
    maxHeight: 120,
    overflow: "hidden",
  },
  reactionContainer: {
    backgroundColor: "#3a3a3a",
    borderRadius: 20,
    padding: 5,
    width: 290,
  },
});
