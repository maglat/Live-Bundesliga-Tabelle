# Live-Bundesliga-Tabelle

Ein kleines HTML‑Projekt, das beim Aufruf automatisch die aktuelle 1. Bundesliga‑Tabelle (Saison 2025/26) per **OpenLigaDB**‑API lädt und anzeigt.

## Dateien
- `index.html` – das eigentliche HTML‑Gerüst inkl. CSS‑Styling und JavaScript‑Logik.

## Nutzung
1. Repository klonen oder das `index.html`‑File herunterladen.
2. Im Browser öffnen – die Tabelle wird beim Laden automatisch aktualisiert.

## Neue Saison einbinden
Im `index.html`‑File gibt es eine Variable `season` (derzeit `2025`). Für die nächste Saison einfach:
```js
const season = 2026; // z. B. für Saison 2026/27
```
Speichern, pushen und die Seite zeigt die neue Tabelle.

## Hinweis
Das Projekt verwendet nur plain HTML/CSS/JS – kein Build‑Tool nötig.
