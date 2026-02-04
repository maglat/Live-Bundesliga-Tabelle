# Live-Bundesliga‑Tabelle

Eine einfache HTML‑Seite, die dynamisch die aktuelle Bundesliga‑Tabelle per **OpenLigaDB**‑API lädt.

## Features

### v1.4.1 (neueste Version)
- **Dark Mode** – automatische Anpassung an die System-Einstellung
- **Verbesserte Animationen** – sanftere Hover-Effekte und smoother Shadow-Transition
- **CSS Variablen** – einfacher zu pflegender Code
- **Refresh-Button** – manuelles Aktualisieren der Tabelle
- **Loading-Spinner** – bessere Lade-Visualisierung

### v1.4 (vorherige Version)
- **Hover‑Animationen** für Tabellenzeilen: sanftes Anheben mit Schatten beim Hovern
- **Buy Me a Coffee** Button: stylischer Button in der oberen rechten Ecke für Spenden

### v1.3
- **Saison‑Dropdown** – wähle die gewünschte Saison, aktuelle Saison ist vorausgewählt
- **Farbliche Highlights** für Champions‑League, Europa‑League, Relegations‑Play‑off und Abstiegsplätze
- **Dezente Zeilenlinien** anstelle von Zebra‑Striping
- **Automatischer Seitentitel** passt sich der gewählten Saison an

### v1.2
- **Aktueller Spieltag** wird angezeigt (z. B. "Spieltag 5 / 34")
- **Vereins‑Logos** werden neben dem Mannschaftsnamen dargestellt
- **Legende** erklärt die farblichen Markierungen
- **Animationen** beim Laden der Zeilen (Fade‑In + Slide‑Down)

## Nutzung

### Online nutzen
Die aktuelle Version ist unter folgender URL verfügbar:  
🔗 https://maglat.github.io/Live-Bundesliga-Tabelle/

### Lokal nutzen
1. Repository klonen oder `index.html` herunterladen
2. Im Browser öffnen – die Tabelle wird beim Laden automatisch angezeigt
3. Im Dropdown oben kannst du **Liga** und **Saison** auswählen; die Tabelle aktualisiert sich sofort
4. Mit dem **Refresh-Button** kannst du die Daten manuell neu laden

## Hinweis zur Saison‑Logik

Die neue Saison startet im Juli. Das Skript ermittelt automatisch das aktuelle Saison‑Startjahr. Für frühere Saisons wähle sie einfach im Dropdown.