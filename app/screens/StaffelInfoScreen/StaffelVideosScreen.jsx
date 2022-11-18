import { ScrollView, View } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import { useSelector } from "react-redux";
import CustomText from "../../components/CustomText";

const StaffelVideosScreen = ({ route, navigation }) => {
  const { videos } = route.params;

  const { darkMode } = useSelector((state) => state.settings);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        backgroundColor: darkMode ? "black" : "white",
      }}
    >
      <ScrollView style={{ marginTop: 50, marginBottom: 50 }}>
        {videos.map((video, i) => (
          <View key={i}>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <CustomText
                darkmode
                title={`${i + 1}. ${video.title.toUpperCase()}`}
                style={{ marginTop: 5, marginBottom: 5 }}
              />
              <YoutubeIframe height={250} videoId={video.url} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default StaffelVideosScreen;
