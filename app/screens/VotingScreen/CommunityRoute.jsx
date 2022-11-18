import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import { Button, Dialog, Portal, RadioButton } from "react-native-paper";
import { useEffect } from "react";
import { Divider } from "@react-native-material/core";
import React from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import CustomText from "../../components/CustomText";
import Loading from "../../components/Loading";
import Survey from "../../components/Survey";
import EmptyContent from "../../components/EmptyContent";
import { getSurveysAction } from "../../features/survey/surveyActions";
import { clear, setCurrentSection } from "../../features/survey/surveySlice";
import AdComponent from "../../components/AdComponent";

let oldFilter = "";

const CommunityRoute = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const maxWidth = useWindowDimensions().width;

  const { darkMode } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.user);
  const { currentSection, currentSurveys, totalSurveys, newestSurveys } =
    useSelector((state) => state.survey);

  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filter, setFilter] = useState("Neueste");
  const [loading, setLoading] = useState(!newestSurveys?.length);
  const [loadMore, setLoadMore] = useState(false);
  const [surveys, setSurveys] = useState(newestSurveys);

  useFocusEffect(
    React.useCallback(() => {
      if (newestSurveys.length) {
        setSurveys(newestSurveys);
        dispatch(setCurrentSection(2));
      }

      if (!newestSurveys?.length) {
        if (!loading) setLoading(true);
        dispatch(getSurveysAction(1, filter, () => setLoading(false)));
      }

      return () => {
        setFilter("Neueste");
        dispatch(clear());
      };
    }, [])
  );

  useEffect(() => {
    if (currentSurveys.length) setSurveys(currentSurveys);
  }, [currentSurveys]);

  useEffect(() => {
    if (loadMore) {
      dispatch(
        getSurveysAction(currentSection, filter, () => setLoadMore(false), true)
      );
    }
  }, [loadMore]);

  const handleClickFilter = () => {
    setShowFilterOptions(true);

    oldFilter = filter;
  };

  const handleChangeFilter = () => {
    setShowFilterOptions(false);

    if (filter === oldFilter) return;

    if (filter === "Neueste") {
      setSurveys(newestSurveys);

      dispatch(setCurrentSection(2));
    } else {
      setLoading(true);

      dispatch(getSurveysAction(1, filter, () => setLoading(false)));
    }
  };

  const handleLoadMore = () => {
    if (loading) return;
    if (totalSurveys <= surveys?.length) return;

    if (!loadMore && totalSurveys > surveys?.length) setLoadMore(true);
  };

  const handleShowComments = (survey, focus) => {
    navigation.navigate("CommentsStack", {
      screen: "Comments",
      params: { survey, focus },
    });
  };

  const handleClickLinkIcon = (survey) => {
    navigation.navigate("SurveyDetailsStack", {
      screen: "SurveyDetails",
      params: { survey },
    });
  };

  const handleProfileClick = (survey) => {
    navigation.navigate("VotingProfile", { profileId: survey?.userId });
  };

  return (
    <View
      style={{
        display: "flex",
        padding: 5,
        backgroundColor: darkMode ? "black" : "white",
        position: "relative",
        flex: 1,
      }}
    >
      <View style={styles.filterContainer}>
        <View style={styles.filterInnerContainer}>
          <CustomText
            title={filter}
            fontSize={21}
            style={{ marginRight: 10 }}
          />
          <TouchableOpacity onPress={handleClickFilter}>
            <IonIcon
              name="filter"
              size={25}
              color={darkMode ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>
        <Divider
          color={darkMode ? "white" : "black"}
          style={{
            position: "absolute",
            bottom: 0,
            width: maxWidth,
            marginLeft: -5,
          }}
        />
      </View>
      <View>
        {surveys?.length > 0 ? (
          <FlatList
            data={surveys}
            contentContainerStyle={{
              paddingBottom: 90,
            }}
            renderItem={({ item, index }) => (
              <View key={index} style={{ marginBottom: 5 }}>
                {!user?.premium &&
                  index !== 0 &&
                  index % 12 === 0 &&
                  index !== surveys.length - 1 && (
                    <AdComponent
                      containerStyle={{ marginBottom: 30 }}
                      AdElement={
                        <BannerAd
                          size={BannerAdSize.LARGE_BANNER}
                          requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                          }}
                          unitId={TestIds.BANNER}
                        />
                      }
                    />
                  )}
                <Survey
                  survey={item}
                  clickable={false}
                  onShowComments={() => handleShowComments(item, false)}
                  onCommentClick={() => handleShowComments(item, true)}
                  onProfileClick={() => handleProfileClick(item)}
                  showLinkIcon
                  onClickLinkIcon={() => handleClickLinkIcon(item)}
                  showDeleteIcon={false}
                  showEditIcon={false}
                />
              </View>
            )}
            onEndReached={handleLoadMore}
            bounces={false}
            ListFooterComponent={() =>
              loadMore ? (
                <Loading containerStyle={{ paddingBottom: 10 }} />
              ) : (
                <></>
              )
            }
          />
        ) : loading ? (
          <Loading containerStyle={{ marginTop: 20 }} />
        ) : (
          <EmptyContent
            title="Keine Umfragen"
            containerStyle={{ marginTop: 20 }}
          />
        )}
      </View>

      <Portal>
        <Dialog visible={showFilterOptions} onDismiss={handleChangeFilter}>
          <Dialog.Title
            style={{
              borderBottomWidth: 1,
              borderColor: "gray",
            }}
          >
            <CustomText title="Filter Optionen" fontSize={28} />
          </Dialog.Title>
          <Dialog.Content>
            <CustomText title="Sortieren nach:" fontSize={24} />
            <View style={{ marginTop: 10 }}>
              <RadioButton.Group
                onValueChange={(newValue) => setFilter(newValue)}
                value={filter}
              >
                <View style={styles.filterOptionContainer}>
                  <CustomText title="Neueste" fontFamily="eroded2" />
                  <RadioButton
                    value="Neueste"
                    color={darkMode ? "white" : "black"}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "80%",
                  }}
                >
                  <CustomText title="Am Beliebtesten" fontFamily="eroded2" />
                  <RadioButton
                    value="Am Beliebtesten"
                    color={darkMode ? "white" : "black"}
                  />
                </View>
              </RadioButton.Group>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleChangeFilter}>
              <CustomText title="Fertig" color="#4b9685" fontSize={21} />
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default CommunityRoute;

const styles = StyleSheet.create({
  filterContainer: {
    width: "100%",
    height: 35,
  },
  filterInnerContainer: {
    position: "absolute",
    right: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  filterOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
});
