# 7InTheWild App

Eine mobile Fan-Community-App für die deutsche Survival-Show **7 vs. Wild**, gebaut mit React Native & Expo.

---

## Hintergrund

**7 vs. Wild** ist ein deutschsprachiges Survival-Format, in dem Teilnehmer allein oder in Teams mehrere Wochen in der Wildnis überleben müssen. Die Show hat innerhalb kürzester Zeit eine riesige Community aufgebaut.

Dieses Projekt entstand aus der Idee heraus, der wachsenden Community rund um die Staffeln eine eigene Plattform zu geben – einen Ort, an dem Fans zusammenkommen können, um Inhalte zu lesen, Umfragen zu beantworten, miteinander zu chatten und über ihre Favoriten abzustimmen.

Die App wurde als **Lernprojekt** entwickelt, mit dem Ziel, die gesamte Bandbreite einer modernen mobilen Applikation abzudecken: von der Authentifizierung über einen CMS-basierten Blog bis hin zu Echtzeit-Kommunikation und Push-Benachrichtigungen.

---

## Features

| Feature | Beschreibung |
|---|---|
| 🏠 **Home** | Aktuelle Notifications, neueste Umfragen, Blog-Beiträge & YouTube-Videos auf einen Blick |
| 🗳️ **Abstimmungen** | Favoriten-Abstimmung, tägliche Umfragen und Community-Abstimmungen |
| 💬 **Live-Chat** | Globaler Community-Chat sowie Direktnachrichten zwischen Nutzern in Echtzeit |
| 📰 **News** | Aktuelle Berichte und Social-Media-Inhalte rund um die Staffeln |
| 📝 **Blog / Feed** | CMS-basierte Beiträge mit Tags, Filterung und Archiv |
| 👤 **Profile** | Öffentliche Nutzerprofile mit Avatar, Favoriten und Verlauf |
| 🔔 **Push-Benachrichtigungen** | Gezielte Benachrichtigungen an einzelne Nutzer oder die gesamte Community |
| 🌙 **Dark Mode** | Vollständiger Light-/Dark-Mode-Support |
| ⭐ **Premium** | Werbefreies Erlebnis für Premium-Nutzer |
| 🔐 **Authentifizierung** | E-Mail/Passwort-Login sowie Google Sign-In |

---

## Tech Stack

### Frontend

