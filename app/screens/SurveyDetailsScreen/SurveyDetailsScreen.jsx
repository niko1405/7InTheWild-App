import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { ImageBackground, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcon from "react-native-vector-icons/Ionicons";
import { Divider } from "@react-native-material/core";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import CustomText from "../../components/CustomText";
import Survey from "../../components/Survey";
import images from "../../constants/images";
import { useStateContext } from "../../contexts/ContextProvider";
import AdComponent from "../../components/AdComponent";

const defaultStats = {
  likes: 0,
  votes: 0,
  comments: 0,
};

const SurveyDetailsScreen = ({ route, navigation }) => {
  const { darkMode } = useSelector((state) => state.settings);
  const { survey: stateSurvey } = useSelector((state) => state.survey);
  const { user } = useSelector((state) => state.user);

  const { handleScroll } = useStateContext();

  const [survey, setSurvey] = useState(route?.params?.survey);
  const [stats, setStats] = useState(defaultStats);
  const [adError, setAdError] = useState(false);

  const updateStats = (surveyObj) => {
    let votes = 0;

    surveyObj.options.map((option) => (votes += option?.clicked?.length));

    setStats({
      likes: surveyObj.likes?.length,
      comments: surveyObj.comments?.length,
      votes,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      if (survey) updateStats(survey);
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (stateSurvey?._id === survey?._id) {
        setSurvey(stateSurvey);
        updateStats(stateSurvey);
      }
    }, [stateSurvey])
  );

  const handleLike = (isLiking) => {
    if (isLiking) setStats({ ...stats, likes: stats.likes - 1 });
    else setStats({ ...stats, likes: stats.likes + 1 });
  };

  const handleVote = () => {
    setStats({ ...stats, votes: stats.votes + 1 });
  };

  const handleShowComments = (focus = false) => {
    if (!survey) return;

    navigation.navigate("CommentsStack", {
      screen: "Comments",
      params: { survey, focus },
    });
  };

  const handleEdit = () => {
    navigation.navigate("HomeTabs", {
      screen: "Create",
      params: {
        surveyId: survey?._id,
        title: "Umfrage bearbeiten",
      },
    });
  };

  const handleProfileClick = () => {
    navigation.navigate("SurveyProfile", { profileId: survey?.userId });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          display: "flex",
          padding: 0,
          backgroundColor: darkMode ? "black" : "white",
          position: "relative",
          flex: 1,
          overflowY: "scroll",
        }}
        contentContainerStyle={{ paddingBottom: 80 }}
        onScroll={handleScroll}
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
        <View>
          {!survey ? (
            <CustomText
              title="Ein Fehler ist aufgetreten"
              fontSize={18}
              style={{ textAlign: "center" }}
            />
          ) : (
            <>
              <Divider
                color={darkMode ? "white" : "black"}
                style={{ marginBottom: 5, marginTop: 5 }}
              />
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CommunityIcon
                  name="vote-outline"
                  size={25}
                  color={darkMode ? "white" : "black"}
                  style={{ marginRight: 3 }}
                />
                <CustomText
                  title={stats.votes || 0}
                  fontSize={22}
                  style={{ marginRight: 20 }}
                />
                <IonIcon
                  name="md-heart"
                  size={25}
                  color="red"
                  style={{ marginRight: 3 }}
                />
                <CustomText
                  title={stats.likes || 0}
                  fontSize={22}
                  style={{ marginRight: 20 }}
                />
              </View>
              <Divider
                color={darkMode ? "white" : "black"}
                style={{ marginBottom: 5, marginTop: 5 }}
              />
              <Survey
                survey={survey}
                clickable={false}
                onLike={handleLike}
                onVote={handleVote}
                onShowComments={handleShowComments}
                onCommentClick={() => handleShowComments(true)}
                onEdit={handleEdit}
                onProfileClick={handleProfileClick}
              />
            </>
          )}
        </View>
      </ScrollView>

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
    </View>
  );
};

export default SurveyDetailsScreen;
