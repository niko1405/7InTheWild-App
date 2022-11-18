import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import moment from "moment";
import "moment/locale/de";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Divider, Surface } from "@react-native-material/core";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-tiny-toast";

import CustomText from "./CustomText";
import CustomDialog from "./CustomDialog";
import * as toast from "../constants/toastOptions";
import CustomAvatar from "./CustomAvatar";
import images from "../constants/images";
import {
  deleteSurveyAction,
  likeSurveyAction,
  voteSurveyAction,
} from "../features/survey/surveyActions";

const Survey = ({
  containerStyle = {},
  survey = null,
  userName = survey?.userName,
  time = moment(survey?.createdAt).locale("de").fromNow(),
  question = survey?.question,
  options = survey?.options,
  message = survey?.message,
  uri = survey?.uri,
  size = "large",
  clickable = true,
  showMessage = true,
  showLinkIcon = false,
  showEditIcon = true,
  showDeleteIcon = true,
  onLike = (_) => {},
  onVote = (_) => {},
  onShowComments = (_) => {},
  onCommentClick = (_) => {},
  onClickLinkIcon = (_) => {},
  onEdit = undefined,
  onProfileClick = undefined,
}) => {
  const dispatch = useDispatch();

  const scrollRef = useRef();
  const navigation = useNavigation();

  const { user } = useSelector((state) => state.user);
  const { darkMode } = useSelector((state) => state.settings);

  const [scrollDown, setScrollDown] = useState(false);
  const [warning, setWarning] = useState("");
  const [liked, setLiked] = useState(survey?.likes?.includes(user?._id));
  const [voted, setVoted] = useState(
    survey?.options?.some((option) => option.clicked?.includes(user?._id))
  );
  const [totalVotes, setTotalVotes] = useState(0);
  const [clickedOptions, setClickedOptions] = useState([]);

  const isSmall = size === "small";
  const isMedium = size === "medium";

  const ownSurvey = user?._id === survey?.userId;

  useFocusEffect(
    React.useCallback(() => {
      if (survey) {
        let votes = 0;

        survey.options.map((option) => {
          votes += option?.clicked?.length;

          setClickedOptions((prev) => [...prev, option?.clicked?.length]);
        });

        setTotalVotes(votes);
      }
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (survey) setLiked(survey?.likes?.includes(user?._id));
    }, [survey])
  );

  useEffect(() => {
    if (options.length <= 4) setScrollDown(false);
    else setScrollDown(true);
  }, [options]);

  const checkBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 17;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    )
      scrollDown && setScrollDown(false);
    else !scrollDown && setScrollDown(true);
  };

  const handleScrollDown = () => {
    scrollRef.current.scrollToEnd({ animated: true });
  };

  const handleEdit = () => {
    if (!onEdit) {
      navigation.navigate("Create", {
        surveyId: survey?._id,
        title: "Umfrage bearbeiten",
      });
      return;
    }

    onEdit();
  };

  const handleDelete = () => {
    setWarning("");

    dispatch(deleteSurveyAction(survey?._id));
  };

  const handleLike = () => {
    if (!user)
      return Toast.show("Du bist nicht angemeldet!", toast.warningOptions);

    if (liked) setLiked(false);
    else setLiked(true);

    if (!survey) return;

    onLike(liked);

    dispatch(likeSurveyAction(user?._id, survey?._id));
  };

  const handleClick = () => {
    if (!survey || !clickable) return;

    navigation.navigate("SurveyDetailsStack", {
      screen: "SurveyDetails",
      params: { survey },
    });
  };

  const handleVoting = (option, i) => {
    if (!survey) return;

    if (!user)
      return Toast.show("Du bis nicht angemeldet!", toast.warningOptions);

    if (voted) return;
    else setVoted(true);

    onVote();

    const newClickedOptions = clickedOptions;
    newClickedOptions[i] = clickedOptions[i] + 1;

    setClickedOptions(newClickedOptions);
    setTotalVotes(totalVotes + 1);

    dispatch(voteSurveyAction(user?._id, survey?._id, option?.name));
  };

  const handleShowComments = () => {
    onShowComments();
  };

  const handleComment = () => {
    if (!user)
      return Toast.show("Du bis nicht angemeldet!", toast.warningOptions);

    onCommentClick();
  };

  const handleProfileClick = () => {
    if (survey) {
      if (!onProfileClick)
        return navigation.navigate("Profile", { profileId: survey?.userId });

      onProfileClick();
    }
  };

  const TouchableViews = {
    feedback: TouchableOpacity,
    noFeedback: TouchableWithoutFeedback,
  };

  const TouchableView = TouchableViews[clickable ? "feedback" : "noFeedback"];

  return (
    <View
      style={[
        {
          width: isSmall ? "50%" : isMedium ? "70%" : "100%",
        },
        containerStyle,
      ]}
    >
      <TouchableView onPress={handleClick}>
        <>
          <ImageBackground
            source={images.banner5}
            resizeMode="cover"
            style={{
              height: isSmall ? 300 : isMedium ? 400 : 500,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {showLinkIcon && (
              <TouchableOpacity
                onPress={onClickLinkIcon}
                style={{ position: "absolute", top: 5, right: 5 }}
              >
                <FeatherIcon
                  name="external-link"
                  size={isSmall ? 26 : isMedium ? 29 : 33}
                  color="white"
                />
              </TouchableOpacity>
            )}
            {ownSurvey && showEditIcon && showDeleteIcon && (
              <View
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {showEditIcon && (
                  <TouchableOpacity onPress={handleEdit}>
                    <MaterialIcon
                      name="edit"
                      size={isSmall ? 20 : isMedium ? 25 : 30}
                      color="#aba865"
                    />
                  </TouchableOpacity>
                )}
                {showDeleteIcon && (
                  <TouchableOpacity
                    onPress={() =>
                      setWarning("Möchtest du diese Umfrage wirklich löschen?")
                    }
                  >
                    <CommunityIcon
                      name="delete"
                      size={isSmall ? 20 : isMedium ? 25 : 30}
                      color="#994c40"
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                padding: 5,
              }}
            >
              <TouchableOpacity onPress={handleProfileClick}>
                <CustomText
                  title={userName}
                  color="white"
                  fontSize={isSmall ? 19 : isMedium ? 23 : 26}
                />
              </TouchableOpacity>
              <CustomText
                title={time}
                style={{ opacity: 0.9 }}
                fontSize={isSmall ? 9 : isMedium ? 13 : 16}
                color="#b3b3b3"
              />
            </View>
            <TouchableWithoutFeedback onPress={() => {}}>
              <Surface
                elevation={3}
                style={{
                  borderRadius: 10,
                  padding: 5,
                  minWidth: isSmall ? 120 : isMedium ? 160 : 200,
                  maxHeight: "60%",
                  maxWidth: isSmall ? 150 : isMedium ? 220 : 300,
                  backgroundColor: "white",
                }}
              >
                <CustomText
                  title={question || "Frage"}
                  fontSize={isSmall ? 14 : isMedium ? 19 : 24}
                  color="black"
                  style={{ textAlign: "center", padding: 10 }}
                  fontFamily="eroded2"
                />
                <ScrollView
                  ref={scrollRef}
                  style={{
                    flexGrow: 0,
                  }}
                  contentContainerStyle={{
                    backgroundColor: "#ececec",
                    borderRadius: 10,
                    padding: isSmall ? 4 : isMedium ? 6 : 10,
                    position: "relative",
                  }}
                  nestedScrollEnabled
                  onScroll={({ nativeEvent }) => checkBottom(nativeEvent)}
                >
                  {options.length > 0 ? (
                    options.map((option, i) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => handleVoting(option, i)}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            borderRadius: 10,
                            backgroundColor: "#d8d8d8",
                            marginBottom: isSmall ? 8 : isMedium ? 9 : 10,
                            position: "relative",
                            alignItems: "center",
                          }}
                        >
                          {voted && (
                            <View
                              style={[
                                StyleSheet.absoluteFill,
                                {
                                  width: `${
                                    Math.round(
                                      ((clickedOptions[i] || 0) / totalVotes) *
                                        100
                                    ) || 0
                                  }%`,
                                  borderRadius: 10,
                                  backgroundColor: "black",
                                },
                              ]}
                            />
                          )}
                          <CustomText
                            title={`${i + 1}.`}
                            color={voted ? "#646464" : "#434343"}
                            fontFamily="eroded2"
                            fontSize={isSmall ? 14 : isMedium ? 18 : 23}
                            style={{
                              margin: isSmall ? 8 : isMedium ? 9 : 10,
                              marginRight: 3,
                            }}
                          />
                          <CustomText
                            title={option.name}
                            color={voted ? "#646464" : "#434343"}
                            fontFamily="eroded2"
                            fontSize={isSmall ? 14 : isMedium ? 18 : 23}
                          />
                          {voted && (
                            <CustomText
                              title={`${
                                Math.round(
                                  ((clickedOptions[i] || 0) / totalVotes) * 100
                                ) || 0
                              }%`}
                              color={voted ? "#646464" : "#434343"}
                              fontFamily="eroded2"
                              fontSize={isSmall ? 14 : isMedium ? 18 : 23}
                              style={{ position: "absolute", right: 5 }}
                            />
                          )}
                        </View>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <CustomText
                      onPress={() => {}}
                      title="1.  Antwortmöglichkeit"
                      style={{
                        borderRadius: 10,
                        backgroundColor: "#d8d8d8",
                        padding: isSmall ? 8 : isMedium ? 9 : 10,
                        marginBottom: isSmall ? 8 : isMedium ? 9 : 10,
                      }}
                      color="#434343"
                      fontFamily="eroded2"
                      fontSize={isSmall ? 14 : isMedium ? 18 : 23}
                    />
                  )}
                </ScrollView>
                {scrollDown && (
                  <TouchableOpacity
                    onPress={handleScrollDown}
                    style={{
                      position: "absolute",
                      bottom: 7,
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      source={images.arrowDown}
                      style={{
                        borderWidth: 1,
                        borderColor: "black",
                        overflow: "hidden",
                        height: isSmall ? 20 : isMedium ? 23 : 27,
                        width: isSmall ? 20 : isMedium ? 23 : 27,
                        borderRadius: 100,
                        backgroundColor: "#ececec",
                      }}
                    />
                  </TouchableOpacity>
                )}
              </Surface>
            </TouchableWithoutFeedback>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                display: "flex",
                flexDirection: "row",
                padding: 5,
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={handleLike}>
                {liked ? (
                  <IonIcon
                    name="md-heart"
                    size={isSmall ? 22 : isMedium ? 26 : 30}
                    color="red"
                  />
                ) : (
                  <IonIcon
                    name="ios-heart-outline"
                    size={isSmall ? 22 : isMedium ? 26 : 30}
                    color="white"
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={handleComment}>
                <FontistoIcon
                  name="comment"
                  size={isSmall ? 18 : isMedium ? 22 : 26}
                  color="white"
                  style={{ marginLeft: 7 }}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          {showMessage && (
            <>
              <View
                style={{
                  marginTop: 15,
                  display: "flex",
                  flexDirection: "row",
                  paddingLeft: 5,
                }}
              >
                <CustomAvatar
                  uri={uri}
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
                  <CustomText title={userName} fontSize={21} />
                  <CustomText
                    title={message || "Nachricht"}
                    fontSize={18}
                    fontFamily="eroded2"
                    style={{ marginTop: 5, maxWidth: "90%" }}
                  />
                </View>
              </View>
              <Divider
                color={darkMode ? "white" : "black"}
                style={{ marginTop: 15 }}
              />
              <TouchableOpacity onPress={handleShowComments}>
                <CustomText
                  title="Kommentare ansehen"
                  fontSize={18}
                  fontFamily="eroded2"
                  style={{
                    marginTop: 8,
                    textAlign: "center",
                    paddingBottom: 15,
                  }}
                />
              </TouchableOpacity>
            </>
          )}
          <CustomDialog
            visible={warning.length > 0}
            onDismiss={() => setWarning("")}
            message={warning}
            headerTitle={"Warnung"}
            headerTitleColor="#aba865"
            buttonTitle="Ja"
            onPress={handleDelete}
            buttonVariant="text"
            cancelButton
            onCancelPress={() => setWarning("")}
            cancelVariant="text"
          />
        </>
      </TouchableView>
    </View>
  );
};

export default Survey;
