import React, { useState } from "react";
import { useEffect } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import IonIcon from "react-native-vector-icons/Ionicons";

import BlogPost from "../../components/BlogPost";
import EmptyContent from "../../components/EmptyContent";
import Loading from "../../components/Loading";
import {
  getArchiveAction,
  getPostsAction,
  getPostsByFilterAction,
  searchPostsAction,
} from "../../features/post/postActions";
import { clear } from "../../features/post/postSlice";
import CustomText from "../../components/CustomText";
import {
  Button,
  Dialog,
  Portal,
  RadioButton,
  Searchbar,
} from "react-native-paper";
import CustomSelectDropDown from "../../components/CustomSelectDropDown";

let filter = "";

const NewsRoute = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { darkMode } = useSelector((state) => state.settings);
  const {
    currentSection,
    posts: statePosts,
    totalPosts,
    archive,
    newestPosts,
  } = useSelector((state) => state.post);

  const [loading, setLoading] = useState(!newestPosts.length);
  const [loadMore, setLoadMore] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [archiveFilter, setArchiveFilter] = useState("Neueste");
  const [queryFilter, setQueryFilter] = useState("Neueste");
  const [posts, setPosts] = useState(newestPosts);

  useFocusEffect(
    React.useCallback(() => {
      setPosts(newestPosts);

      if (!newestPosts.length) {
        if (!loading) setLoading(true);
        dispatch(getPostsAction(0, () => setLoading(false)));
      }

      return () => {
        dispatch(clear());
        clearComponent();
      };
    }, [])
  );

  useEffect(() => {
    if (statePosts.length) setPosts(statePosts);
  }, [statePosts]);

  useEffect(() => {
    dispatch(getArchiveAction());
  }, []);

  useEffect(() => {
    if (loadMore) {
      dispatch(getPostsAction(currentSection, () => setLoadMore(false)));
    }
  }, [loadMore]);

  const handleLoadMore = () => {
    if (loading) return;
    if (queryFilter !== "Neueste") return;
    if (totalPosts <= posts?.length) return;

    if (!loadMore && totalPosts > posts?.length) setLoadMore(true);
  };

  const handleReadMore = (post) => {
    navigation.navigate("BlogPostDetails", { post });
  };

  const handleArchive = () => {
    filter = queryFilter;

    setShowArchive(true);
  };

  const handlePostArchive = (dateObj) => {
    setLoading(true);

    const date = dateObj.split(",")[0].split(" ");
    const filter = `${date[1]} ${date[2]}`;

    if (queryFilter === filter) return;

    dispatch(getPostsByFilterAction(filter, () => setLoading(false)));

    setQueryFilter(filter);
    setArchiveFilter("Monaten");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query.trim()) resetSearch();
  };

  const handleSubmitSearch = () => {
    if (!searchQuery.trim()) return resetSearch();

    setLoading(true);

    dispatch(searchPostsAction(searchQuery, () => setLoading(false)));

    setQueryFilter("-");
    setArchiveFilter("");
  };

  const handleChangeArchiveFilter = (value) => {
    setArchiveFilter(value);

    if (value === "Neueste") return setQueryFilter(value);

    setQueryFilter(archive[0]);
  };

  const handleSubmitArchive = () => {
    setShowArchive(false);

    if (queryFilter === filter) return;

    setLoading(true);

    if (archiveFilter === "Neueste")
      return newestPosts.length
        ? setPosts(newestPosts)
        : dispatch(getPostsAction(0, () => setLoading(false)));

    dispatch(getPostsByFilterAction(queryFilter, () => setLoading(false)));
  };

  const handleClickTag = (tag) => {
    if (queryFilter.includes(tag)) return;

    setLoading(true);

    setQueryFilter(`"${tag}"`);
    setArchiveFilter("");

    dispatch(getPostsByFilterAction(tag, () => setLoading(false), true));
  };

  const resetSearch = () => {
    setQueryFilter("Neueste");
    setArchiveFilter("Neueste");

    setLoading(true);

    newestPosts.length
      ? setPosts(newestPosts)
      : dispatch(getPostsAction(0, () => setLoading(false)));
  };

  const clearComponent = () => {
    setQueryFilter("Neueste");
    setArchiveFilter("Neueste");
    setPosts(newestPosts);
  };

  return (
    <View>
      <View style={styles.topBar}>
        <View style={styles.tobBarArchive}>
          <TouchableOpacity onPress={handleArchive}>
            <IonIcon
              name="ios-archive"
              size={27}
              color={darkMode ? "white" : "black"}
            />
          </TouchableOpacity>
          <CustomText
            title={queryFilter}
            fontFamily="eroded2"
            fontSize={21}
            style={{ marginLeft: 5 }}
          />
        </View>
        <View style={styles.tobBarSearch}>
          <Searchbar
            placeholder="Suchen.."
            value={searchQuery}
            onChangeText={handleSearch}
            icon={() => (
              <IonIcon
                name="md-search"
                size={22}
                color={darkMode ? "white" : "black"}
                style={{ marginLeft: -10 }}
              />
            )}
            style={styles.searchBar}
            inputStyle={styles.searchBarInput}
            onIconPress={handleSubmitSearch}
            onSubmitEditing={handleSubmitSearch}
          />
        </View>
      </View>
      <View style={styles.scrollContainer}>
        {posts?.length > 0 ? (
          <FlatList
            data={posts}
            contentContainerStyle={{
              paddingBottom: 55,
            }}
            renderItem={({ item, index }) => (
              <View key={index} style={styles.blogPostContainer}>
                <BlogPost
                  post={item}
                  onReadMore={handleReadMore}
                  onArchiv={handlePostArchive}
                  onClickTag={handleClickTag}
                />
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
          />
        ) : loading ? (
          <Loading containerStyle={{ marginTop: 20 }} />
        ) : (
          <EmptyContent
            title="Keine Ergebnisse"
            containerStyle={{
              marginTop: 20,
            }}
          />
        )}
      </View>

      <Portal>
        <Dialog visible={showArchive} onDismiss={handleSubmitArchive}>
          <Dialog.Title
            style={{
              borderBottomWidth: 1,
              borderColor: "gray",
            }}
          >
            <CustomText title="Archiv Optionen" fontSize={28} />
          </Dialog.Title>
          <Dialog.Content>
            <CustomText title="Sortieren nach:" fontSize={24} />
            <View style={{ marginTop: 10 }}>
              <RadioButton.Group
                onValueChange={handleChangeArchiveFilter}
                value={archiveFilter}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "80%",
                  }}
                >
                  <CustomText title="Neueste" fontFamily="eroded2" />
                  <RadioButton
                    value="Neueste"
                    color={darkMode ? "white" : "black"}
                  />
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "80%",
                    }}
                  >
                    <CustomText title="Monaten" fontFamily="eroded2" />
                    <RadioButton
                      value="Monaten"
                      color={darkMode ? "white" : "black"}
                    />
                  </View>
                  {archiveFilter === "Monaten" && (
                    <CustomSelectDropDown
                      title="Auswahl"
                      titleFontFamily="eroded2"
                      defaultValue={
                        queryFilter !== "Neueste" ? queryFilter : archive[0]
                      }
                      data={archive}
                      setOnSelect={setQueryFilter}
                    />
                  )}
                </View>
              </RadioButton.Group>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleSubmitArchive}>
              <CustomText title="Fertig" color="#4b9685" fontSize={21} />
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default NewsRoute;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 5,
  },
  blogPostContainer: {
    marginBottom: 50,
    marginTop: 10,
  },
  topBar: {
    padding: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  tobBarArchive: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "50%",
  },
  tobBarSearch: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  searchBar: {
    width: "100%",
    height: 30,
    borderRadius: 8,
    padding: 3,
  },
  searchBarInput: {
    fontFamily: "eroded2",
    fontSize: 20,
    marginLeft: -15,
  },
});
