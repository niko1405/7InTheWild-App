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
|  **Home** | Aktuelle Notifications, neueste Umfragen, Blog-Beiträge & YouTube-Videos auf einen Blick |
|  **Abstimmungen** | Favoriten-Abstimmung, tägliche Umfragen und Community-Abstimmungen (3-Tab-Ansicht) |
|  **Live-Chat** | Globaler Community-Chat sowie Direktnachrichten zwischen Nutzern in Echtzeit (Socket.io) |
|  **News** | Aktuelle Berichte und Social-Media-Inhalte rund um die Staffeln |
|  **Blog / Feed** | CMS-basierte Beiträge mit Tags, Filterung und Archiv (via Sanity.io) |
|  **Profile** | Öffentliche Nutzerprofile mit Avatar-Upload, Favoriten und Profilsuche |
|  **Push-Benachrichtigungen** | Gezielte Benachrichtigungen mit automatischer Navigation zum Ziel-Screen |
|  **Dark Mode** | Vollständiger Light-/Dark-Mode-Support, gespeichert im Nutzerprofil |
|  **Premium** | Einmaliger Kauf (4,00 €, kein Abo) – entfernt alle Werbeanzeigen und schaltet Dark Mode frei |
|  **Authentifizierung** | E-Mail/Passwort-Login sowie Google Sign-In (OAuth) |
|  **Anonymer Chat** | Nicht eingeloggte Nutzer erhalten eine UUID-basierte Session-ID für den Chat |
|  **Offline-Erkennung** | Automatische Fehlermeldung bei fehlender Internetverbindung |

---

## Tech Stack

### Frontend

