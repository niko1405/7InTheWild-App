import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import CustomText from "../../../components/CustomText";
import images from "../../../constants/images";
import { useStateContext } from "../../../contexts/ContextProvider";

const PrivacyScreen = () => {
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
      <View style={{ padding: 10 }}>
        <CustomText
          title="Datenschutzerklärung"
          fontSize={32}
          fontFamily="eroded2"
        />
        <CustomText
          title="1. Datenschutz auf einen Blick"
          fontSize={29}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Allgemeine Hinweise"
          fontSize={27}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Folgende Hinweise geben Ihnen einen einfachen Überblick über die Art, den Umgang und den Zweck der Erhebung und Verwendung personenbezogener Daten durch den App-Betreiber. Dieser nimmt Ihren Datenschutz sehr ernst und behandelt Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Vorschriften. Definitionen der verwendeten Begriffe (z.B. “personenbezogene Daten” oder “Verarbeitung”) finden Sie in Art. 4 DSGVO."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Erfassung und Verarbeitung personenbezogener Daten"
          fontSize={27}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Was sind personenbezogenen Daten?"
          fontSize={24}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Als personenbezogene Daten gelten sämtliche Informationen, welche dazu dienen, Ihre Person zu bestimmen und welche zu Ihnen zurückverfolgt werden können – also beispielsweise Ihr Name, Ihre E-Mail-Adresse und Telefonnummer."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Wer ist verantwortlich für die Datenerfassung dieser App?"
          fontSize={24}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Die Datenverarbeitung dieser App erfolgt durch den App-Betreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Welche Daten werden erfasst?"
          fontSize={24}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Wir verarbeiten personenbezogene Daten wie Email-Addresse und Benutzername (welcher nicht zwingend Personenbezogen sein muss!) aus dem Kontaktformular, sowie ihre IP-Addresse. Erfolgt eine Registrierung über Google werden zusätzliche Daten wie das Profilbild erfasst."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Wie erfassen wir Ihre Daten?"
          fontSize={24}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben, wobei Sie die Möglichkeit haben diese App ohne Registrierung - und damit ohne der Angabe personalisierter Daten - nutzen zu können. Andere Daten werden automatisch oder nach Ihrer Einwilligung durch Interaktion mit der Appp durch unsere IT-Systeme erfasst."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Wofür nutzen wir Ihre Daten?"
          fontSize={24}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Die Verarbeitung der personenbezogenen Daten erfolgt zur Optimierung unseres Online-Angebotes, damit eine fehlerfreie Bereitstellung der App gewährleistet werden kann."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Welches Recht haben Sie bezüglich Ihrer Daten?"
          fontSize={24}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="2. Hosting"
          fontSize={29}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Das Hosting der App erfolgt durch Heroku.com, ein Unternehmen von Salesforce.com Germany GmbH, Erika-Mann-Str. 31, 80636 München, Deutschland und die Speicherung von personenbezogenen Daten erfolgt durch MongoDB Deutsche GmbH c/o RA Ralph Krone, Solmsstraße 41, 60486 Frankfurt am Main Germany. Laut Anbieter sind gespeicherte Daten gut gesichert."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Mehr dazu unter https://www.mongodb.com/de-de/legal/privacy-policy und https://www.salesforce.com/company/privacy/"
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 8 }}
        />
        <CustomText
          title="3. Allgemeine Hinweise und Pflicht­informationen"
          fontSize={29}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Datenschutz"
          fontSize={24}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Die Betreiber dieser App nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.Wenn Sie diese Anwendung benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Hinweis zur verantwortlichen Stelle"
          fontSize={24}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet. Diese finden sie unter Impressum."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Speicherdauer"
          fontSize={24}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung"
          fontSize={24}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TTDSG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden Absätzen dieser Datenschutzerklärung informiert."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Hinweis zur Datenweitergabe in die USA und sonstige Drittstaaten"
          fontSize={24}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Wir verwenden unter anderem Tools von Unternehmen mit Sitz in den USA oder sonstigen datenschutzrechtlich nicht sicheren Drittstaaten. Wenn diese Tools aktiv sind, können Ihre personenbezogene Daten in diese Drittstaaten übertragen und dort verarbeitet werden. Wir weisen darauf hin, dass in diesen Ländern kein mit der EU vergleichbares Datenschutzniveau garantiert werden kann. Beispielsweise sind US-Unternehmen dazu verpflichtet, personenbezogene Daten an Sicherheitsbehörden herauszugeben, ohne dass Sie als Betroffener hiergegen gerichtlich vorgehen könnten. Es kann daher nicht ausgeschlossen werden, dass US-Behörden (z. B. Geheimdienste) Ihre auf US-Servern befindlichen Daten zu Überwachungszwecken verarbeiten, auswerten und dauerhaft speichern. Wir haben auf diese Verarbeitungstätigkeiten keinen Einfluss."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Widerruf Ihrer Einwilligung zur Datenverarbeitung"
          fontSize={24}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)"
          fontSize={24}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO). WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO)."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Beschwerde­recht bei der zuständigen Aufsichts­behörde"
          fontSize={24}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Recht auf Daten­übertrag­barkeit"
          fontSize={24}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Auskunft, Löschung und Berichtigung"
          fontSize={24}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Recht auf Einschränkung der Verarbeitung"
          fontSize={24}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fä Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen. Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Widerspruch gegen Werbe-E-Mails"
          fontSize={24}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Anwendung behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="4. Datenerfassung auf dieser Anwedung"
          fontSize={29}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Server-Log-Dateien"
          fontSize={24}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Der Provider der Anwendung erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: verwendetes Betriebssystem, Referrer URL, Uhrzeit der Serveranfrage, IP-Adresse. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Betreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Anwendung – hierzu müssen die Server-Log-Files erfasst werden."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Anfrage per E-Mail, Telefon oder Telefax"
          fontSize={24}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung we Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar. Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="5. Plugins und Tools"
          fontSize={29}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="YouTube mit erweitertem Datenschutz"
          fontSize={24}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Diese Anwendung bindet Videos von YouTube ein. Betreiber der Seiten ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Ir Wir nutzen YouTube im erweiterten Datenschutzmodus. Dieser Modus bewirkt laut YouTube, dass YouTube keine Informationen über die Besucher auf dieser Anwendung speichert, bevor diese sich das Video ansehen. Die Weitergabe von Daten an YouTube-Partner wird durch den erweiterten Datenschutzmodus hingegen nicht zwingend ausgeschlossen. So stellt YouTube – unabhängig davon, ob Sie sich ein Video ansehen – eine Verbindung zum Google DoubleClick-Netzwerk her. Sobald Sie ein YouTube-Video auf dieser Anwedung starten, wird eine Verbindung zu den Servern von YouTube hergestellt. Dabei wird dem YouTube-Server mitgeteilt, welche unserer Seiten Sie besucht haben. Wenn Sie in Ihrem YouTube-Account eingeloggt sind, ermöglichen Sie YouTube, Ihr Surfverhalten direkt Ihrem persönlichen Profil zuzuordnen. Dies können Sie verhindern, indem Sie sich aus Ihrem YouTube-Account ausloggen. Des Weiteren kann YouTube nach Starten eines Videos verschiedene Cookies auf Ihrem Endgerät speichern oder vergleichbare Wiedererkennungstechnologien (z. B. Device-Fingerprinting) einsetzen. Auf diese Weise kann YouTube Informationen über Besucher dieser Anwedung erhalten. Diese Informationen werden u. a. verwendet, um Videostatistiken zu erfassen, die Anwenderfreundlichkeit zu verbessern und Betrugsversuchen vorzubeugen. Gegebenenfalls können nach dem Start eines YouTube-Videos weitere Datenverarbeitungsvorgänge ausgelöst werden, auf die wir keinen Einfluss haben. Die Nutzung von YouTube erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TTDSG umfasst. Die Einwilligung ist jederzeit widerrufbar. Weitere Informationen über Datenschutz bei YouTube finden Sie in deren Datenschutzerklärung unter: https://policies.google.com/privacy?hl=de."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="6. Online-Marketing und Partner­programme"
          fontSize={29}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Affiliate-Programme auf dieser Website"
          fontSize={24}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Wir nehmen an Affiliate-Partnerprogrammen teil. Bei Affiliate-Partner-Programmen werden Werbeanzeigen eines Unternehmens (Advertiser) auf Webseiten von anderen Unternehmen des Affiliate-Partner-Netzwerks (Publisher) platziert. Wenn Sie auf eine dieser Affiliate-Werbeanzeigen klicken, werden Sie zum beworbenen Angebot weitergeleitet. Sollten Sie anschließend eine bestimmte Transaktion (Conversion) tätigen, erhält der Publisher hierfür eine Vergütung. Zur Berechnung dieser Vergütung ist es erforderlich, dass der Affiliate-Netzwerkbetreiber nachvollziehen kann, über welche Werbeanzeige Sie auf das jeweilige Angebot gekommen sind und die vordefinierte Transaktion vorgenommen haben. Hierfür werden Cookies oder vergleichbare Wiedererkennungstechnologien (z. B. Device-Fingerprinting) eingesetzt. Die Speicherung und Analyse der Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der korrekten Berechnung seiner Affiliate-Vergütung. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TTDSG umfasst. Die Einwilligung ist jederzeit widerrufbar."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="7. eCommerce und Zahlungs­anbieter"
          fontSize={29}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Daten­übermittlung bei Vertragsschluss für Dienstleistungen und digitale Inhalte"
          fontSize={24}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
        <CustomText
          title="Wir übermitteln personenbezogene Daten an Dritte nur dann, wenn dies im Rahmen der Vertragsabwicklung notwendig ist, etwa an das mit der Zahlungsabwicklung beauftragte Kreditinstitut. Eine weitergehende Übermittlung der Daten erfolgt nicht bzw. nur dann, wenn Sie der Übermittlung ausdrücklich zugestimmt haben. Eine Weitergabe Ihrer Daten an Dritte ohne ausdrückliche Einwilligung, etwa zu Zwecken der Werbung, erfolgt nicht.itut. Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. b DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet."
          fontSize={20}
          fontFamily="eroded2"
          style={{ marginTop: 20 }}
        />
      </View>
    </ScrollView>
  );
};

export default PrivacyScreen;

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
  });

const styles = StyleSheet.create({
  imageBg: {
    height: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
