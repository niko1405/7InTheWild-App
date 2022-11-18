import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import { useSelector } from "react-redux";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import IonIcon from "react-native-vector-icons/Ionicons";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import OctiIcon from "react-native-vector-icons/Octicons";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import { client, urlFor } from "../../../../client";
import CustomText from "../../../components/CustomText";
import ParticipantList from "../../../components/ParticipantList";
import Section from "../../../components/Section";
import AdComponent from "../../../components/AdComponent";

const defaultAdError = {
  1: false,
  2: false,
  3: false,
};

const Fact = ({
  iconType,
  iconName,
  title,
  data,
  color = "#4b9685",
  fontSize = 20,
  iconSize = 25,
}) => {
  const { darkMode } = useSelector((state) => state.settings);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      {iconType === "ionIcon" && (
        <IonIcon
          name={iconName}
          size={iconSize}
          color={darkMode ? "white" : "black"}
          style={{ marginRight: 6 }}
        />
      )}
      {iconType === "fontAwesome5" && (
        <FontAwesome5Icon
          name={iconName}
          size={iconSize}
          color={darkMode ? "white" : "black"}
          style={{ marginRight: 6 }}
        />
      )}
      {iconType === "community" && (
        <CommunityIcon
          name={iconName}
          size={iconSize}
          color={darkMode ? "white" : "black"}
          style={{ marginRight: 6 }}
        />
      )}
      {iconType === "octiIcon" && (
        <OctiIcon
          name={iconName}
          size={iconSize}
          color={darkMode ? "white" : "black"}
          style={{ marginRight: 6 }}
        />
      )}
      <CustomText title={title} color={color} />
      <CustomText title={data} fontSize={fontSize} />
    </View>
  );
};

const defaultStaffelData = {
  staffelImg: "",
  facts: {
    location: "",
    temperature: "",
    weather: "",
    animals: "",
    plants: "",
    securityTeams: 1,
    broadcast: "",
  },
  clothing: [],
  participantList: {
    participants: [],
  },
  standardGear: [],
  challengeImg: {
    whiteChallengeImg: undefined,
    blackChallengeImg: undefined,
  },
  winner: {
    winnerImg: "",
    winnerName: "",
    winnerInfo: "",
    winnerPoints: 0,
  },
  weightLoss: [],
  rules: {
    images: [],
    rules: [],
  },
  videos: [],
  partContacts: [],
};

const defaultCollapseText = {
  winnerInfo: false,
};

const imagePlaceholder = require("../../../assets/images/imagePlaceholder.png");

