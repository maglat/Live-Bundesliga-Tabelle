# Live-Bundesliga-Tabelle

Ein einfaches, modernes HTML-Projekt, das dynamisch die aktuelle Bundesliga-Tabelle per **OpenLigaDB**-API lädt.

## 🚀 Features (v2.0)

### Core Features
- Dynamisches Laden der Tabelle per OpenLigaDB API
- Liga-Auswahl (1. & 2. Bundesliga, 3. Liga)
- Saison-Auswahl mit automatischem Startjahr
- Farbliche Highlights für Platzierungen
- Vereins-Logos mit Lazy Loading
- Aktuelle Spieltag-Anzeige

### UI/UX Verbesserungen
- **Dark Mode** 🌙 – Automatisch basierend auf System-Einstellung
- **Responsive Design** 📱 – Optimiert für Desktop, Tablet & Mobile
- **Moderne Animationen** – Sanfte Fade-In & Hover-Effekte
- **Toast-Benachrichtigungen** – Für Erfolge und Fehler
- **Skeleton Loading** – Bessere Lade-Erfahrung
- **Lokale Datenspeicherung** – Caching für schnellere Ladezeiten

### Code-Qualität
- Modular aufgebaute Struktur (CSS/JS getrennt)
- Fehlerbehandlung mit try-catch
- Konfigurierbare Einstellungen
- Saubere Code-Dokumentation

## 📁 Projektstruktur

```
Live-Bundesliga-Tabelle/
├── index.html          # Hauptseite
├── css/
│   └── style.css       # Styles & Dark Mode
├── js/
│   ├── config.js       # Konfiguration & Konstanten
│   ├── api.js          # API-Service mit Caching
│   └── app.js          # Main Application Logic
├── cover.png           # Cover-Bild
├── .gitignore          # Git Ignorierungen
└── README.md           # Diese Datei
```

## 🛠️ Installation & Nutzung

### Lokal ausführen
1. Repository klonen:
   ```bash
   git clone https://github.com/maglat/Live-Bundesliga-Tabelle.git
   ```
2. Oder `index.html` direkt herunterladen
3. Im Browser öffnen – die Tabelle wird automatisch geladen

### Online nutzen
Öffne die GitHub Pages URL:
```
https://maglat.github.io/Live-Bundesliga-Tabelle/
```

## ⚙️ Konfiguration

Bearbeite `js/config.js` um Einstellungen anzupassen:

```javascript
const CONFIG = {
  API_BASE_URL: 'https://api.openligadb.de',
  CACHE_DURATION: 5 * 60 * 1000,  // 5 Minuten
  DEFAULT_LEAGUE: 'bl1',
  SEASON_START_MONTH: 7,          // Juli
  ...
};
```

## 🔧 Entwicklung

### Projekt entwickeln
1. Änderungen an Dateien vornehmen
2. Änderungen testen
3. Commit & Push:
   ```bash
   git add .
   git commit -m "Deine Nachricht"
   git push origin main
   ```

### Neue Features planen
- [ ] Live-Ticker für aktuelle Spiele
- [ ] Formkurven (letzte 5 Spiele)
- [ ] Torjäger-Bestenliste
- [ ] Vergleich zweier Vereine
- [ ] Offline-Modus

## 📝 API

Danke an [OpenLigaDB](https://www.openligadb.de/) für die Bundesliga-Daten!

## 📄 Lizenz

MIT License – frei nutzbar und modifizierbar.

## 💖 Support

Hat dir das Projekt gefallen?  
<a href="https://www.buymeacoffee.com/" target="_blank">☕ Buy me a coffee</a>