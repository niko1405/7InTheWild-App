import { Divider } from "@react-native-material/core";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Toast from "react-native-tiny-toast";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
import { LineChart, BarChart } from "react-native-chart-kit";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import CustomText from "../../components/CustomText";
import images, { participantVotes } from "../../constants/images";
import * as toast from "../../constants/toastOptions";
import { favorits as favoritsImages } from "../../constants/images";
import Loading from "../../components/Loading";
import CustomSelectDropDown from "../../components/CustomSelectDropDown";
import { useRef } from "react";
import ConnectionError from "../../components/ConnectionError";
import {
  getFavoritsAction,
  setFavoritAction,
} from "../../features/profile/profileActions";
import {
  arrayRankTransform,
  loadChartData,
  participants,
  colors,
} from "../../constants/helperFunctions";
import AdComponent from "../../components/AdComponent";

const defaultDatasets = participants.map((_, i) => ({
  data: [0],
  color: (_) => colors[i],
}));

const defaultChartData = {
  lineChart: {
    labels: ["00-00-00"],
    datasets: defaultDatasets,
    legend: participants,
  },
  barChart: {
    labels: participants,
    datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }],
  },
};

const FavoriteRoute = () => {
  const dispatch = useDispatch();
  const layout = useWindowDimensions();
  const lineChartScrollRef = useRef();

  const { darkMode } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.user);
  const { favorits } = useSelector((state) => state.profile);

  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState(user?.favorit || "");
  const [evaluation, setEvaluation] = useState([]);
  const [dataPeriod, setDataPeriod] = useState("total");
  const [chartData, setChartData] = useState(defaultChartData);
  const [reloadedLineChart, setReloadedLineChart] = useState(false);
  const [adError, setAdError] = useState(false);

  const chartConfig = {
    backgroundGradientFrom: darkMode ? "black" : "white",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: darkMode ? "black" : "white",
    backgroundGradientToOpacity: 1,
    color: () => (darkMode ? "white" : "black"),
    strokeWidth: 2,
    useShadowColorFromDataset: false,
  };

  useEffect(() => {
    if (favorits?.votes?.length) {
      setTimeout(() => {
        setEvaluation(arrayRankTransform(favorits?.votes));

        if (!reloadedLineChart) {
          setChartData(loadChartData(dataPeriod, favorits));
          setReloadedLineChart(true);
        }
      }, 100);
    }

    setTimeout(() => setLoading(false), 100);
  }, [favorits]);

  useEffect(() => {
    if (favorits?.votes?.length)
      setChartData(loadChartData(dataPeriod, favorits));
  }, [dataPeriod]);

  const handleVote = (name) => {
    if (!user?._id)
      return Toast.show("Du bist nicht angemeldet", toast.warningOptions);

    if (user?.favorit === name) return;

    setVoted(name);

    dispatch(setFavoritAction(user?._id, name));
  };

  const handleReloadCharts = () => {
    setLoading(true);
    dispatch(
      getFavoritsAction((data, err) => {
        if (!err)
          setChartData(
            loadChartData(dataPeriod, data.favorits, () => setLoading(false))
          );
      })
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <CustomText
          title="Platzierung"
          style={{
            marginBottom: 10,
          }}
          color="#4b9685"
          fontSize={30}
        />
        <Divider color="#4b9685" style={{ marginBottom: 15 }} />
        {loading ? (
          <Loading size={30} />
        ) : (
          <View style={styles.evaluation}>
            {evaluation?.length > 0 ? (
              <>
                <View style={styles.ranking}>
                  <ImageBackground
                    source={favoritsImages[`${evaluation[0].name}Winner`]}
                    style={styles.partWinner}
                  >
                    <CustomText
                      title={`Platz 1`}
                      fontSize={22}
                      style={{ position: "absolute", bottom: 23, left: 85 }}
                    />
                  </ImageBackground>
                  <View
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 210,
                    }}
                  >
                    <ImageBackground
                      source={favoritsImages[`${evaluation[1].name}Second`]}
                      style={styles.partSecond}
                    >
                      <CustomText
                        title={`Platz 2`}
                        fontSize={21}
                        style={{ position: "absolute", bottom: 20, left: 75 }}
                      />
                    </ImageBackground>
                  </View>
                  <View style={{ position: "absolute", right: 0, top: 240 }}>
                    <ImageBackground
                      source={favoritsImages[`${evaluation[2].name}Third`]}
                      style={styles.partThird}
                    >
                      <CustomText
                        title={`Platz ${evaluation[2].rank}`}
                        fontSize={20}
                        style={{ position: "absolute", bottom: 18, left: 67 }}
                      />
                    </ImageBackground>
                  </View>
                </View>
                <Divider
                  color={darkMode ? "white" : "black"}
                  style={{
                    width: layout.width,
                    marginBottom: -15,
                    marginTop: 10,
                  }}
                />
                <ScrollView horizontal>
                  {evaluation
                    .filter((x, i) => i > 2)
                    .map((ev, i) => (
                      <ImageBackground
                        key={i}
                        source={favoritsImages[`${ev.name}Third`]}
                        style={styles.partImg}
                      >
                        <CustomText
                          title={`Platz ${ev.rank}`}
                          fontSize={19}
                          style={{ position: "absolute", bottom: 17, left: 65 }}
                        />
                      </ImageBackground>
                    ))}
                </ScrollView>
                <Divider
                  color={darkMode ? "white" : "black"}
                  style={{ width: layout.width }}
                />
              </>
            ) : (
              <ConnectionError containerStyle={{ padding: 5 }} />
            )}
          </View>
        )}
      </View>
      <View style={{ marginTop: 50 }}>
        <CustomText
          title="Abstimmen"
          style={{
            marginBottom: 10,
          }}
          color="#4b9685"
          fontSize={30}
        />
        <Divider color="#4b9685" style={{ marginBottom: 15 }} />
        <CustomText
          title="Welcher Kandidat für Staffel 2 ist dein Favorit? Klicke, um abzustimmen."
          fontFamily="eroded2"
          fontSize={26}
          style={{ marginBottom: 10, marginTop: 5 }}
        />
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            minWidth: "100%",
          }}
          nestedScrollEnabled
        >
          <FlatList
            data={participantVotes}
            renderItem={({ item, index }) => (
              <View
                key={index}
                style={[
                  {
                    borderColor: "white",
                    width: "50%",
                  },
                  index % 2 == 0 && { borderRightWidth: 1 },
                  index >= 2 && { borderTopWidth: 1 },
                ]}
              >
                <TouchableOpacity
                  onPress={() => handleVote(item.name)}
                  style={styles.voteImg}
                >
                  <Image
                    source={item.source}
                    style={{
                      height: 250,
                      width: "100%",
                      opacity: voted === item.name ? 0.4 : 1,
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  />
                  {voted === item.name && (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <FontAwesome5Icon
                        name="vote-yea"
                        size={50}
                        color={darkMode ? "#6aaa55" : "#16690c"}
                      />
                      <CustomText
                        title="Abgestimmt!"
                        color={darkMode ? "#6aaa55" : "#16690c"}
                        style={{ marginTop: 10 }}
                        fontSize={27}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            )}
            numColumns={2}
          />
        </ScrollView>
      </View>

      {!adError && !user?.premium && (
        <AdComponent
          containerStyle={{ marginTop: 50 }}
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
      )}

      <View style={{ marginTop: 50 }}>
        <View style={styles.statisticContainer}>
          <CustomText
            title="Statistik"
            style={{
              marginBottom: 10,
            }}
            color="#4b9685"
            fontSize={30}
          />
          {!favorits?.votes?.length > 0 && !loading && (
            <ConnectionError
              title="Keine Daten"
              containerStyle={{ position: "absolute", right: 0 }}
            />
          )}
        </View>
        <Divider color="#4b9685" style={{ marginBottom: 15 }} />
        <View style={styles.statisticMenu}>
          <CustomSelectDropDown
            defaultButtonText="Zeitraum"
            defaultValue="Gesamter Zeitraum"
            data={[
              "Letzte 7 Tage",
              "Letzte 30 Tage",
              "Letzte 90 Tage",
              "Gesamter Zeitraum",
            ]}
            dataNames={["7", "30", "90", "total"]}
            setOnSelect={setDataPeriod}
            onSelect={() =>
              lineChartScrollRef.current.scrollTo({ x: 0, animated: false })
            }
          />
          <TouchableOpacity
            onPress={handleReloadCharts}
            style={{ position: "absolute", right: 0 }}
          >
            {loading ? (
              <Loading size={30} />
            ) : (
              <Image
                source={darkMode ? images.reloadWhite : images.reload}
                style={{ width: 30, height: 25 }}
              />
            )}
          </TouchableOpacity>
        </View>
        <ScrollView horizontal ref={lineChartScrollRef}>
          <LineChart
            data={chartData.lineChart}
            width={
              chartData.lineChart.labels.length * 80 < 500
                ? 500
                : chartData.lineChart.labels.length * 80
            }
            height={300}
            verticalLabelRotation={40}
            chartConfig={chartConfig}
            bezier
            style={{ marginLeft: -20 }}
            fromZero
          />
        </ScrollView>
        <CustomText
          title="Totale Stimmen pro Teilnehmer:"
          style={{ marginTop: 30 }}
        />
        <ScrollView horizontal style={{ marginTop: 20 }}>
          <BarChart
            style={{ marginLeft: -20 }}
            data={chartData.barChart}
            width={700}
            height={240}
            chartConfig={{
              ...chartConfig,
              fillShadowGradient: darkMode ? "white" : "black",
              fillShadowGradientOpacity: 1,
            }}
            verticalLabelRotation={30}
            fromZero
          />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default FavoriteRoute;

const styles = StyleSheet.create({
  statisticMenu: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  statisticContainer: {
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
  },
  voteImg: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    height: 250,
    width: "100%",
  },
  partImg: {
    width: 175,
    height: 205,
    position: "relative",
  },
  partThird: {
    width: 180,
    height: 210,
    position: "relative",
  },
  partSecond: {
    width: 200,
    height: 230,
    position: "relative",
  },
  partWinner: {
    width: 220,
    height: 250,
    position: "relative",
  },
  scrollContainer: {
    padding: 3,
    position: "relative",
    paddingBottom: 80,
  },
  container: {
    display: "flex",
    marginTop: 10,
  },
  evaluation: {
    marginTop: -10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ranking: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
    height: 450,
  },
});
