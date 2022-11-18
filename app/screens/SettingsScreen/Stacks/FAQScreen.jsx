import { Divider } from "@react-native-material/core";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import IconAwesome from "react-native-vector-icons/FontAwesome";
import { AccordionList } from "accordion-collapse-react-native";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import CustomText from "../../../components/CustomText";
import images from "../../../constants/images";
import { ScrollView } from "react-native-gesture-handler";
import { useStateContext } from "../../../contexts/ContextProvider";
import AdComponent from "../../../components/AdComponent";
import { useState } from "react";

const appQuestions = [
  {
    title: "Wie ändere ich Anmeldedaten?",
    body: `Um deine Anmeldedaten zu ändern, gehe auf den Reiter "Account" unter "Einstellungen". Hier hast du die Möglichkeit dein Benutzername, Email-Addresse oder Passwort zu ändern.`,
  },
  {
    title: "Passwort vergessen?",
    body: `Du kannst das Passwort ändern, indem du im Logintab zu "Passwort vergessen?" navigierst. Dieses Feld erscheint nach einmaligem Fehlversuch.`,
  },
  {
    title: "Wie erstelle ich eine Umfrage?",
    body: `Umfragen können nur mit Autorisierung erstellt werden. Um eine neue Umfrage zu erstellen ist das Ausfüllen der erforderlichen Felder im Tab "Erstellen" unter "Home" notwendig.`,
  },
  {
    title: "Wie finde ich ein Profil?",
    body: `Um ein Profil zu finden, navigiere zu "Nachrichten" und gebe den gesuchten Profilnamen in die Suchleiste ein.`,
  },
  {
    title: "Wie deaktiviere ich Werbung?",
    body: `Das Deaktivieren von Werbeanzeigen ist nur Premium-Nutzern vorbehalten, mehr dazu unter "Premium". Werbeanzeigen sind erforderlich für eine kostenlose Nutzung der App.`,
  },
  {
    title: "Wie melde ich Fehler?",
    body: `Hilf mit beim Fehler suchen für eine reibungslose App-Nutzung! Gefundene Fehler können gerne als Rezession im Play-/Appstore gesendet werden.`,
  },
  {
    title: "Wie lösche ich meinen Account?",
    body: `Navigiere zum Reiter "Account Löschen" unter "Einstellungen", um deinen Account zu löschen. Bedenke, dass dein Account nach löschen desselben nicht wiederhergestellt werden kann!`,
  },
  {
    title: "Wie aktiviere ich den Darkmode?",
    body: `Die Nutzung des Darkmodes ist nur für Premium-Nutzer verfügbar, mehr dazu unter "Premium".`,
  },
];

const SvWQuestions = [
  {
    title: "Wo kann man 7vsWild anschauen?",
    body: "Die Serie 7vsWild findet man auf dem Hauptkanal von Fritz Meinecke (Produzent). Dort wird auch Staffel 2 erscheinen.",
  },
  {
    title: "Wo wird Staffel 2 stattfinden?",
    body: "Der genaue Drehort ist den Zuschauern noch vorenthalten, jedoch ist bekannt, dass es sich bei der Location um eine Inselgruppe in den Tropen handeln muss.",
  },
  {
    title: "Wann beginnt Staffel 2?",
    body: "Wie Staffel 1 wird auch Staffel 2 im November/Dezember 2022 ausgestrahlt. Die Teilnehmer waren bereits im August/September auf der Insel.",
  },
  {
    title: "Wo erfahre ich Neues zu 7vsWild?",
    body: "Alle News zu 7vsWild findest du auf dem Live-Kanal von Fritz-Meinecke und - für alle, die keine Zeit haben die Videos anzuschauen - zusammengefasst hier im Blog.",
  },
  {
    title: "Wer ist bei Staffel 2 dabei?",
    body: `Fritz Meinecke (Produzent), Sascha Huber (Fittness-Youtuber), Starlet-Nova (Streamerin), Sabrina-Outdoor (Survival-Youtuberin), Knossi (Streamer), Otto (Bulletproof-Entrepreneur) und Joris (Wildcard-Gewinner). Mehr Informationen unter "7vsWild Info"`,
  },
];

const FAQScreen = () => {
  const { darkMode } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.user);

  const { handleScroll } = useStateContext();

  const [adError, setAdError] = useState(false);

  const QuestionHeader = (item, index, isExpanded) => {
    return (
      <View
        style={[
          styles.questionHeader,
          {
            borderWidth: !isExpanded ? 1 : 0,
            borderColor: darkMode ? "white" : "black",
          },
        ]}
      >
        <CustomText title={item.title} fontSize={20} fontFamily="eroded2" />
        <IconAwesome
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={15}
          color={darkMode ? "white" : "black"}
        />
      </View>
    );
  };

  const QuestionBody = (item) => {
    return (
      <View style={{ marginBottom: 15, padding: 5 }}>
        <CustomText title={item.body} fontSize={17} fontFamily="eroded2" />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        onScroll={handleScroll}
        style={darkModeStyles(darkMode).scrollContainer}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <ImageBackground
          source={images.banner2}
          resizeMode="cover"
          style={styles.imageBg}
        />
        <View style={styles.container}>
          <View style={darkModeStyles(darkMode).box}>
            <CustomText
              title="Fragen zur App-Nutzung"
              style={{
                alignSelf: "center",
                marginBottom: 10,
              }}
              color="#4b9685"
            />
            <Divider color="#4b9685" style={{ marginBottom: 15 }} />
            <ScrollView
              horizontal
              contentContainerStyle={{ maxWidth: "100%", width: "100%" }}
            >
              <AccordionList
                list={appQuestions}
                header={QuestionHeader}
                body={QuestionBody}
              />
            </ScrollView>
          </View>
          <View style={darkModeStyles(darkMode).box}>
            <CustomText
              title="Fragen zu 7vsWild"
              style={{
                alignSelf: "center",
                marginBottom: 10,
              }}
              color="#4b9685"
            />
            <Divider color="#4b9685" style={{ marginBottom: 15 }} />
            <ScrollView
              horizontal
              contentContainerStyle={{ maxWidth: "100%", width: "100%" }}
            >
              <AccordionList
                list={SvWQuestions}
                header={QuestionHeader}
                body={QuestionBody}
              />
            </ScrollView>
          </View>
        </View>
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

export default FAQScreen;

const darkModeStyles = (darkMode) =>
  StyleSheet.create({
    scrollContainer: {
      display: "flex",
      padding: 0,
      position: "relative",
      flex: 1,
      overflowY: "scroll",
      backgroundColor: darkMode ? "black" : "white",
    },
    box: {
      marginTop: 20,
      padding: 20,
      dispolay: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      shadowOpacity: 0.9,
      elevation: 6,
      borderWidth: 2,
      shadowColor: darkMode ? "white" : "black",
      borderColor: "transparent",
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
  container: {
    padding: 5,
    marginTop: 15,
  },
  questionContainer: {
    display: "flex",
    width: "100%",
  },
  questionHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
    borderBottomWidth: 1,
  },
});
