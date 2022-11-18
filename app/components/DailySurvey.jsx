import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import moment from "moment";
import "moment/locale/de";
import { useFocusEffect } from "@react-navigation/native";
import { Surface } from "@react-native-material/core";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-tiny-toast";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

import CustomText from "./CustomText";
import * as toast from "../constants/toastOptions";
import images from "../constants/images";
import { voteDailySurveyAction } from "../features/survey/surveyActions";

const getTotalVotes = (options) => {
  if (!options.length) return 0;

  let amount = 0;
  options.map((option) => (amount += option.clicked.length));

  return amount;
};

const DailySurvey = ({
  containerStyle = {},
  survey = null,
  time = moment(survey?.createdAt).locale("de").fromNow(),
  question = survey?.question,
  options = survey?.options,
  title = survey?.title,
  onVote = (_) => {},
}) => {
  const dispatch = useDispatch();

  const scrollRef = useRef();

  const { user } = useSelector((state) => state.user);

  const [scrollDown, setScrollDown] = useState(false);
  const [voted, setVoted] = useState(
    survey?.options?.some((option) => option.clicked?.includes(user?._id))
  );
  const [totalVotes, setTotalVotes] = useState(0);
  const [clickedOptions, setClickedOptions] = useState([]);

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

    dispatch(voteDailySurveyAction(user?._id, survey?._id, option?.name));
  };

  return (
    <View
      style={[
        {
          width: "100%",
        },
        containerStyle,
      ]}
    >
      <ImageBackground
        source={images.banner5}
        resizeMode="cover"
        style={styles.imageBg}
      >
        <View style={styles.topContainer}>
          <CustomText
            title={title.toString().toUpperCase()}
            color="white"
            fontSize={25}
            fontFamily="eroded2"
          />
          <CustomText
            title={time}
            style={{ opacity: 0.9 }}
            fontSize={16}
            color="#b3b3b3"
          />
        </View>
        <TouchableWithoutFeedback onPress={() => {}}>
          <Surface elevation={3} style={styles.surface}>
            <CustomText
              title={question}
              fontSize={22}
              color="black"
              style={{ textAlign: "center", padding: 10 }}
              fontFamily="eroded2"
            />
            <ScrollView
              ref={scrollRef}
              style={{
                flexGrow: 0,
              }}
              contentContainerStyle={styles.optionsContainer}
              nestedScrollEnabled
              onScroll={({ nativeEvent }) => checkBottom(nativeEvent)}
            >
              {options.length > 0 &&
                options.map((option, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => handleVoting(option, i)}
                  >
                    <View style={styles.optionInnerContainer}>
                      {voted && (
                        <View
                          style={[
                            StyleSheet.absoluteFill,
                            {
                              width: `${
                                Math.round(
                                  ((clickedOptions[i] || 0) / totalVotes) * 100
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
                        fontSize={23}
                        style={{
                          margin: 10,
                          marginRight: 3,
                        }}
                      />
                      <CustomText
                        title={option.name}
                        color={voted ? "#646464" : "#434343"}
                        fontFamily="eroded2"
                        fontSize={23}
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
                          fontSize={23}
                          style={{ position: "absolute", right: 5 }}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
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
                <Image source={images.arrowDown} style={styles.arrowDown} />
              </TouchableOpacity>
            )}
          </Surface>
        </TouchableWithoutFeedback>
        <View style={styles.voteAmountContainer}>
          <CommunityIcon
            name="vote-outline"
            size={27}
            color="white"
            style={{ marginRight: 5 }}
          />
          <CustomText
            title={getTotalVotes(survey?.options)}
            fontFamily="eroded2"
            fontSize={27}
            color="white"
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default DailySurvey;

const styles = StyleSheet.create({
  imageBg: {
    height: 500,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  topContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 5,
  },
  surface: {
    borderRadius: 10,
    padding: 5,
    minWidth: 200,
    maxHeight: "60%",
    maxWidth: 300,
    backgroundColor: "white",
  },
  optionsContainer: {
    backgroundColor: "#ececec",
    borderRadius: 10,
    padding: 10,
    position: "relative",
  },
  optionInnerContainer: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#d8d8d8",
    marginBottom: 10,
    position: "relative",
    alignItems: "center",
  },
  arrowDown: {
    borderWidth: 1,
    borderColor: "black",
    overflow: "hidden",
    height: 27,
    width: 27,
    borderRadius: 100,
    backgroundColor: "#ececec",
  },
  voteAmountContainer: {
    position: "absolute",
    bottom: 5,
    left: 5,
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
