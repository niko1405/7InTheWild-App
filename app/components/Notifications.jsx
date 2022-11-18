import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Overlay from "react-native-modal-overlay";
import { SwipeListView } from "react-native-swipe-list-view";
import { useState } from "react";
import { useEffect } from "react";

import CustomText from "./CustomText";
import Note from "./Note";
import { Divider } from "@react-native-material/core";
import EmptyContent from "./EmptyContent";
import { changeNotificationsAction } from "../features/user/userActions";
import { useNavigation } from "@react-navigation/native";

let animationIsRunning = false;
let hasChanged = false;

const renderHiddenItem = () => <></>;

const Notifications = ({ isOpened, onClose }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { darkMode, notifications: notificationSettings } = useSelector(
    (state) => state.settings
  );
  const { user } = useSelector((state) => state.user);

  const [notifications, setNotifications] = useState(
    user?.notifications?.map((not) => not)?.reverse()
  );

  useEffect(() => {
    if (user?.notifications) {
      //dispatch changes to server if notifications were deleted
      if (hasChanged) {
        dispatch(changeNotificationsAction(user._id, notifications));
        hasChanged = false;
      }

      setNotifications(user?.notifications?.map((not) => not)?.reverse());
    }

    return () => (hasChanged = false);
  }, [user?.notifications]);

  const handleNotificationClick = ({ data, id }) => {
    dispatch(
      changeNotificationsAction(
        user._id,
        notifications.filter((not) => not.id !== id)
      )
    );

    navigation.navigate(data.location, data.extraLocation);
  };

  const handleClose = () => {
    if (!user) return;

    dispatch(changeNotificationsAction(user._id, notifications));

    hasChanged = false;

    onClose();
  };

  const renderItem = ({ item, index }) => (
    <Animated.View>
      <TouchableOpacity onPress={() => handleNotificationClick(item)}>
        <View key={index} style={styles.notView}>
          <CustomText
            title={item.title}
            fontFamily="eroded2"
            fontSize={17}
            color="#4b9685"
          />
          <CustomText
            title={item.body}
            fontFamily="eroded2"
            fontSize={15}
            style={{ marginTop: 3 }}
          />
          {index < notifications?.length - 1 && (
            <Divider
              color={darkMode ? "white" : "black"}
              style={styles.divider}
            />
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const onSwipeValueChange = (data) => {
    const { key, value } = data;
    if (
      (value < -Dimensions.get("window").width ||
        value > Dimensions.get("window").width) &&
      !animationIsRunning
    ) {
      animationIsRunning = true;
      Animated.timing(new Animated.Value(1), {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setNotifications(notifications.filter((item) => item.id !== key));
        animationIsRunning = false;
        hasChanged = true;
      });
    }
  };

  if (!isOpened) return null;

  return (
    <Overlay
      visible={isOpened}
      onClose={handleClose}
      closeOnTouchOutside
      containerStyle={styles.container}
      childrenWrapperStyle={darkModeStyles(darkMode).contentContainer}
    >
      <View
        onStartShouldSetResponder={() => true}
        style={styles.innerContainer}
      >
        {user ? (
          notificationSettings.enable ? (
            notifications?.length > 0 ? (
              <SwipeListView
                data={notifications}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-Dimensions.get("window").width}
                leftOpenValue={Dimensions.get("window").width}
                previewOpenValue={-0.01}
                previewOpenDelay={0}
                onSwipeValueChange={onSwipeValueChange}
                useNativeDriver={false}
                keyExtractor={(item) => {
                  return item.id.toString();
                }}
              />
            ) : (
              <EmptyContent
                title="Keine Benachrichtigungen"
                containerStyle={styles.note}
                fontSize={17}
              />
            )
          ) : (
            <Note
              containerStyle={styles.note}
              title="Benachrichtigungen sind deaktiviert"
              titleFontSize={18}
              iconSize={20}
            />
          )
        ) : (
          <Note
            containerStyle={styles.note}
            title="Du bist nicht angemeldet!"
            titleFontSize={18}
            iconSize={20}
          />
        )}
      </View>
    </Overlay>
  );
};

export default Notifications;

const darkModeStyles = (darkMode) =>
  StyleSheet.create({
    contentContainer: {
      position: "absolute",
      right: 0,
      top: 40,
      backgroundColor: darkMode ? "black" : "white",
      borderWidth: 2,
      borderColor: darkMode ? "white" : "black",
      padding: 5,
      display: "flex",
      alignItems: "flex-start",
      width: 280,
      height: 300,
    },
  });

const styles = StyleSheet.create({
  note: {
    alignSelf: "center",
    marginTop: 20,
  },
  notView: {
    marginBottom: 10,
    padding: 2,
  },
  divider: { width: 230, marginTop: 10 },
  innerContainer: {
    display: "flex",
    width: "100%",
  },
});
