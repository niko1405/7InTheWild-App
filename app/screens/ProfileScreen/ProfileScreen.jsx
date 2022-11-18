import { Divider } from "@react-native-material/core";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { Button, Dialog, Portal, Searchbar } from "react-native-paper";
import Toast from "react-native-tiny-toast";
import * as toast from "../../constants/toastOptions";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import CustomText from "../../components/CustomText";
import { useStateContext } from "../../contexts/ContextProvider";
import Survey from "../../components/Survey";
import CustomAvatar from "../../components/CustomAvatar";
import images, { favorits } from "../../constants/images";
import Loading from "../../components/Loading";
import EmptyContent from "../../components/EmptyContent";
import {
  getProfileAction,
  updateProfileAction,
} from "../../features/profile/profileActions";
import { getProfileSurveysAction } from "../../features/survey/surveyActions";
import { clearProfile } from "../../features/profile/profileSlice";
import AdComponent from "../../components/AdComponent";

const emptyForm = {
  description: "",
  profileImg: {
    uri: "",
  },
};

const defaultProfileStats = {
  surveys: 0,
  answeredSurveys: 0,
};

const defaultChangeImage = {
  uri: "",
  type: "",
  name: "",
};

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const profileId = route?.params?.profileId;

  const { handleScroll } = useStateContext();

  const { user, loading } = useSelector((state) => state.user);
  const { userProfile } = useSelector((state) => state.profile);
  const { darkMode } = useSelector((state) => state.settings);
  const { profileSurveys, ownSurveys } = useSelector((state) => state.survey);

  const ownProfile = !profileId || user?._id === profileId;

  const profileUser = ownProfile ? user : userProfile;

  const [editProfile, setEditProfile] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [cancelEdit, setCancelEdit] = useState(false);
  const [profileStats, setProfileStats] = useState(defaultProfileStats);
  const [showChangeImageWindow, setShowChangeImageWindow] = useState(false);
  const [changeImage, setChangeImage] = useState(defaultChangeImage);
  const [surveys, setSurveys] = useState([]);
  const [adError, setAdError] = useState(false);

  const loadData = (user) => {
    setForm({
      description: user.description || "",
      profileImg: { uri: user.profileImg?.uri || "" },
    });
    setProfileStats({
      ...profileStats,
      answeredSurveys: user.answeredSurveys || 0,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      if (profileId && !ownProfile) {
        dispatch(getProfileAction(profileId, null, false));
        dispatch(getProfileSurveysAction(profileId));
      }

      if (user && ownProfile) setSurveys(ownSurveys);

      return () => {
        dispatch(clearProfile());
        setProfileStats(defaultProfileStats);
        setForm(emptyForm);
        setSurveys([]);
      };
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (profileUser) loadData(profileUser);
    }, [profileUser, userProfile])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (ownProfile) setSurveys(ownSurveys);
      else setSurveys(profileSurveys);
    }, [profileSurveys, ownSurveys])
  );

  const handleDescription = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleCancelEdit = () => {
    if (
      form.description !== profileUser.description ||
      form.profileImg.uri !== profileUser.profileImg?.uri
    )
      return setCancelEdit(true);

    setEditProfile(false);
  };

  const handleDiscardChanges = () => {
    setForm({
      description: profileUser.description,
      profileImg: { uri: profileUser.profileImg?.uri },
    });

    setEditProfile(false);
    setCancelEdit(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setChangeImage({
        uri: result.uri,
        type: `${result.type}/${
          result.uri.split("/").slice(-1)[0].split(".")[1]
        }`,
        name: result.uri.split("/").slice(-1)[0],
      });
    }
  };

  const handleSubmit = () => {
    const data = new FormData();
    data.append("description", form.description);
    console.log(form.profileImg);
    if (
      form.profileImg.uri &&
      form.profileImg.uri !== profileUser?.profileImg?.uri &&
      form.profileImg.name.length
    ) {
      console.log("test");
      data.append("profileImg", {
        uri:
          Platform.OS === "android"
            ? form.profileImg.uri
            : form.profileImg.uri.replace("file://", ""),
        type: form.profileImg.type,
        name: form.profileImg.name,
      });
    } else if (
      form.profileImg.uri.length &&
      form.profileImg.uri !== profileUser?.profileImg?.uri
    )
      data.append("imageUrl", form.profileImg.uri);

    dispatch(updateProfileAction(profileUser._id, data, setEditProfile));
  };

  const handleCommentClick = (survey) => {
    navigation.navigate("CommentsStack", {
      screen: "Comments",
      params: { survey, focus: true },
    });
  };

  const handleMessage = () => {
    if (!user)
      return Toast.show("Du bist nicht angemeldet!", toast.warningOptions);

    navigation.navigate("Message", {
      userName: profileUser?.userName,
      profileId: profileUser?._id,
    });
  };

  const handleSubmitChangeImage = () => {
    setShowChangeImageWindow(false);

    if (!changeImage.uri.length) return;

    setForm({ ...form, profileImg: changeImage });

    setChangeImage(defaultChangeImage);
  };

  const handleImageUrlInput = (value) => {
    setChangeImage({ ...defaultChangeImage, uri: value });
  };

  return (
    <ScrollView
      onScroll={handleScroll}
      style={[
        styles.scrollContainer,
        { backgroundColor: darkMode ? "black" : "white" },
      ]}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <ImageBackground source={images.banner2} style={styles.imageBg} />
      <View style={{ padding: 10, display: "flex", marginTop: 10 }}>
        <View style={styles.topContainer}>
          <View style={styles.profileImageContainer}>
            <CustomAvatar uri={form.profileImg?.uri} />
            {editProfile && (
              <TouchableOpacity
                style={[
                  styles.cam,
                  { borderColor: darkMode ? "white" : "black" },
                ]}
                onPress={() => setShowChangeImageWindow(true)}
              >
                <CommunityIcon name="camera-plus" size={25} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.profileStats}>
            <View style={{ display: "flex", justifyContent: "center" }}>
              <CustomText
                title="Umfragen"
                fontSize={16}
                style={{ marginBottom: 5 }}
              />
              <CustomText
                title={intToString(surveys?.length || 0)}
                fontSize={21}
                color={darkMode ? "#d7d5b9" : "#6b6954"}
              />
            </View>
            <View style={{ display: "flex", justifyContent: "center" }}>
              <CustomText
                title="Beantw. Umfragen"
                fontSize={16}
                style={{ marginBottom: 5 }}
              />
              <CustomText
                title={intToString(profileStats.answeredSurveys)}
                fontSize={21}
                color={darkMode ? "#d7d5b9" : "#6b6954"}
              />
            </View>
          </View>
        </View>
        <View style={styles.profileInfo}>
          <CustomText
            title={profileUser?.userName}
            fontSize={30}
            color="#4b9685"
          />
          <ScrollView
            onStartShouldSetResponder={() => true}
            style={{ maxHeight: 250, width: "100%" }}
          >
            <TextInput
              style={[
                styles.description,
                {
                  borderWidth: editProfile ? 1 : 0,
                  borderColor: darkMode ? "white" : "black",
                  color: darkMode ? "#c6c4bb" : "black",
                },
              ]}
              multiline
              contextMenuHidden
              maxLength={200}
              editable={editProfile}
              textAlign="center"
              value={form.description}
              onChangeText={(value) =>
                editProfile && handleDescription("description", value)
              }
            />
          </ScrollView>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          {ownProfile ? (
            <>
              <TouchableOpacity
                onPress={() =>
                  editProfile ? handleCancelEdit() : setEditProfile(true)
                }
                style={[
                  styles.editBtn,
                  {
                    backgroundColor: editProfile ? "transparent" : "#4b9685",
                    borderWidth: editProfile ? 1 : 0,
                  },
                ]}
              >
                <MaterialIcon
                  name={editProfile ? "edit-off" : "edit"}
                  size={20}
                  color={editProfile ? (darkMode ? "white" : "black") : "white"}
                />
                <CustomText
                  title="Profil bearbeiten"
                  color={editProfile ? "#4b9685" : "black"}
                  fontSize={18}
                  style={{
                    padding: 9,
                  }}
                />
              </TouchableOpacity>
              {editProfile && (
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.submitBtn}
                >
                  <IonIcon
                    name="ios-checkmark-circle-outline"
                    size={20}
                    color={"white"}
                  />
                  <CustomText
                    title="Senden"
                    color="black"
                    fontSize={18}
                    style={{
                      padding: 9,
                    }}
                  />
                </TouchableOpacity>
              )}
            </>
          ) : (
            <TouchableOpacity onPress={handleMessage} style={styles.messageBtn}>
              <CommunityIcon
                name="message-reply-text-outline"
                size={20}
                color={"white"}
              />
              <CustomText
                title="Nachricht"
                color="black"
                fontSize={18}
                style={{
                  padding: 9,
                }}
              />
            </TouchableOpacity>
          )}
        </View>

        {!adError && !user?.premium && (
          <AdComponent
            AdElement={
              <BannerAd
                size={BannerAdSize.BANNER}
                requestOptions={{
                  requestNonPersonalizedAdsOnly: true,
                }}
                unitId={TestIds.BANNER}
                onAdFailedToLoad={() => setAdError(true)}
              />
            }
          />
        )}

        <View style={{ marginTop: 40 }}>
          <CustomText
            title="Favorit"
            style={{
              marginBottom: 10,
            }}
            color="#4b9685"
          />
          <Divider color="#4b9685" style={{ marginBottom: 15 }} />
          {user?.favorit?.length > 0 ? (
            <Image
              source={favorits[`${user?.favorit}Third`]}
              style={{ width: 180, height: 230, marginTop: -20 }}
            />
          ) : (
            <Image
              source={favorits["NoFavorit"]}
              style={{ width: 180, height: 230, marginTop: -20 }}
            />
          )}
        </View>
        <View style={{ marginTop: 40 }}>
          <CustomText
            title="Umfragen"
            style={{
              marginBottom: 10,
            }}
            color="#4b9685"
          />
          <Divider color="#4b9685" style={{ marginBottom: 15 }} />
          {surveys.length > 0 && (
            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                minWidth: "100%",
              }}
              nestedScrollEnabled
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent:
                    surveys.length > 1 ? "space-evenly" : "flex-start",
                  width: "100%",
                }}
              >
                <FlatList
                  data={surveys}
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
                      <Survey
                        survey={item}
                        containerStyle={{ width: "100%" }}
                        size="small"
                        showMessage={false}
                        onCommentClick={() => handleCommentClick(item)}
                        onVote={() =>
                          setProfileStats({
                            ...profileStats,
                            answeredSurveys: profileStats.answeredSurveys + 1,
                          })
                        }
                      />
                    </View>
                  )}
                  numColumns={2}
                  scrollEnabled={false}
                  extraData={surveys}
                  nestedScrollEnabled
                />
              </View>
            </ScrollView>
          )}
          {surveys.length <= 0 &&
            (loading ? (
              <Loading />
            ) : (
              <EmptyContent title="Keine Umfragen" fontSize={17} />
            ))}
        </View>
      </View>

      <Portal>
        <Dialog visible={cancelEdit} onDismiss={() => setCancelEdit(false)}>
          <Dialog.Title style={styles.dialogTitle}>
            <CustomText title="Warnung" color="#aba865" fontSize={26} />
          </Dialog.Title>
          <Dialog.Content>
            <CustomText
              title="Möchtest du die Änderungen verwerfen?"
              fontSize={23}
              fontFamily="eroded2"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setCancelEdit(false)}>
              <CustomText title="Abrechen" color="gray" fontSize={21} />
            </Button>
            <Button onPress={handleDiscardChanges}>
              <CustomText title="Ja" color="#4b9685" fontSize={21} />
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          visible={showChangeImageWindow}
          onDismiss={() => setShowChangeImageWindow(false)}
        >
          <Dialog.Title style={styles.dialogTitle}>
            <CustomText title="Profilbild Ändern" fontSize={26} />
          </Dialog.Title>
          <Dialog.Content>
            <View style={styles.windowChangeImage}>
              <CustomText
                title="Galerie:"
                style={{ marginRight: 15 }}
                fontSize={25}
                fontFamily="eroded2"
              />
              <TouchableOpacity style={styles.uploadImage} onPress={pickImage}>
                <CustomText
                  title="Hochladen"
                  fontSize={22}
                  style={{ marginRight: 5 }}
                />
                <CommunityIcon name="camera-plus" size={25} />
              </TouchableOpacity>
            </View>
            <CustomText
              title="Oder"
              fontSize={20}
              style={{ textAlign: "center" }}
              fontFamily="eroded2"
            />
            <Searchbar
              placeholder="Url"
              value={changeImage.uri}
              onChangeText={handleImageUrlInput}
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
            />
            <View style={styles.imageChangeAvatar}>
              <CustomAvatar uri={changeImage.uri} />
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleSubmitChangeImage}>
              <CustomText title="Fertig" color="#4b9685" fontSize={21} />
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  searchBar: {
    width: "100%",
    height: 30,
    borderRadius: 8,
    padding: 3,
    marginTop: 15,
  },
  searchBarInput: {
    fontFamily: "eroded2",
    fontSize: 20,
    marginLeft: -15,
  },
  uploadImage: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#4b9685",
    borderRadius: 5,
    padding: 3,
    alignItems: "center",
  },
  windowChangeImage: {
    marginTop: 10,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
  },
  imageChangeAvatar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  dialogTitle: {
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  messageBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4b9685",
    borderRadius: 5,
    justifyContent: "center",
    width: 150,
  },
  submitBtn: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 15,
    alignItems: "center",
    backgroundColor: "#4b9685",
    borderRadius: 5,
    width: 120,
    justifyContent: "center",
  },
  description: {
    fontFamily: "eroded2",
    padding: 5,
    width: "100%",
    fontSize: 22,
    marginTop: 5,
    lineHeight: 20,
  },
  profileInfo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  profileStats: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "70%",
  },
  cam: {
    position: "absolute",
    bottom: -5,
    right: 15,
    backgroundColor: "#4b9685",
    borderRadius: 100,
    padding: 5,
    borderWidth: 1,
  },
  imageBg: {
    height: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    display: "flex",
    padding: 0,
    position: "relative",
    flex: 1,
    overflowY: "scroll",
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  profileImageContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "30%",
    position: "relative",
  },
  editBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#4b9685",
    borderRadius: 5,
    width: 200,
    justifyContent: "center",
  },
});

function intToString(num) {
  num = num.toString().replace(/[^0-9.]/g, "");
  if (num < 1000) {
    return num;
  }
  let si = [
    { v: 1e3, s: "Tsd" },
    { v: 1e6, s: "Mio" },
    { v: 1e9, s: "B" },
    { v: 1e12, s: "T" },
    { v: 1e15, s: "P" },
    { v: 1e18, s: "E" },
  ];
  let index;
  for (index = si.length - 1; index > 0; index--) {
    if (num >= si[index].v) {
      break;
    }
  }
  return (
    (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
    " " +
    si[index].s
  );
}