| Technologie | Verwendungszweck |
|---|---|
| [React Native 0.68](https://reactnative.dev/) | Basis-Framework für iOS & Android |
| [Expo ~45 / EAS](https://expo.dev/) | Toolchain, Build-System & OTA-Updates |
| [Redux Toolkit](https://redux-toolkit.js.org/) | Globales State-Management (User, Chat, Posts, News, Survey, Profile, Settings) |
| [React Navigation v6](https://reactnavigation.org/) | Dreistufige Stack-/Drawer-/Tab-Navigation |
| [@react-native-material/core](https://rn-material.js.org/) | Material Design UI-Komponenten |
| [react-native-paper](https://callstack.github.io/react-native-paper/) | Weitere UI-Komponenten & Theming (Light/Dark) |
| [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) | Ikonographie (AntDesign, MaterialIcons, Ionicons u. a.) |
| [react-native-tab-view](https://github.com/satya164/react-native-tab-view) | Tab-basierte Screens (z. B. Voting: Favorit / Täglich / Community) |
| [react-native-chart-kit](https://github.com/indiespirit/react-native-chart-kit) | Diagramme für Abstimmungsergebnisse |
| [react-native-youtube-iframe](https://github.com/LonelyCpp/react-native-youtube-iframe) | YouTube-Videos einbetten |
| [react-native-google-mobile-ads](https://docs.page/invertase/react-native-google-mobile-ads) | Banner- & Interstitial-Werbung (für Non-Premium-Nutzer) |
| [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/) | Swipe-Gesten (z. B. Message-Reaktionen per Swipe) |

### Backend & Daten

| Technologie | Verwendungszweck |
|---|---|
| Eigener REST-API-Server | Nutzer, Chat, Surveys, Profile, Posts, News (via Axios, Timeout: 15 s) |
| [Socket.io Client](https://socket.io/) | Echtzeit-Chat (`join-chat`, `send-msg-to-group`, `msg-receive`) |
| [Sanity.io](https://www.sanity.io/) | Headless CMS für Blog-Beiträge und Bilder (GROQ, API v2022-07-03) |
| [Expo Notifications](https://docs.expo.dev/push-notifications/overview/) | Push-Benachrichtigungen (serverseitig via expo-server-sdk) |

### Auth & Sonstiges

| Technologie | Verwendungszweck |
|---|---|
| [expo-auth-session](https://docs.expo.dev/versions/latest/sdk/auth-session/) | Google OAuth Sign-In |
| [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/) | Profilbild hochladen (Multipart/Form-Data) |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | Persistente Speicherung der User-ID für Auto-Login |
| [@react-native-community/netinfo](https://github.com/react-native-netinfo/react-native-netinfo) | Netzwerkstatus-Erkennung |
| [moment.js](https://momentjs.com/) | Datums- und Zeitformatierung (deutsche Locale) |
| [uuid](https://github.com/uuidjs/uuid) | Session-IDs für anonyme Chat-Nutzer |

---

## Architektur

### Provider-Schichtung (`App.js`)

Die App verwendet eine mehrschichtige Provider-Struktur:

```
ContextProvider          → Custom Fonts & Scroll-State (React Context)
  └── Redux Provider     → Globaler Store
        └── MaterialProvider → Material Design Theme
              └── NetworkProvider  → Offline-Erkennung (NetInfo)
                    └── CustomProvider   → App-Initialisierung, Notifications, Push-Token
                          └── AppStackNavigator → Navigation
```

### Navigation (3-stufig)

```
AppStack (Root Stack)
├── DrawerNavigator (Seitenmenü)
│   ├── BottomTabNavigator
│   │   ├── HomeStack     → Home-Screen mit Blog & Umfragen
│   │   ├── Create        → Umfrage erstellen (nur eingeloggt)
│   │   └── ProfileStack  → Profil / Login
│   ├── FeedStack         → Nachrichten-Feed
│   ├── NewsStack         → Entdecken / externe News
│   ├── ChatStack         → Live-Chat (global & privat)
│   ├── VotingStack       → Abstimmungen (Favorit / Täglich / Community)
│   ├── StaffelInfoStack  → 7vsWild Show-Informationen
│   └── SettingsStack     → Einstellungen (Account, Benachrichtigungen, Premium …)
├── MessageAppStack       → Private Direktnachrichten
├── BlogPostAppDetails    → Blog-Post-Detailansicht
├── CommentsNotStack      → Kommentarthread
└── PremiumSideBar        → Premium-Kaufscreen
```

### Redux Slices

| Slice | Schlüssel-State | Wichtige Actions |
|---|---|---|
| `user` | `user`, `sessionId`, `pushToken`, `currentLocation` | `auth`, `logout`, `deleteAcc`, `changeSessionID`, `changeLocation` |
| `chat` | `chat` (messages, chatId, participants), `chats` | `comment`, `getChat`, `getChats`, `chatStateAction`, `clear` |
| `settings` | `darkMode`, `chatSettings`, `notifications` | `changeTheme` |
| `survey` | Surveys (Community, täglich, Favoriten) | `getSurveys`, `voteSurvey`, `likeSurvey` |
| `profile` | Profildaten, Favoriten, Suchergebnisse | `getProfile`, `setFavorit`, `searchProfiles` |
| `post` | Blog-Posts, gefilterter View, Archiv | `getPosts`, `getPostsByFilter` |
| `news` | Externe Nachrichtendaten | `getNewsData` |

### App-Initialisierung (`CustomProvider`)

Beim Start werden folgende Daten **parallel** geladen (`Promise.all`):
- Nutzerdaten & Live-Chat-Einstellungen (wenn eingeloggt)
- Eigene Umfragen des Nutzers (wenn eingeloggt)
- Tägliche Umfragen, Blog-Posts, News, Community-Umfragen, Favoriten (immer)

Solange läuft ein Fullscreen-Ladescreen. Bei Fehler erscheint ein Fehler-Screen.

---

## Besondere Implementierungen

### Push-Benachrichtigungen
- Beim Login wird ein Expo Push-Token registriert und ans Backend übermittelt
- Eingehende Benachrichtigungen navigieren automatisch zum Ziel-Screen via `navigationRef`
- `AppState`-Listener setzt bei Hintergrundwechsel die `currentLocation` zurück (für serverseitiges Notification-Routing)

### Werbeanzeigen (Google Mobile Ads)
- **Banner Ads** auf VotingScreen, PremiumScreen und weiteren Screens
- **Interstitial Ads** im AppStack – erscheinen alle **6 Drawer-Navigationsschritte**
- Beide Ad-Typen werden bei `user.premium === true` vollständig deaktiviert

### Echtzeit-Chat (Socket.io)
- Beim Betreten eines Chat-Screens wird ein Socket aufgebaut (`join-chat`)
- Nachrichten werden über `send-msg-to-group` gesendet und via `msg-receive` empfangen
- **Swipe-to-Reply**: Per Swipe-Geste auf eine Nachricht kann direkt geantwortet werden
- Nicht eingeloggte Nutzer erscheinen als „Unbekannt" und werden über ihre `sessionId` (UUID) identifiziert

### Premium
- Gesteuert über das `user.premium`-Flag im Backend
- Vorteile: Keine Werbeanzeigen, Dark Mode freigeschaltet
- Einmaliger Kauf, kein Abo (Implementierung noch ausstehend)

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
├── client.js               # Sanity CMS Client & Bild-URL-Builder
├── app/
│   ├── api/                # Axios-API-Aufrufe (REST-Backend)
│   ├── assets/             # Bilder, Fonts (Header.ttf, normal.otf)
│   ├── components/         # Wiederverwendbare UI-Komponenten
│   │   ├── MessageContainer.jsx  # Chat-UI inkl. Socket.io & Swipe-to-Reply
│   │   ├── Navbar.jsx            # Transparente Navigationsleiste
│   │   ├── Survey.jsx            # Umfrage-Komponente
│   │   ├── AdComponent.jsx       # Wrapper für Google Mobile Ads
│   │   └── ...
│   ├── constants/          # Bilder, Server-URL, Hilfsfunktionen, Toast-Optionen
│   ├── contexts/           # React Context: Fonts, Scroll-State (ContextProvider)
│   ├── features/           # Redux Slices + Actions (user, chat, post, news, survey, profile, settings)
│   ├── navigation/         # AppStack, DrawerNavigator, TabNavigator, Stack-Navigatoren
│   ├── CustomProvider.jsx  # App-Init, Push-Notifications, AppState-Listener
│   ├── NetworkProvider.jsx # Offline-Erkennung via NetInfo
│   └── screens/            # Alle App-Screens
│       ├── HomeScreen/
│       ├── VotingScreen/   # Tabs: Favorit / Täglich / Community
│       ├── ChatScreen/     # Globaler Live-Chat
│       ├── MessageScreen/  # Private Direktnachrichten
│       ├── NewsScreen/
│       ├── FeedScreen/
│       ├── ProfileScreen/
│       ├── LoginScreen/
│       ├── SettingsScreen/
│       │   └── Stacks/     # Account, FAQ, Impressum, Datenschutz, Premium, Benachrichtigungen
│       ├── StaffelInfoScreen/
│       ├── SurveyDetailsScreen/
│       └── CommentsScreen/
```

---

## Learnings

Dieses Projekt hat eine Menge wertvoller Erfahrungen mit sich gebracht:

- **React Native Eigenheiten**: Der Unterschied zwischen React Native und Web-React ist größer als erwartet. Layouting mit Flexbox funktioniert zwar ähnlich, aber viele Web-Konzepte (z. B. CSS, `overflow: scroll`) existieren in RN nicht oder verhalten sich anders.

- **Expo vs. Bare Workflow**: Mit Expo lässt sich sehr schnell ein funktionierender Prototyp erstellen. Sobald native Module (z. B. Google Ads, Kamera) ins Spiel kommen, ist der Bare Workflow (`expo dev-client`) jedoch unvermeidlich.

- **Redux Toolkit**: Verglichen mit klassischem Redux reduziert RTK den Boilerplate enorm. Slices, `createAsyncThunk` und Immer-basierte Reducer machen den State-Management-Code deutlich lesbarer und wartbarer.

- **Echtzeit mit Socket.io**: Die Integration von Socket.io in React Native funktioniert gut, erfordert aber sorgfältiges Lifecycle-Management – offene Sockets müssen beim Unmounten der Komponente sauber getrennt werden.

- **CMS-Integration mit Sanity**: Ein Headless CMS wie Sanity trennt redaktionellen Content sauber vom App-Code. Das Hochladen und Abfragen von Inhalten über GROQ-Queries ist sehr flexibel, aber die Lernkurve ist anfangs steil.

- **Push-Benachrichtigungen mit Expo**: Das Versenden von Benachrichtigungen über den Expo Push Service ist denkbar einfach – sowohl auf der Client- als auch auf der Serverseite. Komplexer wird es beim Handling von Berechtigungen auf verschiedenen Betriebssystemen und beim Routing in den richtigen App-Screen.

- **Performance**: Lange Listen und verschachtelte Navigatoren können in React Native schnell zu Performance-Problemen führen. `FlatList` statt `ScrollView` für Listen und lazy-loaded Screens in der Navigation helfen erheblich.

- **Build-Prozess mit EAS**: Expo Application Services (EAS Build) vereinfacht den Build für iOS und Android enorm, da keine lokale Xcode/Android-Studio-Konfiguration zwingend nötig ist. OTA-Updates via `expo-updates` ermöglichen schnelle Patches ohne App-Store-Review.

---

## 📄 Lizenz

Dieses Projekt ist ein privates Lernprojekt und nicht für die kommerzielle Nutzung gedacht.
