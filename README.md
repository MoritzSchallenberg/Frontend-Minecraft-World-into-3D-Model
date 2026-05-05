# 🧱 Minecraft World → 3D Model Web App

Eine Webanwendung zur Umwandlung von Minecraft-Welten in echte 3D-Modelle, die anschließend visualisiert und für den 3D-Druck verwendet werden können.

## 🚀 Projektübersicht
Dieses Projekt ermöglicht es Nutzern:

1. Minecraft-Welten oder Ausschnitte hochzuladen
2. einen gewünschten Bereich auszuwählen
3. automatisch ein 3D-Modell daraus zu generieren
4. das Modell im Browser zu betrachten
5. das Modell für den 3D-Druck zu exportieren oder zu bestellen

Das Ziel ist die Kombination aus **Game-Datenverarbeitung, 3D-Rendering und E-Commerce**.

## 🧠 Funktionsweise (Pipeline)
Die Anwendung basiert auf folgender Verarbeitungskette:

## ⚙️ Features (aktueller Stand)
### ✅ Bereits implementiert
- Web-Frontend (HTML, CSS, JavaScript)
- Upload-System für Dateien
- Grundstruktur für Produkt-/Konfigurator-Seite
- Datenbank-Anbindung (z. B. MongoDB)
- 3D-Viewer (z. B. `<model-viewer>` oder Three.js)

### 🔄 In Entwicklung
- Auswahl eines Bereichs innerhalb der Minecraft-Welt
- Automatische Generierung von 3D-Modellen
- Integration von Slicing / Druckkostenberechnung

### ❌ Noch nicht implementiert
- Minecraft-Dateiformate direkt auslesen (.mca, .schem, .litematic)
- Optimierte Mesh-Generierung (Performance)
- Export als STL (für 3D-Druck)
- Backend-Worker für große Datenverarbeitung
- Skalierung und Queue-System


## 🛠️ Technologien
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js (geplant)
- **Datenbank:** MongoDB
- **3D Rendering:** Three.js / model-viewer
- **3D Verarbeitung:** (geplant – eigene Pipeline oder externe Tools)
- **Slicing:** (z. B. CuraEngine / PrusaSlicer – geplant)

---

## 📂 Projektstruktur
