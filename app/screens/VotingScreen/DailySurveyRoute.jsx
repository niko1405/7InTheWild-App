import { FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import Loading from "../../components/Loading";
import EmptyContent from "../../components/EmptyContent";
import { getDailySurveysAction } from "../../features/survey/surveyActions";
import DailySurvey from "../../components/DailySurvey";
import AdComponent from "../../components/AdComponent";

const DailySurveyRoute = () => {
  const dispatch = useDispatch();

  const { darkMode } = useSelector((state) => state.settings);
  const { dailySurveys } = useSelector((state) => state.survey);
  const { user } = useSelector((state) => state.user);

  const [adError, setAdError] = useState(false);
  const [loading, setLoading] = useState(
    dailySurveys.length > 0 ? false : true
  );

  useEffect(() => {
    if (!dailySurveys.length) {
      if (!loading) setLoading(true);
      dispatch(getDailySurveysAction(() => setLoading(false)));
    }
  }, []);

  return (
    <View
      style={{
        display: "flex",
        padding: 5,
        backgroundColor: darkMode ? "black" : "white",
        position: "relative",
      }}
    >
      <View style={styles.container}>
        {dailySurveys?.length > 0 ? (
          <FlatList
            data={dailySurveys}
            contentContainerStyle={styles.flatContainer}
            renderItem={({ item, index }) =>
              index <= 20 ? (
                <View key={index} style={styles.surveyWrapper}>
                  {!user?.premium &&
                    index !== 0 &&
                    index % 8 === 0 &&
                    index !== dailySurveys.length - 1 && (
                      <AdComponent
                        containerStyle={{ marginBottom: 40 }}
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
                  <DailySurvey survey={item} />
                </View>
              ) : null
            }
            ListFooterComponent={() =>
              !adError &&
              !user?.premium && (
                <AdComponent
                  containerStyle={{ marginBottom: 30 }}
                  AdElement={
                    <BannerAd
                      size={BannerAdSize.MEDIUM_RECTANGLE}
                      requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                      }}
                      unitId={TestIds.BANNER}
                      onAdFailedToLoad={() => setAdError(true)}
                    />
                  }
                />
              )
            }
          />
        ) : loading ? (
          <Loading containerStyle={styles.loading} />
        ) : (
          <EmptyContent title="Keine Umfragen" />
        )}
      </View>
    </View>
  );
};

export default DailySurveyRoute;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  surveyWrapper: { marginBottom: 60 },
  flatContainer: {
    paddingBottom: 55,
  },
  loading: { marginTop: 20 },
});
