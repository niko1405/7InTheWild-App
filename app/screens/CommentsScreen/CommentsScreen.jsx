import { Divider } from "@react-native-material/core";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-tiny-toast";
import { useDispatch, useSelector } from "react-redux";
import IonIcon from "react-native-vector-icons/Ionicons";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import "moment/locale/de";
import { v4 as uuidv4 } from "uuid";

import ChatInput from "../../components/ChatInput";
import CustomAvatar from "../../components/CustomAvatar";
import CustomText from "../../components/CustomText";
import images from "../../constants/images";
import * as toast from "../../constants/toastOptions";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../../components/Loading";
import {
  commentSurveyAction,
  deleteCommentSurveyAction,
  getCommentsAction,
  getSurveyAction,
  likeCommentSurveyAction,
} from "../../features/survey/surveyActions";
import { clear } from "../../features/survey/surveySlice";
import EmptyContent from "../../components/EmptyContent";

const Message = ({
  comment,
  handleClickUserName = (_) => {},
  handleClickAnswer = (_) => {},
  handleLike = (_) => {},
  handleDelete = (_) => {},
  showTag = false,
}) => {
  const { darkMode } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.user);

  const [liked, setLiked] = useState(comment?.likes?.includes(user?._id));
  const [marked, setMarked] = useState(false);

  useEffect(() => {
    if (comment) setLiked(comment?.likes?.includes(user?._id));
  }, [comment]);

  const handleLongPress = () => {
    setMarked(!marked);
  };

  return (
    <TouchableWithoutFeedback onLongPress={handleLongPress}>
      <View
        style={{
          backgroundColor: marked
            ? darkMode
              ? "#106545"
              : "#4b9685"
            : "transparent",
          padding: 3,
          borderRadius: 5,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              maxWidth: "90%",
            }}
          >
            <CustomText
              title={`${comment?.userName}  `}
              fontSize={20}
              onPress={() => handleClickUserName(comment?.userId)}
              alignChildren="right"
            >
              <CustomText
                title={`${showTag ? `@${comment?.userName} ` : ""}${
                  comment?.content
                }`}
                fontFamily="eroded2"
                color={darkMode ? "white" : "black"}
                fontSize={18}
              />
            </CustomText>
          </View>
          <View
            style={{
              position: "absolute",
              right: 5,
              top: 2,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={handleLike}>
              {liked ? (
                <IonIcon name="md-heart" size={20} color="red" />
              ) : (
                <IonIcon
                  name="ios-heart-outline"
                  size={20}
                  color={darkMode ? "white" : "black"}
                />
              )}
            </TouchableOpacity>
            {marked && comment?.userId === user?._id && (
              <TouchableOpacity onPress={handleDelete}>
                <CommunityIcon name="delete" size={22} color="#994c40" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <CustomText
            title={moment(comment?.createdAt).locale("de").fromNow()}
            fontSize={15}
            fontFamily="eroded2"
          />
          <CustomText
            title={`Gefällt ${comment?.likes?.length} Mal`}
            fontFamily="eroded2"
            fontSize={15}
            style={{ marginLeft: 10 }}
          />
          <TouchableOpacity
            onPress={() => handleClickAnswer(comment?.userName)}
          >
            <CustomText
              title="Antworten"
              fontSize={15}
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const emptyComment = {
  content: "",
  messageId: "",
  answerId: "",
};

const setNewComments = (state, commentEl, update) => {
  return state.map((comment) =>
    comment.messageId === commentEl.messageId
      ? { ...commentEl, ...update }
      : comment
  );
};

const setNewComments2 = (state, commentEl, update) => {
  return state.map((comment) =>
    comment.messageId === commentEl.messageId ? update : comment
  );
};

const CommentsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const input = useRef();
  const scrollRef = useRef();

  const focus = route?.params?.focus;
  const routeComments = route?.params?.comments || [];

  const [comments, setComments] = useState(routeComments);
  const [comment, setComment] = useState(emptyComment);
  const [showComments, setShowComments] = useState(false);
  const [survey, setSurvey] = useState(route?.params?.survey);

  const { darkMode } = useSelector((state) => state.settings);
  const { user, loading } = useSelector((state) => state.user);
  const { survey: stateSurvey, comments: stateComments } = useSelector(
    (state) => state.survey
  );

  useFocusEffect(
    React.useCallback(() => {
      if (focus) input?.current?.focus();

      if (survey?._id && !routeComments?.length) {
        dispatch(getSurveyAction(survey?._id, false));
        dispatch(getCommentsAction(survey?._id));
      }

      return () => dispatch(clear());
    }, [])
  );

  useEffect(() => {
    if (survey?._id && stateSurvey) setSurvey(stateSurvey);
  }, [stateSurvey]);

  useEffect(() => {
    if (survey?._id && stateComments && !routeComments?.length)
      setComments(stateComments);
  }, [stateComments]);

  const handleComment = (value) => {
    const { messageId, answerId } = comment;

    let postComment = null;
    let isNewComment = true;
    let answerComment = null;

    if (messageId?.length && value.includes("@") && value.includes(":")) {
      comments.map((commentEl, i) => {
        const content = value.split(": ")[1];

        if (!content.length) return;

        isNewComment = false;

        const newComment = {
          parentId: commentEl?.messageId,
          messageId: uuidv4(),
          userName: user?.userName || "Unbekannt",
          userId: user?._id || "",
          content,
          createdAt: new Date().toISOString(),
          likes: [],
          parent: true,
          replyUnderParent: false,
          marked: null,
        };

        answerComment = { ...newComment };

        if (answerId?.length) {
          commentEl?.answers?.map((answer) => {
            if (answer?.messageId === answerId) {
              setComments((state) => {
                const newCommentEl = {
                  ...commentEl,
                  ...{
                    answers: [
                      ...commentEl.answers,
                      {
                        ...newComment,
                        replyUnderParent: true,
                        marked: answer?.userId,
                      },
                    ],
                  },
                };

                postComment = { ...newCommentEl };
                return setNewComments2(state, commentEl, newCommentEl);
              });

              return;
            }
          });
        } else {
          if (commentEl?.messageId === messageId) {
            setComments((state) => {
              const newCommentEl = {
                ...commentEl,
                ...{
                  answers: [...commentEl.answers, newComment],
                },
              };

              postComment = { ...newCommentEl };
              return setNewComments2(state, commentEl, newCommentEl);
            });

            return;
          }
        }
      });
    } else {
      postComment = {
        parentId: "",
        messageId: uuidv4(),
        userName: user?.userName || "Unbekannt",
        userId: user?._id || "",
        content: value,
        createdAt: new Date().toISOString(),
        answers: [],
        likes: [],
        parent: false,
        replyUnderParent: false,
        marked: null,
      };

      setComments((prev) => [postComment, ...prev]);
    }

    setComment(emptyComment);

    dispatch(
      commentSurveyAction(survey?._id, postComment, isNewComment, answerComment)
    );
  };

  const handleLike = (messageId, likedUserId, answerId = "") => {
    if (!user)
      return Toast.show("Du bist nicht angemeldet", toast.warningOptions);

    comments.map((commentEl) => {
      if (commentEl?.messageId === messageId) {
        if (!answerId.length) {
          if (commentEl.likes.includes(user._id)) {
            setComments((state) =>
              setNewComments(state, commentEl, {
                likes: commentEl.likes.filter((likeId) => likeId !== user._id),
              })
            );
          } else {
            setComments((state) =>
              setNewComments(state, commentEl, {
                likes: [...commentEl.likes, user._id],
              })
            );
          }
        } else {
          commentEl.answers.map((answer) => {
            if (answer?.messageId === answerId) {
              if (answer.likes.includes(user._id))
                setComments((state) =>
                  setNewComments(state, commentEl, {
                    answers: [
                      ...commentEl.answers.filter(
                        (answ) => answ.messageId !== answer.messageId
                      ),
                      {
                        ...answer,
                        likes: answer.likes.filter(
                          (likeId) => likeId !== user._id
                        ),
                      },
                    ],
                  })
                );
              else
                setComments((state) =>
                  setNewComments(state, commentEl, {
                    answers: [
                      ...commentEl.answers.filter(
                        (answ) => answ.messageId !== answer.messageId
                      ),
                      {
                        ...answer,
                        likes: [...answer.likes, user._id],
                      },
                    ],
                  })
                );
            }
          });
        }

        return;
      }
    });

    dispatch(
      likeCommentSurveyAction(
        survey?._id,
        messageId,
        user?._id,
        likedUserId,
        answerId
      )
    );
  };

  const handleClickUserName = (profileId) => {
    if (!profileId) return;

    navigation.navigate("Profile", {
      profileId,
    });
  };

  const handleClickAnswer = (userName, messageId, answerId = null) => {
    if (input.current) input.current.focus();

    setComment({ messageId, answerId, content: `@${userName}: ` });
    setTimeout(() => setComment((prev) => ({ ...prev, content: "" })), 500);
  };

  const handleDelete = (messageId, answerId = "") => {
    comments.map((commentEl) => {
      if (commentEl.messageId === messageId) {
        if (answerId.length) {
          commentEl.answers.map((answer) => {
            if (answer.messageId === answerId) {
              setComments((state) => {
                const newComments = state.map((comment) =>
                  comment.messageId === messageId
                    ? {
                        ...comment,
                        answers: comment.answers.filter(
                          (ans) => ans.messageId !== answerId
                        ),
                      }
                    : comment
                );

                return newComments;
              });

              return;
            }
          });
        } else {
          setComments(
            comments.filter((commEl) => commEl.messageId !== messageId)
          );

          return;
        }
      }
    });

    dispatch(deleteCommentSurveyAction(survey?._id, messageId, answerId));
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
      }}
    >
      <ImageBackground
        source={images.banner2}
        style={{
          height: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <View
        style={{
          paddingTop: 10,
          display: "flex",
          flexDirection: "row",
          paddingLeft: 5,
          borderTopWidth: 1.5,
          borderColor: darkMode ? "white" : "black",
        }}
      >
        <CustomAvatar
          uri={survey?.uri}
          size={28}
          style={{ marginRight: 7 }}
          onPress={() =>
            survey &&
            navigation.navigate("Profile", {
              profileId: survey?.userId,
            })
          }
        />
        <View
          style={{
            width: "85%",
          }}
        >
          <CustomText title={survey?.userName} fontSize={21} />
          <CustomText
            title={survey?.message || "Nachricht"}
            fontSize={18}
            fontFamily="eroded2"
            style={{ marginTop: 5, maxWidth: "90%" }}
            color={darkMode ? "white" : "black"}
          />
        </View>
      </View>
      <Divider color={darkMode ? "white" : "black"} style={{ marginTop: 15 }} />
      <ScrollView
        ref={scrollRef}
        style={{
          marginTop: 10,
          padding: 10,
        }}
      >
        {comments?.length > 0 ? (
          comments?.map((comment, i) => (
            <View key={i} style={{ marginBottom: 30 }}>
              <Message
                comment={comment}
                handleClickAnswer={() =>
                  handleClickAnswer(comment?.userName, comment?.messageId)
                }
                handleLike={() =>
                  handleLike(comment?.messageId, comment?.userId)
                }
                handleClickUserName={() => handleClickUserName(comment?.userId)}
                handleDelete={() => handleDelete(comment?.messageId)}
              />
              {comment?.answers?.length > 0 &&
                (comment?.answers?.length <= 2 || showComments ? (
                  <View style={{ marginTop: 20, marginLeft: 15 }}>
                    {comment.answers.map((answer) => (
                      <View key={answer.createdAt} style={{ marginBottom: 10 }}>
                        <Message
                          comment={answer}
                          handleClickAnswer={() =>
                            handleClickAnswer(
                              answer?.userName,
                              answer?.parentId,
                              answer?.messageId
                            )
                          }
                          handleLike={() =>
                            handleLike(
                              answer?.parentId,
                              comment?.userId,
                              answer?.messageId
                            )
                          }
                          handleClickUserName={() =>
                            handleClickUserName(answer?.userId)
                          }
                          showTag={answer?.replyUnderParent}
                          handleDelete={() =>
                            handleDelete(answer?.parentId, answer?.messageId)
                          }
                        />
                      </View>
                    ))}
                    {showComments && (
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 10,
                        }}
                        onPress={() => setShowComments(false)}
                      >
                        <CustomText
                          title="━    Antworten verstecken"
                          fontSize={18}
                          fontFamily="eroded2"
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ) : (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 20,
                    }}
                    onPress={() => setShowComments(true)}
                  >
                    <CustomText
                      title={`━    Antworten ansehen (${comment?.answers?.length})`}
                      fontSize={18}
                      fontFamily="eroded2"
                    />
                  </TouchableOpacity>
                ))}
            </View>
          ))
        ) : loading ? (
          <Loading />
        ) : (
          <EmptyContent
            title="Keine Kommentare"
            containerStyle={{ alignSelf: "center", marginTop: 20 }}
          />
        )}
      </ScrollView>
      <ChatInput
        input={input}
        scrollRef={scrollRef}
        onComment={handleComment}
        value={comment.content}
      />
    </View>
  );
};

export default CommentsScreen;
