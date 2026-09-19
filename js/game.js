/**
 * BAJOTERRA: CAVERNAS PROFUNDAS · BATALLA DE BABOSAS (SLUGTERRA)
 * Motor central de juego, campaña, duelos tácticos y enciclopedia.
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. CONSTANTES Y CONFIGURACIÓN DEL UNIVERSO BAJOTERRA
     ========================================================================== */

  const ELEMENTOS = {
    fuego:    { color: '#ff6a00', icono: '🔥', nombre: 'Fuego' },
    agua:     { color: '#3aa0ff', icono: '💧', nombre: 'Agua' },
    hielo:    { color: '#7fe9ff', icono: '❄️', nombre: 'Hielo' },
    tierra:   { color: '#c9974f', icono: '⛰️', nombre: 'Tierra' },
    electrico:{ color: '#ffef5c', icono: '⚡', nombre: 'Eléctrico' },
    veneno:   { color: '#9dff6a', icono: '☠️', nombre: 'Veneno' },
    sombra:   { color: '#8e6bff', icono: '🌑', nombre: 'Sombra' },
    energia:  { color: '#ffd93d', icono: '🌟', nombre: 'Energía' },
    psiquico: { color: '#ff5eea', icono: '🧠', nombre: 'Psíquico' },
    cristal:  { color: '#ff9efc', icono: '💎', nombre: 'Cristal' },
    planta:   { color: '#58d068', icono: '🌿', nombre: 'Planta' },
    aire:     { color: '#9fe6e0', icono: '💨', nombre: 'Aire' },
    metal:    { color: '#c9d1e0', icono: '⚙️', nombre: 'Metal' },
    fantasma: { color: '#9e7bff', icono: '👻', nombre: 'Fantasma' }
  };

  const VENTAJA = {
    fuego:     ['planta', 'hielo'],
    agua:      ['fuego', 'tierra'],
    planta:    ['agua', 'tierra'],
    hielo:     ['agua', 'planta'],
    tierra:    ['electrico', 'metal'],
    aire:      ['planta', 'sombra'],
    energia:   ['sombra', 'metal', 'fantasma'],
    electrico: ['agua', 'metal'],
    veneno:    ['planta', 'fantasma'],
    psiquico:  ['sombra', 'veneno'],
    sombra:    ['psiquico', 'fantasma'],
    cristal:   ['tierra', 'hielo'],
    metal:     ['hielo', 'cristal'],
    fantasma:  ['sombra', 'psiquico']
  };

  const RAZAS = [
    {
      id: 'humano',
      nombre: 'Humano (Linaje Shane)',
      icono: '🧑‍🚒',
      stats: { fuerza: 70, defensa: 65, velocidad: 70, energia: 75 },
      nivel: 70,
      pasiva: 'Vínculo Shane',
      pasivaDesc: '+15% de poder en todas tus babosas gracias al lazo de amistad.'
    },
    {
      id: 'topo',
      nombre: 'Topo de las Cavernas',
      icono: '⛏️',
      stats: { fuerza: 75, defensa: 88, velocidad: 45, energia: 85 },
      nivel: 72,
      pasiva: 'Piel Excavadora',
      pasivaDesc: '+30% de resistencia ante ataques de roca, cristal y tierra.'
    },
    {
      id: 'troll',
      nombre: 'Troll de Roca',
      icono: '🪨',
      stats: { fuerza: 95, defensa: 75, velocidad: 35, energia: 95 },
      nivel: 78,
      pasiva: 'Coloso Subterráneo',
      pasivaDesc: '+25% de energía máxima para resistir el fuego enemigo.'
    },
    {
      id: 'humanoide',
      nombre: 'Humanoide Tecnológico',
      icono: '🧝',
      stats: { fuerza: 65, defensa: 65, velocidad: 75, energia: 70 },
      nivel: 65,
      pasiva: 'Blaster Modificado',
      pasivaDesc: 'Otorga +10 puntos al atributo de tu preferencia.'
    },
    {
      id: 'sombras',
      nombre: 'Clan de las Sombras',
      icono: '🌑',
      stats: { fuerza: 75, defensa: 55, velocidad: 88, energia: 70 },
      nivel: 84,
      pasiva: 'Poder Umbrío',
      pasivaDesc: '+20% de velocidad y ataque en babosas de sombra o veneno.'
    },
    {
      id: 'shein',
      nombre: 'Shein Ancestral',
      icono: '👑',
      stats: { fuerza: 82, defensa: 82, velocidad: 82, energia: 82 },
      nivel: 80,
      pasiva: 'Aura Luminosa',
      pasivaDesc: '+10% de daño y probabilidad crítica aumentada en todos los tiros.'
    }
  ];

  // Campaña de 5 Cavernas
  const CAVERNAS_CAMPANA = [
    {
      id: 1,
      nombre: 'Caverna Lumbre',
      icono: '🌋',
      desc: 'Tierras volcánicas abrasadoras defendidas por salteadores de magma.',
      enemigoNombre: 'Lanzador Pirómano',
      slugsEnemigas: ['Dark Furnace', 'Lavalynx', 'Granada']
    },
    {
      id: 2,
      nombre: 'Caverna Cañón Hundido',
      icono: '⛰️',
      desc: 'Laberinto de fallas rocosas y peñascos custodiados por forajidos.',
      enemigoNombre: 'Bandido de las Rocas',
      slugsEnemigas: ['Gimmstone', 'Carnero', 'Arenosa']
    },
    {
      id: 3,
      nombre: 'Caverna Glacial del Abismo',
      icono: '❄️',
      desc: 'Túneles de estalactitas congeladas con trampas de escarcha negra.',
      enemigoNombre: 'Cazador de Escarcha',
      slugsEnemigas: ['Frost Fang', 'Congelada', 'Esquirla Helada']
    },
    {
      id: 4,
      nombre: 'Caverna Hongo Luminoso',
      icono: '🍄',
      desc: 'Antigua selva subterránea con esporas místicas de alta resonancia.',
      enemigoNombre: 'Chamán de Esporas',
      slugsEnemigas: ['Neotox', 'Tejedora', 'Electroshock']
    },
    {
      id: 5,
      nombre: 'Fortaleza del Dr. Blakk',
      icono: '🏰',
      desc: 'El centro neurálgico de producción de babosas malvadas (Ghouls).',
      enemigoNombre: 'Dr. Thaddius Blakk',
      slugsEnemigas: ['Dark Furnace', 'Aguafreak', 'Gimmstone']
    }
  ];

  // Metadatos de babosas adicionales (Elementales y Guardianas)
  const EXTRAS = [
    { nombre: 'Elemental de Fuego', elemento: 'fuego', rareza: 'elemental', categoria: 'elemental', nivel: 75, habitat: 'Fuentes de lava del Cañón del Molino', descripcion: 'Una de las cinco babosas elementales sagradas. Concentra el poder del magma en un ser viviente.', imagen: 'img/Elemental de Fuego.webp' },
    { nombre: 'Elemental de Agua', elemento: 'agua', rareza: 'elemental', categoria: 'elemental', nivel: 75, habitat: 'Corrientes subterráneas del Río Este', descripcion: 'Babosa elemental que controla cada gota de agua del mundo subterráneo.', imagen: 'img/Elemental de Agua.webp' },
    { nombre: 'Elemental de Aire', elemento: 'aire', rareza: 'elemental', categoria: 'elemental', nivel: 75, habitat: 'Laderas del Gran Ventisquero', descripcion: 'Babosa elemental de los vientos. Puede desviar cualquier proyectil frontal.', imagen: 'img/Elemental de Aire.webp' },
    { nombre: 'Elemental de Tierra', elemento: 'tierra', rareza: 'elemental', categoria: 'elemental', nivel: 75, habitat: 'Cavernas de los Cantos Rodados', descripcion: 'Babosa elemental del subsuelo. Un solo golpe suyo puede abrir un cañón en la roca.', imagen: 'img/Elemental de Tierra.webp' },
    { nombre: 'Elemental de Energía', elemento: 'energia', rareza: 'elemental', categoria: 'elemental', nivel: 80, habitat: 'Corazón de Bajo Terra', descripcion: 'La más rara de las elementales: canaliza la energía pura que mantiene vivo a todo el subsuelo.', imagen: 'img/Elemental de Energía.webp' },
    { nombre: 'Sanadora Blanca', elemento: 'energia', rareza: 'ultra-rara', categoria: 'guardiana', nivel: 82, habitat: 'Claro de Luz entre las Cavernas', descripcion: 'Babosa guardiana legendaria. Su luz cura a las babosas aliadas y deshace cualquier maleficio.', imagen: 'img/Sanadora Blanca.webp' },
    { nombre: 'Tornado', elemento: 'aire', rareza: 'comun', categoria: 'comun', nivel: 24, habitat: 'Mesetas con vientos permanentes', descripcion: 'Gira a gran velocidad formando pequeños torbellinos que desorientan al enemigo.', imagen: 'img/Tornado.webp' },
    { nombre: 'Erizo', elemento: 'tierra', rareza: 'comun', categoria: 'comun', nivel: 20, habitat: 'Laderas de matorral espinoso', descripcion: 'Babosa con púas que lanza en todas direcciones. Molesta e incómoda de agarrar.', imagen: 'img/Erizo.webp' }
  ];

  const META_NIVELES = {
    'Infierno':        { t: 'fuego', r: 'comun', nivel: 25 },
    'Demoledora':      { t: 'fuego', r: 'comun', nivel: 24 },
    'Bengala':         { t: 'fuego', r: 'comun', nivel: 16 },
    'Granada':         { t: 'fuego', r: 'comun', nivel: 22 },
    'Fraguadora':      { t: 'fuego', r: 'comun', nivel: 28 },
    'Blastipede':      { t: 'fuego', r: 'comun', nivel: 26 },
    'Lavalynx':        { t: 'fuego', r: 'comun', nivel: 26 },
    'Aquabeek':        { t: 'agua', r: 'comun', nivel: 22 },
    'Bubbaleone':      { t: 'agua', r: 'comun', nivel: 23 },
    'Gelatinosa':      { t: 'agua', r: 'comun', nivel: 18 },
    'Congelada':       { t: 'hielo', r: 'poco-comun', nivel: 34 },
    'Carnero':         { t: 'tierra', r: 'comun', nivel: 24 },
    'Tejedora':        { t: 'planta', r: 'poco-comun', nivel: 32 },
    'Arenosa':         { t: 'tierra', r: 'comun', nivel: 22 },
    'Diggrix':         { t: 'tierra', r: 'poco-comun', nivel: 30 },
    'Cristálida':      { t: 'cristal', r: 'rara', nivel: 54 },
    'Esquirla Helada': { t: 'hielo', r: 'poco-comun', nivel: 30 },
    'Trilladora':      { t: 'tierra', r: 'poco-comun', nivel: 40 },
    'Torpedo':         { t: 'agua', r: 'comun', nivel: 25 },
    'Punzante':        { t: 'tierra', r: 'comun', nivel: 20 },
    'Magnetosa':       { t: 'metal', r: 'rara', nivel: 48 },
    'Neotox':          { t: 'veneno', r: 'rara', nivel: 50 },
    'Sanadora':        { t: 'energia', r: 'ultra-rara', nivel: 78, c: 'guardiana' },
    'Electroshock':    { t: 'electrico', r: 'rara', nivel: 56 },
    'Fandango':        { t: 'energia', r: 'rara', nivel: 60, c: 'guardiana' },
    'Fósforo':         { t: 'energia', r: 'poco-comun', nivel: 38 },
    'Enigma':          { t: 'psiquico', r: 'legendaria', nivel: 90 },
    'Nube de Humo':    { t: 'fantasma', r: 'comun', nivel: 15 },
    'Xmitter':         { t: 'metal', r: 'rara', nivel: 62 },
    'Hipnogrif':       { t: 'psiquico', r: 'rara', nivel: 62 }
  };

  /* ==========================================================================
     2. ESTADO GLOBAL DE LA APLICACIÓN
     ========================================================================== */

  const state = {
    buenas: [],
    malvadas: [],
    todas: [],
    personaje: null,
    equipo: [],
    modo: 'campaign', // 'campaign' | 'quick'
    cavernaIndex: 0,
    filtroCategoria: 'todas',
    filtroElemento: null,
    batalla: null,
    inspeccionandoSlug: null
  };

  function $(id) {
    return document.getElementById(id);
  }

  function slugify(texto) {
    return String(texto || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function rutaTransformada(nombre) {
    const slug = slugify(nombre);
    // mapeos especiales para transformadas
    const map = {
      'sanadora': 'sanadora-doc',
      'sanadora-doc': 'sanadora-doc',
      'dark-furnace': 'dark-furnace',
      'aguafreak': 'aguafreak',
      'gimmstone': 'gimmstone',
      'frost-fang': 'frost-fang',
      'neotox': 'neotox'
    };
    return 'img/transformadas/' + (map[slug] || slug) + '.webp';
  }

  function calcStats(nivel) {
    return {
      atk: Math.round(nivel * 1.1) + 12,
      hp: Math.round(nivel * 1.8) + 40,
      vel: Math.round(nivel * 0.6) + 30
    };
  }

  /* ==========================================================================
     3. NAVEGACIÓN ENTRE PANTALLAS
     ========================================================================== */

  function mostrarVista(vistaId) {
    const vistas = ['viewHub', 'viewCharacter', 'viewDeck', 'viewBattle', 'viewEncyclopedia'];
    vistas.forEach(id => {
      const el = $(id);
      if (el) {
        el.classList.toggle('active', id === vistaId);
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ==========================================================================
     4. CARGA DE DATOS (JSON)
     ========================================================================== */

  async function cargarDatos() {
    try {
      const [resBuenas, resMalvadas] = await Promise.all([
        fetch('api/babosas_bajoterra.json'),
        fetch('api/babosas_malvadas.json')
      ]);

      const jsonBuenas = await resBuenas.json();
      const rawBuenas = (jsonBuenas.babosas && jsonBuenas.babosas.buenas) || jsonBuenas.babosas || [];

      const listaBuenas = rawBuenas.map(b => {
        const meta = META_NIVELES[b.nombre] || { t: 'energia', r: 'comun', nivel: 30 };
        return {
          id: b.id,
          nombre: b.nombre,
          elemento: meta.t,
          rareza: meta.r,
          categoria: meta.c || 'comun',
          nivel: meta.nivel,
          habitat: b.habitat || 'Cavernas Desconocidas',
          descripcion: b.descripcion || 'Una leal babosa del subsuelo.',
          imagen: b.imagen || ('img/' + slugify(b.nombre) + '.webp')
        };
      }).concat(EXTRAS);

      let listaMalvadas = [];
      try {
        const jsonMalvadas = await resMalvadas.json();
        const rawMalvadas = jsonMalvadas.babosas || [];
        listaMalvadas = rawMalvadas.map(m => {
          return {
            id: m.id || Math.floor(Math.random() * 1000 + 100),
            nombre: m.nombre,
            origen: m.origen,
            elemento: 'sombra',
            rareza: 'rara',
            categoria: 'malvada',
            nivel: 45,
            habitat: m.habitat || 'Cavernas de Oscuridad Total',
            descripcion: m.descripcion || 'Babosa corrompida por el agua oscura del Dr. Blakk.',
            imagen: rutaTransformada(m.nombre)
          };
        });
      } catch (e) {
        console.warn('No se pudieron parsear babosas malvadas:', e);
      }

      state.buenas = listaBuenas;
      state.malvadas = listaMalvadas;
      state.todas = [...listaBuenas, ...listaMalvadas];

      // Inicializar personaje por defecto
      const savedChar = localStorage.getItem('bajoterra_personaje');
      if (savedChar) {
        try { state.personaje = JSON.parse(savedChar); } catch(e){}
      }
      if (!state.personaje) {
        state.personaje = {
          nombre: 'Eli Shane',
          raza: RAZAS[0],
          bono: 'fuerza'
        };
      }

      // Pre-cargar 3 babosas icónicas si no hay equipo
      if (state.equipo.length === 0) {
        const infierno = state.buenas.find(b => b.nombre === 'Infierno') || state.buenas[0];
        const sanadora = state.buenas.find(b => b.nombre.includes('Sanadora')) || state.buenas[1];
        const electro = state.buenas.find(b => b.nombre === 'Electroshock') || state.buenas[2];
        state.equipo = [infierno, sanadora, electro].filter(Boolean);
      }

      renderizarRazas();
      renderizarEquipoDeck();
      renderizarGridSeleccion();
      renderizarBabosario();

    } catch (error) {
      console.error('Error cargando catálogo de babosas:', error);
    }
  }

  /* ==========================================================================
     5. GESTIÓN DE PERSONAJE & RAZA
     ========================================================================== */

  function renderizarRazas() {
    const grid = $('raceGrid');
    if (!grid) return;
    grid.innerHTML = '';

    RAZAS.forEach(raza => {
      const card = document.createElement('div');
      card.className = 'race-card' + (state.personaje && state.personaje.raza.id === raza.id ? ' selected' : '');
      
      const statsLabels = { fuerza: 'Ataque', defensa: 'Defensa', velocidad: 'Velocidad', energia: 'Energía' };
      let statsHtml = '';
      Object.entries(raza.stats).forEach(([k, val]) => {
        statsHtml += `
          <div class="stat-row">
            <span class="stat-lbl">${statsLabels[k]}</span>
            <div class="stat-meter"><i style="width:${val}%"></i></div>
            <span class="stat-num">${val}</span>
          </div>`;
      });

      card.innerHTML = `
        <div class="race-head">
          <div class="race-icon">${raza.icono}</div>
          <div>
            <div class="race-name">${raza.nombre}</div>
            <div class="race-lvl">Nivel de Maestría: ${raza.nivel}</div>
          </div>
        </div>
        <div class="stat-bars-wrap">${statsHtml}</div>
        <div class="race-passive">⚡ <b>${raza.pasiva}:</b> ${raza.pasivaDesc}</div>
      `;

      card.addEventListener('click', () => {
        SoundEngine.playClick();
        state.personaje.raza = raza;
        $('bonoVersatil').style.display = raza.id === 'humanoide' ? 'block' : 'none';
        renderizarRazas();
      });

      grid.appendChild(card);
    });

    $('charName').value = state.personaje.nombre;

    // Bonos de Humanoide
    const bonoContainer = $('bonoButtons');
    if (bonoContainer) {
      bonoContainer.innerHTML = '';
      ['fuerza', 'defensa', 'velocidad', 'energia'].forEach(b => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'pill-btn' + (state.personaje.bono === b ? ' active' : '');
        btn.textContent = `+10 ${b.toUpperCase()}`;
        btn.addEventListener('click', () => {
          SoundEngine.playClick();
          state.personaje.bono = b;
          renderizarRazas();
        });
        bonoContainer.appendChild(btn);
      });
    }
  }

  function guardarPersonaje() {
    const nameInput = $('charName').value.trim();
    if (nameInput) state.personaje.nombre = nameInput;
    localStorage.setItem('bajoterra_personaje', JSON.stringify(state.personaje));
    $('deckCharSummary').textContent = `${state.personaje.raza.icono} ${state.personaje.nombre} · ${state.personaje.raza.nombre} (Pasiva: ${state.personaje.raza.pasiva})`;
  }

  /* ==========================================================================
     6. PORTABABOSAS (HOLSTER) & SELECCIÓN DE EQUIPO
     ========================================================================== */

  function renderizarEquipoDeck() {
    const deckBar = $('teamDeckBar');
    if (!deckBar) return;
    deckBar.innerHTML = '';

    for (let i = 0; i < 3; i++) {
      const slug = state.equipo[i];
      const slot = document.createElement('div');
      slot.className = 'deck-slot' + (slug ? ' filled' : '');

      if (slug) {
        const el = ELEMENTOS[slug.elemento] || ELEMENTOS.energia;
        slot.innerHTML = `
          <div class="deck-slot-img" style="border-color:${el.color};">
            <img src="${slug.imagen}" alt="${slug.nombre}" onerror="this.src='img/Infierno.webp'">
          </div>
          <div class="deck-slot-info">
            <h4>${slug.nombre}</h4>
            <p>${el.icono} ${el.nombre} · Nivel ${slug.nivel}</p>
          </div>
          <button type="button" class="btn-icon" style="margin-left:auto;width:32px;height:32px;font-size:0.9rem;" title="Quitar">✕</button>
        `;
        slot.querySelector('button').addEventListener('click', (e) => {
          e.stopPropagation();
          SoundEngine.playClick();
          state.equipo.splice(i, 1);
          renderizarEquipoDeck();
          renderizarGridSeleccion();
        });
      } else {
        slot.innerHTML = `
          <div class="deck-slot-img" style="border-style:dashed;">
            <span class="deck-slot-empty-icon">+</span>
          </div>
          <div class="deck-slot-info">
            <h4 style="color:var(--color-muted);">Ranura ${i + 1} Vacía</h4>
            <p>Selecciona una babosa del catálogo</p>
          </div>
        `;
      }

      deckBar.appendChild(slot);
    }

    const btnStart = $('btnStartBattle');
    if (btnStart) {
      btnStart.disabled = state.equipo.length !== 3;
    }
    const statusMsg = $('deckStatusMsg');
    if (statusMsg) {
      statusMsg.textContent = state.equipo.length === 3 
        ? '¡Equipo completo y listo para el duelo!' 
        : `Selecciona ${3 - state.equipo.length} babosa(s) más para tu lanzadora.`;
    }
  }

  function renderizarGridSeleccion() {
    const grid = $('slugSelectionGrid');
    if (!grid) return;
    grid.innerHTML = '';

    renderizarFiltrosCategorias();
    renderizarFiltrosElementos();

    const filtradas = state.todas.filter(slug => {
      if (state.filtroCategoria !== 'todas' && slug.categoria !== state.filtroCategoria) return false;
      if (state.filtroElemento && slug.elemento !== state.filtroElemento) return false;
      return true;
    });

    filtradas.forEach(slug => {
      const el = ELEMENTOS[slug.elemento] || ELEMENTOS.energia;
      const isEquipped = state.equipo.some(s => s.nombre === slug.nombre);

      const card = document.createElement('div');
      card.className = 'slug-card' + (isEquipped ? ' selected-team' : '');
      card.style.setProperty('--slug-aura', el.color);

      card.innerHTML = `
        <div class="slug-portrait" style="border-color:${el.color};">
          <img src="${slug.imagen}" alt="${slug.nombre}" onerror="this.src='img/Infierno.webp'">
        </div>
        <div class="slug-title">${slug.nombre}</div>
        <div class="slug-tags-row">
          <span class="element-tag" style="--el-color:${el.color};">${el.icono} ${el.nombre}</span>
        </div>
        <div class="slug-power-badge">Nivel ${slug.nivel} · ${isEquipped ? '✓ En Equipo' : '+ Equipar'}</div>
      `;

      card.addEventListener('click', () => {
        SoundEngine.playClick();
        if (isEquipped) {
          state.equipo = state.equipo.filter(s => s.nombre !== slug.nombre);
        } else {
          if (state.equipo.length >= 3) {
            abrirModalSlug(slug);
            return;
          }
          state.equipo.push(slug);
        }
        renderizarEquipoDeck();
        renderizarGridSeleccion();
      });

      grid.appendChild(card);
    });
  }

  function renderizarFiltrosCategorias() {
    const container = $('categoryFilters');
    if (!container || container.children.length > 0) return;

    const cats = [
      { id: 'todas', label: 'Todas' },
      { id: 'comun', label: 'Estándar' },
      { id: 'elemental', label: '🌸 Elementales' },
      { id: 'guardiana', label: '🛡️ Guardianas' },
      { id: 'malvada', label: '🌑 Ghouls / Malvadas' }
    ];

    cats.forEach(c => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pill-btn' + (state.filtroCategoria === c.id ? ' active' : '');
      btn.textContent = c.label;
      btn.addEventListener('click', () => {
        SoundEngine.playClick();
        state.filtroCategoria = c.id;
        container.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderizarGridSeleccion();
      });
      container.appendChild(btn);
    });
  }

  function renderizarFiltrosElementos() {
    const container = $('elementFilters');
    if (!container || container.children.length > 0) return;

    Object.entries(ELEMENTOS).forEach(([key, data]) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pill-btn';
      btn.innerHTML = `${data.icono} ${data.nombre}`;
      btn.addEventListener('click', () => {
        SoundEngine.playClick();
        if (state.filtroElemento === key) {
          state.filtroElemento = null;
          btn.classList.remove('active');
        } else {
          state.filtroElemento = key;
          container.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        }
        renderizarGridSeleccion();
      });
      container.appendChild(btn);
    });
  }

  /* ==========================================================================
     7. ARENA DE BATALLA (SISTEMA DE TIRO A 100 MPH Y VELOCIMORFOS)
     ========================================================================== */

  function iniciarBatalla(modo = 'campaign', cavernIdx = 0) {
    state.modo = modo;
    state.cavernaIndex = cavernIdx;

    const caverna = CAVERNAS_CAMPANA[cavernIdx] || CAVERNAS_CAMPANA[0];
    $('arenaCavernName').textContent = modo === 'campaign' ? caverna.nombre : 'Arena de Duelos Libres';
    $('arenaCavernIcon').textContent = modo === 'campaign' ? caverna.icono : '⚔️';
    $('arenaRoundTracker').textContent = modo === 'campaign' ? `Caverna ${cavernIdx + 1} de 5` : 'Duelo 3v3';

    // Generar rivales
    let rivales = [];
    if (modo === 'campaign') {
      rivales = caverna.slugsEnemigas.map(nombre => {
        const found = state.todas.find(s => s.nombre.toLowerCase() === nombre.toLowerCase());
        return found || state.malvadas[0] || state.buenas[0];
      });
    } else {
      // Aleatorio para modo rápido
      const pool = [...state.todas].sort(() => 0.5 - Math.random());
      rivales = pool.slice(0, 3);
    }

    state.batalla = {
      ocupado: false,
      jugador: state.equipo.map(slug => crearFighter(slug, false)),
      enemigo: rivales.map(slug => crearFighter(slug, true)),
      turno: 'player'
    };

    renderizarLuchadores();
    $('battleLog').innerHTML = `<div class="log-entry">💥 <b>¡Comienza el duelo!</b> Elige una babosa de tu lanzadora para disparar a 100 MPH.</div>`;
    mostrarVista('viewBattle');
    SoundEngine.startAmbient();
  }

  function crearFighter(slug, esEnemigo) {
    const stats = calcStats(slug.nivel);
    const pers = state.personaje;
    let maxHp = stats.hp;

    // Pasivas raciales
    if (!esEnemigo && pers) {
      if (pers.raza.id === 'troll') maxHp = Math.round(maxHp * 1.25);
      if (pers.raza.id === 'humanoide' && pers.bono === 'energia') maxHp += 15;
    }

    return {
      slug,
      stats,
      hp: maxHp,
      maxHp,
      viva: true,
      esEnemigo
    };
  }

  function renderizarLuchadores() {
    renderizarFilaLuchadores('playerRow', state.batalla.jugador, false);
    renderizarFilaLuchadores('enemyRow', state.batalla.enemigo, true);
  }

  function renderizarFilaLuchadores(containerId, lista, esEnemigo) {
    const container = $(containerId);
    if (!container) return;
    container.innerHTML = '';

    lista.forEach((fighter, idx) => {
      const el = ELEMENTOS[fighter.slug.elemento] || ELEMENTOS.energia;
      const card = document.createElement('div');
      card.id = (esEnemigo ? 'enemy-' : 'player-') + idx;
      card.className = `slug-fighter ${esEnemigo ? 'enemy' : 'player'} ${!fighter.viva ? 'defeated' : ''}`;
      card.style.setProperty('--fighter-aura', el.color);

      const hpPct = Math.max(0, Math.round((fighter.hp / fighter.maxHp) * 100));

      card.innerHTML = `
        <div class="slug-fighter-avatar" style="border-color:${el.color};">
          <img src="${fighter.slug.imagen}" alt="${fighter.slug.nombre}" onerror="this.src='img/Infierno.webp'">
        </div>
        <div class="slug-fighter-name" title="${fighter.slug.nombre}">${fighter.slug.nombre}</div>
        <div class="hp-track">
          <div class="hp-fill ${hpPct < 30 ? 'danger' : ''}" style="width:${hpPct}%;"></div>
        </div>
        <div style="font-size:0.75rem;color:var(--color-muted);margin-top:0.2rem;">${fighter.hp}/${fighter.maxHp} HP</div>
      `;

      if (!esEnemigo) {
        card.addEventListener('click', () => {
          dispararBabosaJugador(idx);
        });
      }

      container.appendChild(card);
    });
  }

  function dispararBabosaJugador(idx) {
    if (state.batalla.ocupado) return;
    const atacante = state.batalla.jugador[idx];
    if (!atacante || !atacante.viva) return;

    // Buscar primer enemigo vivo
    const objetivoIdx = state.batalla.enemigo.findIndex(f => f.viva);
    if (objetivoIdx === -1) return;

    ejecutarDisparo(idx, objetivoIdx, false);
  }

  function turnoEnemigo() {
    if (!state.batalla) return;
    const enemigosVivos = state.batalla.enemigo
      .map((f, i) => ({ f, i }))
      .filter(item => item.f.viva);

    const jugadoresVivos = state.batalla.jugador
      .map((f, i) => ({ f, i }))
      .filter(item => item.f.viva);

    if (enemigosVivos.length === 0 || jugadoresVivos.length === 0) return;

    // IA escoge atacante y objetivo al azar
    const randomAtt = enemigosVivos[Math.floor(Math.random() * enemigosVivos.length)];
    const randomDef = jugadoresVivos[Math.floor(Math.random() * jugadoresVivos.length)];

    ejecutarDisparo(randomAtt.i, randomDef.i, true);
  }

  function ejecutarDisparo(attIdx, defIdx, esTiroEnemigo) {
    state.batalla.ocupado = true;
    const atacante = esTiroEnemigo ? state.batalla.enemigo[attIdx] : state.batalla.jugador[attIdx];
    const defensor = esTiroEnemigo ? state.batalla.jugador[defIdx] : state.batalla.enemigo[defIdx];

    SoundEngine.playBlasterShot();

    // Animación de medidor de 100 MPH
    animarVelocimetro(100, () => {
      SoundEngine.playSpeedBurst();
    });

    // Vuelo y transformación
    const elOrigen = $(esTiroEnemigo ? `enemy-${attIdx}` : `player-${attIdx}`);
    const elDestino = $(esTiroEnemigo ? `player-${defIdx}` : `enemy-${defIdx}`);
    const lane = $('centerLane');

    const rectO = elOrigen.getBoundingClientRect();
    const rectD = elDestino.getBoundingClientRect();
    const rectLane = lane.getBoundingClientRect();

    const startX = rectO.left + rectO.width / 2 - rectLane.left;
    const startY = rectO.top + rectO.height / 2 - rectLane.top;
    const endX = rectD.left + rectD.width / 2 - rectLane.left;
    const endY = rectD.top + rectD.height / 2 - rectLane.top;

    const el = ELEMENTOS[atacante.slug.elemento] || ELEMENTOS.energia;

    // Crear sprite de proyectil
    const proj = document.createElement('div');
    proj.className = 'slug-projectile';
    proj.style.setProperty('--proj-glow', el.color);
    proj.style.backgroundImage = `url('${atacante.slug.imagen}')`;
    proj.style.left = `${startX - 36}px`;
    proj.style.top = `${startY - 36}px`;
    lane.appendChild(proj);

    const duracion = 950;
    const t0 = performance.now();
    let transformed = false;

    function animarVuelo(now) {
      const p = Math.min(1, (now - t0) / duracion);
      const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;

      const curX = startX + (endX - startX) * ease;
      const arc = Math.sin(ease * Math.PI) * (esTiroEnemigo ? 50 : -50);
      const curY = startY + (endY - startY) * ease + arc;

      proj.style.transform = `translate3d(${curX - startX}px, ${curY - startY}px, 0)`;

      // Transformación a los 100 MPH (mitad de camino)
      if (ease >= 0.45 && !transformed) {
        transformed = true;
        proj.classList.add('transformed');
        proj.style.backgroundImage = `url('${rutaTransformada(atacante.slug.nombre)}')`;
        SoundEngine.playTransformRoar();
      }

      if (p < 1) {
        requestAnimationFrame(animarVuelo);
      } else {
        // Impacto
        proj.remove();
        elDestino.classList.add('shake-target');
        setTimeout(() => elDestino.classList.remove('shake-target'), 350);

        aplicarDanioImpacto(atacante, defensor, esTiroEnemigo);

        setTimeout(() => {
          state.batalla.ocupado = false;
          verificarFinBatalla();
          if (!esTiroEnemigo && state.batalla && !state.batalla.fin) {
            setTimeout(turnoEnemigo, 700);
          }
        }, 400);
      }
    }

    requestAnimationFrame(animarVuelo);
  }

  function animarVelocimetro(targetSpeed, onThreshold) {
    const el = $('speedMeter');
    if (!el) return;
    let cur = 0;
    const step = 8;
    const timer = setInterval(() => {
      cur = Math.min(targetSpeed, cur + step);
      el.textContent = cur;
      if (cur >= 50 && onThreshold) {
        onThreshold();
        onThreshold = null;
      }
      if (cur >= targetSpeed) {
        clearInterval(timer);
        setTimeout(() => { el.textContent = '0'; }, 600);
      }
    }, 25);
  }

  function aplicarDanioImpacto(att, def, esTiroEnemigo) {
    const pers = state.personaje;
    let baseAtk = att.stats.atk;

    // Ventaja elemental
    let multiElem = 1.0;
    if (VENTAJA[att.slug.elemento] && VENTAJA[att.slug.elemento].includes(def.slug.elemento)) {
      multiElem = 1.5;
    } else if (VENTAJA[def.slug.elemento] && VENTAJA[def.slug.elemento].includes(att.slug.elemento)) {
      multiElem = 0.75;
    }

    // Pasivas
    if (!esTiroEnemigo && pers) {
      if (pers.raza.id === 'humano') baseAtk *= 1.15;
      if (pers.raza.id === 'shein') baseAtk *= 1.10;
      if (pers.raza.id === 'sombras' && (att.slug.elemento === 'sombra' || att.slug.elemento === 'veneno')) baseAtk *= 1.25;
      if (pers.raza.id === 'humanoide' && pers.bono === 'fuerza') baseAtk += 8;
    }

    // Crítico
    const crit = Math.random() < (pers && pers.raza.id === 'shein' ? 0.28 : 0.16);
    let danioTotal = Math.round(baseAtk * multiElem * (crit ? 1.5 : 1.0));
    danioTotal = Math.max(8, danioTotal);

    def.hp = Math.max(0, def.hp - danioTotal);
    if (def.hp === 0) def.viva = false;

    SoundEngine.playImpact(crit);

    // Efecto especial: Sanadora Doc cura a sus aliados
    let extraLog = '';
    if (att.slug.nombre.includes('Sanadora') || att.slug.nombre === 'Sanadora Blanca') {
      const aliados = esTiroEnemigo ? state.batalla.enemigo : state.batalla.jugador;
      aliados.forEach(a => {
        if (a.viva) {
          a.hp = Math.min(a.maxHp, a.hp + 20);
        }
      });
      SoundEngine.playHeal();
      extraLog = ` ✨ <b>¡Luz Sanadora!</b> Cura +20 HP a todo el equipo aliado.`;
    }

    // Registrar en el log
    const logBox = $('battleLog');
    const entry = document.createElement('div');
    entry.className = `log-entry ${esTiroEnemigo ? 'enemy-hit' : 'player-hit'} ${crit ? 'crit-action' : ''}`;
    
    let msg = esTiroEnemigo 
      ? `🌑 <b>${att.slug.nombre}</b> rival impacta a tu <b>${def.slug.nombre}</b> por <b>${danioTotal} DMG</b>.`
      : `🔥 Tu <b>${att.slug.nombre}</b> a 100 MPH impacta al rival por <b>${danioTotal} DMG</b>.`;

    if (multiElem > 1.0) msg += ` <span style="color:#ffd93d;">[¡VENTAJA ELEMENTAL! 💥]</span>`;
    if (crit) msg += ` <span style="color:#ff5e3a;">[¡GOLPE CRÍTICO! ⚡]</span>`;
    if (extraLog) msg += extraLog;

    entry.innerHTML = msg;
    logBox.appendChild(entry);
    logBox.scrollTop = logBox.scrollHeight;

    renderizarLuchadores();
  }

  function verificarFinBatalla() {
    const jugadorVivo = state.batalla.jugador.some(f => f.viva);
    const enemigoVivo = state.batalla.enemigo.some(f => f.viva);

    if (!enemigoVivo) {
      finalizarBatalla(true);
    } else if (!jugadorVivo) {
      finalizarBatalla(false);
    }
  }

  function finalizarBatalla(victoria) {
    state.batalla.fin = true;
    const modal = $('resultModal');
    const resTitle = $('resTitle');
    const resSub = $('resSubtitle');
    const resRewards = $('resCavernRewards');
    const btnNext = $('btnNextCavern');

    if (victoria) {
      SoundEngine.playVictory();
      resTitle.textContent = '¡VICTORIA ROTUNDA!';
      resTitle.className = 'result-title victory';
      resSub.textContent = 'Has vencido con maestría y liberado las cavernas.';

      if (state.modo === 'campaign') {
        const nextIdx = state.cavernaIndex + 1;
        if (nextIdx < CAVERNAS_CAMPANA.length) {
          resRewards.innerHTML = `🏆 Desbloqueada: <b>${CAVERNAS_CAMPANA[nextIdx].nombre}</b>`;
          btnNext.style.display = 'inline-flex';
          btnNext.onclick = () => {
            modal.classList.remove('open');
            iniciarBatalla('campaign', nextIdx);
          };
        } else {
          resRewards.innerHTML = `👑 <b>¡HAS DERROTADO AL DR. BLAKK Y SALVADO A TODA BAJOTERRA!</b>`;
          btnNext.style.display = 'none';
        }
      } else {
        resRewards.innerHTML = `⭐ ¡Ganaste +100 Puntos de Lanzador!`;
        btnNext.style.display = 'none';
      }
    } else {
      SoundEngine.playDefeat();
      resTitle.textContent = 'DERROTA EN CAVERNA';
      resTitle.className = 'result-title defeat';
      resSub.textContent = 'Tus babosas quedaron exhaustas. Revisa tu equipo y vuelve a intentar.';
      resRewards.innerHTML = '';
      btnNext.style.display = 'none';
    }

    $('btnReplayBattle').onclick = () => {
      modal.classList.remove('open');
      iniciarBatalla(state.modo, state.cavernaIndex);
    };

    $('btnResultHome').onclick = () => {
      modal.classList.remove('open');
      mostrarVista('viewHub');
    };

    modal.classList.add('open');
  }

  /* ==========================================================================
     8. EL BABOSARIO (ENCICLOPEDIA & INSPECTOR DE BABOSAS)
     ========================================================================== */

  function renderizarBabosario() {
    const grid = $('pokedexGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const query = ($('pokedexSearch') ? $('pokedexSearch').value : '').toLowerCase().trim();

    const filtradas = state.todas.filter(slug => {
      if (query) {
        const matchNombre = slug.nombre.toLowerCase().includes(query);
        const matchElemento = slug.elemento.toLowerCase().includes(query);
        const matchHabitat = slug.habitat && slug.habitat.toLowerCase().includes(query);
        if (!matchNombre && !matchElemento && !matchHabitat) return false;
      }
      return true;
    });

    filtradas.forEach(slug => {
      const el = ELEMENTOS[slug.elemento] || ELEMENTOS.energia;
      const card = document.createElement('div');
      card.className = 'slug-card';
      card.style.setProperty('--slug-aura', el.color);

      card.innerHTML = `
        <div class="slug-portrait" style="border-color:${el.color};">
          <img src="${slug.imagen}" alt="${slug.nombre}" onerror="this.src='img/Infierno.webp'">
        </div>
        <div class="slug-title">${slug.nombre}</div>
        <div class="slug-tags-row">
          <span class="element-tag" style="--el-color:${el.color};">${el.icono} ${el.nombre}</span>
        </div>
        <div class="slug-power-badge">Nivel ${slug.nivel} · 🔍 Ver Ficha</div>
      `;

      card.addEventListener('click', () => {
        SoundEngine.playClick();
        abrirModalSlug(slug);
      });

      grid.appendChild(card);
    });
  }

  function abrirModalSlug(slug) {
    state.inspeccionandoSlug = slug;
    const modal = $('slugModal');
    const el = ELEMENTOS[slug.elemento] || ELEMENTOS.energia;
    const stats = calcStats(slug.nivel);

    $('slugModalCard').style.setProperty('--modal-glow', el.color);
    $('mName').textContent = slug.nombre;
    $('mElementTag').innerHTML = `${el.icono} ${el.nombre}`;
    $('mElementTag').style.borderColor = el.color;
    $('mElementTag').style.color = el.color;

    $('mHabitat').textContent = `📍 ${slug.habitat || 'Cavernas Subterráneas'}`;
    $('mDesc').textContent = slug.descripcion;

    $('mProtoImg').src = slug.imagen;
    $('mTransImg').src = rutaTransformada(slug.nombre);

    $('mAtk').textContent = stats.atk;
    $('mHp').textContent = stats.hp;
    $('mVel').textContent = stats.vel;

    // Buscar contraparte malvada
    const ghoulBox = $('mGhoulBox');
    const ghoul = state.malvadas.find(m => m.origen === slug.nombre);
    if (ghoul) {
      ghoulBox.style.display = 'block';
      $('mGhoulText').innerHTML = `<b>${ghoul.nombre}</b>: ${ghoul.descripcion}`;
    } else {
      ghoulBox.style.display = 'none';
    }

    const btnEquip = $('btnModalSelectSlug');
    const yaEnEquipo = state.equipo.some(s => s.nombre === slug.nombre);
    btnEquip.textContent = yaEnEquipo ? 'Quitar del Portababosas' : 'Equipar en Portababosas';
    btnEquip.onclick = () => {
      SoundEngine.playClick();
      if (yaEnEquipo) {
        state.equipo = state.equipo.filter(s => s.nombre !== slug.nombre);
      } else {
        if (state.equipo.length >= 3) {
          state.equipo[2] = slug; // Reemplazar la última
        } else {
          state.equipo.push(slug);
        }
      }
      renderizarEquipoDeck();
      renderizarGridSeleccion();
      modal.classList.remove('open');
    };

    modal.classList.add('open');
  }

  /* ==========================================================================
     9. LIENZO DE ESPORAS Y PARTÍCULAS BIOLUMINISCENTES
     ========================================================================== */

  function iniciarParticulasFondo() {
    const canvas = $('bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const PARTICULAS = 45;
    const particles = [];
    const colores = ['#ffd93d', '#ff6a00', '#3aa0ff', '#8e6bff', '#58d068'];

    for (let i = 0; i < PARTICULAS; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.5 + 1,
        color: colores[Math.floor(Math.random() * colores.length)],
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.6 - 0.2,
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  /* ==========================================================================
     10. ASIGNACIÓN DE EVENTOS Y ARRANQUE
     ========================================================================== */

  function inicializarEventos() {
    // Audio toggle
    $('btnAudio').addEventListener('click', () => {
      const isMuted = SoundEngine.toggleMute();
      $('btnAudio').textContent = isMuted ? '🔇' : '🔊';
    });

    // Navegación
    $('navHome').addEventListener('click', () => {
      SoundEngine.playClick();
      mostrarVista('viewHub');
    });

    $('btnPokedex').addEventListener('click', () => {
      SoundEngine.playClick();
      renderizarBabosario();
      mostrarVista('viewEncyclopedia');
    });

    $('btnClosePokedex').addEventListener('click', () => {
      SoundEngine.playClick();
      mostrarVista('viewHub');
    });

    // Menú Principal
    $('btnStartCampaign').addEventListener('click', () => {
      SoundEngine.playClick();
      state.modo = 'campaign';
      mostrarVista('viewCharacter');
    });

    $('cardCampaign').addEventListener('click', () => {
      SoundEngine.playClick();
      state.modo = 'campaign';
      mostrarVista('viewCharacter');
    });

    $('btnStartQuick').addEventListener('click', () => {
      SoundEngine.playClick();
      state.modo = 'quick';
      mostrarVista('viewCharacter');
    });

    $('cardQuick').addEventListener('click', () => {
      SoundEngine.playClick();
      state.modo = 'quick';
      mostrarVista('viewCharacter');
    });

    $('cardEncyclopedia').addEventListener('click', () => {
      SoundEngine.playClick();
      renderizarBabosario();
      mostrarVista('viewEncyclopedia');
    });

    // Personaje
    $('btnBackToHub').addEventListener('click', () => {
      SoundEngine.playClick();
      mostrarVista('viewHub');
    });

    $('btnConfirmCharacter').addEventListener('click', () => {
      SoundEngine.playClick();
      guardarPersonaje();
      renderizarEquipoDeck();
      renderizarGridSeleccion();
      mostrarVista('viewDeck');
    });

    // Selección de Equipo
    $('btnBackToChar').addEventListener('click', () => {
      SoundEngine.playClick();
      mostrarVista('viewCharacter');
    });

    $('btnStartBattle').addEventListener('click', () => {
      if (state.equipo.length !== 3) return;
      SoundEngine.playClick();
      iniciarBatalla(state.modo, 0);
    });

    // Arena
    $('btnForfeitBattle').addEventListener('click', () => {
      SoundEngine.playClick();
      mostrarVista('viewDeck');
    });

    // Modales
    $('btnCloseModal').addEventListener('click', () => {
      $('slugModal').classList.remove('open');
    });

    $('slugModal').addEventListener('click', (e) => {
      if (e.target === $('slugModal')) {
        $('slugModal').classList.remove('open');
      }
    });

    // Buscador en Babosario
    if ($('pokedexSearch')) {
      $('pokedexSearch').addEventListener('input', renderizarBabosario);
    }
  }

  // Arranque al cargar DOM
  window.addEventListener('DOMContentLoaded', () => {
    iniciarParticulasFondo();
    inicializarEventos();
    cargarDatos();
  });

})();
