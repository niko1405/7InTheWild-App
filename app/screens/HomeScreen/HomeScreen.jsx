import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { Divider } from "@react-native-material/core";
import { useSelector } from "react-redux";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import YoutubeIframe from "react-native-youtube-iframe";
import React, { useEffect, useState } from "react";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import { useStateContext } from "../../contexts/ContextProvider";
import CustomText from "../../components/CustomText";
import EmptyContent from "../../components/EmptyContent";
import Note from "../../components/Note";
import images from "../../constants/images";
import DailySurvey from "../../components/DailySurvey";
import BlogPost from "../../components/BlogPost";
import AdComponent from "../../components/AdComponent";

function limit(string, limit) {
  return string.length > limit ? `${string.slice(0, limit)}..` : string;
}

const defaultAdError = {
  1: false,
  2: false,
  3: false,
};

const HomeScreen = ({ navigation }) => {
  const { darkMode } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.user);
  const { dailySurveys } = useSelector((state) => state.survey);
  const { newestPosts } = useSelector((state) => state.post);
  const { data: newsData } = useSelector((state) => state.news);
  const { handleScroll } = useStateContext();

  const [adError, setAdError] = useState(defaultAdError);

  useEffect(() => {
    if (adError !== defaultAdError) setAdError(defaultAdError);
  }, []);

  const handleReadMore = () => {
    navigation.navigate("BlogPostHomeDetails", {
      post: newestPosts[0],
    });
  };

  const handleSurveyClick = () => {
    navigation.navigate("VotingStack", {
      screen: "Voting",
      params: { tabIndex: 1 },
    });
  };

  const handleSocialMedia = () => {
    navigation.navigate("NewsStack", {
      screen: "News",
      params: { tabIndex: 1 },
    });
  };
  console.log(user.pushToken);
  const handleNavigateFAQ = () => {
    navigation.navigate("FAQHome");
  };

  return (
    <ScrollView
      onScroll={handleScroll}
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
      >
        <View style={styles.welcomeView}>
          <CustomText
            title="Willkommen bei"
            darkmode={false}
            style={styles.welcomeTo}
            fontSize={40}
            color="white"
          />
          <Image style={styles.image} source={images.logoStaffel1} />
        </View>
      </ImageBackground>
      <View
        style={[
          styles.container,
          {
            borderColor: darkMode ? "white" : "black",
          },
        ]}
      >
        <View>
          <CustomText title="Wichtige News" fontSize={23} />
          <View style={styles.notificationContainer}>
            {user ? (
              user.notifications?.length > 0 ? (
                <View style={styles.notificationInnerContainer}>
                  <CustomText
                    title={
                      user.notifications[user.notifications.length - 1].title
                    }
                    color="#4b9885"
                    fontSize={21}
                  />
                  <Divider
                    color="#4b9885"
                    style={{ width: "100%", marginTop: 5, marginBottom: 15 }}
                  />
                  <CustomText
                    title={limit(
                      user.notifications[user.notifications.length - 1].body,
                      100
                    )}
                    fontSize={20}
                    fontFamily="eroded2"
                  />
                </View>
              ) : (
                <EmptyContent
                  title="Du hast nichts verpasst 🎉"
                  titleStyle={{ paddingBottom: 10 }}
                />
              )
            ) : (
              <Note
                title="Melde dich an, um nichts Neues zu verpassen!"
                titleFontSize={17}
                iconSize={20}
              />
            )}
          </View>
        </View>

        {!adError[1] && !user?.premium && (
          <AdComponent
            AdElement={
              <BannerAd
                size={BannerAdSize.MEDIUM_RECTANGLE}
                requestOptions={{
                  requestNonPersonalizedAdsOnly: true,
                }}
                unitId={TestIds.BANNER}
                onAdFailedToLoad={() => setAdError({ ...adError, 1: true })}
              />
            }
          />
        )}

        <View style={{ marginTop: 30 }}>
          <CustomText title="Neueste Umfrage" fontSize={23} />
          <View style={{ marginTop: 10, minHeight: 200 }}>
            {dailySurveys?.length > 0 ? (
              <>
                <DailySurvey survey={dailySurveys[0]} />
                <TouchableOpacity
                  style={styles.moreSurveysContainer}
                  onPress={handleSurveyClick}
                >
                  <MaterialIcon name="read-more" size={24} />
                  <CustomText
                    title="Alle ansehen"
                    fontSize={18}
                    color="black"
                    style={{ marginLeft: 5 }}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.noContent}>
                <EmptyContent title="Derzeit keine Umfrage" />
              </View>
            )}
          </View>
        </View>

        {!adError[2] && !user?.premium && (
          <AdComponent
            AdElement={
              <BannerAd
                size={BannerAdSize.LARGE_BANNER}
                requestOptions={{
                  requestNonPersonalizedAdsOnly: true,
                }}
                unitId={TestIds.BANNER}
                onAdFailedToLoad={() => setAdError({ ...adError, 2: true })}
              />
            }
          />
        )}

        <View style={{ marginTop: 60 }}>
          <CustomText title="Neuester Beitrag" fontSize={27} />
          <View style={{ marginTop: 20, minHeight: 200 }}>
            {newestPosts?.length > 0 ? (
              <BlogPost
                post={newestPosts[0]}
                onReadMore={handleReadMore}
                onArchiv={() => {}}
                onClickTag={() => []}
              />
            ) : (
              <View style={styles.noContent}>
                <EmptyContent title="Derzeit keine Posts" />
              </View>
            )}
          </View>
        </View>

        {!adError[3] && !user?.premium && (
          <AdComponent
            AdElement={
              <BannerAd
                size={BannerAdSize.MEDIUM_RECTANGLE}
                requestOptions={{
                  requestNonPersonalizedAdsOnly: true,
                }}
                unitId={TestIds.BANNER}
                onAdFailedToLoad={() => setAdError({ ...adError, 3: true })}
              />
            }
          />
        )}

        <View style={{ marginTop: 60 }}>
          <CustomText title="Entdecken" fontSize={27} />
          <View style={{ marginTop: 20, minHeight: 200 }}>
            {newsData?.length > 0 ? (
              <>
                <YoutubeIframe height={250} videoId={newsData[0]} />
                <YoutubeIframe
                  height={250}
                  videoId={newsData[1]}
                  style={{ marginTop: 10 }}
                />
                <TouchableOpacity
                  style={styles.moreSurveysContainer}
                  onPress={handleSocialMedia}
                >
                  <MaterialIcon name="read-more" size={24} />
                  <CustomText
                    title="Mehr Entdecken"
                    fontSize={18}
                    color="black"
                    style={{ marginLeft: 5 }}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.noContent}>
                <EmptyContent title="Nichts zu Entdecken" />
              </View>
            )}
          </View>
        </View>

        <View style={{ marginTop: 60 }}>
          <Divider
            color={darkMode ? "white" : "black"}
            style={{ marginBottom: 10 }}
          />
          <View style={styles.bottomDiv}>
            <CustomText
              title="➤  Du hast Fragen?"
              fontFamily="eroded2"
              color="#4b9685"
            />
            <TouchableOpacity style={styles.faq} onPress={handleNavigateFAQ}>
              <CustomText
                title="gehe zum F&Q"
                fontFamily="eroded2"
                fontSize={20}
              />
            </TouchableOpacity>
          </View>
          <Note
            title={'Weitere Informationen unter "Einstellungen"'}
            titleFontFamily="eroded2"
            titleFontSize={18}
            containerStyle={{ marginTop: 20 }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    display: "flex",
    padding: 0,
    position: "relative",
    flex: 1,
  },
  welcomeView: {
    display: "flex",
    flexDirection: "column",
    padding: 5,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  moreSurveysContainer: {
    backgroundColor: "#4b9685",
    padding: 5,
    borderRadius: 5,
    marginTop: 30,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  welcomeTo: {
    marginTop: 30,
    marginBottom: 15,
  },
  image: { marginBottom: 10, height: 150, width: 300 },
  container: {
    display: "flex",
    padding: 5,
    paddingTop: 20,
    borderTopWidth: 2,
    paddingBottom: 40,
  },
  noContent: {
    width: "100%",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4b9685",
    borderStyle: "dashed",
  },
  notificationInnerContainer: {
    display: "flex",
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flex: 1,
    padding: 10,
  },
  notificationContainer: {
    borderRadius: 10,
    borderColor: "#4b9685",
    borderWidth: 3,
    height: 130,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  faq: {
    borderColor: "#4b9685",
    borderRadius: 5,
    borderWidth: 2,
    padding: 4,
    width: 130,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageBg: {
    marginTop: -5,
  },
});
