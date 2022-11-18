import { useRoute } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { useState } from "react";
import Markdown from "react-native-markdown-display";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import images from "../constants/images";
import CustomText from "./CustomText";
import AdComponent from "./AdComponent";
import { Divider } from "@react-native-material/core";

const BlogPostDetails = () => {
  const route = useRoute();
  const post = route?.params?.post;

  const { darkMode } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.user);

  const [adError, setAdError] = useState(false);

  return (
    <ScrollView style={scrollViewStyles(darkMode).scrollContainer}>
      <Image
        source={post ? { uri: post?.thumbnail?.url } : images.placeholder}
        style={{ minWidth: "100%", minHeight: 200 }}
        resizeMode="cover"
      />

      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <CustomText
            title={post?.createdAt?.replace(",", " ")}
            fontFamily="eroded2"
            fontSize={20}
          />
        </View>
        <CustomText title={post?.title} fontSize={32} fontFamily="eroded2" />

        <View style={styles.infoContainer}>
          <ScrollView horizontal contentContainerStyle={styles.infoContainer}>
            <View style={[styles.infoInnerContainer, { paddingRight: 30 }]}>
              <CustomText
                title="Von"
                fontFamily="eroded2"
                fontSize={22}
                style={{ marginRight: 5 }}
                color={darkMode ? "#c6c4bb" : "#797979"}
              />
              <CustomText
                title={post?.author}
                fontFamily="eroded2"
                fontSize={22}
                color={darkMode ? "white" : "black"}
              />
            </View>
            <View style={styles.tagsInnerContainer}>
              <CustomText
                title="Schlagwort"
                fontFamily="eroded2"
                fontSize={22}
                style={{ marginRight: 5 }}
                color={darkMode ? "#c6c4bb" : "#797979"}
              />
              {post?.tags?.length > 0 ? (
                post?.tags?.map((tag, i) => (
                  <CustomText
                    key={i}
                    title={`${tag}${i < post?.tags?.length - 1 ? "," : ""}`}
                    fontFamily="eroded2"
                    fontSize={22}
                    color={darkMode ? "white" : "black"}
                  />
                ))
              ) : (
                <CustomText
                  title="Keine"
                  fontFamily="eroded2"
                  fontSize={22}
                  color={darkMode ? "white" : "black"}
                />
              )}
            </View>
          </ScrollView>
        </View>

        <View style={styles.contentContainer}>
          <Markdown style={markDownStyles(darkMode).markdown}>
            {post?.content}
          </Markdown>
        </View>
      </View>

      {!adError && !user?.premium && (
        <>
          <Divider
            color={darkMode ? "white" : "black"}
            style={{ marginTop: 30 }}
          />
          <AdComponent
            containerStyle={{ marginTop: 20, paddingBottom: 20 }}
            AdElement={
              <BannerAd
                size={BannerAdSize.LARGE_BANNER}
                requestOptions={{
                  requestNonPersonalizedAdsOnly: true,
                }}
                unitId={TestIds.BANNER}
                onAdFailedToLoad={() => setAdError(true)}
              />
            }
          />
        </>
      )}
    </ScrollView>
  );
};

export default BlogPostDetails;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
    padding: 3,
  },
  dateContainer: {
    padding: 4,
    backgroundColor: "#4b9685",
    marginBottom: 10,
    width: "auto",
    borderRadius: 5,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: "100%",
    marginTop: 5,
  },
  infoInnerContainer: {
    display: "flex",
    flexDirection: "row",
  },
  tagsInnerContainer: {
    display: "flex",
    flexDirection: "row",
  },
  contentContainer: {
    padding: 3,
    marginTop: 5,
  },
});

const scrollViewStyles = (darkMode) =>
  StyleSheet.create({
    scrollContainer: {
      display: "flex",
      backgroundColor: darkMode ? "black" : "white",
      flex: 1,
    },
  });

const markDownStyles = (darkMode) =>
  StyleSheet.create({
    markdown: {
      paragraph: {
        lineHeight: 26,
      },
      body: {
        color: darkMode ? "#eaeaea" : "black",
        fontFamily: "eroded2",
        fontSize: 22,
        display: "flex",
      },
      image: {
        minWidth: "100%",
        minHeight: 200,
        resizeMode: "contain",
        alignSelf: "center",
      },
      heading1: {
        flexDirection: "row",
        fontSize: 42,
      },
      heading2: {
        flexDirection: "row",
        fontSize: 36,
      },
      heading3: {
        flexDirection: "row",
        fontSize: 30,
      },
      heading4: {
        flexDirection: "row",
        fontSize: 28,
      },
      heading5: {
        flexDirection: "row",
        fontSize: 25,
      },
      heading6: {
        flexDirection: "row",
        fontSize: 23,
      },
      ordered_list: {
        paddingTop: 15,
        paddingBottom: 15,
      },
      bullet_list: {
        paddingTop: 15,
        paddingBottom: 15,
      },
      list_item: {
        marginBottom: 5,
      },
    },
  });
