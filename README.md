# Live-Bundesliga-Tabelle

Ein kleines HTML‑Projekt, das beim Aufruf automatisch die aktuelle 1. Bundesliga‑Tabelle per OpenLigaDB‑API lädt und anzeigt.

## Features (v1.1)

- **Saison‑Dropdown** – wähle einfach die gewünschte Saison, die aktuelle Saison ist bereits vorausgewählt.
- **Farbliche Highlights** – Champions‑League‑Plätze (1‑4) in grün, Europa‑League‑Plätze (5‑6) in gelb, Relegations‑Play‑off (Platz 16) in orange und Abstiegsplätze (17‑18) in rot.
- **Dezente Zeilenlinien** statt Zebra‑Striping für eine klare Darstellung.
- **Automatischer Seitentitel** und API‑Aufruf passen sich der ausgewählten Saison an.

## Nutzung

1. Repository klonen oder `index.html` herunterladen.
2. Im Browser öffnen – die Tabelle wird beim Laden automatisch angezeigt.
3. Mit dem Dropdown kann die Saison gewechselt werden; die Tabelle wird sofort neu geladen.

## Neue Saison einbinden (falls das Dropdown nicht ausreicht)

Der Code erkennt bereits automatisch, welche Saison gerade läuft (ab Juli startet die neue Saison).  
Falls du trotzdem manuell eine Saison festlegen willst, ändere einfach den Wert des Dropdowns im Browser.
