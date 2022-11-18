import { Divider } from "@react-native-material/core";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Awesome5Icon from "react-native-vector-icons/FontAwesome5";
import AntIcon from "react-native-vector-icons/AntDesign";
import IonIcon from "react-native-vector-icons/Ionicons";
import { Button, Dialog, Portal } from "react-native-paper";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import CustomText from "../../components/CustomText";
import { useStateContext } from "../../contexts/ContextProvider";
import images from "../../constants/images";
import {
  deleteAccountAction,
  logoutAction,
} from "../../features/user/userActions";
import AdComponent from "../../components/AdComponent";

const CustomListItem = ({
  onPress = () => {},
  leadingIconName = "",
  title = "",
  trailingIconName = "chevron-right",
  titleStyle = {},
  titleColor = undefined,
  trailingIcon = true,
  containerStyle = {},
  leadingIconType = "materialIcon",
}) => {
  const { darkMode } = useSelector((state) => state.settings);

  const icons = {
    materialIcon: MaterialIcon,
    communityIcon: CommunityIcon,
    awesome5Icon: Awesome5Icon,
    ionIcon: IonIcon,
    antIcon: AntIcon,
  };

  const Icon = icons[leadingIconType];

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          {
            display: "flex",
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: darkMode ? "white" : "black",
            position: "relative",
            padding: 10,
            alignItems: "center",
            marginBottom: 10,
          },
          containerStyle,
        ]}
      >
        <Icon
          name={leadingIconName}
          size={24}
          style={{
            marginRight: 10,
            color: darkMode ? "white" : "black",
          }}
        />
        <CustomText title={title} style={titleStyle} color={titleColor} />
        {trailingIcon && (
          <CommunityIcon
            name={trailingIconName}
            size={24}
            style={{
              position: "absolute",
              right: 0,
              color: darkMode ? "white" : "black",
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const emptyRemark = {
  message: "",
  error: false,
};

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [remark, setRemark] = useState(emptyRemark);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [adError, setAdError] = useState(false);

  const { handleScroll } = useStateContext();

  const { user } = useSelector((state) => state.user);
  const { darkMode } = useSelector((state) => state.settings);

  const handleLogout = () => {
    dispatch(logoutAction(navigation.navigate));
  };

  const handleDeletePress = () => {
    setShowDeleteWarning(true);
  };

  const handleDeleteAccount = () => {
    dispatch(deleteAccountAction(user._id, navigation.navigate));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        onScroll={handleScroll}
        style={[
          styles.scrollContainer,
          {
            backgroundColor: darkMode ? "black" : "white",
          },
        ]}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        <ImageBackground
          source={images.banner2}
          resizeMode="cover"
          style={styles.imageBg}
        />
        <View style={{ padding: 10 }}>
          <View
            style={[
              styles.mySettings,
              {
                shadowColor: darkMode ? "white" : "black",
              },
            ]}
          >
            <CustomText
              title="Meine Einstellungen"
              style={{
                alignSelf: "center",
                marginBottom: 10,
              }}
              color="#4b9685"
            />
            <Divider color="#4b9685" style={{ marginBottom: 15 }} />
            <CustomListItem
              leadingIconName="notifications-active"
              title="Benachrichtigungen"
              onPress={() => navigation.navigate("Notification")}
            />
            <CustomListItem
              leadingIconType="communityIcon"
              leadingIconName="account"
              title="Account"
              onPress={() => navigation.navigate("Account")}
            />
            <CustomListItem
              leadingIconName="stars"
              title="Premium"
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => navigation.navigate("Premium")}
            />
          </View>
          <View
            style={[
              styles.moreContainer,
              {
                shadowColor: darkMode ? "white" : "black",
              },
            ]}
          >
            <CustomText
              title="Weiteres"
              style={{
                alignSelf: "center",
                marginBottom: 10,
              }}
              color="#4b9685"
            />
            <Divider color="#4b9685" style={{ marginBottom: 15 }} />
            <CustomListItem
              leadingIconType="awesome5Icon"
              leadingIconName="question-circle"
              title="FAQ"
              onPress={() => navigation.navigate("FAQ")}
            />
            <CustomListItem
              leadingIconType="awesome5Icon"
              leadingIconName="user-shield"
              title="Datenschutz"
              onPress={() => navigation.navigate("Privacy")}
            />
            <CustomListItem
              leadingIconName="info-outline"
              title="Impressum"
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => navigation.navigate("Imprint")}
            />
          </View>
          {user !== null && (
            <View
              style={[
                styles.bottomBtns,
                {
                  shadowColor: darkMode ? "white" : "black",
                },
              ]}
            >
              <CustomListItem
                leadingIconName="logout"
                title="Ausloggen"
                titleColor="#994c40"
                trailingIcon={false}
                onPress={handleLogout}
              />
              <CustomListItem
                leadingIconType="communityIcon"
                leadingIconName="delete-forever"
                title="Account Löschen"
                titleColor="#7e2516"
                trailingIcon={false}
                containerStyle={{ borderBottomWidth: 0 }}
                onPress={handleDeletePress}
              />
            </View>
          )}
        </View>

        <Portal>
          <Dialog
            visible={showDeleteWarning}
            onDismiss={() => setShowDeleteWarning(false)}
          >
            <Dialog.Title style={styles.dialogTitle}>
              <CustomText title="Warnung" color="#aba865" fontSize={26} />
            </Dialog.Title>
            <Dialog.Content>
              <View style={styles.deleteWarning}>
                <CustomText
                  title="Möchtest du deinen Account wirklich löschen?"
                  fontSize={20}
                  fontFamily="eroded2"
                />
                <CustomText
                  title="Achtung"
                  color="#994c40"
                  style={{ marginTop: 20 }}
                  fontSize={22}
                />
                <CustomText
                  title="Der Account kann nicht wiederhergestellt werden!"
                  style={{ marginTop: 5 }}
                  fontSize={20}
                  fontFamily="eroded2"
                />
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShowDeleteWarning(false)}>
                <CustomText title="Abrechen" color="gray" fontSize={21} />
              </Button>
              <Button onPress={handleDeleteAccount}>
                <CustomText title="Ok" color="#994c40" fontSize={21} />
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Portal>
          <Dialog
            visible={remark.message?.length > 0}
            onDismiss={() => setRemark(emptyRemark)}
          >
            <Dialog.Title style={styles.dialogTitle}>
              <CustomText
                title={remark.error ? "Fehler" : "Info"}
                color={remark.error ? "#994c40" : "#aba865"}
                fontSize={26}
              />
            </Dialog.Title>
            <Dialog.Content>
              <CustomText
                title={remark.message}
                style={{ marginTop: 10, marginLeft: -10 }}
                fontSize={21}
                fontFamily="eroded2"
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setRemark(emptyRemark)}>
                <CustomText title="Ok" color="#4b90ad" fontSize={21} />
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>

      {!adError && !user?.premium && (
        <AdComponent
          containerStyle={{ position: "absolute", bottom: 0 }}
          showText={false}
          AdElement={
            <BannerAd
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
              unitId={TestIds.BANNER}
              onAdFailedToLoad={() => setAdError(true)}
            />
          }
        />
      )}
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dialogTitle: {
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  deleteWarning: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 15,
  },
  moreContainer: {
    marginTop: 20,
    padding: 20,
    dispolay: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    shadowOpacity: 0.9,
    elevation: 6,
    borderWidth: 2,
    borderColor: "transparent",
  },
  bottomBtns: {
    marginTop: 20,
    padding: 20,
    dispolay: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    shadowOpacity: 0.9,
    elevation: 6,
    borderWidth: 2,
    borderColor: "transparent",
  },
  mySettings: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    shadowOpacity: 0.9,
    elevation: 6,
    borderWidth: 2,
    borderColor: "transparent",
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
});
