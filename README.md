# 🐌 BajoTerra: Cavernas Profundas · Batalla de Babosas (Slugterra)

[![GitHub Pages](https://img.shields.io/badge/Demo-GitHub%20Pages-brightgreen?style=for-the-badge&logo=github)](https://traderxael.github.io/bajoterra/)
[![Licencia](https://img.shields.io/badge/Licencia-MIT-orange?style=for-the-badge)](LICENSE)
[![Tecnología](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20JS%20ES6%2B-blue?style=for-the-badge)](https://developer.mozilla.org)
[![Audio](https://img.shields.io/badge/Audio-Web%20Audio%20API-yellow?style=for-the-badge)](https://webaudio.github.io/web-audio-api/)

> Un videojuego web interactivo de estrategia y combate inspirado en la serie animada **BajoTerra (Slugterra)**. Arma tu arsenal con babosas icónicas como **Infierno**, **Sanadora Doc** y **Electroshock**, alcanza las **100 MPH** para despertar sus poderosos **velocimorfos** y defiende las 99 cavernas subterráneas de la corrupción de las Sombras del Dr. Blakk.

---

## 🌟 Características Principales

- ⚡ **Disparo de Lanzadora a 100 MPH**: Simulación dinámica de tiro parabólico con velocímetro digital. Al cruzar las 100 MPH, las babosas experimentan la metamorfosis en pleno vuelo a su forma de combate (velocimorfo).
- 🌸 **Más de 40 Babosas Auténticas**:
  - **Estándar**: Infierno, Demoledora, Bengala, Granada, Aquabeek, Congelada, Carnero, Electroshock, etc.
  - **Elementales Sagradas**: Elemental de Fuego, Agua, Tierra, Aire y Energía.
  - **Guardianas Legendarias**: Sanadora Doc, Sanadora Blanca, Fandango.
  - **Ghouls Oscuros**: Versiones corrompidas por el agua oscura del Dr. Blakk (Dark Furnace, Aguafreak, Gimmstone, Frost Fang, Negablade, etc.).
- 🛡️ **6 Razas de Lanzadores con Pasivas Únicas**:
  - **Humano (Linaje Shane)**: +15% de poder en todas las babosas aliadas.
  - **Topo de las Cavernas**: +30% resistencia ante ataques de roca y tierra.
  - **Troll de Roca**: +25% de energía máxima para el equipo.
  - **Humanoide Tecnológico**: Bono personalizable de +10 atributos a elección.
  - **Clan de las Sombras**: +20% poder y velocidad en babosas oscuras y venenosas.
  - **Shein Ancestral**: +10% de daño base y probabilidad crítica aumentada.
- 🗺️ **Modo Campaña de Cavernas**:
  1. *Caverna Lumbre* (Fuego y Magma)
  2. *Caverna Cañón Hundido* (Tierra y Peñascos)
  3. *Caverna Glacial del Abismo* (Hielo y Escarcha)
  4. *Caverna Hongo Luminoso* (Energía y Selva Bioluminiscente)
  5. *Fortaleza del Dr. Blakk* (Ghouls y Jefe Final)
- ⚔️ **Modo Duelo Rápido (3v3)**: Combates tácticos inmediatos contra la inteligencia artificial.
- 🔬 **El Gran Babosario**: Enciclopedia interactiva con buscador en vivo, fichas técnicas, estadísticas (Ataque, Salud, Velocidad), hábitat y comparador de **Protoforma vs Velocimorfo a 100 MPH**.
- 🔊 **Motor de Audio Procedural**: Efectos de disparo, silbidos a 100 MPH, rugidos de transformación, explosiones elementales y curaciones sintetizadas mediante **Web Audio API** (sin dependencias ni descargas pesadas).
- ✨ **Estética Cyber-Caverna**: Interfaz fluida con Glassmorphism (`backdrop-filter`), partículas bioluminiscentes flotantes en Canvas 2D y adaptabilidad para móviles y PC.

---

## 🎮 Matriz de Ventajas Elementales

| Elemento Atacante | Fuerte Contra (x1.5 Daño) | Débil Contra (x0.75 Daño) |
| :--- | :--- | :--- |
| 🔥 **Fuego** | 🌿 Planta, ❄️ Hielo | 💧 Agua |
| 💧 **Agua** | 🔥 Fuego, ⛰️ Tierra | ⚡ Eléctrico, 🌿 Planta |
| ❄️ **Hielo** | 💧 Agua, 🌿 Planta | 🔥 Fuego, ⚙️ Metal |
| ⛰️ **Tierra** | ⚡ Eléctrico, ⚙️ Metal | 💧 Agua, 💎 Cristal |
| ⚡ **Eléctrico** | 💧 Agua, ⚙️ Metal | ⛰️ Tierra |
| 🌿 **Planta** | 💧 Agua, ⛰️ Tierra | 🔥 Fuego, 💨 Aire |
| 💨 **Aire** | 🌿 Planta, 🌑 Sombra | — |
| 🌟 **Energía** | 🌑 Sombra, ⚙️ Metal, 👻 Fantasma | — |
| 🌑 **Sombra** | 🧠 Psíquico, 👻 Fantasma | 🌟 Energía |

---

## 🚀 Cómo Jugar Localmente

1. Clona el repositorio en tu máquina:
   ```bash
   git clone https://github.com/traderxael/bajoterra.git
   cd bajoterra
   ```

2. Levanta un servidor local con Python (o abre con cualquier servidor HTTP como Live Server en VS Code):
   ```bash
   python -m http.server 8080
   ```

3. Abre en tu navegador preferido:
   ```
   http://localhost:8080
   ```

---

## 🌐 Publicar en GitHub Pages (Juega Online Gratis)

Para que cualquier persona pueda jugar tu juego directamente desde su navegador o teléfono móvil:

1. Dirígete a la pestaña **Settings** de este repositorio en GitHub.
2. En el menú izquierdo, haz clic en **Pages**.
3. En la sección **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: Selecciona `main` y la carpeta `/ (root)`
4. Haz clic en **Save**. En un par de minutos tu juego estará en vivo en:
   👉 **`https://traderxael.github.io/bajoterra/`**

---

## 🔄 Sincronización Automática con GitHub

Para actualizar tu repositorio cada vez que realices cambios o mejoras, simplemente ejecuta el script incluido:

```powershell
.\sync_github.ps1 -Mensaje "Mi nueva actualización de babosas"
```

---

## 📂 Estructura del Proyecto

```
bajoterra/
├── api/
│   ├── babosas_bajoterra.json   # Base de datos de babosas aliadas
│   └── babosas_malvadas.json    # Catálogo de ghouls del Dr. Blakk
├── css/
│   └── style.css                # Estilos visuales de caverna y neón
├── img/
│   ├── [babosa].webp            # Sprites en protoforma
│   └── transformadas/           # Velocimorfos de combate a 100 MPH
├── js/
│   ├── sound.js                 # Sintetizador procedural Web Audio API
│   └── game.js                  # Lógica de combate, campaña y enciclopedia
├── sync_github.ps1              # Script de sincronización con GitHub
├── index.html                   # Interfaz principal del juego
└── README.md                    # Documentación completa
```

---

## 📜 Licencia y Créditos

Proyecto de homenaje fan-made con fines educativos e interactivos, basado en el rico universo de *Slugterra* (creado por Asaph Fipke / Nerd Corps Entertainment).
