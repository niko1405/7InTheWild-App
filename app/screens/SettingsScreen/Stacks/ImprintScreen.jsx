import { Divider } from "@react-native-material/core";
import {
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSelector } from "react-redux";

import CustomText from "../../../components/CustomText";
import images from "../../../constants/images";
import { useStateContext } from "../../../contexts/ContextProvider";

const info = {
  name: "Nikolas Vix",
  street: "Höfle 10",
  place: "73110 Hattenhofen",
  email: "seveninthewild@gmail.com",
};

const ImprintScreen = () => {
  const { darkMode } = useSelector((state) => state.settings);

  const { handleScroll } = useStateContext();

  return (
    <ScrollView
      onScroll={handleScroll}
      style={darkModeStyles(darkMode).scrollContainer}
    >
      <ImageBackground
        source={images.banner2}
        resizeMode="cover"
        style={styles.imageBg}
      />
      <View style={styles.container}>
        <CustomText title="Impressum" fontFamily="eroded2" fontSize={40} />
        <View style={styles.detailContainer}>
          <CustomText
            title="Angaben gemäß § 5 TMG"
            fontFamily="eroded2"
            style={{ paddingBottom: 5, marginTop: 20 }}
            fontSize={30}
          />
          <View style={styles.detailInnerContainer}>
            <CustomText
              title={info.name}
              fontFamily="eroded2"
              style={{ marginBottom: 5 }}
              fontSize={20}
            />
            <CustomText
              title={info.street}
              fontFamily="eroded2"
              style={{ marginBottom: 5 }}
              fontSize={20}
            />
            <CustomText
              title={info.place}
              fontFamily="eroded2"
              style={{ marginBottom: 5 }}
              fontSize={20}
            />
          </View>
          <CustomText
            title="Kontakt"
            fontFamily="eroded2"
            style={{ marginTop: 20 }}
            fontSize={30}
          />
          <View style={styles.detailContactContainer}>
            <CustomText
              title={`E-Mail Addresse:`}
              fontFamily="eroded2"
              style={{ marginRight: 5 }}
              fontSize={20}
            />
            <CustomText
              title={info.email}
              fontFamily="eroded2"
              style={{ textDecorationLine: "underline" }}
              fontSize={20}
              color="#4b9685"
              onPress={() => Linking.openURL("mailto:seveninthewild@gmail.com")}
            />
          </View>
          <CustomText
            title="Redaktionell verantwortlich"
            fontFamily="eroded2"
            style={{ marginTop: 20 }}
            fontSize={30}
          />
          <CustomText
            title={info.name}
            fontFamily="eroded2"
            style={{ marginTop: 20 }}
            fontSize={20}
          />
        </View>
        <View style={darkModeStyles(darkMode).box}>
          <CustomText
            title="Hinweise zum Inhalt"
            style={{
              alignSelf: "center",
              marginBottom: 10,
            }}
            color="#4b9685"
          />
          <Divider color="#4b9685" style={{ marginBottom: 15 }} />
          <View style={styles.content}>
            <CustomText
              title="Alle assoziierbaren Inhalte in Form von Logos, Bildern und YouTube Videos rund ums Thema 7vsWild sind Eigentum von Fritz Meinecke oder des jeweiligen Content-Creators. Für Inhalte verlinkter oder eingebetteter YouTube-Videos sind ausschließlich Produzent Fritz Meinecke und sein Produkions-Team verantwortlich."
              fontSize={19}
              fontFamily="eroded2"
            />
            <CustomText
              title="Alle eigens aufbereiteten Artikel und Inhalte wurden unterdes nach bestem Gewissen und Recherche verfasst. Falls jedoch Fehler auftauchen sollten, freue ich mich auf einen entsprechenden Hinweis für eine umgehende Behebung desselben."
              fontSize={19}
              fontFamily="eroded2"
              style={{ marginTop: 8 }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ImprintScreen;

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
    padding: 10,
  },
  content: {
    display: "flex",
    alignItems: "center",
  },
  detailContainer: {
    marginBottom: 40,
  },
  detailInnerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 20,
  },
  detailContactContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 20,
  },
});
