import { FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import YoutubeIframe from "react-native-youtube-iframe";

import { useEffect } from "react";
import Loading from "../../components/Loading";
import EmptyContent from "../../components/EmptyContent";
import { getNewsDataAction } from "../../features/news/newsActions";

const SocialMediaRoute = () => {
  const dispatch = useDispatch();

  const { data, currentSection, pageToken, total } = useSelector(
    (state) => state.news
  );

  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    if (!data?.length) {
      dispatch(getNewsDataAction(0, null, () => setLoading(false)));
    } else setTimeout(() => setLoading(false), 3000);
  }, []);

  useEffect(() => {
    if (loadMore && !loading) {
      dispatch(
        getNewsDataAction(currentSection, pageToken, () => setLoadMore(false))
      );
    }
  }, [loadMore]);

  const handleLoadMore = () => {
    if (loading) return;
    if (data?.length >= 50) return;
    if (total <= data?.length) return;

    if (!loadMore && total > data?.length) setLoadMore(true);
  };

  return (
    <View>
      <View style={styles.dataContainer}>
        {loading && <Loading containerStyle={{ marginTop: 20 }} />}
        {data?.length > 0 ? (
          <FlatList
            data={data}
            contentContainerStyle={{
              paddingBottom: 55,
            }}
            renderItem={({ item, index }) => (
              <View key={index} style={styles.videoContainer}>
                <YoutubeIframe height={250} videoId={item} />
              </View>
            )}
            onEndReached={handleLoadMore}
            ListFooterComponent={() =>
              loadMore ? (
                <Loading containerStyle={{ paddingBottom: 20 }} />
              ) : (
                <></>
              )
            }
            extraData={data}
          />
        ) : (
          !loading && (
            <EmptyContent
              title="Keine Ergebnisse"
              containerStyle={{
                marginTop: 20,
              }}
            />
          )
        )}
      </View>
    </View>
  );
};

export default SocialMediaRoute;

const styles = StyleSheet.create({
  dataContainer: {
    marginTop: 10,
  },
  videoContainer: {
    marginBottom: 30,
  },
});
