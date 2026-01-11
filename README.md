# Live-Bundesliga-Tabelle

Ein kleines HTML‑Projekt, das beim Aufruf automatisch die aktuelle 1. Bundesliga‑Tabelle per OpenLigaDB‑API lädt und anzeigt.

## Features

### v1.1
- **Saison‑Dropdown** – wähle einfach die gewünschte Saison, die aktuelle Saison ist bereits vorausgewählt.  
- **Farbliche Highlights** – Champions‑League‑Plätze (1‑4) in grün, Europa‑League‑Plätze (5‑6) in gelb, Relegations‑Play‑off (Platz 16) in orange und Abstiegsplätze (17‑18) in rot.  
- **Dezente Zeilenlinien** statt Zebra‑Striping für eine klare Darstellung.  
- **Automatischer Seitentitel** und API‑Aufruf passen sich der ausgewählten Saison an.

### v1.2 (neu)
- **Aktueller Spieltag** wird angezeigt (z. B. “Spieltag 5 / 34”).  
- **Vereins‑Logos** neben dem Mannschaftsnamen (falls vorhanden).  
- **Legende** am unteren Rand erklärt die Farben.  
- **Animationen** beim Laden der Zeilen (Fade‑In + Slide‑Down).

## Nutzung
1. Repository klonen oder `index.html` herunterladen.  
2. Im Browser öffnen – die Tabelle wird automatisch geladen.  
3. Mit dem Dropdown kann die Saison gewechselt werden; die Tabelle wird sofort neu geladen.

## Hinweis zur Saison
Ab Juli beginnt die neue Saison, das Skript wählt automatisch das aktuelle Saison‑Jahr aus.  
Falls du eine andere Saison sehen willst, wähle sie einfach im Dropdown.