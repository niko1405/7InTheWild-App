import { useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import CustomText from "../../../components/CustomText";
import Section from "../../../components/Section";

const defaultCollapseText = {
  concept: false,
};

const concept =
  "Sieben Teilnehmer mit unterschiedlich großer Erfahrung in den Bereichen Camping, Bushcrafting und Outdoor werden in einem nicht näher definierten Bereich ausgesetzt. Die Teilnehmer können, abgesehen von ihrer Kleidung, bis zu sieben Gegenstände mitnehmen, die laut Regelwerk zur Auswahl stehen. Die erlaubte Kleidung ist nach ihrer Art vorgegeben. Das Ziel der Show ist, sich nach der Aussetzung in völliger Isolation in der Wildnis zurechtzufinden. Hierzu zählen Aufgaben wie u. a. die Nahrungssuche, das Bauen bzw. Finden eines Unterschlupfes, der Aufbau eines Schlafplatzes, Trinkwasserversorgung, das Bestehen der vorbereiteten Aufgaben für Punkte sowie das Filmen der genannten Tätigkeiten. Allen Teilnehmern wurden außerdem ein verplombtes Erste-Hilfe-Set, ein verplombtes Mobiltelefon, ein GPS-Sender sowie technisches Equipment zur filmischen Dokumentation bereitgestellt.";

const GeneralRoute = () => {
  const [collapseText, setCollapseText] = useState(defaultCollapseText);

  const { darkMode } = useSelector((state) => state.settings);

  return (
    <ScrollView contentContainerStyle={{ paddingLeft: 5, paddingBottom: 100 }}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../assets/images/bannerStaffel1.png")}
          style={{
            height: 260,
            width: "100%",
            marginLeft: -5,
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Image
            source={
              darkMode
                ? require("../../../assets/images/quote.png")
                : require("../../../assets/images/quoteDark.png")
            }
            style={{ height: 50, width: 50, marginTop: 20 }}
          />
          <CustomText
            style={{ marginTop: 10 }}
            title="Ausgesetzt in der Wildnis von Schweden, kämpfen 7 Kanididaten, 7 Tage ums überleben. Jeder muss mit 7 vorher ausgewählten Gegenständen und der Kleidung am Körper auskommen. Wer nach 7 Tagen noch übrig ist und die meisten Punkte in den Tageschallenges gesammelt hat, ist der Gewinner. Keine Kamerateams, kein Kontakt zur Außenwelt. Vollkommene Isolation !"
          />
          <CustomText style={{ marginTop: 30 }} title="- 7vsWild - Schweden" />
          <CustomText
            style={{ marginTop: 5 }}
            fontSize={20}
            color="#4b9685"
            title="Produktion Fritz Meinecke"
          />
        </View>
      </View>
      <Section title="Konzept">
        <View>
          <TouchableOpacity
            onPress={() =>
              setCollapseText({
                ...collapseText,
                concept: !collapseText.concept,
              })
            }
          >
            <CustomText
              title={
                collapseText.concept ? concept : `${concept.slice(0, 200)}...`
              }
              fontSize={18}
              style={{ marginTop: 10 }}
            />
          </TouchableOpacity>
        </View>
      </Section>
    </ScrollView>
  );
};

export default GeneralRoute;