| Technologie | Verwendungszweck |
|---|---|
| [React Native 0.68](https://reactnative.dev/) | Basis-Framework für iOS & Android |
| [Expo ~45 / EAS](https://expo.dev/) | Toolchain, Build-System & OTA-Updates |
| [Redux Toolkit](https://redux-toolkit.js.org/) | Globales State-Management (User, Chat, Posts, News, Survey, Profile, Settings) |
| [React Navigation v6](https://reactnavigation.org/) | Stack-, Drawer- und Tab-Navigation |
| [@react-native-material/core](https://rn-material.js.org/) | Material Design UI-Komponenten |
| [react-native-paper](https://callstack.github.io/react-native-paper/) | Weitere UI-Komponenten |
| [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) | Ikonographie |
| [react-native-tab-view](https://github.com/satya164/react-native-tab-view) | Tab-basierte Screens (z. B. Voting) |
| [react-native-chart-kit](https://github.com/indiespirit/react-native-chart-kit) | Diagramme für Abstimmungsergebnisse |
| [react-native-youtube-iframe](https://github.com/LonelyCpp/react-native-youtube-iframe) | YouTube-Videos einbetten |
| [react-native-google-mobile-ads](https://docs.page/invertase/react-native-google-mobile-ads) | Banner-Werbung (für Non-Premium-Nutzer) |

### Backend & Daten

| Technologie | Verwendungszweck |
|---|---|
| Eigener REST-API-Server | Nutzer, Chat, Surveys, Profile, Posts, News (via Axios) |
| [Socket.io Client](https://socket.io/) | Echtzeit-Chat-Kommunikation |
| [Sanity.io](https://www.sanity.io/) | Headless CMS für Blog-Beiträge und Inhalte |
| [Expo Notifications](https://docs.expo.dev/push-notifications/overview/) | Push-Benachrichtigungen (serverseitig via expo-server-sdk) |

### Auth & Sonstiges

| Technologie | Verwendungszweck |
|---|---|
| [expo-auth-session](https://docs.expo.dev/versions/latest/sdk/auth-session/) | Google OAuth Sign-In |
| [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/) | Profilbild hochladen |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | Lokale Datenpersistenz |
| [moment.js](https://momentjs.com/) | Datums- und Zeitformatierung |

---

## Lokale Entwicklung

### Voraussetzungen

- Node.js >= 16
- Expo CLI (`npm install -g expo-cli`)
- Android Studio oder Xcode (für Emulatoren)

### Setup

```bash
# Abhängigkeiten installieren
npm install

# Expo Dev-Client starten
npm start

# Android
npm run android

# iOS
npm run ios
```

### Umgebungsvariablen

Erstelle eine `.env`-Datei im Root-Verzeichnis:

```env
REACT_APP__SANITY_PROJECT_ID=dein_sanity_projekt_id
REACT_APP__SANITY_TOKEN=dein_sanity_token
```

---

## 📁 Projektstruktur

```
7InTheWild-App/
├── App.js                  # Root-Komponente, Provider-Setup
├── store.js                # Redux Store (User, Chat, Posts, News, Survey, Profile, Settings)
├── client.js               # Sanity CMS Client
├── app/
│   ├── api/                # Axios-API-Aufrufe (REST-Backend)
│   ├── assets/             # Bilder, Fonts
│   ├── components/         # Wiederverwendbare UI-Komponenten
│   ├── constants/          # Bilder, Server-Info, Hilfsfunktionen
│   ├── contexts/           # React Context (z. B. Scroll-State)
│   ├── features/           # Redux Slices (user, chat, post, news, survey, profile, settings)
│   ├── navigation/         # AppStack, DrawerNavigator, TabNavigator
│   └── screens/            # Alle App-Screens
│       ├── HomeScreen/
│       ├── VotingScreen/
│       ├── ChatScreen/
│       ├── NewsScreen/
│       ├── FeedScreen/
│       ├── ProfileScreen/
│       ├── LoginScreen/
│       ├── SettingsScreen/
│       └── ...
```

---

## 💡 Learnings

Dieses Projekt hat eine Menge wertvoller Erfahrungen mit sich gebracht:

- **React Native Eigenheiten**: Der Unterschied zwischen React Native und Web-React ist größer als erwartet. Layouting mit Flexbox funktioniert zwar ähnlich, aber viele Web-Konzepte (z. B. CSS, `overflow: scroll`) existieren in RN nicht oder verhalten sich anders.

- **Expo vs. Bare Workflow**: Mit Expo lässt sich sehr schnell ein funktionierender Prototyp erstellen. Sobald native Module (z. B. Google Ads, Kamera) ins Spiel kommen, ist der Bare Workflow (`expo dev-client`) jedoch unvermeidlich.

- **Redux Toolkit**: Verglichen mit klassischem Redux reduziert RTK den Boilerplate enorm. Slices, `createAsyncThunk` und Immer-basierte Reducer machen den State-Management-Code deutlich lesbarer und wartbarer.

- **Echtzeit mit Socket.io**: Die Integration von Socket.io in React Native funktioniert gut, erfordert aber sorgfältiges Lifecycle-Management – offene Sockets müssen beim Unmounten der Komponente sauber getrennt werden.

- **CMS-Integration mit Sanity**: Ein Headless CMS wie Sanity trennt redaktionellen Content sauber vom App-Code. Das Hochladen und Abfragen von Inhalten über GROQ-Queries ist sehr flexibel, aber die Lernkurve ist anfangs steil.

- **Push-Benachrichtigungen mit Expo**: Das Versenden von Benachrichtigungen über den Expo Push Service ist denkbar einfach – sowohl auf der Client- als auch auf der Serverseite. Komplexer wird es beim Handling von Berechtigungen auf verschiedenen Betriebssystemen.

- **Performance**: Lange Listen und verschachtelte Navigatoren können in React Native schnell zu Performance-Problemen führen. `FlatList` statt `ScrollView` für Listen und lazy-loaded Screens in der Navigation helfen erheblich.

- **Build-Prozess mit EAS**: Expo Application Services (EAS Build) vereinfacht den Build für iOS und Android enorm, da keine lokale Xcode/Android-Studio-Konfiguration zwingend nötig ist. OTA-Updates via `expo-updates` ermöglichen schnelle Patches ohne App-Store-Review.

---

## 📄 Lizenz

Dieses Projekt ist ein privates Lernprojekt und nicht für die kommerzielle Nutzung gedacht.
