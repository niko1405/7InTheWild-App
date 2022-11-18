import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import Markdown from "react-native-markdown-display";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import images from "../constants/images";
import CustomText from "./CustomText";

const BlogPost = ({ post, onReadMore, onClickTag, onArchiv }) => {
  const { darkMode } = useSelector((state) => state.settings);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onArchiv(post?.createdAt)}
        style={styles.dateContainer}
      >
        <CustomText
          title={post?.createdAt?.replace(",", " ")}
          fontFamily="eroded2"
          fontSize={20}
        />
      </TouchableOpacity>
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
          <View style={styles.infoInnerContainer}>
            <CustomText
              title="Schlagwort"
              fontFamily="eroded2"
              fontSize={22}
              style={{ marginRight: 5 }}
              color={darkMode ? "#c6c4bb" : "#797979"}
            />
            {post?.tags?.length > 0 ? (
              post?.tags?.map((tag, i) => (
                <TouchableOpacity key={i} onPress={() => onClickTag(tag)}>
                  <CustomText
                    title={`${tag}${i < post?.tags?.length - 1 ? "," : ""}`}
                    fontFamily="eroded2"
                    fontSize={22}
                    color={darkMode ? "white" : "black"}
                  />
                </TouchableOpacity>
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

      <Image
        source={post ? { uri: post?.thumbnail?.url } : images.placeholder}
        style={styles.thumbnail}
      />

      <View style={styles.metaContainer}>
        <Markdown style={markDownStyles(darkMode).markdown}>
          {post?.meta}
        </Markdown>
      </View>

      <TouchableOpacity
        style={styles.readMoreContainer}
        onPress={() => onReadMore(post)}
      >
        <MaterialIcon name="read-more" size={24} />
        <CustomText
          title="Mehr lesen"
          fontSize={18}
          color="black"
          style={{ marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BlogPost;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
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
    marginTop: 5,
    minWidth: "100%",
  },
  infoInnerContainer: {
    display: "flex",
    flexDirection: "row",
  },
  tagsInnerContainer: {
    display: "flex",
    flexDirection: "row",
  },
  thumbnail: {
    width: "100%",
    height: 250,
    marginTop: 5,
  },
  metaContainer: {
    marginTop: 5,
  },
  readMoreContainer: {
    backgroundColor: "#4b9685",
    padding: 5,
    borderRadius: 5,
    marginTop: 15,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
