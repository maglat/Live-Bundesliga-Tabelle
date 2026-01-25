# Live-Bundesliga‑Tabelle

Ein einfaches HTML‑Projekt, das dynamisch die aktuelle Bundesliga‑Tabelle per **OpenLigaDB**‑API lädt.

## Features

### v1.4 (neueste Version)
- **Hover‑Animationen** für Tabellenzeilen: sanftes Anheben mit Schatten beim Hovern
- **Buy Me a Coffee** Button: stylischer Button in der oberen rechten Ecke für Spenden
- **Verbesserte Transitions**: sanftere Animationen mit cubic-bezier easing

### v1.3 (vorherige Version)
- **Saison‑Dropdown** – wähle die gewünschte Saison, aktuelle Saison ist vorausgewählt.
- **Farbliche Highlights** für Champions‑League, Europa‑League, Relegations‑Play‑off und Abstiegsplätze.
- **Dezente Zeilenlinien** anstelle von Zebra‑Striping.
- **Automatischer Seitentitel** passt sich der gewählten Saison an.

### v1.2 (Weiterentwicklung)
- **Aktueller Spieltag** wird angezeigt (z. B. "Spieltag 5 / 34").
- **Vereins‑Logos** werden neben dem Mannschaftsnamen dargestellt.
- **Legende** erklärt die farblichen Markierungen.
- **Animationen** beim Laden der Zeilen (Fade‑In + Slide‑Down).

### v1.3 (neueste Version)
- **Liga‑Dropdown** – wähle zwischen 1. Bundesliga (`bl1`), 2. Bundesliga (`bl2`) und 3. Liga (`bl3`).
- **Saison‑Dropdown** bleibt erhalten und ist jetzt neben dem Liga‑Dropdown angeordnet.
- **Titel & Überschrift** ändern sich automatisch zu "1. Bundesliga‑Tabelle", "2. Bundesliga‑Tabelle" bzw. "3. Liga‑Tabelle".
- **Spieltag‑Anzeige** wird für die ausgewählte Liga korrekt geladen.
- **Alle Features von v1.2** (Logos, Highlights, Legende, Animationen) funktionieren ebenfalls für jede Liga.

## Nutzung
1. Repository klonen oder `index.html` herunterladen.
2. Im Browser öffnen – die Tabelle wird beim Laden automatisch angezeigt.
3. Im Dropdown oben kannst du **Liga** und **Saison** auswählen; die Tabelle aktualisiert sich sofort.

## Hinweis zur Saison‑Logik
Die neue Saison startet im Juli. Das Skript ermittelt automatisch das aktuelle Saison‑Startjahr. Für frühere Saisons wähle sie einfach im Dropdown.