const StaffelInfoRoute = ({ staffelIndex }) => {
  const [staffelData, setStaffelData] = useState(defaultStaffelData);
  const [collapseText, setCollapseText] = useState(defaultCollapseText);
  const [ruleImagesIndex, setRuleImagesIndex] = useState(0);
  const [adError, setAdError] = useState(defaultAdError);

  const { darkMode } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.user);

  const navigation = useNavigation();
  const ruleImages = [];

  if (staffelData.rules?.images?.length > 0) {
    staffelData.rules.images.forEach((image) => {
      ruleImages.push({ uri: urlFor(image).url() });
    });
  }

  useEffect(() => {
    const query = '*[_type == "staffelRoutes"]';

    setTimeout(() => {
      client.fetch(query).then((data) => {
        setStaffelData(data[0]?.staffelRoutes[staffelIndex]);
      });
    }, 300);
  }, []);

  const handleNextImageIndex = (images, index) => {
    if (index >= images.length - 1) return 0;
    return index + 1;
  };

  const handlePreviousImageIndex = (images, index) => {
    if (index <= 0) return images.length - 1;
    return index - 1;
  };

  return (
    <ScrollView contentContainerStyle={{ paddingLeft: 5, paddingBottom: 100 }}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={
            staffelData.staffelImg
              ? { uri: urlFor(staffelData.staffelImg).url() }
              : imagePlaceholder
          }
          style={{ height: 260, width: "100%", marginLeft: -5 }}
        />
      </View>
      {staffelData.facts && (
        <Section title="Facts">
          <ScrollView
            horizontal
            contentContainerStyle={{ display: "flex", flexDirection: "column" }}
          >
            <Fact
              title="Location: "
              iconType="ionIcon"
              iconName="location-outline"
              data={staffelData.facts.location}
            />
            <Fact
              title="Temperaturen: "
              iconType="fontAwesome5"
              iconName="temperature-high"
              data={staffelData.facts.temperature}
            />
            <Fact
              title="Wetter: "
              iconType="community"
              iconName="weather-hail"
              data={staffelData.facts.weather}
            />
            <Fact
              title="Tiere: "
              iconType="fontAwesome5"
              iconName="pastafarianism"
              data={staffelData.facts.animals}
            />
            <Fact
              title="Pflanzen: "
              iconType="community"
              iconName="palm-tree"
              data={staffelData.facts.plants}
            />
            <Fact
              title="Rettungsteams: "
              iconType="community"
              iconName="security"
              data={staffelData.facts.securityTeams}
            />
            <Fact
              title="Ausstrahlung: "
              iconType="octiIcon"
              iconName="broadcast"
              data={staffelData.facts.broadcast}
            />
          </ScrollView>
        </Section>
      )}

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

      {staffelData.participantList?.participants?.length > 0 && (
        <Section title="Teilnehmer">
          <ParticipantList
            data={staffelData.participantList.participants}
            style={{ marginLeft: -5 }}
          />
        </Section>
      )}

      {staffelData.standardGear && (
        <Section title="Sonstige GegenstÄnde">
          {staffelData.standardGear.map((gear, i) => (
            <CustomText
              key={i}
              title={`- ${gear}`}
              style={{ padding: 5 }}
              fontSize={20}
            />
          ))}
        </Section>
      )}

      {staffelData.clothing && (
        <Section title="Kleidung">
          {staffelData.clothing.map((cloth, i) => (
            <CustomText
              key={i}
              title={`- ${cloth}`}
              style={{ padding: 5 }}
              fontSize={20}
            />
          ))}
        </Section>
      )}

      {staffelData.challengeImg?.blackChallengeImg && (
        <Section title="Challenge Übersicht">
          <ScrollView horizontal>
            <Image
              source={
                staffelData.challengeImg.blackChallengeImg &&
                staffelData.challengeImg.whiteChallengeImg
                  ? {
                      uri: urlFor(
                        darkMode
                          ? staffelData.challengeImg.whiteChallengeImg
                          : staffelData.challengeImg.blackChallengeImg
                      ).url(),
                    }
                  : imagePlaceholder
              }
              style={{ height: 450, width: 700, marginTop: 5 }}
            />
          </ScrollView>

          {!adError[2] && !user?.premium && (
            <AdComponent
              containerStyle={{ marginTop: 30, marginBottom: 30 }}
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
        </Section>
      )}

      {staffelData.winner?.winnerName?.length > 0 && (
        <Section title="Gewinner">
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={
                  staffelData.winner.winnerImg
                    ? { uri: urlFor(staffelData.winner.winnerImg).url() }
                    : imagePlaceholder
                }
                style={{ width: 200, height: 200, marginTop: 5 }}
              />
              <CustomText
                title={staffelData.winner.winnerName}
                style={{
                  marginTop: 10,
                  marginBottom: 5,
                  color: "#ffd700",
                }}
                fontSize={30}
                darkmode={false}
              />
              <CustomText
                title={`Mit ${staffelData.winner.winnerPoints} Punkten`}
                darkmode={false}
                style={{ color: "#168b34" }}
                fontSize={18}
              />
            </View>
            {staffelData.winner.winnerInfo.length > 80 ? (
              <TouchableOpacity
                onPress={() =>
                  setCollapseText({
                    ...collapseText,
                    winnerInfo: !collapseText.winnerInfo,
                  })
                }
              >
                <CustomText
                  title={
                    collapseText.winnerInfo
                      ? staffelData.winner.winnerInfo
                      : `${staffelData.winner.winnerInfo.slice(0, 70)}...`
                  }
                  fontSize={18}
                  style={{ marginTop: 10 }}
                />
              </TouchableOpacity>
            ) : (
              <CustomText
                title={staffelData.winner.winnerInfo}
                fontSize={18}
                style={{ marginTop: 10 }}
              />
            )}
          </View>
        </Section>
      )}

      {staffelData.weightLoss?.length > 0 && (
        <Section title="Gewichtsverluste">
          <ScrollView
            horizontal
            contentContainerStyle={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {staffelData.weightLoss.map((image, i) => (
              <Image
                key={i}
                source={{ uri: urlFor(image).url() }}
                style={{ height: 200, width: 500 }}
              />
            ))}
          </ScrollView>
        </Section>
      )}

      {staffelData.rules && (
        <Section title="Regelwerk">
          <View>
            {staffelData.rules.rules &&
              staffelData.rules.rules.map((rule, i) => (
                <CustomText
                  key={i}
                  title={`${i + 1}. ${rule}`}
                  style={{ padding: 5, marginBottom: 10 }}
                  fontSize={20}
                />
              ))}
            {ruleImages.length > 0 && (
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: -5,
                }}
              >
                <ImageBackground
                  source={ruleImages[ruleImagesIndex]}
                  style={{ height: 600, width: "100%", position: "relative" }}
                >
                  <AwesomeIcon
                    name="chevron-left"
                    size={25}
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      padding: 2,
                    }}
                    color="#a7a598"
                    onPress={() => {
                      setRuleImagesIndex(
                        handlePreviousImageIndex(
                          staffelData.rules.images,
                          ruleImagesIndex
                        )
                      );
                    }}
                  />
                  <AwesomeIcon
                    name="chevron-right"
                    size={25}
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      padding: 2,
                    }}
                    color="#a7a598"
                    onPress={() => {
                      setRuleImagesIndex(
                        handleNextImageIndex(
                          staffelData.rules.images,
                          ruleImagesIndex
                        )
                      );
                    }}
                  />
                </ImageBackground>
              </View>
            )}
          </View>
        </Section>
      )}

      {staffelData.videos?.length > 0 && (
        <Section title="Folgen">
          {staffelData.videos.map((video, i) => (
            <View key={i}>
              {i < 3 && (
                <View style={{ display: "flex", flexDirection: "column" }}>
                  <CustomText
                    title={`${i + 1}. ${video.title}`}
                    style={{ marginTop: 5, marginBottom: 5 }}
                  />
                  <YoutubeIframe height={250} videoId={video.url} />
                </View>
              )}
            </View>
          ))}
          <View
            style={{
              marginTop: -10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("StaffelVideos", {
                  videos: staffelData.videos,
                })
              }
            >
              <CustomText
                title="Alle ansehen"
                darkmode={false}
                style={{
                  color: "#4b9685",
                }}
              />
            </TouchableOpacity>
          </View>
        </Section>
      )}

      {!adError[3] && !user?.premium && (
        <AdComponent
          containerStyle={{ marginTop: 30 }}
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
    </ScrollView>
  );
};

export default StaffelInfoRoute;
