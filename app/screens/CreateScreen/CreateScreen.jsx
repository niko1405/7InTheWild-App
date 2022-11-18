import { Divider } from "@react-native-material/core";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import Toast from "react-native-tiny-toast";

import CustomText from "../../components/CustomText";
import Survey from "../../components/Survey";
import { useStateContext } from "../../contexts/ContextProvider";
import CustomTextInput from "../../components/CustomTextInput";
import * as toast from "../../constants/toastOptions";
import images from "../../constants/images";
import {
  createSurveyAction,
  getSurveyAction,
  updateSurveyAction,
} from "../../features/survey/surveyActions";
import { clear } from "../../features/survey/surveySlice";

const CreateScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const surveyId = route?.params?.surveyId;

  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState("");

  const { darkMode } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.user);
  const { survey: stateSurvey } = useSelector((state) => state.survey);

  const { handleScroll } = useStateContext();

  const survey = surveyId ? stateSurvey : null;

  useEffect(() => {
    if (surveyId) dispatch(getSurveyAction(surveyId));

    return () => {
      dispatch(clear());
      navigation.setParams({ surveyId: undefined, title: "Umfrage erstellen" });
    };
  }, []);

  useEffect(() => {
    if (survey && surveyId) {
      setQuestion(survey.question);
      setOptions(survey.options);
      setMessage(survey.message);
    }
  }, [survey]);

  const handleChipInput = (value) => {
    if (options.filter((option) => option.name === value).length)
      return Toast.show(
        "Diese Antwortmöglichkeit gibt es bereits",
        toast.errorOptions
      );

    if (options.length >= 10)
      return Toast.show(
        "Es sind maximal 10 Antwortmöglichkeit möglich",
        toast.errorOptions
      );

    if (value.length >= 35)
      return Toast.show("Die maximale Länge beträgt 35", toast.errorOptions);

    setOptions([...options, { name: value, clicked: [] }]);
  };

  const handleDeleteOption = (name) => {
    setOptions(options.filter((option) => option.name !== name));
  };

  const handleSubmit = () => {
    if (!question.length || !message.length || !options.length)
      return Toast.show("Bitte fülle alle Felder aus", toast.warningOptions);

    if (options.length < 2)
      return Toast.show(
        "Du musst mindestens 2 Antwortmöglichkeiten angeben",
        toast.errorOptions
      );

    if (surveyId)
      dispatch(
        updateSurveyAction(
          surveyId,
          { question, options, message, uri: user?.profileImg?.uri },
          handleClear,
          navigation.setParams
        )
      );
    else
      dispatch(
        createSurveyAction(
          user?._id,
          { question, options, message, uri: user?.profileImg?.uri },
          handleClear
        )
      );
  };

  const handleClear = () => {
    setOptions([]);
    setQuestion("");
    setMessage("");
  };

  const handleCancel = () => {
    navigation.navigate("ProfileStack");
  };

  return (
    <ScrollView
      onScroll={handleScroll}
      style={darkModeStyles(darkMode).scrollView}
    >
      <ImageBackground source={images.banner2} style={styles.imageBg} />
      <View style={{ padding: 5, marginTop: 10 }}>
        <TextInput
          label="Frage"
          style={styles.textInput}
          activeUnderlineColor={darkMode ? "white" : "black"}
          underlineColor={darkMode ? "white" : "black"}
          theme={{ fonts: { regular: { fontFamily: "eroded2" } } }}
          onChangeText={(value) => setQuestion(value)}
          maxLength={150}
          value={question}
        />
        <TextInput
          label="Nachricht"
          style={[
            styles.textInput,
            {
              marginTop: 10,
            },
          ]}
          activeUnderlineColor={darkMode ? "white" : "black"}
          underlineColor={darkMode ? "white" : "black"}
          theme={{ fonts: { regular: { fontFamily: "eroded2" } } }}
          onChangeText={(value) => setMessage(value)}
          maxLength={500}
          value={message}
        />
        <CustomText
          title="Antwortmöglichkeiten"
          style={{ marginTop: 30 }}
          fontSize={20}
          fontFamily="eroded2"
        />
        <View style={darkModeStyles(darkMode).optionsContainer}>
          {options.length > 0 ? (
            <ScrollView
              horizontal
              contentContainerStyle={styles.optionsScrollContainer}
            >
              {options.map((option, i) => (
                <View key={i} style={styles.optionContainer}>
                  <CustomText
                    title={option.name}
                    fontSize={19}
                    style={{ marginRight: 5 }}
                    color="#2e2e2e"
                    fontFamily="eroded2"
                  />
                  <TouchableOpacity
                    onPress={() => handleDeleteOption(option.name)}
                  >
                    <IonIcon name="ios-close-sharp" size={20} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          ) : (
            <CustomText
              title="Keine"
              color={darkMode ? "" : "#2e2e2e"}
              fontSize={18}
            />
          )}
          <CustomTextInput
            placeHolder="Text .."
            borderColor="transparent"
            contentContainerStyle={{
              marginTop: 15,
            }}
            onSubmit={handleChipInput}
            blurOnSubmit={false}
            maxLength={35}
            style={{ width: "100%" }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleClear}>
            <View style={darkModeStyles(darkMode).clearButton}>
              <MaterialIcon
                name="clear"
                size={25}
                style={{ marginRight: 9, color: "#994c40" }}
              />
              <CustomText
                title="Leeren"
                fontSize={20}
                color={darkMode ? "#a5a5a5" : "black"}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} style={styles.sendButton}>
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
        </View>
        {surveyId && (
          <TouchableOpacity
            onPress={handleCancel}
            style={{ marginTop: 20, alignSelf: "center" }}
          >
            <View style={darkModeStyles(darkMode).cancelButton}>
              <MaterialIcon
                name="cancel"
                size={25}
                style={{ marginRight: 9, color: "#994c40" }}
              />
              <CustomText
                title="Abbrechen"
                fontSize={20}
                color={darkMode ? "#a5a5a5" : "black"}
              />
            </View>
          </TouchableOpacity>
        )}
        <CustomText
          title="Vorschau"
          color="#4b9685"
          fontSize={30}
          style={{ marginTop: 30 }}
        />
        <Divider color="#4b9685" />
        <Survey
          containerStyle={{ marginTop: 10 }}
          userName={user?.userName}
          question={question}
          options={options}
          message={message}
          uri={user?.profileImg}
          time="vor ein paar Sekunden"
          clickable={false}
        />
      </View>
    </ScrollView>
  );
};

export default CreateScreen;

const darkModeStyles = (darkMode) =>
  StyleSheet.create({
    scrollView: {
      display: "flex",
      padding: 0,
      backgroundColor: darkMode ? "black" : "white",
      position: "relative",
      flex: 1,
    },
    cancelButton: {
      display: "flex",
      flexDirection: "row",
      borderWidth: 1,
      borderColor: darkMode ? "#a5a5a5" : "black",
      borderRadius: 5,
      padding: 5,
      alignItems: "center",
      justifyContent: "center",
      width: 335,
      height: 35,
    },
    clearButton: {
      display: "flex",
      flexDirection: "row",
      borderWidth: 1,
      borderColor: darkMode ? "#a5a5a5" : "black",
      borderRadius: 5,
      padding: 5,
      alignItems: "center",
      justifyContent: "center",
      width: 160,
      height: 35,
    },
    optionsContainer: {
      borderWidth: 1,
      borderColor: darkMode ? "white" : "black",
      padding: 10,
      position: "relative",
      paddingBottom: 0,
      marginTop: 2,
    },
  });

const styles = StyleSheet.create({
  imageBg: {
    height: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    backgroundColor: "transparent",
    fontSize: 21,
    height: 60,
  },
  optionsScrollContainer: {
    display: "flex",
    flexDirection: "row",
  },
  optionContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 7,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#a2a2a2",
    marginRight: 5,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButton: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 15,
    alignItems: "center",
    backgroundColor: "#4b9685",
    borderRadius: 5,
    width: 160,
    height: 35,
    justifyContent: "center",
  },
});
